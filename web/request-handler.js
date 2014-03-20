/* global Buffer */
/* exported siteExists */

var path = require('path');
var archive = require('../helpers/archive-helpers');
var httpHelpers = require('./http-helpers');
var fs = require('fs');
var filed = require('filed');
// require more modules/folders here!


var genericCallback = function(ifCallback, thenCallback) {

};

exports.handleRequest = function (req, res) {
  if(req.url === "/"){
    console.log("serving index.html");
    req.pipe(filed(__dirname + '/public/index.html')).pipe(res);
  } else {
    req.pipe(filed(__dirname + '/public' + req.url)).pipe(res);
  }
  if(req.method === 'POST') {
    httpHelpers.collectData(req, function(data) {
      var url = data.substring(4);
      archive.isUrlInList(url, function(result) {
        if(result) {
          httpHelpers.serveAssets(res, url);
        } else {
          httpHelpers.serveAssets(res, null, 202);
          archive.addUrlToList(url);
        }
      });


      // determine whether or not we have the site archived
      // if we do:
      //   return the site to the user (loadArchivedSite(url))
      // if we don't:
      //   add site url to queue (sites.txt)
      //   redirect user to loading.html

    });
  }
};



// siteExists('www.hello.com');

