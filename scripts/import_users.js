require('../database');
var mongoose = require('mongoose');
var User = require('../models/user');
var GithubRequest = require('./util/github_request');
var Q = require('q');

GithubRequest.get(1000).users(function (logins) {

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
