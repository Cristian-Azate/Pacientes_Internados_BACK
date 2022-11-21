const { json } = require("express/lib/response");
const pool = require("../db");
//pool.query RETORNA PROMESA
const ObtenerTodasObrasSociales = async (req, res,next) => {
  try {
    //throw new Error('Algo fue mal') probar next
    //console.log(nombre_paciente,dni_paciente) con esta mostraria en thunder cliente
    const obras_sociales = await pool.query(
      'SELECT * FROM public."Obras_Sociales" ORDER BY "Nombre_Obra_Social" ASC '
    );

    res.json(obras_sociales.rows);
  } catch (error) {
    //qui me devuelve a l funcion un objeto json
    //res.json({ error: error.message });
    //ejecuto la funcion next para devolver error
    next(error)
  }
};

const ObtenerObraSocial_porNombre = async (req, res,next) => {
  const { nombre_obra_social } = req.params;
  try {
    //console.log(nombre_paciente,dni_paciente) con esta mostraria en thunder cliente
    const result = await pool.query(
      'SELECT * FROM public."Obras_Sociales" WHERE "Nombre_Obra_Social"= $1',
      [nombre_obra_social]
    );

    if (result.rows.length === 0) {
      res.status(404).json({
        massage: "Obra Social no Encontrada",
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

const ObtenerObraSocial_porID = async (req, res,next) => {
  const { id_obra_social } = req.params;
  try {
    //console.log(nombre_paciente,dni_paciente) con esta mostraria en thunder cliente
    const result = await pool.query(
      'SELECT * FROM public."Obras_Sociales" WHERE "ID_Obra_Social"= $1',
      [id_obra_social]
    );

    if (result.rows.length === 0) {
      res.status(404).json({
        massage: "Obra Social no Encontrada",
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



module.exports = {
    ObtenerTodasObrasSociales,
    ObtenerObraSocial_porNombre,
    ObtenerObraSocial_porID
};
