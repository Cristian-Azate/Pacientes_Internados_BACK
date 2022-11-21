const { json } = require("express/lib/response");
const pool = require("../db");
//pool.query RETORNA PROMESA
const ObtenerTodosDiagnosticos = async (req, res,next) => {
  try {
    //throw new Error('Algo fue mal') probar next
    //console.log(nombre_paciente,dni_paciente) con esta mostraria en thunder cliente
    const diagnosticos = await pool.query(
      'SELECT * FROM public."Diagnosticos" ORDER BY "Nombre_Diagnostico" ASC '
    );

    res.json(diagnosticos.rows);
  } catch (error) {
    //qui me devuelve a l funcion un objeto json
    //res.json({ error: error.message });
    //ejecuto la funcion next para devolver error
    next(error)
  }
};

const ObtenerDiagnostico_porNombre = async (req, res,next) => {
  const { nombre_diagnostico } = req.params;
  try {
    //console.log(nombre_paciente,dni_paciente) con esta mostraria en thunder cliente
    const result = await pool.query(
      'SELECT * FROM public."Diagnosticos" WHERE "Nombre_Diagnostico"= $1',
      [nombre_diagnostico]
    );

    if (result.rows.length === 0) {
      res.status(404).json({
        massage: "Diagnostico no Encontrada",
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

const ObtenerDiagnostico_porID = async (req, res,next) => {
  const { id_diagnostico } = req.params;
  try {
    //console.log(nombre_paciente,dni_paciente) con esta mostraria en thunder cliente
    const result = await pool.query(
      'SELECT * FROM public."Diagnosticos" WHERE "ID_Diagnostico"= $1',
      [id_diagnostico]
    );

    if (result.rows.length === 0) {
      res.status(404).json({
        massage: "Diagnostico no Encontrada",
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
    ObtenerTodosDiagnosticos,
    ObtenerDiagnostico_porNombre,
    ObtenerDiagnostico_porID,
};
