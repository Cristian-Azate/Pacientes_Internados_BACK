//url que el front va usar para actualizar , eliminar, etc
//url para navegar entre los componentes

const { Router } = require("express"); // traemos de express una funcion router
const {
    SubirImagen,
    EliminarImagen,
  } = require("../controllers/images.controllers");

const router = Router();

//Rutas para operar imagenes
router.post('/api/images/upload', SubirImagen);
router.delete('/api/images/eliminar/:name_file', EliminarImagen);



module.exports = router;
