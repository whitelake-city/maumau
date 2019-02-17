const r = require('rethinkdb');

class Db {
    constructor() {
        this.connection = null
    }
    connect(callback) {
        let dbName = 'maumau';
        let tables = ['spieler', 'spiele', 'stapel', 'gelegt'];
        r.connect({
            host: 'localhost',
            port: 28015,
        }).then((connection) => {
            this.connection = connection;
            r.dbList().contains(dbName)
                .do((databaseExists) => {
                    return r.branch(
                        databaseExists,
                        { dbs_created: 0 },
                        r.dbCreate(dbName)
                    );
                }).run(connection);
            connection.use(dbName);


            r(tables)
                .difference(r.tableList())
                .forEach(table => r.tableCreate(table))
                .run(connection);

            r(['spielId'])
                .difference(r.table('spieler').indexList())
                .forEach(index => r.table('spieler').indexCreate(index))
                .run(connection)
            r(['spielId'])
                .difference(r.table('stapel').indexList())
                .forEach(index => r.table('stapel').indexCreate(index))
                .run(connection)
            r(['spielId'])
                .difference(r.table('gelegt').indexList())
                .forEach(index => r.table('gelegt').indexCreate(index))
                .run(connection)
            callback(connection)
        }, (err) => {
            err.log('Unable to establish a connection to db', err)
        })
    }

    createPlayer(name, callback) {
        r.table('spieler')
            .insert({
                'name': name,
                'bereit': false,
                'karten': []
            })
            .run(this.connection, (err, result) => {
                if (err) { callback({ ok: false }); this.err(err); return }
                callback({ ok: true, id: result.generated_keys[0], 'name': name })
            })
    }

    /**
     * Adds the player to a new game or to an existing game
     */
    getOrCreateGame(getDeckFunction, playerId, callback) {
        r.table('spiele')
            .filter((row) => {
                return row('spieler').contains(playerId)
            })
            .limit(1)
            .coerceTo('array')
            .run(this.connection, (err, spiele) => {
                if (err) { callback({ ok: false }); this.err(err); return }

                if (spiele.length > 0) {
                    this.getJoinedGame(playerId, spiele[0].id, callback)
                } else {
                    r.branch(
                        this.existsGameToJoin(),
                        this.addPlayerToExistingGame(playerId),
                        this.createNewGame(getDeckFunction, playerId)
                    ).run(this.connection, (err, result) => {
                        if (err) { callback({ ok: false }); this.err(err); return }
                        this.getJoinedGame(playerId, result.id, callback)
                    })
                }
            })
    }

    /**
     * @returns true if is there is a game with less than 4 players
     */
    existsGameToJoin() {
        return r.table('spiele')
            .filter(
                r.row('spieler').count().lt(4)
                    .and(
                        r.row('gestartet').eq(false)
                    ))
            .count().ne(0)
    }

    /**
     * add the player to the game, and vice versa
     */
    addPlayerToExistingGame(playerId) {
        return r.table('spiele')
            .filter(r.row('spieler').count().lt(4)
                .and(
                    r.row('gestartet').eq(false)
                ))
            .limit(1)
            .update({ 'spieler': r.row('spieler').append(playerId) },
                { returnChanges: true }
            ).do((spieleUpdate) => {
                return r.branch(
                    spieleUpdate('replaced').ne(0),
                    r.table('spieler')
                        .filter({ 'id': playerId })
                        .update({ spielId: spieleUpdate('changes')(0)('new_val')('id') })
                        .do(() => {
                            return { ok: true, id: spieleUpdate('changes')(0)('new_val')('id') }
                        }),
                    { ok: false }
                )
            })
    }

    /** 
     * create a new game
     */
    createNewGame(deck, playerId) {
        let createdDeck = deck()
        let initialCard = createdDeck.pop()
        return r.table('spiele')
            .insert({
                "amZug": playerId,
                "gestartet": false,
                "spieler": [playerId]
            })
            .do((spiel) => {
                return r.branch(
                    spiel('inserted').ne(0),
                    r.table('stapel')
                        .insert({ 'spielId': spiel('generated_keys')(0), karten: createdDeck })
                        .do(() => {
                            return r.table('gelegt')
                                .insert({
                                    'spielId': spiel('generated_keys')(0),
                                    'karten': [initialCard]
                                })
                                .do(() => {
                                    return { ok: true }
                                })
                        })
                        .do(() => {
                            return r.table('spieler')
                                .filter({ 'id': playerId })
                                .update({ spielId: spiel('generated_keys')(0) })
                                .do(() => {
                                    return { ok: true, id: spiel('generated_keys')(0) }
                                })
                        }),
                    { ok: false }
                )
            })
    }

    /** 
     * Returns the current game state 
     */
    getJoinedGame(playerId, gameId, callback) {
        r.table('spiele')
            .get(gameId)
            .merge((spiel) => {
                return {
                    'spieler': r.table('spieler').get(playerId),
                    'gelegt': r.table('gelegt')
                        .getAll(spiel('id'), { index: 'spielId' })
                        .map((gelegt) => {
                            return { 'wert':gelegt('karten').nth(0)('wert'),'art':gelegt('karten').nth(0)('art') }
                        })
                        .coerceTo('array')
                        .nth(0),
                    'mitspieler': r.table('spieler')
                        .filter((spieler) => {
                            return spieler('spielId').eq(spiel('id')).and(spieler('id').ne(playerId))
                        })
                        .map((spieler) => {
                            return spieler.merge({ 'karten': spieler('karten').count() })
                        })
                        .pluck('name', 'bereit', 'karten')
                        .coerceTo('array'),
                    'amZug': r.table('spieler').get(spiel('amZug')).getField('name')
                }
            })
            .run(this.connection, (err, joinedGame) => {
                if (err) { callback({ ok: false }); this.err(err); return }
                callback({ ok: true, ...joinedGame })
            })
    }

    playerIsReady(id, callback) {
        let numCards = 6
        r.table('spieler')
            .get(id)
            .update(
                {
                    'karten': r.table('stapel')
                        .getAll(r.row('spielId'), { index: 'spielId' })
                        .map((stapel) => {
                            return stapel('karten').slice(0, numCards)
                        }).nth(0),
                    'bereit': true
                }, { nonAtomic: true, returnChanges: true }
            )
            .run(this.connection, (err, changes) => {
                if (err) { this.err(err); return }
                r.table('stapel')
                    .getAll(changes.changes[0].new_val.spielId, { index: 'spielId' })
                    .update({
                        'karten': r.row('karten').slice(numCards)
                    })
                    .run(this.connection, (err) => {
                        if (err) { this.err(err); return }
                        if (changes.unchanged === 1) {
                            callback({ ok: false })
                        } else {
                            callback({ ok: true, spielId: changes.changes[0].new_val.spielId })
                        }
                    })
            })
    }

    subscribeToGameChanges(gameId, callback) {
        r.table('spieler')
            .filter(r.row('spielId').eq(gameId))
            .changes()
            .run(this.connection, (err, cursor) => {
                if (err) { callback({ ok: false }); this.err(err); return }
                cursor.each((err, change) => {
                    if (change.new_val && change.new_val.bereit === true && change.old_val.bereit === false) {
                        r.branch(
                            r.table('spieler')
                                .filter(
                                    r.row('spielId').eq(gameId).and(r.row('bereit').eq(false))
                                ).count().eq(0),
                            r.table('spieler')
                                .filter(
                                    r.row('spielId').eq(gameId)
                                ).count().gt(1),
                            false
                        ).run(this.connection, (err, result) => {
                            if (err) { callback({ ok: false }); this.err(err); return }
                            if (result) cursor.close()
                            callback({ ok: true, gestartet: result })
                        })
                        return
                    }
                    return callback({ ok: true, gestartet: false })
                })
            })
    }

    givePlayerCards(gameId, spielerId, numberOfCards) {
        r.table('spieler')
            .get(spielerId)
            .update(
                {
                    'karten': r.table('stapel')
                        .getAll(gameId, { index: 'spielId' })
                        .map((stapel) => {
                            return stapel('karten').slice(0, numberOfCards)
                        }).nth(0)
                }, { nonAtomic: true }
            )
            .run(this.connection, (err) => {
                if (err) { this.err(err); return }
                r.table('stapel')
                    .getAll(gameId, { index: 'spielId' })
                    .update({
                        'karten': r.row('karten').slice(numberOfCards)
                    }, { returnChanges: true })
                    .run(this.connection, (err) => {
                        if (err) { this.err(err); return }
                    })
            })
    }

    startGame(gameId) {
        r.table('spiele')
            .filter(r.row('id').eq(gameId))
            .update({ 'gestartet': true })
            .run(this.connection, (err) => {
                if (err) { this.err(err); return }
            })
    }

    err(err) {
        console.log(err)
    }

    loadPlayer(playerId, callback) {
        r.table('spieler').get(playerId).run(this.connection, (err, result) => callback(result));
    }
}

module.exports = Db;