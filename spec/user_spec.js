require ('../database');
var User = require ('../models/user');

beforeEach(function (done) {
  new User({"created_at" : "2014-01-01", "gender" : "female"}).save( function() {
    new User({"created_at" : "2014-02-10", "gender" : "male"}).save( function() {
      new User({"created_at" : "2014-02-15", "gender" : "female"}).save( function() {
        new User({"created_at" : "2014-03-01", "gender" : "female"}).save( function() {
          done();
        });
      });
    });
  });
});

afterEach(function (done) {
  User.remove({}, function() {
    done();
  });
});

describe("UserGroup", function() {
  it("should get user count grouped by time", function (done) {
    User.byTime(function (users) {
      expect(users.length).toEqual(3);
      expect(users).toContain({ _id: { year: 2014, month: 1 }, count: 1 });
      expect(users).toContain({ _id: { year: 2014, month: 2 }, count: 2 });
      expect(users).toContain({ _id: { year: 2014, month: 3 }, count: 1 });
      done();
    });
  });

  it("should get user grouped by gender", function (done) {
    User.byGender(function (users) {
      expect(users.length).toEqual(2);
      expect(users).toContain({ _id: "female", count: 3 });
      expect(users).toContain({ _id: "male", count: 1 });
      done();
    });
  });

  it("should get user grouped by time and gender", function (done) {
    User.byTimeAndGender(function (users) {
      expect(users.length).toEqual(4);
      expect(users).toContain({ _id: { year: 2014, month: 1 , gender:"female"}, count: 1 });
      expect(users).toContain({ _id: { year: 2014, month: 2 , gender:"male"}, count: 1 });
      expect(users).toContain({ _id: { year: 2014, month: 2 , gender:"female"}, count: 1 });
      expect(users).toContain({ _id: { year: 2014, month: 3 , gender:"female"}, count: 1 });
      done();
    });
  });

  it("should get user count grouped by gender until a certain time", function (done) {
    var date = new Date(2014, 1, 10); // Feb-10-2014, months starts counting on 0
    User.byGenderUntil(date, function (users) {
      expect(users.length).toEqual(2);
      expect(users).toContain({ _id: "female", count: 1 });
      expect(users).toContain({ _id: "male", count: 1 });
      done();
    });
  });
});
