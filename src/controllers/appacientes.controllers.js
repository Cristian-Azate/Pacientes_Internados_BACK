const { json } = require("express/lib/response");
const pool = require("../db");


//pool.query RETORNA PROMESA
const ObtenerTodosAPPaciente = async (req, res,next) => {
    const { id_paciente } = req.params;
    try {
      //throw new Error('Algo fue mal') probar next
      //console.log(nombre_paciente,dni_paciente) con esta mostraria en thunder cliente
      const antecedentes_patalogicos_paciente = await pool.query(    
        'SELECT "Antecedentes_Patologicos_de_Pacientes".*,"APP".*  FROM public."Antecedentes_Patologicos_de_Pacientes" INNER JOIN public."APP" ON "APP"."ID_APP" = "Antecedentes_Patologicos_de_Pacientes"."ID_APP" WHERE "Antecedentes_Patologicos_de_Pacientes"."ID_Paciente" = $1',
        [id_paciente]
      );
  
      res.json(antecedentes_patalogicos_paciente.rows);
    } catch (error) {
      //qui me devuelve a l funcion un objeto json
      //res.json({ error: error.message });
      //ejecuto la funcion next para devolver error
      next(error)
    }
  };



const CrearAPPaciente = async (req, res,next) => {
  //asegurar que llegaran los datos
  //body permite conocer la informacion que nos esta ennviando las aplicaciones cliente
  const { id_paciente,id_app} = req.body;

  try {
    //console.log(nombre_paciente,dni_paciente) con esta mostraria en thunder cliente
    const result = await pool.query(
      'INSERT INTO public."Antecedentes_Patologicos_de_Pacientes"("ID_Paciente","ID_APP") VALUES($1,$2) RETURNING *',
      [id_paciente, id_app]
    );

    res.json(result);
  } catch (error) {
    //console.log(error.message);
    //qui me devuelve a l funcion un ogjeto json
    //res.json({ error: error.message });
    next(error)
  }
};

const EliminarAPPaciente = async (req, res,next) => {
  const { id_app_del_paciente } = req.params;
  try {
    //console.log(nombre_paciente,dni_paciente) con esta mostraria en thunder cliente
    const result = await pool.query(
      'DELETE FROM public."Antecedentes_Patologicos_de_Pacientes" WHERE "ID_Antecedente_Patologico_de_Pacientes" = $1',
      [id_app_del_paciente]
    );

    if (result.rowCount === 0) {
      res.status(404).json({
        massage: "APP no Encontrada para Eliminar",
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

const ModificarAPPaciente = async (req, res,next) => {
    const { id_app_del_paciente } = req.params;
    const { id_app} = req.body; //que es lo que quiero modificar

    try {
      //console.log(nombre_paciente,dni_paciente) con esta mostraria en thunder cliente
      const result = await pool.query(
        'UPDATE public."Antecedentes_Patalogicos_de_Pacientes" SET "ID_APP" = $1 WHERE "ID_Antecedente_Patalogico_de_Pacientes" = $2 RETURNING *',[
            id_app,
            id_app_del_paciente,
        ]);
  
        if (result.rows.length === 0) {
            res.status(404).json({
              massage: "APP no Encontrada para Modificar",
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
  ObtenerTodosAPPaciente,
  CrearAPPaciente,
  EliminarAPPaciente,
  ModificarAPPaciente,
};
