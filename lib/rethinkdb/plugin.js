'use strict';

const internals = {};

exports = module.exports = internals.RethinkPlugin = function (propadata, propadataInternals) {

    internals.propadata = propadata;
    internals.propadataInternals = propadataInternals;
};

internals.RethinkPlugin.prototype.registerRethinkdbRequest = function (requestsArray) {

    console.log('     registerRethinkdbRequest is executing!!!');

    // initialize plugin.

    internals.propadata.rethinkdb[this.database][this.name] = {};

    for (let i = 0; i < requestsArray.length; ++i) {

        // load request.

        internals.propadata.rethinkdb[this.database][this.name][requestsArray[i].name] = requestsArray[i].handler;

        // loadRequests.

        // internals.loadRequest(requestsArray[i]);
    };
};

internals.RethinkPlugin.prototype.initRethinkdbRequest = function (requestsArray) {

    // initiate rethinkdb request with connection logic.
    //

    console.log('     registerRethinkdbRequest is executing!!!');

    // initialize plugin.

    console.log('     initRethinkdbRequest()!!!');
};

/*
internals.loadRequest = function (request) {

    console.log('--------');
    console.log('loadRequest work: ');
    console.log('propadata.rethinkdb.rethinkdb2: ' + Object.keys(internals.propadata.rethinkdb.rethinkdb2));
    console.log('propadata.rethinkdb.rethinkdb2.object: ' + JSON.stringify(internals.propadata.rethinkdb.rethinkdb2.object));
    console.log('request: ' + Object.keys(request));
    //return sofaInternals.connect(function (err) {
    //
    //});

    console.log(JSON.stringify(internals.propadata.rethinkdb.rethinkdb2.object));
    // internals.propadata.rethinkdb.rethinkdb2.object((err, connection ) => {
    //
    //     console.log('***super*** connection ' + connection );
    // });
};
*/
