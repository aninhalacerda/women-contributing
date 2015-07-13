var mongoose = require('mongoose');
var env = process.env.NODE_ENV || 'development';
var db = mongoose.connection;
var connection_url = process.env.MONGOLAB_URI || 'mongodb://localhost/women-contributing-'+env;
mongoose.connect(connection_url);
db.on('error', console.error.bind(console, 'connection error:'));