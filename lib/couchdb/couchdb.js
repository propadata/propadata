'use strict';

const internals = {};

exports = module.exports = internals.Couchdb = function (propadata, propadataInternals) {

    // proof of concept
    // context is same for all functions, plus, propadata & propadataInternals loadd
    // appropriately.

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

    console.log('yest or no: ' + create.moduleName3.attributes.name);
    propadata.couchdb.dbname1[create.moduleName3.attributes.name] = create.moduleName3;
    console.log('./lib/couchdb/couchdb loading propadata: ' + propadata.couchdb.dbname1.connection.dbname);
    console.log('./lib/couchdb/couchdb loading propadataInternals: ' + propadataInternals.couchdb.foundation.core.docs.methods.method1.name);
    console.log('yest or no: ' + propadata.couchdb.dbname1.moduleName3.attributes.name);

};
