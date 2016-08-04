# propadata

A framework for developing project database(s) logic.
Group and store database logic in modules for easy consumption,  maintainence, and documentation.

### propadata for couchdb

* build request functions to make couchdb requests
* generate fixtures for tests
* generate design and update functions for couchdb
* create tools (helper functions) to be consumed by request functions.
* extensible -- plugin design allows code to be conveniently added.
* easy maintenance: modular design and documentation
  generation for all modules and functions makes code easier to maintain.
* documentation server: use gfm to write documentation for modules and functions.
  Generate HTML documentation for all modules and functions using propadocs server.
* foundation : the propadata couchdb object provides a group of functions named
  "foundation" for working with couchdb.

### License
BSD-3-Clause

### Credits
* projects module design and lifecyle are inspired by hapijs.
