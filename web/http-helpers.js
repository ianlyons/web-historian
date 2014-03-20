/* global exports, require, __dirname  */
/* exported path, fs, archive, headers */

var path = require('path');
var fs = require('fs');
var archive = require('../helpers/archive-helpers');

exports.headers = headers = {
  'access-control-allow-origin': '*',
  'access-control-allow-methods': 'GET, POST, PUT, DELETE, OPTIONS',
  'access-control-allow-headers': 'content-type, accept',
  'access-control-max-age': 10, // Seconds.
  'Content-Type': 'text/html'
};

exports.serveAssets = function(res, asset, status) {
  var status = status || 200;
  if(asset === null) {
    asset = __dirname + '/public/loading.html';
  } else {
    console.log('into the existing asset clause')
    asset = __dirname + '/../archives/sites/' + asset;
  }
  console.log(asset);

  fs.readFile(asset, function(error, data){
    if(error){
      res.writeHead(404, {"Content-type":"text.plain"});
      res.end("Sorry the page was not found");
    } else{
      res.writeHead(status,{"Content-type":"text/html"});
      res.end(data);
    }
  });
  //res.writeHead(status, headers);
  //res.end(asset);
  // Write some code here that helps serve up your static files!
  // (Static files are things like html (yours or archived from others...), css, or anything that doesn't change often.)
};

exports.collectData = function(req, cb) {
  var data = '';
  req.on('data', function(chunk) {
    data += chunk;
  });
  req.on('end', function() {
    cb(data);
  });
};
// As you progress, keep thinking about what helper functions you can put here!
