'use strict';

const Hoek = require('hoek');

const internals = {};

exports = module.exports = internals.RethinkPlugin = function (propadata, propadataInternals) {

    // make this modular.
    // create the object. store requests in the object. The, save the object
    // and load the requests in the init function. That, is where we want to build the 
    // function with the connection provided. 

    this.propadata = propadata;
    this._requestRegistrations = internals._requestRegistrations = [];
    internals.propadataInternals = propadataInternals;
};

internals.RethinkPlugin.prototype.registerRethinkdbRequest = function (requestsArray) {

    console.log('     ##### composing requestsArray #####');

    // initialize plugin.

    this.propadata.rethinkdb[this.database][this.name] = {};

    console.log('       - pluginName: ' + this.name);
    console.log('       - connection: ' + this.connection);

    for (let i = 0; i < requestsArray.length; ++i) {

        // load request.
        // @todo load documentation here.

        console.log('         * ' + requestsArray[i].name);
        this.propadata.rethinkdb[this.database][this.name][requestsArray[i].name] = requestsArray[i].handler;

        // loadRequests.
        const plugin = Hoek.clone(requestsArray[i]);
        internals._requestRegistrations.push(plugin);

        // internals.loadRequest(requestsArray[i]);
    };

    // return this.propadata;
};

internals.RethinkPlugin.prototype.initRethinkdbRequest = function (requestsArray) {

    // initiate rethinkdb request with connection logic.

    console.log('     ##### initiatingRethinkdbRequests !!');

    // @todo initialize plugin.

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
