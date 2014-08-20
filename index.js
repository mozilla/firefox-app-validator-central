'use strict';

var config = require('./config.json');

var fs = require('./libwrappers/fs')(config.fsLib);

var Manifest = require('firefox-app-validator-manifest');
var manifest = new Manifest({
    url: config.urlLib
});

var ManifestIcon = require('firefox-app-validator-icons');
var icons = new ManifestIcon();

module.exports = function (manifestPath, iconPath, packagedApp) {
  var errors = {};
  var warnings = {};
  var options = {
    packaged: packagedApp || false
  };

  var manifestContent = fs.readFileSync(manifestPath, 'utf8');
  var manifestResults = manifest.validate(manifestContent, options);

  errors = manifestResults.errors;
  warnings = manifestResults.warnings;

  var manifestJSON = JSON.parse(manifestContent);

  for (var i in manifestJSON.icons) {
    var iconResults = icons.validate(fs.readFileSync(manifestJSON.icons[i]));

    for (var k in iconResults.errors) {
      errors[k] = iconResults.errors[k];
    }
  }

  return {
    errors: errors,
    warnings: warnings
  }
};
