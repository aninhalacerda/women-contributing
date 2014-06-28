require ('../database')
var User  = require('../models/user');
User.remove({}, function (err) {
  if (err) return handleError(err);
}); 