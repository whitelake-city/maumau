const socketIO = require('socket.io')
const Db = require('./db/db')
const Game = require('./game/game')
const Koa = require('koa')
const http = require('http')
const serve = require('koa-static');

class Server {
    constructor() {
        this.db = null
        this.game = null
    }
    start() {
        this.db = new Db();
        this.game = new Game()

        // create Koa app instance
        this.app = new Koa();
        this.app.use(serve('./public/'));

        // manually create http server and override app.listen
        // so we can start both servers together
        this.app.server = http.createServer(this.app.callback()).listen(8000);
        this.app.listen = (...args) => {
            this.app.server.listen.call(this.app.server, ...args);
            return this.app.server;
        };

        // create Socket.io app instance
        this.app.io = socketIO(this.app.server, {});

        

        this.db.connect(() => {
            this.app.io.on('connection', (client) => {
                let game = new Game(this.db, client, this.app.io)
                game.start()
            })
        })
    }
}

const server = new Server()
server.start({ port: 3000 })