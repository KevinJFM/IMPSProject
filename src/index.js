const express = require('express');

//Inicializamos
const app = express();

require('dotenv').config()

//Ajustes del servidor
app.set('port', process.env.PORT || 4000);

//Confuguracion de rutas
app.use(require('./routes')); //Node automaticamente busca ek index.js del modulo

//Iniciar el servidor
app.listen(app.get('port'), () => {
    console.log('Servidor iniciando en el puerto: ', app.get('port'));
});

