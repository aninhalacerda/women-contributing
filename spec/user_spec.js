require ('../database');
var User = require ('../models/user');

describe("User", function() {
  it("should get user count grouped by time", function(done) {
  	User.byTime(function (users) {
  		expect(users.length).toEqual(3); //expected when grouping by month the first 1000 users
  		done();
  	});
  });
});
