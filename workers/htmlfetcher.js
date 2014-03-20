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
    index+=1;
    for(index; index < array.length-1; index++) {
      var data = '';
      // for each item, run downloader
      console.log("We're going for " + array[index]);
      http.get({host: array[index], port: 80, path:'/'}, function(res) {
        var file = fs.createWriteStream(array[index]);
        console.log("Created writeStream for " + array[index]);
        console.log("Beginning get request for " + array[index]);
        res.pipe(file);
        file.on('finish', function(){
          file.close();
        console.log('got the file from ' + array[index]);
        });
      });
    }
    // update array[0]

  });
};

downloadFiles();
