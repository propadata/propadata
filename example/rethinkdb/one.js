'use strict';

// const Path = require('path');

exports.register = (plugin, options, next) => {

    console.log('     register.attributes *****: ' + this.register.attributes.database);

    plugin.registerRethinkdbRequest([
        {
            name: 'testOne',
            handler: function (param, callback) {

                console.log('testOne executed: ' + param);
                return param;
            }
        },
        {
            name: 'testTwo',
            handler: function (param, callback) {

                console.log('testTwo executed: ' + param);
                return param;
            }
        }
    ]);

    return;
};

exports.register.attributes = {
    database: 'rethinkdb2', // database name plugin belongs to.
    name: 'One'
};
