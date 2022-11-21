const { json } = require("express/lib/response");
const pool = require("../db");


//pool.query RETORNA PROMESA
const ObtenerTodosVacunasPaciente = async (req, res,next) => {
    const { id_paciente } = req.params;
    try {
      //throw new Error('Algo fue mal') probar next
      //console.log(nombre_paciente,dni_paciente) con esta mostraria en thunder cliente
      const antecedentes_patalogicos_paciente = await pool.query(    
        'SELECT "Vacunas_Administradas_Pacientes".*,"Vacunas".*  FROM public."Vacunas_Administradas_Pacientes" INNER JOIN public."Vacunas" ON "Vacunas"."ID_Vacuna" = "Vacunas_Administradas_Pacientes"."ID_Vacuna" WHERE "Vacunas_Administradas_Pacientes"."ID_Paciente" = $1',
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



const CrearVacunaPaciente = async (req, res,next) => {
  //asegurar que llegaran los datos
  //body permite conocer la informacion que nos esta ennviando las aplicaciones cliente
  const { id_paciente,id_vacuna} = req.body;

  try {
    //console.log(nombre_paciente,dni_paciente) con esta mostraria en thunder cliente
    const result = await pool.query(
      'INSERT INTO public."Vacunas_Administradas_Pacientes"("ID_Paciente","ID_Vacuna") VALUES($1,$2) RETURNING *',
      [id_paciente, id_vacuna]
    );

    res.json(result);
  } catch (error) {
    //console.log(error.message);
    //qui me devuelve a l funcion un ogjeto json
    //res.json({ error: error.message });
    next(error)
  }
};

const EliminarVacunaPaciente = async (req, res,next) => {
  const { id_app_del_paciente } = req.params;
  try {
    //console.log(nombre_paciente,dni_paciente) con esta mostraria en thunder cliente
    const result = await pool.query(
      'DELETE FROM public."Vacunas_Administradas_Pacientes" WHERE "ID_Vacuna_Administrada" = $1',
      [id_app_del_paciente]
    );

    if (result.rowCount === 0) {
      res.status(404).json({
        massage: "Vacuna no Encontrada para Eliminar",
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

const ModificarVacunaPaciente = async (req, res,next) => {
    const { id_app_del_paciente } = req.params;
    const { id_app} = req.body; //que es lo que quiero modificar

    try {
      //console.log(nombre_paciente,dni_paciente) con esta mostraria en thunder cliente
      const result = await pool.query(
        'UPDATE public."Vacunas_Administradas_Pacientes" SET "ID_Vacuna" = $1 WHERE "ID_Vacuna_Administrada" = $2 RETURNING *',[
            id_app,
            id_app_del_paciente,
        ]);
  
        if (result.rows.length === 0) {
            res.status(404).json({
              massage: "Vacuna no Encontrada para Modificar",
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
  ObtenerTodosVacunasPaciente,
  CrearVacunaPaciente,
  EliminarVacunaPaciente,
  ModificarVacunaPaciente,
};
