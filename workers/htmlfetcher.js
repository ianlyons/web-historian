/* global archive, fs, path, require, _ */

// eventually, you'll have some code here that uses the code in `archive-helpers.js`
// to actually download the urls you want to download.

var archive = require('../helpers/archive-helpers');
var fs = require('fs');
var path = require('path');
var _ = require('underscore');
var http = require('http');

var downloadFiles = function() {
  archive.readListOfUrls(function(array) {
    var index = array[0]; // we expect index to be a number telling us the last downloaded link
    // for loop starting from index until < array.length
    index++;
    console.log('index',  index);
    for(index; index < array.length-1; index++) {
      (function(url){
        var data = '';
        // for each item, run downloader
        http.get({host: url, port: 80, path:'/'}, function(res) {
          console.log(url);
          //update to get these into the archives folder
          var file = fs.createWriteStream(__dirname + '/../archives/sites/' + url);
          res.pipe(file);
          file.on('finish', function(){
            console.log("finished writing.");
            file.close();
          });
        }).on('error', function(err) {
          console.log("GET error: " + err);
        });
      })(array[index]);
    }
    archive.updateIndex(array.length);
  });
};

downloadFiles();
