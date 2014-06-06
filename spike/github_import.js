var https = require("https");


var allReposOptions = {
  host: 'api.github.com',
  path: '/repositories',
  method: 'GET',
  headers: {
    'User-Agent': 'Women-Contributing',
    'Authorization': "token 6c72e67270e7d248404891137aae79c1bf2211e0"
  }
};


doRequest(allReposOptions, function (all_repos) {
  var ownerOptions = {
    host: 'api.github.com',
    path: '/users/',
    method: 'GET',
    headers: {
      'User-Agent': 'Women-Contributing',
      'Authorization': "token 6c72e67270e7d248404891137aae79c1bf2211e0"
    }
  };

  all_repos.forEach(function (repo) {
    ownerOptions.path = '/users/'+repo.owner.login;

    var i = 1;
    doRequest(ownerOptions, function (user) {
      if(i++ === 1) console.log(user);
      console.log(user.name, user.login);
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
