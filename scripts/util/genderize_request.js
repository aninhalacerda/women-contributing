var https = require("https");

var GenderizeRequest = {
  genderizeOptions: {
    host: 'api.genderize.io',
    method: 'GET'
  },

  genderize: function (userName, callback) {
    name = userName.split(' ')[0].toLowerCase();
    path = '/?name=' + name;
    GenderizeRequest.doRequest(path, function (gender_json) {
      callback(gender_json);
    });
  },

  doRequest: function (path, callback) {
    GenderizeRequest.genderizeOptions.path = path;

    var req = https.request(GenderizeRequest.genderizeOptions, function (res) {
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

module.exports = GenderizeRequest;
