var mongoose = require('mongoose');
var env = process.env.NODE_ENV || 'development';
mongoose.connect('mongodb://localhost/women-contributing-'+env);