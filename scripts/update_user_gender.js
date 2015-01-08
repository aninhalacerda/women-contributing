require ('../database');
var User = require ('../models/user');
var mongoose = require('mongoose');
var GenderizeRequest = require('./util/genderize_request');

var stream = User.find().limit(20).stream();
stream.on('data', function (user) {
  if (user.name != undefined) {
    GenderizeRequest.genderize(user.name, function(gender) {
      updateUserGender(user.login, gender);
    });
  }
});

stream.on('end', function () {
  mongoose.connection.close();
});

function updateUserGender(login, gender) {
  gender_probability = gender.probability || 0;
  User.update({login: login},
              {$set :
                {gender: gender.gender,
                  gender_probability: gender_probability}
              },
              {},
              callback);
}

function callback(err, numAffected) {
  if (err != null) {
    console.log("Could not update user gender");
    console.log(err);
  }
}
