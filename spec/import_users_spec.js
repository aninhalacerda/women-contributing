var GithubRequest = require ('../scripts/import_users');

describe("Import Users", function() {
  it("should get given amount of users", function(done) {
  	spyOn(GithubRequest, "doRequest").andCallFake(function(path, callback) {
  		callback([{
		    "login": "octocat",
		    "id": 1,
		    "type": "User",
		  }]);
  	});

  	GithubRequest.get(100).users(function (logins) {
  		expect(logins.length).toEqual(100);
  		done();
  	});
  });
});