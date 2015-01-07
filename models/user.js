var mongoose = require('mongoose');

var userSchema = mongoose.Schema({
  	login: String,
  	id: Number,
  	avatar_url: String,
  	name: String,
  	company: String,
  	location: String,
  	email: String,
    gender: String,
  	hireable: Boolean,
  	public_repos: Number,
  	public_gists: Number,
  	followers: Number,
  	following: Number,
  	created_at: Date
});

userSchema.statics.byTime = function (callback) {
  this.aggregate()
  .group( { _id : 
    { 
      year: { $year : "$created_at" },
      month: { $month : "$created_at" }
    }, 
    count : { $sum : 1 },
    sort: {created_at: 1}
  })
  .exec(function (err, res) {
    if (err) return handleError(err);
    callback(res);
  });
};

userSchema.statics.byGender = function (callback) {
  this.aggregate()
  .group( { _id : "$gender",
            count : { $sum : 1 }
  })
  .exec(function (err, res) {
    if (err) return handleError(err);
    callback(res);
  });
};

module.exports = mongoose.model('User', userSchema);