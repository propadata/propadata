'use strict';

const R = require('rethinkdb');

const internals = {};

exports = module.exports = internals.Rethinkdb = function (propadata, propadataInternals) {

    this.composeRethinkdb = function (err, manifest, next) {

        if (err) {
            return next(err);
        }

        propadata.rethinkdb = {};

        for (let i = 0; i < manifest.connections.length; ++i) {

            let rethinkdbConnection = '';
            let connection = manifest.connections[i];

            if (connection.type === 'rethinkdb') {

                propadata.rethinkdb[connection.name] = {};
                propadata.rethinkdb[connection.name].connection = {};
                propadata.rethinkdb[connection.name].connection.dbname = connection.name;
                propadata.rethinkdb[connection.name].connection.pw = connection.pw;
                propadata.rethinkdb[connection.name].connection.host = connection.host;
                propadata.rethinkdb[connection.name].connection.port = connection.port;
                propadata.rethinkdb[connection.name].object = null;

                const connectIt = function (conn) {

                    this.dbname = conn.name;
                    this.pw = conn.pw;
                    this.host = conn.host;
                    this.port = conn.port;
                };

                connectIt.prototype.connect = function (callback) {

                    if (propadata.rethinkdb[connection.name].object) {

                        return callback(null, propadata.rethinkdb[connection.name].object)
                    }

                    R.connect( {
                        host: this.host,
                        port: this.port
                    }, (err, conn) => {

                        if (err) {
                            throw err;
                        }

                        rethinkdbConnection = conn;
                        propadata.rethinkdb[connection.name].object = rethinkdbConnection;
                        return callback(err, rethinkdbConnection);
                    });

                };

                const boom = new connectIt(connection).connect;
                propadata.rethinkdb[connection.name].connect = boom;
            }
        };

        return next(err, propadata);
    };

    return this;
};
