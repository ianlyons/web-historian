var fs = require('fs');
var path = require('path');
var _ = require('underscore');


/*
 * You will need to reuse the same paths many times over in the course of this sprint.
 * Consider using the `paths` object below to store frequently used file paths. This way,
 * if you move any files, you'll only need to change your code in one place! Feel free to
 * customize it in any way you wish.
 */

exports.paths = {
  'siteAssets' : path.join(__dirname, '../web/public'),
  'archivedSites' : path.join(__dirname, '../archives/sites'),
  'list' : path.join(__dirname, '../archives/sites.txt')
};

// Used for stubbing paths for jasmine tests, do not modify
exports.initialize = function(pathsObj){
  _.each(pathsObj, function(path, type) {
    exports.paths[type] = path;
  });
};

// The following function names are provided to you to suggest how you might
// modularize your code. Keep it clean!

exports.readListOfUrls = function(callback){
  var array = [];
  var fileName = exports.paths.list;
  fs.exists(fileName, function(exists){
    if(exists){
      fs.stat(fileName, function(error, stats){
        fs.open(fileName, "r", function(error, fd){
          var buffer = new Buffer(stats.size);
          fs.read(fd, buffer, 0, buffer.length, null, function(error, bytesRead, buffer){
            var data = buffer.toString("utf8", 0, buffer.length);
            array = data.toString().split("\n");
            callback(array);
            fs.close(fd);
          });
        });
      });
    }
  });
};

exports.isUrlInList = function(url, callback){
  exports.readListOfUrls(function(array) {
    for(var i=1; i<array.length; i++){ //starting at 1 because line 0 contains "status marker" for the chron job
      if(array[i] === url){
        console.log('');
        callback(true);
      }
    }
    callback(false);
  });
};

exports.addUrlToList = function(url){
  var fileName = exports.paths.list;
  fs.exists(fileName, function(exists){
    if(exists){
      var urlString = url + '\n';
      fs.appendFile(fileName, urlString, function(err) {
        if(err) { console.log('addUrlToList didn\'t work for some reason. Error: ' + err); }
      });
    }
  });
};

exports.isURLArchived = function(url){
  var result;
  exports.readListOfUrls(function(array){
    var index = array[0];
    if(array.indexOf(url) > index){
      result = false;
    } else{
      result = true;
    }
  return result;
  });
};

exports.downloadUrls = function(){
};
