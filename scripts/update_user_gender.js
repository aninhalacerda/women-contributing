require ('../database');
var mongoose = require('mongoose');
var User = require ('../models/user');
var GenderizeRequest = require('./util/genderize_request');
var Q = require('q');

function genderize() {
  var stream = User.find({"gender": null}).limit(5).stream();
  var promises = [];
  var users = ["nate", "canadaduane", "nicksieger"];

  users.forEach(function(user) {
        var deferred = Q.defer();

        GenderizeRequest.genderize("Luke bla", function(gender) {
          updateUserGender(user, gender, function(err, numAffected) {
                  if (err != null) {
                    console.log("Could not update user gender");
                    console.log(err);
                  } else {
                    console.log("Deferred!");
                    deferred.resolve(numAffected);
                  }
                });
          process.stdout.write(". " + user + ". ");
       });
       promises.push(deferred.promise);
  });

  Q.all(promises).then(function() { console.log("finished!"); mongoose.connection.close() });
};

function updateUserGender(login, gender, callback) {
  gender_probability = gender.probability || 0;
  User.update({login: login},
              {$set :
                {gender: gender.gender,
                  gender_probability: gender_probability}
              },
              {},
              callback);
}

genderize();
