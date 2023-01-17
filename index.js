const express = require('express');
const { dbConnection } = require('./database/config');
require('dotenv').config();
const env = process.env


//Creando el servidor de express
const app = express();

//Base de datos
dbConnection()

//Directorio publico
app.use(express.static('public'));

//Lectura y parseo del body
app.use(express.json())
//Rutas
app.use('/api/auth/', require('./routes/auth'))
//TODO auth // crear, login, renew
//TODO CRUD: Eventos



//Escuchar peticiones
app.listen(env.PORT, ()=>{
    console.log(`Servidor corriendo en el puerto ${env.PORT}`);
})