const express =require("express");
const multer = require("multer");
const ProductoControlador =require("../controladores/Producto");
const UsuarioControlador= require("../controladores/Usuario");


const router =express.Router();


//Rutas Loggeo
router.post("/ingresarProducto", ProductoControlador.ingresar_producto);
router.get("/obtenerProducto/:_id", ProductoControlador.obtener_producto);
router.get("/obtenerProductos", ProductoControlador.obtener_productos);
router.put("/modificarProducto/:_id",ProductoControlador.modificar_producto);
router.delete("/eliminarProducto/:_id",ProductoControlador.eliminar_producto);


router.post("/ingresarUsuario", UsuarioControlador.ingresar_usuario);
router.get("/obtenerUsuario/:_id", UsuarioControlador.obtener_usuario);
router.get("/obtenerUsuarios", UsuarioControlador.obtener_usuarios);
router.put("/modificarUsuario/:_id",UsuarioControlador.modificar_usuario);
router.delete("/eliminarUsuario/:_id",UsuarioControlador.eliminar_usuario);
router.get("/obtenerUsuario/:_id", UsuarioControlador.obtener_usuario);
router.post("/iniciarSesion", UsuarioControlador.iniciar_sesion);
module.exports = router;
