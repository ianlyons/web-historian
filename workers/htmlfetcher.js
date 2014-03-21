/* global archive, fs, path, require, _, __dirname */

// eventually, you'll have some code here that uses the code in `archive-helpers.js`
// to actually download the urls you want to download.

var fs = require('fs');
var http = require('http');
var dbHelp = require('../testdb');

var downloadFiles = function() {
  // get all urls that haven't been archived
  dbHelp.getUnarchivedSites(function(array) {
    for(var i = 0; i < array.length; i++) {
      var url = array[i].url;
      http.get({host: url, port: 80, path:'/'}, function(res) {
        var file = fs.createWriteStream(__dirname + '/../archives/sites/' + url);
        res.pipe(file);
        file.on('finish', function(){
          dbHelp.markAsArchived(url);
          file.close();
        });
      }).on('error', function(err) {
        console.log('GET error: ' + err);
      });
    }
  });
};

downloadFiles();
