var mongoose = require('mongoose');
var env = process.env.NODE_ENV || 'development';
var db = mongoose.connection;
// mongodb://heroku_sfvgxnp9:r0tbpfh6astnkl6snqtke7q3kv@ds047802.mongolab.com:47802/heroku_sfvgxnp9
// var connection_url = process.env.DATABASE_URL || 'mongodb://localhost/women-contributing-'+env;
var connection_url = 'mongodb://heroku_sfvgxnp9:r0tbpfh6astnkl6snqtke7q3kv@ds047802.mongolab.com:47802/heroku_sfvgxnp9';
mongoose.connect(connection_url);
db.on('error', console.error.bind(console, 'connection error:'));