var GithubRequest = require ('../scripts/util/github_request');
var sinon = require('sinon');
var chai = require("chai");
chai.should();
chai.use(require('chai-things'));

describe("Import Users", function() {
  it("should get given amount of users", function(done) {
    sinon.stub(GithubRequest, 'doRequest').yields([{ "login": "octocat", "id": 1, "type": "User"}]);
    GithubRequest.get(100).users(function (logins) {
      logins.length.should.equal(100);
      done();
    });
  });

  it("should get only users", function(done) {
  	GithubRequest.doRequest.restore()
  	sinon.stub(GithubRequest, 'doRequest').yields([{"login": "octocat", "id": 1, "type": "User"}, {"login": "not-an-user", "id": 2, "type": "Organization"}]);
    GithubRequest.get(5).users(function (logins) {
      logins.length.should.equal(5);
      logins.should.all.be.equal('octocat');
      done();
    });
  });

  it("should get real users - not stub", function(done) {
    GithubRequest.doRequest.restore()
    GithubRequest.get(5).users(function (logins) {
      logins.length.should.equal(5);
      done();
    });
  });

  it("should get info about a specific real user - not stub", function(done) {
    GithubRequest.getUser('aninhalacerda', function (userInfo) {
      userInfo.should.have.property('name');
      done();
    });
  });

});