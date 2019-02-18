const io = require('socket.io')(8000)
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
            io.on('connection', (client) => {
                let game = new Game(this.db,client,io)
                game.start()
            })
        })
    }
}

const server = new Server()
server.start()