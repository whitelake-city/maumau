const Deck = require('../deck/deck')
const io = require('socket.io')()

class Game {
    constructor(db, client,io) {
        this.db = db;
        this.io = io
        this.client = client;
        this.deck = new Deck()
    }

    start() {
        this.client.on('erstelleSpieler', ({ name }, callback) => {
            this.createPlayer({ name, callback })
        });

        this.client.on('sucheSpiel', ({ spielerId }, callback) => {
            this.searchGame({ playerId: spielerId, callback })
        });

        this.client.on('spielerIstBereit', ({ spielerId }) => {
            this.db.playerIsReady(spielerId, (result) => {
                if (result.ok === true) {
                    this.db.getJoinedGame(spielerId, result.spielId, (joinedGame) => {
                        this.client.emit(`spielerBereit${result.spielId}`, joinedGame)
                    })
                }
            })
        });

        this.client.on('spieleKarte', ({ spielId, spielerId, position }) => {
            this.playCard({ gameId: spielId, playerId: spielerId, position: position });
        });

        this.client.on('zieheKarte', ({ spielId, spielerId }) => {
            this.db.drawCard(spielId, spielerId, 1, () => {
                this.nextPlayer(spielId, spielerId)
            });
        });

        this.client.on('spielStatusAktualisieren', ({ spielId, spielerId }) => {
            // this.subscribeToGameStatusUpdates({ gameId: spielId, playerId: spielerId })
        })
    }

    createPlayer({ name, callback }) {
        this.db.createPlayer(name, callback)
    }

    searchGame({ playerId, callback }) {
        this.db.getOrCreateGame(this.deck.createDeck.bind(this.deck), playerId, (result) => {
            if (result.ok === true) {
                this.subscribeToGameStarted({ playerId, gameId: result.id });
                callback(result)
            } else {
                this.err(result);
                callback({ ok: false })
            }
        })
    }

    subscribeToGameStarted({ playerId, gameId }) {
        this.db.subscribeToGameChanges(gameId, (state) => {
            if (state.ok === true) {
                if (state.gestartet === true) {
                    this.db.startGame(gameId);
                    this.db.getJoinedGame(playerId, gameId, (game) => {
                        this.client.emit(`spielGestartet${gameId}`, game);
                    })
                } else {
                    this.db.getJoinedGame(playerId, gameId, (game) => {
                        this.client.emit(`spielerBereit${gameId}`, game);
                    })
                }
            }
        })
    }

    nextPlayer(spielId, spielerId) {
        this.db.nextPlayer(spielId, spielerId, () => {
            this.db.getJoinedGame(spielerId, spielId, (game) => {
                console.log(spielId)
                this.io.sockets.emit(`spielStatusAktualisieren${spielId}`, game)
                io.sockets.emit(`spielStatusAktualisieren${spielId}`, game);
                this.io.emit(`spielStatusAktualisieren${spielId}`)
            });
        });
    }

    // subscribeToGameStatusUpdates({ playerId, gameId }) {
    //     console.log(`subscribed ${playerId} to game ${gameId}`);
    //     this.db.subscribeToGameChanges(gameId, (state) => {
    //         if (state.ok === true) {
    //             this.db.getJoinedGame(playerId, gameId, (game) => {
    //                 this.client.emit(`spielStatusAktualisieren${gameId}`, game);
    //             });
    //         }
    //     });
    // }

    playCard({ gameId, playerId, position }) {
        console.log(gameId + ' ' + playerId + ' ' + position)
        // TODO: play the card :)
    }

    err(err, details) {
        console.log(err, details)
    }
}

module.exports = Game;