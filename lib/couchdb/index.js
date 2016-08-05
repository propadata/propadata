'use strict';

// ./lib/couchdb/index.js
const Couchdb = require('./couchdb');

const internals = {};

exports = module.exports = internals.Couchdb = function (propadata, propadataInternals) {

    Couchdb.call(this, propadata, propadataInternals);
    console.log('loading propadata: ' + propadata.couchdb.dbname1.connection.dbname);
    console.log('loading propadataInternals: ' + propadataInternals.couchdb.foundation.core.docs.methods.method1.name);

};
