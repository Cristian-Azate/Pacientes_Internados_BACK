const { json } = require("express/lib/response");
const pool = require("../db");

//pool.query RETORNA PROMESA
const ObtenerTodosIngresos = async (req, res, next) => {
  try {
    //throw new Error('Algo fue mal') probar next
    //console.log(nombre_paciente,dni_paciente) con esta mostraria en thunder cliente
    const ingresos = await pool.query(
      'SELECT "Ingresos_Pacientes".*,"Pacientes".*,"Condicion_Paciente"."ID_Condicion","Egresos_Pacientes"."ID_Egreso"  FROM public."Ingresos_Pacientes" INNER JOIN public."Pacientes" ON "Pacientes"."ID_Paciente" = "Ingresos_Pacientes"."ID_Paciente" LEFT JOIN public."Condicion_Paciente" ON "Condicion_Paciente"."ID_Ingreso" = "Ingresos_Pacientes"."ID_Ingreso" LEFT JOIN public."Egresos_Pacientes" ON "Egresos_Pacientes"."ID_Ingreso" = "Ingresos_Pacientes"."ID_Ingreso" ORDER BY "Ingresos_Pacientes"."Fecha_Ingreso" ASC , "Ingresos_Pacientes"."Hora_Ingreso" ASC'
    );

    res.json(ingresos.rows);
  } catch (error) {
    //qui me devuelve a l funcion un objeto json
    //res.json({ error: error.message });
    //ejecuto la funcion next para devolver error
    next(error);
  }
};

const ObtenerIngreso = async (req, res, next) => {
  const { id_ingreso } = req.params;
  try {
    const result = await pool.query(
      'SELECT * FROM public."Ingresos_Pacientes" WHERE "ID_Ingreso"= $1',
      [id_ingreso]
    );

    if (result.rows.length === 0) {
      res.status(404).json({
        massage: "Ingreso no Encontrado",
      });
    } else {
      //solo puedo devolver 1  res.send("Paciente:", dni_paciente);
      res.json(result.rows[0]);
    }
  } catch (error) {
    //console.log(error.message);
    //qui me devuelve a la funcion un objeto json
    //res.json({ error: error.message });
    next(error);
  }
};

const CrearIngreso = async (req, res, next) => {
  //asegurar que llegaran los datos
  //body permite conocer la informacion que nos esta ennviando las aplicaciones cliente
  const {
    id_paciente,
    tipo_ingreso,
    fecha_ingreso,
    hora_ingreso,
    numero_ficha_internacion,
    unidad_internacion,
    numero_cama,
    nombre_medico,
  } = req.body;

  try {
    //console.log(nombre_paciente,dni_paciente) con esta mostraria en thunder cliente
    const result = await pool.query(
      'INSERT INTO public."Ingresos_Pacientes"("ID_Paciente","Tipo_Ingreso","Fecha_Ingreso","Hora_Ingreso","Numero_Ficha_Internacion","Unidad_Internacion","Numero_Cama","Nombre_Medico") VALUES($1,$2,$3,$4,$5,$6,$7,$8) RETURNING *',
      [
        id_paciente,
        tipo_ingreso,
        fecha_ingreso,
        hora_ingreso,
        numero_ficha_internacion,
        unidad_internacion,
        numero_cama,
        nombre_medico,
      ]
    );

    res.json(result);
  } catch (error) {
    //console.log(error.message);
    //qui me devuelve a l funcion un ogjeto json
    //res.json({ error: error.message });
    next(error);
  }
};

const EliminarIngreso = async (req, res, next) => {
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
    next(error);
  }
};

const ModificarIngreso = async (req, res, next) => {
  const { id_ingreso } = req.params;
  const {
    tipo_ingreso,
    fecha_ingreso,
    hora_ingreso,
    numero_ficha_internacion,
    unidad_internacion,
    numero_cama,
    nombre_medico,
  } = req.body; //que es lo que quiero modificar

  try {
    //console.log(nombre_paciente,dni_paciente) con esta mostraria en thunder cliente
    const result = await pool.query(
      'UPDATE public."Ingresos_Pacientes" SET "Tipo_Ingreso" = $1, "Fecha_Ingreso" = $2,"Hora_Ingreso" = $3,"Numero_Ficha_Internacion" = $4,"Unidad_Internacion" = $5,"Numero_Cama" = $6,"Nombre_Medico" = $7 WHERE "ID_Ingreso" = $8 RETURNING *',
      [
        tipo_ingreso,
        fecha_ingreso,
        hora_ingreso,
        numero_ficha_internacion,
        unidad_internacion,
        numero_cama,
        nombre_medico,
        id_ingreso,
      ]
    );

    if (result.rows.length === 0) {
      res.status(404).json({
        massage: "Paciente no Encontrado para Modificar",
      });
    } else {
      // SOLO PUEDEO DEVOLVER UNO res.send("Paciente Modificado");
      res.json(result.rows[0]);
    }
  } catch (error) {
    //qui me devuelve a l funcion un objeto json
    //res.json({ error: error.message });
    next(error);
  }
};

module.exports = {
  ObtenerTodosIngresos,
  ObtenerIngreso,
  CrearIngreso,
  EliminarIngreso,
  ModificarIngreso,
};
