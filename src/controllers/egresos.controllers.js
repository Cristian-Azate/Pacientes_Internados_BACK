const { json } = require("express/lib/response");
const pool = require("../db");


//pool.query RETORNA PROMESA
const ObtenerTodosEgresos = async (req, res,next) => {
  try {
    //throw new Error('Algo fue mal') probar next
    //console.log(nombre_paciente,dni_paciente) con esta mostraria en thunder cliente
    const ingresos = await pool.query(
      'SELECT "Egresos_Pacientes".*,"Pacientes".*,"Condicion_Paciente"."ID_Condicion" FROM public."Egresos_Pacientes" INNER JOIN public."Pacientes" ON "Pacientes"."ID_Paciente" = "Egresos_Pacientes"."ID_Paciente" LEFT JOIN public."Condicion_Paciente" ON "Condicion_Paciente"."ID_Egreso" = "Egresos_Pacientes"."ID_Egreso" ORDER BY "Egresos_Pacientes"."Fecha_Egreso" ASC , "Egresos_Pacientes"."Hora_Egreso" ASC'
    );

    res.json(ingresos.rows);
  } catch (error) {
    //qui me devuelve a l funcion un objeto json
    //res.json({ error: error.message });
    //ejecuto la funcion next para devolver error
    next(error)
  }
};


const ObtenerEgreso = async (req, res,next) => {
  const { id_egreso } = req.params;
  try {
    //console.log(nombre_paciente,dni_paciente) con esta mostraria en thunder cliente
    const result = await pool.query(
      'SELECT * FROM public."Egresos_Pacientes" WHERE "ID_Egreso"= $1',
      [id_egreso]
    );

    if (result.rows.length === 0) {
      res.status(404).json({
        massage: "Egreso no Encontrado",
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

const CrearEgreso = async (req, res,next) => {
  //asegurar que llegaran los datos
  //body permite conocer la informacion que nos esta ennviando las aplicaciones cliente
  const { id_paciente, tipo_egreso,fecha_egreso,hora_egreso,nombre_medico,id_ingreso} = req.body;

  try {
    //console.log(nombre_paciente,dni_paciente) con esta mostraria en thunder cliente
    const result = await pool.query(
      'INSERT INTO public."Egresos_Pacientes"("ID_Paciente","Tipo_Egreso","Fecha_Egreso","Hora_Egreso","Nombre_Medico","ID_Ingreso") VALUES($1,$2,$3,$4,$5,$6) RETURNING *',
      [id_paciente, tipo_egreso,fecha_egreso,hora_egreso,nombre_medico,id_ingreso]
    );

    res.json(result);
  } catch (error) {
    //console.log(error.message);
    //qui me devuelve a l funcion un ogjeto json
    //res.json({ error: error.message });
    next(error)
  }
};

const EliminarEgreso = async (req, res,next) => {
  const { id_ingreso } = req.params;
  try {
    //console.log(nombre_paciente,dni_paciente) con esta mostraria en thunder cliente
    const result = await pool.query(
      'DELETE FROM public."Ingresos_Pacientes" WHERE "ID_Ingreso" = $1',
      [id_ingreso]
    );

    if (result.rowCount === 0) {
      res.status(404).json({
        massage: "Ingreso no Encontrado para Eliminar",
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

const ModificarEgreso = async (req, res,next) => {
    const { id_egreso } = req.params;
    const { tipo_egreso,fecha_egreso,hora_egreso,nombre_medico} = req.body; //que es lo que quiero modificar

    try {
      //console.log(nombre_paciente,dni_paciente) con esta mostraria en thunder cliente
      const result = await pool.query(
        'UPDATE public."Egresos_Pacientes" SET "Tipo_Egreso" = $1, "Fecha_Egreso" = $2,"Hora_Egreso" = $3,"Nombre_Medico" = $4 WHERE "ID_Egreso" = $5 RETURNING *',[
            tipo_egreso,
            fecha_egreso,
            hora_egreso,
            nombre_medico,
          
            id_egreso,
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
  ObtenerTodosEgresos,
  ObtenerEgreso,
  CrearEgreso,
  EliminarEgreso,
  ModificarEgreso,
};
