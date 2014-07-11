var mongoose = require('mongoose');
var userSchema = mongoose.Schema({
  	login: String,
  	id: Number,
  	avatar_url: String,
  	name: String,
  	company: String,
  	location: String,
  	email: String,
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
      // day: { $dayOfMonth : "$created_at" }
    }, 
    count : { $sum : 1 }})
  .exec(function (err, res) {
    if (err) return handleError(err);
    console.log(res); 
    callback(res);
    mongoose.connection.close()
  });
};

module.exports = mongoose.model('User', userSchema);