'use strict';

const R = require('rethinkdb');
const Plugin = require('./plugin.js');
const Hoek = require('hoek');

const internals = {};

exports = module.exports = internals.Rethinkdb = function (propadata, propadataInternals) {

    // Plugin.call(this, propadata, propadataInternals);

    internals._registrations = [];

    this.composeRethinkdb = function (err, manifest, next) {

        if (err) {
            return next(err);
        }

        propadata.rethinkdb = {};

        for (let i = 0; i < manifest.connections.length; ++i) {

            let rethinkdbConnection = '';
            const connection = manifest.connections[i];

            if (connection.type === 'rethinkdb') {

                console.log('     ****** connection.name ' + connection.name);
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


                const boom = new connectIt(connection).connect;

                console.log('     ****** connection.name 2 ' + connection.name);
                propadata.rethinkdb[connection.name].connect = boom;

                internals.Rethinkdb.registerPlugins(propadata, manifest, manifest.connections[i]);

            }
        };

        return next(err, propadata);
    };

    this.initRethinkdb = function (err, manifest, next) {

        console.log();
        console.log('     initiated rethinkdb!!!!!');
        console.log('object keys: ' + Object.keys(propadata));

        console.log();
        console.log('     ##### initRethinkdb');
        console.log('     propadata.rethinkdb ' + Object.keys(propadata.rethinkdb));
        console.log('     propadata.rethinkdb length ' + Object.keys(propadata.rethinkdb).length);
        console.log('     propadata.rethinkdb.rethinkdbOne ' + Object.keys(propadata.rethinkdb.rethinkdbOne));
        console.log('     propadata.rethinkdb.rethinkdbOne length ' + Object.keys(propadata.rethinkdb.rethinkdbOne).length);
        console.log('     propadata.rethinkdb.rethinkdbOne keys ' + Object.keys(propadata.rethinkdb.rethinkdbOne));
        console.log('     propadata.rethinkdb.rethinkdbOne object ' + propadata.rethinkdb.rethinkdbOne.object);
        console.log('     propadata.rethinkdb.rethinkdb2 ' + Object.keys(propadata.rethinkdb.rethinkdb2));
        console.log('     propadata.rethinkdb.rethinkdb2 length ' + Object.keys(propadata.rethinkdb.rethinkdb2).length);
        console.log('     propadata.rethinkdb.rethinkdb2 keys ' + Object.keys(propadata.rethinkdb.rethinkdb2));
        console.log('     propadata.rethinkdb.rethinkdb2 One functions ' + Object.keys(propadata.rethinkdb.rethinkdb2.One));
        console.log('     propadata.rethinkdb.rethinkdb2 object ' + propadata.rethinkdb.rethinkdb2.object);
        // console.log('propadata.rethinkdb.rethinkdb2 connect ' + propadata.rethinkdb.rethinkdb2.connect);

        propadata.rethinkdb.rethinkdb2.One.testOne('testing this', (err, result) => {
            console.log('     hi there');
        });

        console.log();
        console.log('     ##### registrations (init phase)');
        console.log('     _registrations.length ' + internals._registrations.length);
        console.log('     _registrations[0].name ' + internals._registrations[0].name);
        console.log('     _registrations[0].database ' + internals._registrations[0].database);
        console.log('     _registrations[0]._requestRegistrations keys' + Object.keys(internals._registrations[0]));
        console.log('     _registrations[0]._requestRegistrations.length ' + internals._registrations[0]._requestRegistrations.length);
        console.log('     _registrations[0]._requestRegistrations[0] ' + internals._registrations[0]._requestRegistrations[0].name);
        console.log('     _registrations[0]._requestRegistrations[1] ' + internals._registrations[0]._requestRegistrations[1].name);

        // console.log('     _requestRegistrations.connection ' + internals._registrations[0].connection);
        // propadata.rethinkdb.rethinkdb2.One.testOne('testing this', () => {
        // for (let i = 0; i < Object.keys(propadata.rethinkdb).length; ++i) {

        //     console.log(i);
        // }

        return next(err, propadata);
    };

    return this;
};

internals.Rethinkdb.registerPlugins = function (propadata, manifest, connection) {

    // registerPlugins executed in compose phase. When a plugin is registered
    // the following properties are set:
    // rethinkdbPlugin.name         -- the name of the plugin.
    // rethinkdbPlugin.database     -- the name of the database the plugin belongs to. 
    // rethinkdbPlugin.connection   -- rethinkdb connection object to be provisioned to each request. 

    for (let i = 0; i < connection.registrations.length; ++i) {

        const plugin = require(manifest.compositionOptions.relativeTo + '/' +  connection.registrations[i].plugin);

        internals.rethinkdbPlugin = new Plugin(propadata, 'propadataInternals');
        internals.rethinkdbPlugin.name = plugin.register.attributes.name;
        internals.rethinkdbPlugin.database = plugin.register.attributes.database;
        internals.rethinkdbPlugin.connection = propadata.rethinkdb[connection.name].connect;

        // validate database and plugin.

        plugin.register(internals.rethinkdbPlugin, 'test options', propadata);
        console.log('     ##### push count');
        internals._registrations.push(internals.rethinkdbPlugin);
    };
};
