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

module.exports = mongoose.model('User', userSchema);