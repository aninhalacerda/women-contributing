require('../database');
var https = require("https");
var User = require('../models/user');

var options = {
  host: 'api.github.com',
  path: '/users',
  method: 'GET',
  headers: {
    'User-Agent': 'Women-Contributing',
    'Authorization': "token 6c72e67270e7d248404891137aae79c1bf2211e0"
  }
};


var since = 0;
var count = 0;
for (var i = 0; i < 10; i++) {
	console.log("chunk " + i);
	
	options.path = "/users?since=" + since;

	doRequest(https, options, function (all_users) {
	  all_users.forEach(function (user) {
	    if (user.type !== 'User') {
	      return;
	    }
	    options.path = '/users/'+user.login;

	    doRequest(https, options, function (user) {
	      var new_user = new User(user);
	      new_user.save();
	      console.log("#users " + count++);
	    });
	    since = user.id;
	  });
	});
};



function doRequest(protocol, options, callback) {
  var req = protocol.request(options, function(res) {
    var data = "";

    res.on('data', function (chunk) {
      data += chunk;
    });

    res.on('end', function () {
      data = JSON.parse(data);

      callback(data);
    });
  });

  req.on('error', function(e) {
    console.log('problem with request: ' + e.message);
  });

  req.end();
}