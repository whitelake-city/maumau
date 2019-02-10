const r = require('rethinkdb');

class Db {
    constructor() {
        this.connection = null
    }
    connect(callback) {
        let dbName = 'maumau'
        let tables = ['spieler', 'spiele', 'spieler_karten', 'stapel']
        r.connect({
            host: 'localhost',
            port: 28015,
        }).then((connection) => {
            this.connection = connection
            r.dbList().contains(dbName)
                .do((databaseExists) => {
                    return r.branch(
                        databaseExists,
                        { dbs_created: 0 },
                        r.dbCreate(dbName)
                    );
                }).run(connection);
            connection.use(dbName)


            r(tables)
                .difference(r.db(dbName).tableList())
                .forEach(table => r.db(dbName).tableCreate(table))
                .run(connection)

            callback(connection)
        }, (err) => {
            console.log('Unable to establish a connection to db', err)
        })
    }

    createPlayer(name, callback) {
        // r.table('spieler')
        //     .filter({ 'name': name })
        //     .run(this.connection)
        //     .then((cursor) => {
        //         cursor.next()
        //             .then((row) => {
        //                 callback({ 'ok': false, id: row.id, 'name': row.name })
        //             }, () => {
        //                 r.table('spieler')
        //                     .insert({
        //                         'name': name
        //                     })
        //                     .run(this.connection, (err, result) => {
        //                         callback({ ok: true, id: result.generated_keys[0], 'name': name })
        //                     })
        //             })
        //     })
        r.table('spieler')
            .insert({
                'name': name
            })
            .run(this.connection, (err, result) => {
                if (err) { callback({ ok: false }); this.err(err); return }
                callback({ ok: true, id: result.generated_keys[0], 'name': name })
            })
    }

    startGame(deck, playerId, callback) {
        r.branch(
            r.db('maumau')
                .table('spiele')
                .filter(
                    r.row('spieler').count().lt(4)
                        .and(
                            r.row('gestartet').eq(false)
                        ))
                .count().ne(0),
            r.db('maumau')
                .table('spiele')
                .filter(r.row('spieler').count().lt(4)
                    .and(
                        r.row('gestartet').eq(false)
                    ))
                .limit(1)
                .update({'spieler':r.row('spieler').append(playerId)}),
            r.db('maumau')
                .table('spiele')
                .insert({
                    "amZug": playerId,
                    "gestartet": false,
                    "spieler": [playerId]
                })
                .do((spiel) => {
                    return r.branch(
                        spiel('inserted').ne(0),
                        r.table('stapel')
                            .insert({ 'spiel': spiel('generated_keys')(0), ...deck }),
                        { ok: false }
                    )
                })
        ).run(this.connection, (err, result) => {
            if (err) { callback({ ok: false }); this.err(err); return }
            console.log(result)
            // callback({ ok: true, id: result.generated_keys[0] })
        })

    }

    err(err) {
        console.log(err)
    }
}

module.exports = Db;