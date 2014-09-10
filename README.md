# Firefox App Validator (central module)

This node module runs both the manifest and icon validation rules.

## Configuration setup

If you are using a custom 'fs' or 'url' module instead of the node one, then you can override the paths to these modules in config.json using config.json-dist as the sample.

## Example

    var validator = require('firefox-app-validator-central');

    validator('/path/to/manifest.webapp', { url: false, packaged: false }, function (err, results) {
      console.log(results);
    });

    // First argument is a path to the manifest file, second argument is where you can override node's URL module and/or set a packaged app

## License

Mozilla Public License Version 2.0
