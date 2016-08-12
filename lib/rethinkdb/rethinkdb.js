'use strict';

const R = require('rethinkdb');
const Plugin = require('./plugin.js');
const Hoek = require('hoek');

const internals = {};

exports = module.exports = internals.Rethinkdb = function (propadata, propadataInternals) {

    // Plugin.call(this, propadata, propadataInternals);

    Plugin.call(this, propadata, propadataInternals);


    this.composeRethinkdb = function (err, manifest, next) {

        if (err) {
            return next(err);
        }

        internals.rethinkdbPlugin = new Plugin(propadata, propadataInternals);
        propadata.rethinkdb = {};
        console.log('set propadata.rethinkdb');

        for (let i = 0; i < manifest.connections.length; ++i) {

            let rethinkdbConnection = '';
            const connection = manifest.connections[i];

            if (connection.type === 'rethinkdb') {

                propadata.rethinkdb[connection.name] = {};
                propadata.rethinkdb[connection.name].connection = {};
                propadata.rethinkdb[connection.name].connection.dbname = connection.name;
                propadata.rethinkdb[connection.name].connection.pw = connection.pw;
                propadata.rethinkdb[connection.name].connection.host = connection.host;
                propadata.rethinkdb[connection.name].connection.port = connection.port;
                propadata.rethinkdb[connection.name].connection.type = connection.type;
                propadata.rethinkdb[connection.name].object = null;

                const connectIt = function (conn) {

                    this.dbname = conn.name;
                    this.pw = conn.pw;
                    this.host = conn.host;
                    this.port = conn.port;
                };

                connectIt.prototype.connect = function (callback) {

                    if (propadata.rethinkdb[connection.name].object) {

                        return callback(null, propadata.rethinkdb[connection.name].object);
                    }

                    R.connect( {
                        host: this.host,
                        port: this.port
                    }, (err, conn) => {

                        if (err) {
                            throw err;
                        }

                        console.log();
                        rethinkdbConnection = conn;
                        propadata.rethinkdb[connection.name].object = rethinkdbConnection;

                        // load plugins

                        // internals.Rethinkdb.loadPlugins(manifest.connections[i]);
                        // internals.loadPlugins    manifest.connections[i]
                        return callback(err, rethinkdbConnection);
                    });
                };

                internals.Rethinkdb.registerPlugins(manifest, manifest.connections[i]);

                const boom = new connectIt(connection).connect;
                propadata.rethinkdb[connection.name].connect = boom;

            }
        };

        return next(err, propadata);
    };

    this.initRethinkdb = function (err, manifest, next) {

        console.log('    initiated rethinkdb!!!!!');
        return next(err, propadata);
    };

    return this;
};


internals.Rethinkdb.registerPlugins = function (manifest, connection) {

    for (let i = 0; i < connection.registrations.length; ++i) {

        const plugin = require(manifest.compositionOptions.relativeTo + '/' +  connection.registrations[i].plugin);

        internals.rethinkdbPlugin.name = plugin.register.attributes.name;
        internals.rethinkdbPlugin.database = plugin.register.attributes.database;
        plugin.register(internals.rethinkdbPlugin, 'test');
    };
};


