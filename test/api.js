process.env.NODE_ENV = process.env.NODE_ENV || 'test';

var request = require('superagent');
var expect = require('expect.js');
var app = require('../app');
var server;
var chai = require("chai");
chai.should();
chai.use(require('chai-things'));

var URL = 'localhost:3030';

before(function(){
  server = app.listen(3030);
});

describe('Express API', function(){
	it ('should be alive', function(done){
    request.get(URL).end(function(err, res){
	    expect(res).to.exist;
	    expect(res.status).to.equal(200);
	    expect(res.text).to.contain('Express');
	    done();
    });
  });

  it ('should throw 404', function(done){
    request.get(URL+'/nonexistentendpoint').end(function(err, res){
	    expect(res).to.exist;
	    expect(res.status).to.equal(404);
	    expect(res.text).to.contain('Not Found');
	    done();
    });
  });
});

describe('Users API', function(){
 it ('should filter all users by gender', function(done){
    request.get(URL+'/users/gender').end(function(err, res){
	    expect(res).to.exist;
	    expect(res.status).to.equal(200);
	    res.body.should.have.property('users');
	    done();
    });
  });

 it ('should filter all users by time', function(done){
    request.get(URL+'/users/time').end(function(err, res){
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
