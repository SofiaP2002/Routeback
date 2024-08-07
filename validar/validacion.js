const validator = require("validator");

const validarProducto = (parametros) => {
    
    let validar_nombre_producto = !validator.isEmpty(parametros.nombre_producto) && 
     validator.isLength(parametros.nombre_producto, { min: 1, max: undefined });

    let validar_seccion = !validator.isEmpty(parametros.seccion) && 
     validator.isLength(parametros.seccion, { min: 1, max: undefined });

    let validar_pasillo = !validator.isEmpty(parametros.pasillo) && 
     validator.isLength(parametros.pasillo, { min: 1, max: undefined });
     
    
   
    let validar_imagen = !validator.isEmpty(parametros.imagen) && 
     validator.isLength(parametros.imagen, { min: 3, max: undefined });

    
    

    if ( !validar_nombre_producto || !validar_seccion || !validar_pasillo || !validar_imagen  ) {
        throw new Error("No se ha validado el Producto!!");
        
    }

}

const validarUsuario = (parametros) => {
    
    let validar_nombre = !validator.isEmpty(parametros.nombre) && 
     validator.isLength(parametros.nombre, { min: 1, max: undefined });

    let validar_apellido = !validator.isEmpty(parametros.apellido) && 
     validator.isLength(parametros.apellido, { min: 1, max: undefined });

    let validar_email = !validator.isEmpty(parametros.email) && 
     validator.isLength(parametros.email, { min: 1, max: undefined });
     
    
   
    let validar_contrasena = !validator.isEmpty(parametros.contrasena) && 
     validator.isLength(parametros.contrasena, { min: 3, max: undefined });

    
    

    if ( !validar_nombre || !validar_apellido || !validar_email || !validar_contrasena  ) {
        throw new Error("No se ha validado el Usuario!!");
        
    }

}


module.exports = {
    validarProducto,
    validarUsuario
}
