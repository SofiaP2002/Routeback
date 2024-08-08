const {bd} = require("./baseDatos/bd");
const express = require("express");
const cors = require("cors");





// Inicializar app
console.log("App de node iniciada");

// Conectar a la base de datos
bd();

// Crear servidor Node
const app = express();
const puerto = process.env.puerto || 3900;

app.use(cors({
    origin:["https://deploy-back-six.vercel.app"],
    methods:["POST", "GET", "PUT"],
    credentials: true
}))
app.use(express.json())
app.use(express.urlencoded({extended:true}));



// RUTAS
const rutas= require("./rutas/ruta");

app.use("/api", rutas);




app.get("/", (req, res) => {


    return res.status(200).send(
        "<h1>Empezando a crear un api rest con node</h1>"
    );

 
});



app.listen(puerto, ()=> {
    console.log('SERVIDOR FUNCIONANDO EN EL PUERTO', puerto);
});

module.exports = app;
