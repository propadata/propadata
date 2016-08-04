'use strict';

let internals = {};

exports = module.exports = internals.Propadata = function (manifest, composeOptions) {

    console.log('connections length: ' + manifest.connections.length);
    console.log('propadata started');

    // sample propadata object

    let propadataBuild = {
        couchdb: {
            dbname1: {
                connection: {
                    dbname: '',
                    pw: '',
                    detailsHere: ''
                },
                moduleName1: { 
                    attributes: {
                        name: 'moduleName1'
                        description: 'module description'
                    },
                    design: {
                        views: [],
                        updates: []
                    },
                    requests: {
                        method1: function () {},
                        method2: function () {}
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
                        method2: function () {}
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
                        name: 'moduleName2'
                        description: 'module description'
                    },
                    design: {
                        views: [],
                        updates: []
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
                        method2: function () {}
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
            },
            foundation: {
                core: {
                    method1: function () {},
                    method2: function () {}
                    docs: {
                        attributes: {
                            name: 'moduleName'
                            description: 'module description'
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
                },
                base: {
                    method1: function () {},
                    method2: function () {}
                    docs: {
                        attributes: {
                            name: 'moduleName'
                            description: 'module description'
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
        mysql: {}
    };
};
