require ('../database');
var User = require ('../models/user');

beforeEach(function (done) {
    new User({"created_at" : "2014-01-01", "gender" : "female"}).save(function() {
      new User({"created_at" : "2014-02-01", "gender" : "female"}).save(function() {
        new User({"created_at" : "2014-03-01", "gender" : "male"}).save(function() {
          done();
        });
      });
    });


});

afterEach(function (done) {
  User.remove({}, function() {
    done();
  });
});

describe("UserTime", function() {
  it("should get user count grouped by time", function (done) {
    User.byTime(function (users) {
      expect(users.length).toEqual(3);

      expect(users).toContain({ _id: { year: 2014, month: 1 }, count: 1 });
      expect(users).toContain({ _id: { year: 2014, month: 2 }, count: 1 });
      expect(users).toContain({ _id: { year: 2014, month: 3 }, count: 1 });

      done();
    });
  });
});

describe("UserGender", function() {
  it("should get user grouped by gender", function (done) {

    new User({"gender" : "female"}).save(function() {
      new User({"gender" : "male"}).save(function() {
        User.byGender(function (users) {
          var captured = null;
          try {
            expect(users.length).toEqual(2);

            expect(users).toContain({ _id: "female", count: 3 });
            expect(users).toContain({ _id: "male", count: 2 });
        } catch(e) {
          captured = e;
        }
        expect(captured).toBe(null);
        done();
      });

      });
    });


  });
});
