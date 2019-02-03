const deck = require('../deck/deck')

class Game {
    constructor(db,client) {
        this.db = db
        this.client = client
        this.deck = new deck()
    }

    start() {
        this.client.on('erstelleSpieler', ({ name }, callback) => {
            this.createPlayer({ name, callback })
        })
        this.client.on('spielstarten', ({ playerId }) => {
            this.startGame(playerId)
        })
        console.log(this.deck.createDeck())
    }

    createPlayer({ name, callback }) {
        this.db.createPlayer(name, callback)
    }

    // startGame({playerId }) {
    //     r.table('spiele')
    //         .filter({ 'started': false })
    //         .run(this.connection)
    //         .then((cursor) => {
    //             cursor.each()
    //                 .then((row) => {
    //                     if (row.spieler.length < 4)
    //                         r.table('spiele').update({ 'spieler': [...row.spieler, playerId] })
    //                     callback({ 'ok': true, id: row.id })
    //                 }, () => {
    //                     r.table('spiele')
    //                         .insert({
    //                             'spieler': [playerId],
    //                             'started': false
    //                         })
    //                         .run(this.connection, (err, result) => {
    //                             callback({ ok: true, id: result.generated_keys[0] })
    //                         })
    //                 })
    //         })
    // }
}

module.exports = Game