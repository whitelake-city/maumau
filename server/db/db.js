const r = require('rethinkdb');

class Db {
    constructor() {
        this.connection = null
    }
    connect(callback) {
        let dbName = 'maumau';
        let tables = ['spieler', 'spiele', 'spieler_karten', 'stapel'];
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
                .difference(r.db(dbName).tableList())
                .forEach(table => r.db(dbName).tableCreate(table))
                .run(connection);

            r.db(dbName).table('spieler').indexCreate("spielId")

            callback(connection)
        }, (err) => {
            err.log('Unable to establish a connection to db', err)
        })
    }

    createPlayer(name, callback) {
        r.table('spieler')
            .insert({
                'name': name,
                'bereit': false
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
                        .insert({ 'spiel': spiel('generated_keys')(0), ...deck })
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
                    'mitspieler': r.table('spieler')
                        .filter((spieler) => {
                            return spieler('spielId').eq(spiel('id')).and(spieler('id').ne(playerId))
                        })
                        .pluck('name', 'bereit')
                        .coerceTo('array'),
                    'amZug': r.table('spieler').get(spiel('amZug')).getField('name')
                }
            })
            .run(this.connection, (err, joinedGame) => {
                if (err) { callback({ ok: false }); this.err(err); return }
                callback({ ok: true, ...joinedGame })
            })
    }

    playerIsReady(id) {
        r.table('spieler')
            .filter(r.row('id').eq(id))
            .update({ 'bereit': true })
            .run(this.connection, (err) => {
                if (err) { this.err(err); return }
            })
    }

    subscribeToGameStarted(gameId, callback) {
        r.table('spieler')
            .filter(r.row('spielId').eq(gameId))
            .changes()
            .run(this.connection, (err, cursor) => {
                if (err) { callback({ ok: false }); this.err(err); return }
                cursor.each((err, change) => {
                    if (change.new_val.bereit === true && change.old_val.bereit === false) {
                        r.table('spiele')
                            .filter((spiel) => {
                                return spiel('id').eq(gameId).and(spiel('spieler').count().gt(1))
                            })
                            .update({ 'gestartet': true })
                            .pluck('id')
                            .coerceTo('array')
                            .run(this.connection, (err, id) => {
                                if (err) { callback({ ok: false }); this.err(err); return }
                                callback({ ok: true })
                                cursor.close();
                            })
                    }
                })
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