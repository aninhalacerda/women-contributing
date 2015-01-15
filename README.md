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
``npm test``


#### Running Scripts to Populate Database:
*By default import_users script will import only 1k users from Github*

``mongod &``  
``node scripts/import_users.js``  
``node scripts/update_user_gender.js``  


#### Running the App:
*Since we are in the first step of the project (aquiring and parsing data) you'll see only default Express running here*

``npm install``  
``npm start``

Access [http://localhost:3000](http://localhost:3000)


