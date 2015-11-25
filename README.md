[![Stories in Ready](https://badge.waffle.io/aninhalacerda/women-contributing.png?label=ready&title=Ready)](https://waffle.io/aninhalacerda/women-contributing)
[![Build Status](https://snap-ci.com/aninhalacerda/women-contributing/branch/master/build_image)](https://snap-ci.com/aninhalacerda/women-contributing/branch/master)
[![Coverage Status](https://coveralls.io/repos/aninhalacerda/women-contributing/badge.svg?branch=master&service=github)](https://coveralls.io/github/aninhalacerda/women-contributing?branch=master)

Women Open Source Space
==================

Project to track information around women contributing to GitHub projects.

==================

* Install [Node](http://nodejs.org/)
* Install [MongoDB](http://www.mongodb.org/)
 
##### Set up:

``$ git clone https://github.com/aninhalacerda/women-contributing.git``  
``$ cd women-contributing``  
``$ npm install``  
``$ mongod&``  

==================

#### Running Tests:

``make run-tests``  
``make run-coverage`` for running tests with coverage

#### Running Scripts on Database:
## PopulatingDB:
*By default import_users script will import only 1k users from Github*
  
``make populate-db``

## Adding gender data:

``make genderize``

## Cleaning database (if needed):

``make clean``

#### Running the App:

``make run``

Access [http://localhost:3000](http://localhost:3000)


