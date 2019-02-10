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
        this.client.on('spielStarten', ({ spielerId }, callback) => {
            this.startGame({ playerId: spielerId, callback })
        });
        this.client.on('ladeLobby', ({ spielerId }, callback) => {
            this.loadLobby({ playerId: spielerId, callback })
        });
    }

    createPlayer({ name, callback }) {
        this.db.createPlayer(name, callback)
    }

    startGame({ playerId, callback }) {
        this.db.startGame(this.deck.createDeck(), playerId, (result) => {
            if (result.ok) {
                this.subscribeToPlayerReady({ playerId, gameId: result.id })
                callback(result)
            } else {
                callback({ ok: false })
            }
        })
    }

    subscribeToPlayerReady({ playerId, gameId }) {
        this.client.on(`bereit${playerId}`, () => {
            this.db.playerIsReady(playerId)
            // this.db.givePlayerCards({ playerId, gameId, number:4 }, (result) => {
            //     if (result.ok) {
            //         this.client.emit(`neueKarten`, result)
            //     }
            //     else {
            //         err("Could not hand out cards", result)
            //     }
            // })
        })
        // this.db.onAllPlayersReady(gameId, () => {
        //     this.client.emit(`spielGestartet${gameId}`)
        //     this.db.getCardFromDeck(gameId, (result) => {
        //         if (result.ok) {

        //         }
        //     })
        // })
    }

    err(err, details) {
        console.log(err, details)
    }

    loadLobby({ playerId, callback }) {
        this.db.loadPlayer(playerId, (player) => {
            console.log(player);
            callback(
                [
                    {
                        id: player.id,
                        name: player.name,
                        status: 'warten'
                    },
                    {
                        id: 'a',
                        name: 'horst',
                        status: 'bereit'
                    },
                    {
                        id: 'b',
                        name: 'gerda',
                        status: 'bereit'
                    },
                    {
                        id: 'c',
                        name: 'peter',
                        status: 'bereit'
                    }
                ]
            )
        })
    }
}

module.exports = Game;