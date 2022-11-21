const { json } = require("express/lib/response");
const pool = require("../db");
//pool.query RETORNA PROMESA
const ObtenerTodasAPP = async (req, res,next) => {
  try {
    //throw new Error('Algo fue mal') probar next
    //console.log(nombre_paciente,dni_paciente) con esta mostraria en thunder cliente
    const apps = await pool.query(
      'SELECT * FROM public."APP" ORDER BY "Nombre_APP" ASC '
    );

    res.json(apps.rows);
  } catch (error) {
    //qui me devuelve a l funcion un objeto json
    //res.json({ error: error.message });
    //ejecuto la funcion next para devolver error
    next(error)
  }
};

const ObtenerAPP_porNombre = async (req, res,next) => {
  const { nombre_app } = req.params;
  try {
    //console.log(nombre_paciente,dni_paciente) con esta mostraria en thunder cliente
    const result = await pool.query(
      'SELECT * FROM public."APP" WHERE "Nombre_APP"= $1',
      [nombre_app]
    );

    if (result.rows.length === 0) {
      res.status(404).json({
        massage: "APP no Encontrada",
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

const ObtenerAPP_porID = async (req, res,next) => {
  const { id_app } = req.params;
  try {
    //console.log(nombre_paciente,dni_paciente) con esta mostraria en thunder cliente
    const result = await pool.query(
      'SELECT * FROM public."APP" WHERE "ID_APP"= $1',
      [id_app]
    );

    if (result.rows.length === 0) {
      res.status(404).json({
        massage: "APP no Encontrada",
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
    ObtenerTodasAPP,
    ObtenerAPP_porNombre,
    ObtenerAPP_porID,
};
