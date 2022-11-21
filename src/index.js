const express = require("express");
const morgan = require("morgan"); //permite ver las peticiones que llegan
const cors = require('cors'); //comunicar front y back
const fileUpload = require('express-fileupload')

const pacienteRoutes = require("./routes/pacientes.routes");
const imageRoutes = require("./routes/images.routes");
const ingresoRoutes = require("./routes/ingresos.routes"); //CONTIENE LAS RUTAS
const egresoRoutes = require("./routes/egresos.routes"); //CONTIENE LAS RUTAS

const app = express();

// ESTABLEZCO EL PUERTO SI NO ESTA DEFINIDO
app.set('port', process.env.PORT || 4000 )

app.use(cors());
app.use(morgan("dev"));
app.use(express.json()); //servidor express podra entender las peticiones json post, etc

// le pasamos un objeto y donde almacenara las imagenes en ESTE CASO en un DIRECTORIO TEMPORAL
app.use(fileUpload({
    tempFileDir: '/temp'
}));

app.use(pacienteRoutes);
app.use(imageRoutes);
app.use(ingresoRoutes);
app.use(egresoRoutes);


//next es una funcion callback para saltar la funcion
//funcion que espera cuando suceda un error y envia un error comun para todas las funciones 
//recibo el error y mando el msj
app.use((err,req,res,next) => {
    return res.json({
        message:err.message
    })
})

app.listen(4000);

console.log("Server on port 4000");
