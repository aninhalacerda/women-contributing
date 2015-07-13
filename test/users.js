process.env.NODE_ENV = process.env.NODE_ENV || 'test';

var request = require('superagent');
var should = require('should');
var expect = require('expect.js');
var app = require('../app');
var server;
var PORT = 3000;
  
before(function(){
  server = app.listen(PORT);
});

describe('Users API', function(){
 it ('should filter all users by gender', function(done){
    request.get('localhost:3000/users/gender').end(function(err, res){
	    expect(res).to.exist;
	    expect(res.status).to.equal(200);
	    res.body.should.have.property('users');
	    done();
    });
  });

 it ('should filter all users by time', function(done){
    request.get('localhost:3000/users/time').end(function(err, res){
	    expect(res).to.exist;
	    expect(res.status).to.equal(200);
	    res.body.should.have.property('users');
	    done();
    });
  });
});

after(function(){
	server.close();
});
