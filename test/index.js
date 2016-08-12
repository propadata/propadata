'use strict';

const Hoek = require('hoek');
const Code = require('code');
const Lab = require('lab');
const Propadata = require('..');

const internals = {};

// Test shortcuts

const lab = exports.lab = Lab.script();
const describe = lab.describe;
const it = lab.it;
const expect = Code.expect;

describe('TEST Propadata start', () => {

    it('connect', (done) => {

        const db = new Propadata(internals.manifest);

        expect(db).to.exist();
        return done(db.destroy());

        // db.connect('sofajs-couchdb1', (err, result) => {

        //     expect(err).to.equal(null);
        //     expect(result).to.be.an.object();
        //     done();
        // });
    });
});

describe('rethinkdb basics', () => {

    //it('destroy', (done) => {

    //    const db = new Propadata(internals.manifest);

    //    db.destroy(null, (err, propadata) => {

    //        expect(propadata.rethinkdb).to.equal(null);
    //        return done();
    //    });

    //});

    //it('connect', (done) => {

    //    const db = new Propadata(internals.manifest);

    //    db.getPropadata((propadata) => {

    //        //console.log('test!!! ' + Object.keys(propadata.rethinkdb).length);
    //        const length = Object.keys(propadata.rethinkdb).length;
    //        expect(length).to.equal(2);

    //        return propadata.rethinkdb.rethinkdb1.connect((err, connection) => {

    //            //console.log('connection: ' + Object.keys(connection));
    //            //console.log('db: ' + connection.host);
    //            return done(db.destroy());
    //        });
    //    });

    //});

    it('register rethinkdb request plugin', (done) => {

        //console.log('composition options!!!!! ' + internals.manifest.compositionOptions.relativeTo);
        const db = new Propadata(internals.manifest);

        db.compose(internals.manifest, function () {

            console.log('#####');
            console.log('propadata object result');
            console.log(Object.keys(db.propadata.rethinkdb));
            console.log(Object.keys(db.propadata.rethinkdb.rethinkdb2.One));
            console.log(JSON.stringify(db.propadata.rethinkdb.rethinkdb2.One.testOne()));
            db.propadata.rethinkdb.rethinkdb2.One.testOne('param1');


            done();
        });
        //db.getPropadata((propadata) => {

        //    console.log('     watch*****');
        //    console.log('     ' + propadata.rethinkdb);
        //    console.log('     ' + JSON.stringify(propadata));
        //    return done();
        //});
    });
});

internals.manifest = {

    connections: [
        {
            name: 'couchdb1',
            type: 'couchdb',        // redis, couchdb, or ...
            host: 'http://localhost',
            port: 5984,
            user: 'waka',
            pw: 'wakatime',
            sessionLife: 600000,    // must match session length configs
                                    // in ./etc/couchdb/local.ini.
                                    // example in milliseconds, default is 10 mins 600000
            live: false             // do I need a live connection
        },
        {
            name: 'couchdb2',
            type: 'couchdb',        // redis, couchdb, or ....
            host: 'http://localhost',
            port: 5984,
            user: 'waka',
            pw: 'wakatime',
            sessionLife: 600000,  // must match session length configs
                                  // in ./etc/couchdb/local.ini.
                                  // example in milliseconds, default is 10 mins 600000
            live: false
        },
        {
            name: 'redis1',       // redis filler values
            type: 'redis',        // redis, couchdb, or ....
            host: 'http://localhost',
            port: 5984,
            user: 'waka',
            pw: 'wakatime',
            sessionLife: 600000,  // must match session length configs
                                  // in ./etc/couchdb/local.ini.
                                  // example in milliseconds, default is 10 mins 600000
            live: false
        },
        {
            name: 'rethinkdb1',       // redis filler values
            type: 'rethinkdb',        // redis, couchdb, or ....
            host: 'localhost',
            port: 28015,
            user: 'waka',
            pw: 'wakatime',
            live: false,
            registrations: []
        },
        {
            name: 'rethinkdb2',
            type: 'rethinkdb',
            host: 'localhost',
            port: 28015,
            user: 'waka',
            pw: 'wakatime',
            live: false,
            registrations: [
                {
                    plugin: '../example/rethinkdb/one.js'
                }
            ]
        }
    ],
    compositionOptions: {
        relativeTo: __dirname
    }
};
