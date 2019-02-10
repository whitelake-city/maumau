const deck = require('../deck/deck')

class Game {
    constructor(db, client) {
        this.db = db
        this.client = client
        this.deck = new deck()
    }

    start() {
        this.client.on('erstelleSpieler', ({ name }, callback) => {
            this.createPlayer({ name, callback })
        })
        this.client.on('spielStarten', ({ spielerId }, callback) => {
            this.startGame({ playerId: spielerId, callback })
        })
    }

    createPlayer({ name, callback }) {
        this.db.createPlayer(name, callback)
    }

    startGame({ playerId, callback }) {
        this.db.startGame(this.deck.createDeck(), playerId, (deckResult) => {
            if (deckResult.ok) {
                callback(deckResult)
            }

        })
        // r.table('spieler').group('spiel').count()
        // r.table('spiele')
        //     .filter({ 'started': false })
        //     .run(this.connection)
        //     .then((cursor) => {
        //         cursor.each()
        //             .then((row) => {
        //                 if (row.spieler.length < 4)
        //                     r.table('spiele').update({ 'spieler': [...row.spieler, playerId] })
        //                 callback({ 'ok': true, id: row.id })
        //             }, () => {
        //                 r.table('spiele')
        //                     .insert({
        //                         'spieler': [playerId],
        //                         'started': false
        //                     })
        //                     .run(this.connection, (err, result) => {
        //                         callback({ ok: true, id: result.generated_keys[0] })
        //                     })
        //             })
        //     })
    }
}

module.exports = Game