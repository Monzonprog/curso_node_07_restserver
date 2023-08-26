const express = require('express');
var cors = require('cors');

class Server {
    constructor() {
        this.app = express();
        this.port = process.env.PORT;
        this.usuariosPatch = '/api/usuarios';

        //Middlewares
        this.middlewares();

        this.route();
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
        this.app.use(this.usuariosPatch, require('../routes/usuarios'));
    }

    listener() {
        this.app.listen(this.port, () => {
            console.log('Server running in port', this.port);
        });
    }
}

module.exports = Server;
