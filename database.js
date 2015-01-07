var mongoose = require('mongoose');
var env = process.env.NODE_ENV || 'development';
var db = mongoose.connection;
mongoose.connect('mongodb://localhost/women-contributing-'+env);
db.on('error', console.error.bind(console, 'connection error:'));
