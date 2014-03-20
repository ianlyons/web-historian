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
    console.log(index);
    console.log(array);
    for(index; index < array.length-1; index++) {
      (function(url){
        var data = '';
        console.log(index);
        // for each item, run downloader
        console.log("We're going for " + url);
        http.get({host: url, port: 80, path:'/'}, function(res) {
          // console.log(res);
          var file = fs.createWriteStream(url);
          console.log("Created writeStream for " + url);
          console.log("Beginning get request for " + url);
          res.pipe(file);
          file.on('finish', function(){
            file.close();
            console.log('got the file from ' + res.headers.location);
          });
        }).on('error', function(err) {
          console.log("GET error: " + err);
        });
      })(array[index]);
      console.log(index);
    }
    // update array[0]

  });
};

downloadFiles();
