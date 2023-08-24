const express = require('express');
var cors = require('cors')

class Server {
    constructor() {
        this.app = express();
        this.port = process.env.PORT;

        //Middlewares
        this.middlewares();

        this.route();
    }

    middlewares() {
        //CORS
        this.app.use(cors());
        //Directorio público
        this.app.use(express.static('public'));
    }

    route() {
        this.app.get('/api', (req, res) => {
            res.json({
                ok: true,
                msg: 'get API',
            });
        });

        this.app.put('/api', (req, res) => {
            res.json({
                ok: true,
                msg: 'put API',
            });
        });

        this.app.post('/api', (req, res) => {
            res.json({
                ok: true,
                msg: 'post API',
            });
        });

        this.app.delete('/api', (req, res) => {
            res.json({
                ok: true,
                msg: 'delete API',
            });
        });
    }

    listener() {
        this.app.listen(this.port, () => {
            console.log('Server running in port', this.port);
        });
    }
}

module.exports = Server;
