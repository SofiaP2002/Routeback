const Producto = require("../modelos/producto");

const { validarProducto } = require("../validar/validacion");

const ingresar_producto = async (req, res) => {

    // Obtener parametros por post a guardar
    let parametros = req.body;
    
    // Validar datos
    try {
        
        validarProducto(parametros);

    } catch (error) {
        
        return res.status(400).json({
            
            status: "error",
            mensaje: "Faltan datos por enviar"
        });
    }

    // Crear el producto a guardar
    const producto = new Producto({
        nombre_producto: parametros.nombre_producto,
        seccion: parametros.seccion,
        pasillo: parametros.pasillo,
        imagen: parametros.imagen});

    // Guardar el producto en la base de datos
    try {
        
        await producto.save();

        // Devolver resultado
        return res.status(200).json({
            status: "éxito",
            articulo: parametros,
            mensaje: "Producto creado con éxito!!"
        });
    } catch (error) {
        // Si ocurre algún error al guardar en la base de datos, devolver un mensaje de error
        return res.status(500).json({
            status: "error",
            mensaje: "Error al crear el producto"
        });
    }

}

const modificar_producto = async (req, res) => {
    // Recorger id producto a editar
    let productoId = req.params._id;

    // Recoger datos del body
    let parametros = req.body;

    // Validar datos
    try {
        validarProducto(parametros);
        console.log(parametros)
        // Buscar y actualizar producto
        let resultado = await Producto.findOneAndUpdate({ _id: productoId }, req.body, { new: true });

        if (!resultado) {
            return res.status(500).json({
                status: "error",
                mensaje: "Error al actualizar el producto"
            });
        } else {
            return res.status(200).json({
                status: "éxito",
                usuario: resultado,
                mensaje: "Producto actualizado!!"
            });
        }

    } catch (error) {
        return res.status(400).json({
            status: "error",
            mensaje: "Faltan datos por enviar"
        });
    }

}


const obtener_producto = async (req, res) => {
    // Recoger un id por la url
    
    let id = req.params._id;

    try {
        // Buscar el usuario
        let resultado = await Producto.find({_id:id});
        if (!resultado) {
            return res.status(404).json({
                status: "error",
                mensaje: "No se ha encontrado el producto"
            });
        } else {
            return res.status(200).json({
                status: "éxito",
                resultado
            });
        }
    } catch (error) {
        return res.status(400).json({
            status: "error",
            mensaje: "No se ha encontrado el usuario"
        });
    }
}

const obtener_productos = async (req, res) => {

    try {
       
        let resultado = await Producto.find({});

        if (!resultado) {
            return res.status(404).json({
                status: "error",
                mensaje: "No se han encontrado Productos!!"
            });
        } else {
            return res.status(200).send(
                //status: "éxito",
                //contador: resultado.length,
                resultado
            );
        }
    } catch (error) {
        return res.status(400).json({
            status: "error",
            mensaje: "No se encuentran productos!!"
        });
    }
}


const eliminar_producto = async (req, res) => {
    // Recoger un id por la url

    try {
        let productoId = req.params._id;
        
        let resultado = await Producto.findOneAndDelete({ _id: productoId });

        if (!resultado) {
            return res.status(500).json({
                status: "error",
                mensaje: "Error al borrar el producto"
            });
        } else {
            return res.status(200).json({
                status: "éxito",
                usuario: resultado,
                mensaje: "Producto borrado"
            });
        }
    } catch (error) {
        return res.status(400).json({
            status: "error",
            mensaje: "No se ha podido borrar el producto, posiblemente el formato de ID es incorrecto!!"
        });
    }
}

module.exports = {
    ingresar_producto,
    modificar_producto,
    obtener_producto,
    obtener_productos,
    eliminar_producto
   
    
}
