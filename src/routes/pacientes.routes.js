//url que el front va usar para actualizar , eliminar, etc
//url para navegar entre los componentes

const { Router } = require("express"); // traemos de express una funcion router
const pool = require("../db"); //.. subo de nivel
const {
  ObtenerTodosPacientes,
  ObtenerPaciente,
  CrearPaciente,
  EliminarPaciente,
  ModificarPaciente,
  Subir_Imagen_Paciente
} = require("../controllers/pacientes.controllers");

//Obra Social para seleccionar y asignar paciente
const {
  ObtenerTodasObrasSociales,
  ObtenerObraSocial_porNombre,
  ObtenerObraSocial_porID,
} = require("../controllers/obras_sociales.controllers");

//LISTA DE APP del Pacientes
const {
  ObtenerTodosAPPaciente,
  CrearAPPaciente,
  EliminarAPPaciente,
  ModificarAPPaciente,
} = require("../controllers/appacientes.controllers");

//APP para seleccionar y asignar paciente
const {
    ObtenerTodasAPP,
    ObtenerAPP_porNombre,
    ObtenerAPP_porID
} = require("../controllers/app.controllers");

//LISTA DE Vacunas del Pacientes
const {
  ObtenerTodosVacunasPaciente,
  CrearVacunaPaciente,
  EliminarVacunaPaciente,
  ModificarVacunaPaciente,
} = require("../controllers/vacunaspaciente.controllers");

//VACUNA para seleccionar y asignar paciente
const {
  ObtenerTodosVacunas,
  ObtenerVacuna_porNombre,
  ObtenerVacuna_porID,
} = require("../controllers/vacunas.controllers");


const router = Router();

//Rutas para operar datos
//metodos http -- que queremos hacer en el backend

//PACIENTES

router.get("/pacientes", ObtenerTodosPacientes);

router.get("/buscar_paciente/:dni_paciente", ObtenerPaciente); //aqui va un valor

router.post("/crear_paciente", CrearPaciente);

router.delete("/paciente_eliminar/:dni_paciente", EliminarPaciente);

router.put("/modificar_paciente/:dni_paciente", ModificarPaciente);

router.put("/subir_frontal/:dni_paciente", Subir_Imagen_Paciente);

//OBRA SOCIAL A SELECCIONAR

router.get("/obras_sociales", ObtenerTodasObrasSociales);
router.get("/buscar_id_obra_social/:nombre_obra_social", ObtenerObraSocial_porNombre);
router.get("/buscar_nombre_obra_social/:id_obra_social", ObtenerObraSocial_porID);

//LISTADO y ANTECEDENTES PATOLOGICOS DEl PACIENTE
router.get("/lista_appaciente/:id_paciente", ObtenerTodosAPPaciente);
router.post("/crear_appaciente", CrearAPPaciente);
router.delete("/eliminar_appaciente/:id_app_del_paciente", EliminarAPPaciente);
router.put("/modificar_appaciente/:id_app_del_paciente", ModificarAPPaciente);

//APP SELECCIONAR
router.get("/apps", ObtenerTodasAPP);
router.get("/buscar_id_app/:nombre_app", ObtenerAPP_porNombre);
router.get("/buscar_nombre_app/:id_app", ObtenerAPP_porID);


//LISTADO VACUNAS DEl PACIENTE
router.get("/lista_vacunaspaciente/:id_paciente", ObtenerTodosVacunasPaciente);
router.post("/crear_vacunapaciente", CrearVacunaPaciente);
router.delete("/eliminar_vacunapaciente/:id_app_del_paciente", EliminarVacunaPaciente);
router.put("/modificar_vacunapaciente/:id_app_del_paciente", ModificarVacunaPaciente);

//VACUNA SELECCIONAR
router.get("/vacunas", ObtenerTodosVacunas);
router.get("/buscar_id_vacuna/:nombre_vacuna", ObtenerVacuna_porNombre);
router.get("/buscar_nombre_vacuna/:id_vacuna", ObtenerVacuna_porID);


module.exports = router;
