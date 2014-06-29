require ('../database')
var User  = require('../models/user');
var mongoose = require('mongoose');
var Q = require('q');

var deferred = Q.defer();
User.remove({}, function (err) {
  if (err) deferred.reject(err);
  else deferred.resolve();
});

deferred.promise.then(function() { mongoose.connection.close() });
