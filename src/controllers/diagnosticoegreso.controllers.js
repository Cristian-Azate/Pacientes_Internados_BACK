const { json } = require("express/lib/response");
const pool = require("../db");


//pool.query RETORNA PROMESA
const ObtenerTodosDiagnosticosEgresoPaciente = async (req, res,next) => {
    const { id_paciente } = req.params;
    try {
      //throw new Error('Algo fue mal') probar next
      //console.log(nombre_paciente,dni_paciente) con esta mostraria en thunder cliente
      const diagnostico_egreso = await pool.query(
        'SELECT * FROM public."Diagnostico_Egreso_Paciente" WHERE "ID_Paciente"= $1 ORDER BY "Descripcion" ASC ',
        [id_paciente]
      );
  
      res.json(diagnostico_egreso.rows);
    } catch (error) {
      //qui me devuelve a l funcion un objeto json
      //res.json({ error: error.message });
      //ejecuto la funcion next para devolver error
      next(error)
    }
  };



const CrearDiagnosticoEgresoPaciente = async (req, res,next) => {
  //asegurar que llegaran los datos
  //body permite conocer la informacion que nos esta ennviando las aplicaciones cliente
  const { id_paciente,descripcion} = req.body;

  try {
    //console.log(nombre_paciente,dni_paciente) con esta mostraria en thunder cliente
    const result = await pool.query(
      'INSERT INTO public."Diagnostico_Egreso_Paciente"("ID_Paciente","Descripcion") VALUES($1,$2) RETURNING *',
      [id_paciente, descripcion]
    );

    res.json(result);
  } catch (error) {
    //console.log(error.message);
    //qui me devuelve a l funcion un ogjeto json
    //res.json({ error: error.message });
    next(error)
  }
};

const EliminarDiagnosticoEgresoPaciente = async (req, res,next) => {
  const { id_diagnostico_ingreso } = req.params;
  try {
    //console.log(nombre_paciente,dni_paciente) con esta mostraria en thunder cliente
    const result = await pool.query(
      'DELETE FROM public."Diagnostico_Egreso_Paciente" WHERE "ID_Diagnostico_Ingreso" = $1',
      [id_diagnostico_ingreso]
    );

    if (result.rowCount === 0) {
      res.status(404).json({
        massage: "Diagnostico no Encontrado para Eliminar",
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

const ModificarDiagnosticoEgresoPaciente = async (req, res,next) => {
    const { id_diagnostico_ingreso } = req.params;
    const { descripcion} = req.body; //que es lo que quiero modificar

    try {
      //console.log(nombre_paciente,dni_paciente) con esta mostraria en thunder cliente
      const result = await pool.query(
        'UPDATE public."Diagnostico_Egreso_Paciente" SET "descripcion" = $1 WHERE "ID_Diagnostico_Ingreso" = $2 RETURNING *',[
            descripcion,
            id_diagnostico_ingreso,
        ]);
  
        if (result.rows.length === 0) {
            res.status(404).json({
              massage: "Diagnostico no Encontrado para Modificar",
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
  ObtenerTodosDiagnosticosEgresoPaciente,
  CrearDiagnosticoEgresoPaciente,
  EliminarDiagnosticoEgresoPacieEgreso,
};