const r = require('rethinkdb');

class Db {
    constructor() {
        this.connection = null
    }
    connect(callback) {
        let dbName = 'maumau'
        let tables = ['spieler', 'spiele','spieler_karten','stapel']
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
        r.table('spieler')
            .filter({ 'name': name })
            .run(this.connection)
            .then((cursor) => {
                cursor.next()
                    .then((row) => {
                        callback({ 'ok': false, id: row.id, 'name': row.name })
                    }, () => {
                        r.table('spieler')
                            .insert({
                                'name': name
                            })
                            .run(this.connection, (err, result) => {
                                callback({ ok: true, id: result.generated_keys[0], 'name': name })
                            })
                    })
            })
    }
}

module.exports = Db;