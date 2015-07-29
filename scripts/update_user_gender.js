require ('../database');
var mongoose = require('mongoose');
var User = require ('../models/user');
var GenderizeRequest = require('./util/genderize_request');
var Q = require('q');

function genderize(numUsers) {
  var streamDeferred = Q.defer();
  var promises = [streamDeferred.promise];
  var usersUpdated = 0;
  var stream = User.find({"gender": null}).and({"name": {$ne : null}}).limit(numUsers).stream();

  stream.on('data', function (user) {
    var deferred = Q.defer();
    GenderizeRequest.genderize(user.name, function(gender) {
      updateUserGender(user.login, gender, function(err, numAffected) {
        if (err != null) {
          console.log("Could not update user gender");
          console.log(err);
        } else {
          process.stdout.write(".");
          deferred.resolve(numAffected);
          if (++usersUpdated == numUsers) {streamDeferred.resolve()};
        }
      });
    });
    promises.push(deferred.promise);
  });

  Q.all(promises).then(function() { mongoose.connection.close(); });
};

function updateUserGender(login, gender, callback) {
  if (gender.gender != undefined) {
    gender_probability = gender.probability || 0;
    User.update({login: login},
                {$set :
                  {gender: gender.gender,
                    gender_probability: gender_probability}
                },
                {},
                callback);
  } else {
    console.log("Genderize response: undefined for user " + login);
  }
}

genderize(100);
