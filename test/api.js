process.env.NODE_ENV = process.env.NODE_ENV || 'test';

var request = require('superagent');
var expect = require('expect.js');
var app = require('../app');
var server;
var PORT = 3030;
  
before(function(){
  server = app.listen(PORT);
});

describe('Express API', function(){
	it ('should be alive', function(done){
    request.get('localhost:3000').end(function(err, res){
	    expect(res).to.exist;
	    expect(res.status).to.equal(200);
	    expect(res.text).to.contain('Express');
	    done();
    });
  });
});

after(function(){
	server.close();
});
