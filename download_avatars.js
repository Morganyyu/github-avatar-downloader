var request = require('request');
var token = require('./secrets');
var fs = require('fs');
var args = process.argv.slice(2);

console.log('Welcome to the GitHub Avatar Downloader!');

function getRepoContributors(repoOwner, repoName, cb) {
  var options = {
    url: "https://api.github.com/repos/" + repoOwner + "/" + repoName + "/contributors",
    json: true,
    headers: {
      'User-Agent': 'request',
      'Authorization': token.GITHUB_TOKEN
    }
  };

  request(options, function(err, res, body) {
    cb(err, body);
  });
}

getRepoContributors(args[0], args[1], function(err, result) {
  var err = "Not enough arguments."
  if (args.length < 2) {
    console.log("Error:", err);
    return;
  } else {
    result.forEach(function(id) {
      var path = './avatars/'+id.login+".jpg";         //looping through the id's to get the login names
      downloadImageByURL(id.avatar_url, path);         //to reference to the downloadImageByURL function
    })
  }
});

function downloadImageByURL(url, filePath) {
  request.get(url)
  .pipe(fs.createWriteStream(filePath));
}

