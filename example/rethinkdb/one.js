'use strict';

const Path = require('path');

exports.register = (plugin, options, next) => {

    console.log('     register.attributes *****: ' + this.register.attributes.database);

    plugin.registerRethinkdbRequest([
        {
            name: 'testOne',
            handler: function (param, callback) {

                console.log('testOne executed ' + param);
            }
        },
        {
            name: 'testTwo',
            handler: function () {

                console.log('testTwo executed');
            }
        }
    ]);

    return;
};

exports.register.attributes = {
    database: 'rethinkdb2', // database name plugin belongs to.
    name: 'One'
};
