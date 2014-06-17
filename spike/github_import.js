var https = require("https");
var http = require("http");


var options = {
  host: 'api.github.com',
  path: '/users',
  method: 'GET',
  headers: {
    'User-Agent': 'Women-Contributing',
    'Authorization': "token 6c72e67270e7d248404891137aae79c1bf2211e0"
  }
};

var users ={};

var genderize_options = {
  host: 'api.genderize.io',
  method: 'GET'
};

doRequest(https, options, function (all_users) {
  all_users.forEach(function (user) {
    if (user.type !== 'User') {
      return;
    }
    options.path = '/users/'+user.login;

    doRequest(https, options, function (user) {
      users[first_name(user)] = {name: user.name,
                                login: user.login,
                                location: user.location,
                                gender: ""};
      genderize(user);
    });
  });
});


function genderize(user) {
  genderize_options.path = '/?name=' + first_name(user);
  doRequest(http, genderize_options, function (gender_json) {
    users[gender_json.name]["gender"] = gender_json.gender;
  });
}

function first_name(user) {
  if (user.name != undefined) {
    return user.name.split(' ')[0].toLowerCase();
  }
}

setTimeout(function() {
  console.log(users);
}, 20000);


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
