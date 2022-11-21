const AWS  = require("aws-sdk");
const {BucketName,Endpoint} = require('../config')

//endpoint url direccion de digitalocean
const spacesEndpoint = new AWS.Endpoint(Endpoint)

//BIBLIOTECA DE S3 que es equivalente a DIGITALOCEAN SPACES
//que archivos estan en el bucket para consultar/ actualizar /eliminar
const s3 =new AWS.S3({
    endpoint:spacesEndpoint
});


//Rutas para operar imagenes
const SubirImagen = async (req,res) => {
    //a partir de fileupload propiedad me deja ver la informacion del archivo
    //file es el nombre al enviarlo
    const {file}= req.files;
    console.log(file)

    try{
        const uploadObject = await s3.putObject({
                ACL: 'public-read',   //colocarl el archivo como publico
                Bucket: BucketName,
                Body: file.data,
                Key: file.name
            }).promise(); //informacion del objeto que se ah subido o error

        //creamos nosotros la url
        urlImage = `https://${BucketName}.${Endpoint}/${file.name}`
        return res.json(urlImage)
        
     
        
    } catch(error)
    {
        //console.log(error);
        res.send(error)
    }

    //return res.json('received')
   
}

const EliminarImagen = async (req,res) => {
    //a partir de fileupload propiedad me deja ver la informacion del archivo
    //file es el nombre al enviarlo
    const { name_file } = req.params;

    try{
        const deleteObj= await s3.deleteObject({
                Bucket: BucketName,
                Key: name_file
            }).promise(); //informacion del objeto que se ah subido o error

        return res.json("Eliminado")
        
        //console.log(deleteObj) //etag id unico de la operacion
        
    } catch(error)
    {
        console.log(error);
        res.send(error)
    }

    //return res.json('received')
   
}


module.exports = {
    SubirImagen,
    EliminarImagen,
  };