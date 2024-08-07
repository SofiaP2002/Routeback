const mongoose = require("mongoose");


const bd = async() => {

    try {

        await mongoose.connect("mongodb://SofiaP:Ball2002*96209849624233@ac-mcthrje-shard-00-00.oh1toq8.mongodb.net:27017,ac-mcthrje-shard-00-01.oh1toq8.mongodb.net:27017,ac-mcthrje-shard-00-02.oh1toq8.mongodb.net:27017/?replicaSet=atlas-q0hus4-shard-0&ssl=true&authSource=admin",{

        // Parametros dentro de objeto // solo en caso de aviso
            useNewUrlParser: true,
            useUnifiedTopology: true,
        // useCreateIndex: true
        });
       
        console.log("Conectado correctamente a la base de datos  !!");

    } catch(error) {
        console.log(error);
        throw new Error("No se ha podido conectar a la base de datos !!");
    }

}

module.exports = {
    bd
}