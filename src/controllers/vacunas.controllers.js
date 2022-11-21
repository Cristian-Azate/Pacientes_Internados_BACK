const { json } = require("express/lib/response");
const pool = require("../db");
//pool.query RETORNA PROMESA
const ObtenerTodosVacunas = async (req, res,next) => {
  try {
    //throw new Error('Algo fue mal') probar next
    //console.log(nombre_paciente,dni_paciente) con esta mostraria en thunder cliente
    const vacunas = await pool.query(
      'SELECT * FROM public."Vacunas" ORDER BY "Nombre_Vacuna" ASC '
    );

    res.json(vacunas.rows);
  } catch (error) {
    //qui me devuelve a l funcion un objeto json
    //res.json({ error: error.message });
    //ejecuto la funcion next para devolver error
    next(error)
  }
};

const ObtenerVacuna_porNombre = async (req, res,next) => {
  const { nombre_vacuna } = req.params;
  try {
    //console.log(nombre_paciente,dni_paciente) con esta mostraria en thunder cliente
    const result = await pool.query(
      'SELECT * FROM public."Vacunas" WHERE "Nombre_Vacuna"= $1',
      [nombre_vacuna]
    );

    if (result.rows.length === 0) {
      res.status(404).json({
        massage: "Vacuna no Encontrada",
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

const ObtenerVacuna_porID = async (req, res,next) => {
  const { id_vacuna } = req.params;
  try {
    //console.log(nombre_paciente,dni_paciente) con esta mostraria en thunder cliente
    const result = await pool.query(
      'SELECT * FROM public."Vacunas" WHERE "ID_Vacuna"= $1',
      [id_vacuna]
    );

    if (result.rows.length === 0) {
      res.status(404).json({
        massage: "Vacuna no Encontrada",
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
    ObtenerTodosVacunas,
    ObtenerVacuna_porNombre,
    ObtenerVacuna_porID,
};
