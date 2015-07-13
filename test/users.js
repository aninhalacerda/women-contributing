process.env.NODE_ENV = process.env.NODE_ENV || 'test';

var request = require('superagent');
var expect = require('expect.js');
var app = require('../app');
var server;
var PORT = 3000;
  
before(function(){
  server = app.listen(PORT);
});

describe('Users API', function(){
	
	it ('should be alive', function(done){
    request.get('localhost:3000').end(function(err, res){
	    expect(res).to.exist;
	    expect(res.status).to.equal(200);
	    expect(res.text).to.contain('Express');
	    done();
    });
  });

 it ('should filter all users by gender', function(done){
    request.get('localhost:3000/users/gender').end(function(err, res){
	    expect(res).to.exist;
	    expect(res.status).to.equal(200);
	    expect(res.body).to.eql({'users': []});
	    done();
    });
  });
});

after(function(){
	server.close();
});
