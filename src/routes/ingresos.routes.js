//url que el front va usar para actualizar , eliminar, etc
//url para navegar entre los componentes

const { Router } = require("express"); // traemos de express una funcion router
const pool = require("../db"); //.. subo de nivel
const {
    ObtenerTodosIngresos,
    ObtenerIngreso,
    CrearIngreso,
    EliminarIngreso,
    ModificarIngreso,
} = require("../controllers/ingresos.controllers");

//Diagnostico para seleccionar y asignar paciente
const {
    ObtenerTodosDiagnosticos,
    ObtenerDiagnostico_porNombre,
    ObtenerDiagnostico_porID,
  } = require("../controllers/diagnostico.controllers");

  const {
    ObternerCondicionIngreso,
    CrearCondicion,
    EliminarCondicion,
    ModificarCondicion,
  } = require("../controllers/condiciones.controllers");
  


const router = Router();

//Rutas para operar datos
//metodos http -- que queremos hacer en el backend

//INGRESOS

router.get("/ingresos", ObtenerTodosIngresos);

router.get("/buscar_ingreso/:id_ingreso", ObtenerIngreso); //aqui va un valor

router.post("/crear_ingreso", CrearIngreso);

router.delete("/eliminar_ingreso/:id_ingreso", EliminarIngreso);

router.put("/modificar_ingreso/:id_ingreso", ModificarIngreso);

//LISTA DE DIAGNOSTICOS A SELECCIONAR
router.get("/diagnosticos", ObtenerTodosDiagnosticos);
router.get("/buscar_id_diagnostico/:nombre_diagnostico", ObtenerDiagnostico_porNombre);
router.get("/buscar_nombre_diagnostico/:id_diagnostico", ObtenerDiagnostico_porID);

//CONDICION INGRESO O EGRESO
router.post("/crear_condicionpaciente", CrearCondicion);
router.get("/buscar_condicion_ingreso/:id_condicion", ObternerCondicionIngreso); //aqui va un valor
router.put("/modificar_condicionpaciente/:id_condicion", ModificarCondicion);

module.exports = router;
