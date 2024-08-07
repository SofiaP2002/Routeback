const { Schema, model } = require("mongoose");

const ProductoSchema = Schema({
	
    
    nombre_producto: {
        type: String,
        required: true
    },
    seccion: {
        type: String,
        required: true
    },
    pasillo: {
        type: String,
        required: true
    },
    imagen:{
        type: String,
        required: true
    }

});
module.exports = model("Producto", ProductoSchema, "producto");
