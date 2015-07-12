var User = require('../models/user');
      
exports.byTime = function(req, res) {
  User.byTime(function (users) {
    res.json(200, { users: users });
  });
}

exports.byGender = function(req, res) {
	User.byGender(function (users) {
		res.json(200, { users: users });
	});
}
