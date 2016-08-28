'use strict';

const Async = require('async');
const CouchdbLoader = require('./couchdb');
const RethinkdbLoader = require('./rethinkdb');
const internals = {};
const propadataObject = {};

exports = module.exports = internals.Propadata = function (manifest, composeOptions) {

    console.log('connections length: ' + manifest.connections.length);
    console.log('propadata started');
    this.propadata = propadataObject;

    // sample propadata object
    // propadata
    //   * object to be consumed by other applications.
    // propadataInternals
    //   * internal logic wich generates propdata object.
    //   * foundation will be in propadataInternals b/c it is internal.

    const propadataInternals = {};
    /*
    const propadataInternals = {
        manifest: {},
        couchdb: {
            foundation: {
                core: {
                    method1: function () {},
                    method2: function () {},
                    docs: {
                        attributes: {
                            name: 'moduleName',
                            description: 'module description'
                        },
                        methods: {
                            method1: {
                                name: 'method1',
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
                },
                base: {
                    method1: function () {},
                    method2: function () {},
                    docs: {
                        attributes: {
                            name: 'moduleName',
                            description: 'couchdb connection methods.'
                        },
                        methods: {
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
            }
        },
        redis: {},
        mysql: {},
        docs: {  //!! this should allow for versioning.
            '0.0.1': {
                couchdb: {
                    methods: [
                        {
                            methodName: 'docs for internal object method',
                            location: 'file location',
                            signature: '(param1, param2)',
                            comment: 'stuff'
                        },
                        {
                            methodName: 'docs for internal object method',
                            location: 'file location',
                            signature: '(param1, param2)',
                            comment: 'stuff'
                        }
                    ],
                    foundation: { }

                },
                redis: {},
                mysql: {}
            },
            '0.0.2': {

            }
        }
    };

    const propadata = {
        couchdb: {
            dbname1: {
                connection: {
                    dbname: 'dbname1',
                    pw: 'password',
                    detailsHere: ''
                },
                session: {
                    sessionDate: false,
                    sessionId: '',
                    otherSessionDetails: ''
                },
                connect: function () {},
                moduleName1: {
                    attributes: {
                        name: 'moduleName1',
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
                    },
                    tools: {
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
                    },
                    fixtures: [
                        { doc1: '' },
                        { doc2: '' }
                    ]
                },
                moduleName2: {
                    attributes: {
                        name: 'moduleName2',
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
                    },
                    tools: {
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
                    },
                    fixtures: [
                        { doc1: '' },
                        { doc2: '' }
                    ]
                }
            }
        },
        redis: {},
        mysql: {}
    };
    */

    CouchdbLoader.call(this, propadataObject, propadataInternals);
    RethinkdbLoader.call(this, propadataObject, propadataInternals);

    // internals.Propadata.compose(manifest, internals.Propadata.start);
    // return this.compose(manifest, this.start);

    return this;

};

internals.Propadata.prototype.compose = function (manifest, next) {

    console.log('compose ran');

    internals.that = this;

    // load database configs.
    // [initializing, initialized, composing, composed]
    // [compose, initialize, initialized, composing, composed]
    // initialized: couchdb connection configured and ready for usage.
    // composed: couchdb modules loaded and ready for usage.

    let error = null;

    Async.series([
        (callback) => {

            internals.that.composeCouchdb(error, manifest, (err, propadata) => {

                propadataObject.couchdb = propadata.couchdb;

                console.log('');
                console.log('     completed couchdb composition: ' + Object.keys(propadata));
                console.log('     ####################################################');
                console.log('     ############### composed couchdb ###############');
                console.log('     ####################################################');
                console.log('');
                console.log('');
                return callback(null, 'couchdb');
            });
        },
        (callback) => {

            internals.that.composeRethinkdb(error, manifest, (err, propadata) => {

                propadataObject.rethinkdb = propadata.rethinkdb;

                console.log('');
                console.log('     completed rethinkdb composition: ' + Object.keys(propadata));
                console.log('     ####################################################');
                console.log('     ############### composed rethinkdb ################');
                console.log('     ####################################################');
                console.log('');
                console.log('');
                return  callback(null, 'rethinkdb');
            });
        }
    ], (err, results) => {

        console.log('');
        console.log('     completed composition logic: ' + results);
        console.log('     ####################################################');
        console.log('     ############### completed composition ##############');
        console.log('     ####################################################');
        console.log('');

        // return next(error);
        // return nextTickCallback(error);
        return internals.that.initiate(error, next);
    });

    // nextTickComposeCouchdb(error, manifest, (err, propadata) => {

    //     if (err) {
    //         error = err;
    //         return;
    //     }

    //     propadataObject.couchdb = propadata.couchdb;
    //     console.log('completed couchdb composition' + Object.keys(propadata));
    //     return;
    // });

    // nextTickComposeRethinkdb(error, manifest, (err, propadata) => {

    //     if (err) {
    //         error = err;
    //         return;
    //     }

    //     propadataObject.couchdb = propadata.rethinkdb;
    //     console.log('completed rethinkdb composition' + Object.keys(propadata.rethinkdb));
    //     return;
    // });

    // return nextTickCallback(error);
};


internals.Propadata.prototype.initiate = function (err, next) {

    if (err) {
        console.log('FAILED TO INIT THE DATABASES' + err);
        return next(err);
    }

    console.log('     INIT STARTING: ' + err);

    // initiate plugins
    // load connection object etc.

    let error = null;

    Async.series([
        (callback) => {

            internals.that.initCouchdb(error, propadataObject, (err, propadata) => {

                // propadataObject.couchdb = propadata.couchdb;
                // console.log('     completed couchdb initiation: ' + Object.keys(propadata));
                console.log('');
                console.log('     ####################################################');
                console.log('     ############### initiated couchdb ###############');
                console.log('     ####################################################');
                console.log('');
                console.log('');
                return callback(null, 'couchdb');
            });
        },
        (callback) => {

            internals.that.initRethinkdb(error, propadataObject, (err, propadata) => {

                // propadataObject.rethinkdb = propadata.rethinkdb;
                console.log('');
                // console.log('     completed rethinkdb initiation: ' + Object.keys(propadata));
                console.log('     ####################################################');
                console.log('     ############### initiated rethinkdb ################');
                console.log('     ####################################################');
                console.log('');
                console.log('');
                return  callback(null, 'rethinkdb');
            });
        }
    ], (err, results) => {

        console.log('');
        console.log('');
        console.log('     ####################################################');
        console.log('     ############### completed init asynch ##############');
        console.log('     ####################################################');
        console.log('');
        console.log('');

        return next(err, propadataObject);
    });
};

internals.Propadata.prototype.getPropadata = function (callback) {

    return callback(propadataObject);
};

internals.Propadata.prototype.destroy = function (err, next) {

    propadataObject.rethinkdb = null;
    propadataObject.couchdb = null;

    if (err) {
        return next(err, propadataObject);
    }

    if (next)  {

        return next(null, propadataObject);
    }

    return;
};
