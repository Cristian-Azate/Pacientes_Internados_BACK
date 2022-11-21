//url que el front va usar para actualizar , eliminar, etc
//url para navegar entre los componentes

const { Router } = require("express"); // traemos de express una funcion router
const pool = require("../db"); //.. subo de nivel
const {
    ObtenerTodosEgresos,
    ObtenerEgreso,
    CrearEgreso,
    EliminarEgreso,
    ModificarEgreso,
} = require("../controllers/egresos.controllers");




const router = Router();

//Rutas para operar datos
//metodos http -- que queremos hacer en el backend

//egresos

router.get("/egresos", ObtenerTodosEgresos);

router.get("/buscar_egreso/:id_egreso", ObtenerEgreso); //aqui va un valor

router.post("/crear_egreso", CrearEgreso);

router.delete("/eliminar_egreso/:id_egreso", EliminarEgreso);

router.put("/modificar_egreso/:id_egreso", ModificarEgreso);


module.exports = router;
