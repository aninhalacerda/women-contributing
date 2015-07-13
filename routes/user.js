var User = require('../models/user');
      
exports.byTime = function(req, res) {
  User.byTime(function (users) {
    res.status(200).json({ users: users });
  });
}

exports.byGender = function(req, res) {
	User.byGender(function (users) {
    res.status(200).json({ users: users });
	});
}
