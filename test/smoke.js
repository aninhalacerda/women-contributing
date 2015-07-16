var request = require('superagent');
var expect = require('expect.js');
var app = require('../app');
var server;
var URL = 'https://women-contributing.herokuapp.com/';

var chai = require("chai");
chai.should();
chai.use(require('chai-things'));
  
describe('Production API', function(){
	it ('should be alive', function(done){
    request.get(URL).end(function(err, res){
	    expect(res).to.exist;
	    expect(res.status).to.equal(200);
	    expect(res.text).to.contain('Express');
	    done();
    });
  });
  it ('should get all users by gender', function(done){
    request.get(URL+'users/gender').end(function(err, res){
	    expect(res).to.exist;
	    expect(res.status).to.equal(200);
	    res.body.should.have.property('users');
	    done();
    });
  });

 it ('should get all users by time', function(done){
    request.get(URL+'users/time').end(function(err, res){
	    expect(res).to.exist;
	    expect(res.status).to.equal(200);
	    res.body.should.have.property('users');
	    done();
    });
  });
});
