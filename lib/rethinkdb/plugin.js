'use strict';

const internals = {};

exports = module.exports = internals.RethinkPlugin = function (propadata, propadataInternals) {

    internals.propadata = propadata;
    internals.propadataInternals = propadataInternals;
};

internals.RethinkPlugin.prototype.registerRethinkdbRequest = function (requestsArray) {

    console.log('     registerRethinkdbRequest is executing!!!');
    // console.log('     requestsArray: ' + requestsArray.length);
    // console.log('     -------------------------');
    // console.log('     set plugin attributes.');

    // console.log('    ' + Object.keys(internals.propadata));
    //console.log('     ' + Object.keys(internals.propadata.rethinkdb));
    //console.log('     ' + Object.keys(internals.propadata.rethinkdb.rethinkdb2));
    // console.log('    ' + requestsArray[i].database);
    //console.log('     plugin name: ' + this.name);
    //console.log('     plugin database: ' + this.database);

    // build plugin object in appropriate database.

    console.log('                              ');
    console.log('     -------------------------');
    console.log('     propadata object work.');

    // initialize plugin.

    internals.propadata.rethinkdb[this.database][this.name] = {};
    //console.log('     ' + JSON.stringify(internals.propadata.rethinkdb[this.database]));
    //console.log('     ' + internals.propadata.rethinkdb[this.database][this.name]);

    for (let i = 0; i < requestsArray.length; ++i) {
    
        // load each request.

        // console.log('     ###### plugin work.');
        //console.log('    request: ' + JSON.stringify(requestsArray[i].handler()));
        internals.propadata.rethinkdb[this.database][this.name][requestsArray[i].name] = requestsArray[i].handler;
        // console.log('     functionName: ' + requestsArray[i].name);

        // load requests.
        internals.loadRequest(requestsArray[i]);
    };
};

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
