[![Stories in Ready](https://badge.waffle.io/aninhalacerda/women-contributing.png?label=ready&title=Ready)](https://waffle.io/aninhalacerda/women-contributing)
[![Build Status](https://snap-ci.com/aninhalacerda/women-contributing/branch/master/build_image)](https://snap-ci.com/aninhalacerda/women-contributing/branch/master)

Women Open Source Space
==================

Project to track information around women contributing to GitHub projects.

==================

* Install [Node](http://nodejs.org/)
* Install [MongoDB](http://www.mongodb.org/)
* Install [jasmine-node](https://www.npmjs.com/package/jasmine-node)

==================

#### Running Tests:

``mongod &``  
``make run-tests``  
``make run-coverage`` for running tests with coverage


#### Running Scripts to Populate Database:
*By default import_users script will import only 1k users from Github*

``mongod &``  
``make populate-db``  

#### Running the App:

``make run``

Access [http://localhost:3000](http://localhost:3000)


