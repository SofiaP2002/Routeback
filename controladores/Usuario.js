const Usuario = require("../modelos/usuario");

const { validarUsuario } = require("../validar/validacion");

const ingresar_usuario = async (req, res) => {

    // Obtener parametros por post a guardar
    let parametros = req.body;
    
    // Validar datos
    try {
        
        validarUsuario(parametros);

    } catch (error) {
        
        return res.status(400).json({
            
            status: "error",
            mensaje: "Faltan datos por enviar"
        });
    }

    // Crear el producto a guardar
    const usuario = new Usuario({
        nombre: parametros.nombre,
        apellido: parametros.apellido,
        email: parametros.email,
        contrasena: parametros.contrasena});

    // Guardar el producto en la base de datos
    try {
        
        await usuario.save();

        // Devolver resultado
        return res.status(200).json({
            status: "éxito",
            articulo: parametros,
            mensaje: "Usuario creado con éxito!!"
        });
    } catch (error) {
        // Si ocurre algún error al guardar en la base de datos, devolver un mensaje de error
        return res.status(500).json({
            status: "error",
            mensaje: "Error al crear el usuario"
        });
    }

}

const modificar_usuario = async (req, res) => {
    // Recorger id producto a editar
    let usuarioId = req.params._id;

    // Recoger datos del body
    let parametros = req.body;

    // Validar datos
    try {
        validarUsuario(parametros);
        console.log(parametros)
        // Buscar y actualizar producto
        let resultado = await Usuario.findOneAndUpdate({ _id: usuarioId }, req.body, { new: true });

        if (!resultado) {
            return res.status(500).json({
                status: "error",
                mensaje: "Error al actualizar el usuario"
            });
        } else {
            return res.status(200).json({
                status: "éxito",
                usuario: resultado,
                mensaje: "Usuario actualizado!!"
            });
        }

    } catch (error) {
        return res.status(400).json({
            status: "error",
            mensaje: "Faltan datos por enviar"
        });
    }

}


const obtener_usuario = async (req, res) => {
    // Recoger un id por la url
    
    let id = req.params._id;

    try {
        // Buscar el usuario
        let resultado = await Usuario.find({_id:id});
        if (!resultado) {
            return res.status(404).json({
                status: "error",
                mensaje: "No se ha encontrado el usuario"
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

const obtener_usuarios = async (req, res) => {

    try {
       
        let resultado = await Usuario.find({});

        if (!resultado) {
            return res.status(404).json({
                status: "error",
                mensaje: "No se han encontrado Usuarios!!"
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
            mensaje: "No se encuentran usuarios!!"
        });
    }
}


const eliminar_usuario = async (req, res) => {
    // Recoger un id por la url

    try {
        let usuarioId = req.params._id;
        
        let resultado = await Usuario.findOneAndDelete({ _id: usuarioId });

        if (!resultado) {
            return res.status(500).json({
                status: "error",
                mensaje: "Error al borrar el usuario"
            });
        } else {
            return res.status(200).json({
                status: "éxito",
                usuario: resultado,
                mensaje: "Usuario borrado"
            });
        }
    } catch (error) {
        return res.status(400).json({
            status: "error",
            mensaje: "No se ha podido borrar el usuario, posiblemente el formato de ID es incorrecto!!"
        });
    }
}


const iniciar_sesion = async (req, res) => {
    // Recorger id producto a editar
    const {email,contrasena} = req.body;
    
    

    // Validar datos
    try {
        
       
        const resultado = await Usuario.findOne({email:email });
        console.log(contrasena)
        if (resultado.contrasena===contrasena) {
            return res.status(200).json({
                mensaje: "Existe",
                status: "éxito",
                usuario: resultado
            });
        } else {
            return res.status(400).json({
                status: "incorrecto",
                mensaje: "No existe"
            });
        }

    } catch (error) {
        return res.status(500).json({
            status: "error",
            mensaje: "No existe"
        });
    }

}

module.exports = {
    ingresar_usuario,
    modificar_usuario,
    obtener_usuario,
    obtener_usuarios,
    eliminar_usuario,
    iniciar_sesion
   
    
}
