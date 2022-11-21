const { json } = require("express/lib/response");
const pool = require("../db");
const {
  ObtenerObraSocial_porNombre
} = require("./obras_sociales.controllers");

//pool.query RETORNA PROMESA
const ObtenerTodosPacientes = async (req, res,next) => {
  try {
    //throw new Error('Algo fue mal') probar next
    //console.log(nombre_paciente,dni_paciente) con esta mostraria en thunder cliente
    const pacientes = await pool.query(
      'SELECT * FROM public."Pacientes" ORDER BY "Nombre_Paciente" ASC '
    );

    res.json(pacientes.rows);
  } catch (error) {
    //qui me devuelve a l funcion un objeto json
    //res.json({ error: error.message });
    //ejecuto la funcion next para devolver error
    next(error)
  }
};


const ObtenerPaciente = async (req, res,next) => {
  const { dni_paciente } = req.params;
  try {
    //console.log(nombre_paciente,dni_paciente) con esta mostraria en thunder cliente
    const result = await pool.query(
      'SELECT * FROM public."Pacientes" WHERE "DNI_Paciente"= $1',
      [dni_paciente]
    );

    if (result.rows.length === 0) {
      res.status(404).json({
        massage: "Paciente no Encontrado",
      });
    } else {
      //solo puedo devolver 1  res.send("Paciente:", dni_paciente);
      res.json(result.rows[0]);
    
      
    }
  } catch (error) {
    //console.log(error.message);
    //qui me devuelve a la funcion un objeto json
    //res.json({ error: error.message });
    next(error)
  }
};

const CrearPaciente = async (req, res,next) => {
  //asegurar que llegaran los datos
  //body permite conocer la informacion que nos esta ennviando las aplicaciones cliente
  const { nombre_paciente, dni_paciente,fecha_nacimiento,historia_clinica,id_obra_social,telefono,calle,barrio,localidad} = req.body;

  try {
    //console.log(nombre_paciente,dni_paciente) con esta mostraria en thunder cliente
    const result = await pool.query(
      'INSERT INTO public."Pacientes"("Nombre_Paciente","DNI_Paciente","Fecha_Nacimiento","Historia_Clinica","ID_Obra_Social","Telefono","Domicilio_Calle","Domicilio_Barrio","Domicilio_Localidad") VALUES($1,$2,$3,$4,$5,$6,$7,$8,$9) RETURNING *',
      [nombre_paciente, dni_paciente,fecha_nacimiento,historia_clinica,id_obra_social,telefono,calle,barrio,localidad]
    );

    res.json(result);
  } catch (error) {
    //console.log(error.message);
    //qui me devuelve a l funcion un ogjeto json
    //res.json({ error: error.message });
    next(error)
  }
};

const EliminarPaciente = async (req, res,next) => {
  const { dni_paciente } = req.params;
  try {
    //console.log(nombre_paciente,dni_paciente) con esta mostraria en thunder cliente
    const result = await pool.query(
      'DELETE FROM public."Pacientes" WHERE "DNI_Paciente" = $1',
      [dni_paciente]
    );

    if (result.rowCount === 0) {
      res.status(404).json({
        massage: "Paciente no Encontrado para Eliminar",
      });
    } else {
      res.sendStatus(204); //codigo de estadood salio pero pero el servidor no devuelve nada
      //res.send("Paciente Eliminado:", dni_paciente);
    }
  } catch (error) {
    //console.log(error.message);
    //qui me devuelve a l funcion un objeto json
    //res.json({ error: error.message });
    next(error)
  }
};

const ModificarPaciente = async (req, res,next) => {
    const { dni_paciente } = req.params;
    const {nombre_paciente,fecha_nacimiento,historia_clinica,telefono,calle,barrio,localidad,id_obra_social} = req.body; //que es lo que quiero modificar

    try {
      //console.log(nombre_paciente,dni_paciente) con esta mostraria en thunder cliente
      const result = await pool.query(
        'UPDATE public."Pacientes" SET "Nombre_Paciente" = $1, "Fecha_Nacimiento" = $2,"Historia_Clinica" = $3,"Telefono" = $4,"Domicilio_Calle" = $5,"Domicilio_Barrio" = $6,"Domicilio_Localidad" = $7,"ID_Obra_Social" = $8 WHERE "DNI_Paciente" = $9 RETURNING *',[
            nombre_paciente,
            fecha_nacimiento,
            historia_clinica,
            telefono,
            calle,
            barrio,
            localidad,
            id_obra_social,
            dni_paciente,
        ]);
  
        if (result.rows.length === 0) {
            res.status(404).json({
              massage: "Paciente no Encontrado para Modificar",
            });
          } else {
            // SOLO PUEDEO DEVOLVER UNO res.send("Paciente Modificado"); 
            res.json(result.rows[0])
          }
    
   
     
     
    } catch (error) {    
      //qui me devuelve a l funcion un objeto json
      //res.json({ error: error.message });
      next(error)
    }
};

const Subir_Imagen_Paciente = async (req, res,next) => {
  const { dni_paciente } = req.params;
  const { urlfrontal} = req.body; //que es lo que quiero modificar
  try {
    //console.log(nombre_paciente,dni_paciente) con esta mostraria en thunder cliente
    const result = await pool.query(
      'UPDATE public."Pacientes" SET "URL_Frontal" = $1 WHERE "DNI_Paciente" = $2 RETURNING *',[
          urlfrontal,
          dni_paciente
      ]);

      if (result.rows.length === 0) {
          res.status(404).json({
            massage: "Error al subir imagen Intente de Nuevo",
          });
        } else {
          // SOLO PUEDEO DEVOLVER UNO res.send("Paciente Modificado"); 
          res.json(result.rows[0])
        }
  
 
   
   
  } catch (error) {    
    //qui me devuelve a l funcion un objeto json
    //res.json({ error: error.message });
    next(error)
  }
};

module.exports = {
  ObtenerTodosPacientes,
  ObtenerPaciente,
  CrearPaciente,
  EliminarPaciente,
  ModificarPaciente,
  Subir_Imagen_Paciente,
};
