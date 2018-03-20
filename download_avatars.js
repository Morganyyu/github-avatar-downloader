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
  console.log("Errors:", err);
  return;
  }
  result.forEach(function(id) {
    var path = './avatars/'+id.login+".jpg";
    downloadImageByURL(id.avatar_url, path);
  })
});

function downloadImageByURL(url, filePath) {
  request.get(url)
  .pipe(fs.createWriteStream(filePath));
}

