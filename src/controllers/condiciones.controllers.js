const { json } = require("express/lib/response");
const pool = require("../db");


//pool.query RETORNA PROMESA
const ObternerCondicionIngreso = async (req, res,next) => {
  const { id_condicion } = req.params;
  try {
    //console.log(nombre_paciente,dni_paciente) con esta mostraria en thunder cliente
    const result = await pool.query(
      'SELECT * FROM public."Condicion_Paciente" WHERE "ID_Condicion"= $1',
      [id_condicion]
    );

    if (result.rows.length === 0) {
      res.status(404).json({
        massage: "Condicion del Paciente no Encontrada",
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

const ObternerCondicionEgreso = async (req, res,next) => {
    const { id_egreso } = req.params;
    try {
      //console.log(nombre_paciente,dni_paciente) con esta mostraria en thunder cliente
      const result = await pool.query(
        'SELECT * FROM public."Condicion_Paciente" WHERE "ID_Ingreso"= $1',
        [id_ingreso]
      );
  
      if (result.rows.length === 0) {
        res.status(404).json({
          massage: "Condicion del Paciente no Encontrado",
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

const CrearCondicion = async (req, res,next) => {
  //asegurar que llegaran los datos
  //body permite conocer la informacion que nos esta ennviando las aplicaciones cliente
  const { id_paciente,id_ingreso,id_egreso,id_diagnostico, frecuencia_cardiaca,frecuencia_respiratoria,tension_arterial,saturacion,temperatura} = req.body;

  try {
    //console.log(nombre_paciente,dni_paciente) con esta mostraria en thunder cliente
    const result = await pool.query(
      'INSERT INTO public."Condicion_Paciente"("ID_Paciente","ID_Ingreso","ID_Egreso","ID_Diagnostico","Frecuencia_Cardiaca","Frecuencia_Respiratoria","Tension_Arterial","Saturacion","Temperatura") VALUES($1,$2,$3,$4,$5,$6,$7,$8,$9) RETURNING *',
      [id_paciente,id_ingreso,id_egreso,id_diagnostico, frecuencia_cardiaca,frecuencia_respiratoria,tension_arterial,saturacion,temperatura]
    );

    res.json(result);
  } catch (error) {
    //console.log(error.message);
    //qui me devuelve a l funcion un ogjeto json
    //res.json({ error: error.message });
    next(error)
  }
};

const EliminarCondicion = async (req, res,next) => {
  const { id_condicion } = req.params;
  try {
    //console.log(nombre_paciente,dni_paciente) con esta mostraria en thunder cliente
    const result = await pool.query(
      'DELETE FROM public."Ingresos_Pacientes" WHERE "ID_Ingreso" = $1',
      [id_condicion]
    );

    if (result.rowCount === 0) {
      res.status(404).json({
        massage: "Condicion no Encontrada para Eliminar",
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

const ModificarCondicion = async (req, res,next) => {
    const { id_condicion } = req.params;
    const {id_diagnostico, frecuencia_cardiaca,frecuencia_respiratoria,tension_arterial,saturacion,temperatura} = req.body; //que es lo que quiero modificar

    try {
      //console.log(nombre_paciente,dni_paciente) con esta mostraria en thunder cliente
      const result = await pool.query(
        'UPDATE public."Condicion_Paciente" SET "ID_Diagnostico"= $1, "Frecuencia_Cardiaca" = $2, "Frecuencia_Respiratoria" = $3,"Tension_Arterial" = $4,"Saturacion" = $5,"Temperatura" = $6 WHERE "ID_Condicion" = $7 RETURNING *',[     
            id_diagnostico,
            frecuencia_cardiaca,
            frecuencia_respiratoria,
            tension_arterial,
            saturacion,
            temperatura,

            id_condicion,
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

module.exports = {
  ObternerCondicionIngreso,
  CrearCondicion,
  EliminarCondicion,
  ModificarCondicion,
};
