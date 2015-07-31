require('../database');
var mongoose = require('mongoose');
var User = require('../models/user.js');
var GithubRequest = require('./util/github_request');
var Q = require('q');

var maxUserIndex = 0;
User.find().sort({ id : -1 }).select({"_id": 0}).limit(2).exec(function(err, usr) {
  if (!err && usr[0] != undefined) {
    maxUserIndex = usr[0].toObject().id;
  }

  GithubRequest.get(30, maxUserIndex).users(function (logins) {
    var promises = [];

    process.stdout.write("Saving users ");

    logins.forEach(function (login) {
        var defered = Q.defer();
        GithubRequest.getUser(login, function (user) {
          var newUser = new User(user);
          newUser.save();
          process.stdout.write(".");
          defered.resolve(newUser);
        });
        promises.push(defered.promise);
    });

    Q.all(promises).then(function() { mongoose.connection.close() });
  });
});


