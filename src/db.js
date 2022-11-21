//pg modulo permite conectarme a postgres y realizar consultas
//pool permite crear conexion al crear recibe un objeto de configuracion
//dotenv para usar variables de entorno env
const {Pool} = require('pg');
const {db} = require('./config')

const pool = new Pool({
    user:db.user,
    host: db.host,
    database: db.database,
    password: db.password,
    port: db.port,
    ssl:{
        rejectUnauthorized:false,
    },
})
module.exports = pool;