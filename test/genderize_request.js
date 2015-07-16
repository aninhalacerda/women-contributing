var GenderizeRequest = require ('../scripts/util/genderize_request');
var sinon = require('sinon');
var chai = require("chai");
chai.should();
chai.use(require('chai-things'));

describe("Genderize Users", function() {
  it("should find gender for specific user", function(done) {
    GenderizeRequest.genderize("Peter", function (gender) {
  		gender.should.have.property("name", "peter");
  		gender.should.have.property("gender", "male");
  		done();
  	});
  });
});