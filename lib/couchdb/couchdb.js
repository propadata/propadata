'use strict';

const internals = {};

exports = module.exports = internals.Couchdb = function (propadata, propadataInternals) {

    // proof of concept
    // context is same for all functions, plus, propadata & propadataInternals loadd
    // appropriately.

    /*
    const create = {
        moduleName3: {
            attributes: {
                name: 'moduleName3',
                description: 'module description'
            },
            design: {
                views: [],
                updates: [],
                filters: []
            },
            requests: {
                method1: function () {},
                method2: function () {},
                docs: {
                    method1: {
                        name: '',
                        signature: '',
                        comment: ''
                    },
                    method2: {
                        name: '',
                        signature: '',
                        comment: ''
                    }
                }
            }
        }
    };
    */

    // console.log('yest or no: ' + create.moduleName3.attributes.name);
    // propadata.couchdb.dbname1[create.moduleName3.attributes.name] = create.moduleName3;
    // console.log('./lib/couchdb/couchdb loading propadata: ' + propadata.couchdb.dbname1.connection.dbname);
    // console.log('./lib/couchdb/couchdb loading propadataInternals: ' + propadataInternals.couchdb.foundation.core.docs.methods.method1.name);
    // console.log('yest or no: ' + propadata.couchdb.dbname1.moduleName3.attributes.name);


    // 1. load database configurations.

    // 2. load foundation functions for couchdb database.

    // 2.5 load module. module_name etc.

    // 3. load design(s) documents for module.

    // 4. load request(s) for module.

    // 5. load tool(s) for module.

    // 6. load fixtures for module.

    this.composeCouchdb = function (err, manifest, next) {

        if (err) {
            return next(err);
        }

        // console.log('compose couchdb here!!');
        // console.log('couchdb connections count: ' + manifest.connections.length);
        // manifest.connections is an array: [] of connection objects.
        // check for couchdb connection objects.j
        console.log('----------------' + Object.keys(manifest.connections));

        // compose propadata.couchdb object.

        propadata.couchdb = {};

        for (let i = 0; i < manifest.connections.length; ++i) {

            const connection = manifest.connections[i];

            if (connection.type === 'couchdb') {

                // validate couchdb connection credentials.

                let invalid = null;

                // connection validation logic here.

                if (invalid) {
                    return next(err);
                }

                console.log('------');
                console.log('processing couchdb connection: ' + connection.name);
                propadata.couchdb[connection.name] = {};
                propadata.couchdb[connection.name].connection = {};
                propadata.couchdb[connection.name].connection.dbname = connection.name;
                propadata.couchdb[connection.name].connection.pw = connection.pw;
                propadata.couchdb[connection.name].connection.host = connection.host;
                propadata.couchdb[connection.name].connection.port = connection.port;
                propadata.couchdb[connection.name].connection.user = connection.user;
                propadata.couchdb[connection.name].connection.sessionLife = connection.sessionLife;
                propadata.couchdb[connection.name].connection.live = connection.live;
            }
        };

        return next(err, propadata);
    };

    this.initCouchdb = function (err, manifest, next) {

        console.log('    initiated couchdb!!!!!');
        return next(err, propadata);
    };

    return this;
};
