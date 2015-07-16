var https = require("https");
var token = process.env.GITHUB_TOKEN || 'notmytoken';

var GithubRequest = {
  optionsForGetRequest: {
    host: 'api.github.com',
    method: 'GET',
    headers: {
      'User-Agent': 'Women-Contributing',
      'Authorization': "token " + token
    }
  },

  get: function (amount) {
    var since = 0;
    var count = 0;

    return {
      users: function (callback) {
        var usersLogins = [];

        (function getUsers(since) {
          var path = "/users?since=" + since;

          GithubRequest.doRequest(path, function (users) {
            users.forEach(function (user) {
              if (user.type !== 'User' || count++ >= amount) {
                return;
              }
              usersLogins.push(user.login);
              since = user.id;
            });

            count < amount ?  getUsers(since) : callback(usersLogins);
          });

        })(since);
      }
    }
  },

  getUser: function (login, callback) {
    var path = '/users/' + login;
    GithubRequest.doRequest(path, callback);
  },

  doRequest: function (path, callback) {
    GithubRequest.optionsForGetRequest.path = path;

    var req = https.request(GithubRequest.optionsForGetRequest, function(res) {
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
};

module.exports = GithubRequest;
