var mongoose = require('mongoose');

process.env.NODE_ENV = 'test';

var _finishCallback = jasmine.Runner.prototype.finishCallback;
jasmine.Runner.prototype.finishCallback = function () {
    // Run the old finishCallback
    _finishCallback.bind(this)();

    mongoose.connection.close();
};