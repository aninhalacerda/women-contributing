var GenderizeRequest = require ('../scripts/util/genderize_request');

describe("Import Users", function() {
  it("should get given gender of users", function(done) {
  	spyOn(GenderizeRequest, "doRequest").andCallFake(function(path, callback) {
  		callback({
        "name":"peter",
        "gender":"male"
		  });
  	});

  	GenderizeRequest.genderize("Peter", function (gender) {
  		expect(gender).toEqual("male");
  		done();
  	});
  });
});
