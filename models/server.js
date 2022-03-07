const express = require('express')
const cors = require('cors')
const app = express()
// Express con clases 
class Server {
    constructor() {
        this.app = express();
        this.port = process.env.PORT
        this.usuersRoutePath = '/api/users'
        // Middlewares
        this.middlewares()
        // Rutas de mi aplicación 
        this.routes()
    }
    middlewares() {
        // CORS
        this.app.use(cors())
        // Lectura y parseo del body
        this.app.use(express.json())
        // Directprio publico
        this.app.use(express.static('public'))
    }
    routes() {
        this.app.use(this.usuersRoutePath, require('../routes/users'))
    }
    listen() {
        this.app.listen(this.port, () => {
            console.log('Servidor en el puerto', process.env.PORT)
        })
    }
}

module.exports = Server;