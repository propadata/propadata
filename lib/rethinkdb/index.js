'use strict';

// ./lib/couchdb/index.js
const Rethinkdb = require('./rethinkdb');

const internals = {};

exports = module.exports = internals.Rethinkdb = function (propadata, propadataInternals) {

    Rethinkdb.call(this, propadata, propadataInternals);
    // console.log('loading propadata: ' + propadata.couchdb.dbname1.connection.dbname);
    // console.log('loading propadataInternals: ' + propadataInternals.couchdb.foundation.core.docs.methods.method1.name);
};
