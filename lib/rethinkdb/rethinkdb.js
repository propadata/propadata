'use strict';

const R = require('rethinkdb');
const Plugin = require('./plugin.js');

const internals = {};

exports = module.exports = internals.Rethinkdb = function (propadata, propadataInternals) {

    // Plugin.call(this, propadata, propadataInternals);


    this.composeRethinkdb = function (err, manifest, next) {

        if (err) {
            return next(err);
        }

        internals.rethinkdbPlugin = new Plugin(propadata, propadataInternals);
        propadata.rethinkdb = {};

        for (let i = 0; i < manifest.connections.length; ++i) {

            let rethinkdbConnection = '';
            let connection = manifest.connections[i];

            if (connection.type === 'rethinkdb') {


                // @todo fix order of execution logic.
                // connection must be built beore loading plugins.

                console.log('--------------------');
                console.log('loading connection: ' + connection.name);
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

                        return callback(null, propadata.rethinkdb[connection.name].object)
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
                        return callback(err, rethinkdbConnection);
                    });
                };

                // load plugins

                console.log('registrations: ' + connection.registrations.length);

                for (let i = 0; i < connection.registrations.length; ++i) {
                
                    console.log('     register this: ' + JSON.stringify(connection.registrations[i].plugin));

                    const plugin = require(manifest.compositionOptions.relativeTo + '/' +  connection.registrations[i].plugin);

                    console.log('     attributes: ' + JSON.stringify(plugin.register.attributes));
                    internals.rethinkdbPlugin.name = plugin.register.attributes.name;
                    internals.rethinkdbPlugin.database = plugin.register.attributes.database;
                    plugin.register(internals.rethinkdbPlugin, 'test'); 
                };

                console.log('');
                console.log('-------------');
                console.log('completion done');
                const boom = new connectIt(connection).connect;
                propadata.rethinkdb[connection.name].connect = boom;

            }
        };

        return next(err, propadata);
    };

    return this;
};
