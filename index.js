'use strict';

var config = require('./config.json');

var fs = require('./libwrappers/fs')(config.fsLib);

var Q = require('q');

var Manifest = require('firefox-app-validator-manifest');
var manifest = new Manifest({
    url: config.urlLib
});

var ManifestIcon = require('firefox-app-validator-icons');
var icons = new ManifestIcon();

module.exports = function (manifestPath, packagedApp, next) {
  var errors = {};
  var warnings = {};
  var manifestContent = {};
  var manifestResults = {};
  var manifestJSON = {};
  var options = {
    packaged: packagedApp || false
  };

  function loadManifest() {
    var deferred = Q.defer();

    fs.readFile(manifestPath, 'utf8', function (err, mc) {
      if (err) {
        deferred.reject(err);
      } else {
        manifestContent = mc;
        validateManifest();
        validateIcons();

        deferred.resolve();
      }
    });

    return deferred.promise;
  };

  function validateManifest() {
    manifestResults = manifest.validate(manifestContent, options);

    errors = manifestResults.errors;
    warnings = manifestResults.warnings;

    manifestJSON = JSON.parse(manifestContent);
  };

  function validateIcons() {
    for (var i in manifestJSON.icons) {
      var iconResults = icons.validate(fs.readFileSync(manifestJSON.icons[i]));

      for (var k in iconResults.errors) {
        errors[k] = iconResults.errors[k];
      }
    }
  };

  loadManifest()
    .then(function () {
      next(null, {
        errors: errors,
        warnings: warnings
      });
    })
    .catch(function (err) {
      next(err);
    });
};
