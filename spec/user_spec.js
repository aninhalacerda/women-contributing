require ('../database');
var User = require ('../models/user');

beforeEach(function () {
	User.remove({}, function() {

	});
});

describe("User", function() {
  it("should get user count grouped by time", function(done) {
  	new User({"created_at" : "2014-01-01"}).save();
  	new User({"created_at" : "2014-02-01"}).save();
  	new User({"created_at" : "2014-03-01"}).save();
  	User.byTime(function (users) {
  		expect(users.length).toEqual(3);
  		expect(users).toEqual([ { _id: { year: 2014, month: 1 }, count: 1 },
														  { _id: { year: 2014, month: 2 }, count: 1 },
														  { _id: { year: 2014, month: 3 }, count: 1 } ]);
  		done();
  	});
  });
});
