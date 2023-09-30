const express = require('express');
var cors = require('cors');
const { dbConnection } = require('../db/config');

class Server {
    constructor() {
        this.app = express();
        this.port = process.env.PORT;
        this.usuariosPatch = '/api/usuarios';
        this.authPath = '/api/auth'

        //Conectar a BD
        this.conectarDB()

        //Middlewares
        this.middlewares();

        this.route();
    }

    async conectarDB(){
        await dbConnection();
    }

    middlewares() {
        //CORS
        this.app.use(cors());
        //lectura y parseo de body
        this.app.use( express.json())
        //Directorio público
        this.app.use(express.static('public'));
    }

    route() {
        this.app.use(this.authPath, require('../routes/auth'));
        this.app.use(this.usuariosPatch, require('../routes/usuarios'));
    }

    listener() {
        this.app.listen(this.port, () => {
            console.log('Server running in port', this.port);
        });
    }
}

module.exports = Server;
