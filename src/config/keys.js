require('dotenv').config()

module.exports = {
    //Configurando objeto para inyecatarlo en le pool conexiones
    database: {
        host: process.env.HOST,
        user: process.env.USER,
        port: process.env.PORT_DATABASE,
        password: process.env.PASSWORD,
        database: process.env.DATABASE_NAME,
    }
}