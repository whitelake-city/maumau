const io = require('socket.io')()
const Db = require('./db/db')
const Game = require('./game/game')

class Server {
    constructor() {
        this.db = null
        this.game = null
    }
    start() {
        this.db = new Db();
        this.game = new Game()
        this.db.connect(()=>{
            const port = 8000
            io.listen(port)
            console.log('listening on port ', port)
            io.on('connection', (client) => {
                let game = new Game(this.db,client)
                game.start()
            })
        })
    }
}

const server = new Server()
server.start()