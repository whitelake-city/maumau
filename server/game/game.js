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
            if (result.ok) {
                this.subscribeToPlayerReady({ playerId, gameId: result.id })
                callback(result)
            } else {
                callback({ ok: false })
            }
        })
    }

    subscribeToPlayerReady({ playerId, gameId }) {
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