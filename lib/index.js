'use strict';

const CouchdbLoader = require('./couchdb');
const internals = {};

exports = module.exports = internals.Propadata = function (manifest, composeOptions) {

    console.log('connections length: ' + manifest.connections.length);
    console.log('propadata started');

    // sample propadata object
    // propadata
    //   * object to be consumed by other applications.
    // propadataInternals
    //   * internal logic wich generates propdata object.
    //   * foundation will be in propadataInternals b/c it is internal.


    const propadataInternals = {
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

    CouchdbLoader.call(this, propadata, propadataInternals);
};
