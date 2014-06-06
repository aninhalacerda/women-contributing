var https = require("https");


var options = {
  host: 'api.github.com',
  path: '/users',
  method: 'GET',
  headers: {
    'User-Agent': 'Women-Contributing',
    'Authorization': "token 6c72e67270e7d248404891137aae79c1bf2211e0"
  }
};


doRequest(options, function (all_users) {
  all_users.forEach(function (user) {
    if (user.type !== 'User') {
      return;
    }
    options.path = '/users/'+user.login;

    doRequest(options, function (user) {
      console.log(user.name, user.login, user.location);
    });
  });
});


function doRequest(options, callback) {
  var req = https.request(options, function(res) {
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
