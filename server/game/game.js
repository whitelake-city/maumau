const deck = require('../deck/deck');

class Game {
    constructor(db, client) {
        this.db = db;
        this.client = client;
        this.deck = new deck()
    }

    start() {
        this.client.on('erstelleSpieler', ({ name }, callback) => {
            this.createPlayer({ name, callback })
        });
        this.client.on('sucheSpiel', ({ spielerId }, callback) => {
            this.searchGame({ playerId: spielerId, callback })
        });
        this.client.on('spielerIstBereit', ({ spielerId }) => {
            this.db.playerIsReady(spielerId)
        })
    }

    createPlayer({ name, callback }) {
        this.db.createPlayer(name, callback)
    }

    searchGame({ playerId, callback }) {
        this.db.getOrCreateGame(this.deck.createDeck, playerId, (result) => {
            if (result.ok === true) {
                this.subscribeToGameStarted({ playerId, gameId: result.id })
                callback(result)
            } else {
                this.err(result)
                callback({ ok: false })
            }
        })
    }

    subscribeToGameStarted({ playerId, gameId }) {
        this.db.subscribeToGameStarted(gameId, (state) => {
            if (state.ok) {
                this.db.getJoinedGame(playerId, gameId, (game)=>{
                    this.client.emit(`spielGestartet${playerId}`, game)
                })
            }
        })
    }

    err(err, details) {
        console.log(err, details)
    }
}

module.exports = Game;