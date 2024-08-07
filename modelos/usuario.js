const { Schema, model } = require("mongoose");

const UsuarioSchema = Schema({
	
    
    nombre: {
        type: String,
        required: true
    },
    apellido: {
        type: String,
        required: true
    },
    email: {
        type: String,
        match: [
            /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
            'Ingrese un email.',
          ],
        required: [true,'Ingrese un mail válido'],
        unique: true,
    },
    contrasena:{
        type: String,
        required: true,
        minlength: [6, 'La contraseña debe tener al menos 6 caracteres'],
    }

});
module.exports = model("Usuario", UsuarioSchema, "usuario");
