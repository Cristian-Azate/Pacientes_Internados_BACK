//Solo contener
//Valores que estere utilizando

const { config } = require("dotenv");// permite leer las variables de entorno
config();

//exporto el objeto db
module.exports = {
  db: {
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    database: process.env.DB_DATABASE,
  },
  BucketName: process.env.BUCKET_NAME || '',
  Endpoint: process.env.ENDPOINT || '',
};
