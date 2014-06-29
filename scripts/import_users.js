require('../database');
var User = require('../models/user');
var GithubRequest = require('./util/github_request');

GithubRequest.get(1000).users(function (logins) {
  logins.forEach(function (login) {
    GithubRequest.getUser(login, function (user) {
      var newUser = new User(user);
      newUser.save();
    });
  });
});
