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

describe('Propadata start', () => {


    it('connect', (done) => {

        const db = new Propadata(internals.manifest);

        expect(db).to.exist();
        done();

        // db.connect('sofajs-couchdb1', (err, result) => {

        //     expect(err).to.equal(null);
        //     expect(result).to.be.an.object();
        //     done();
        // });
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
        }]
};
