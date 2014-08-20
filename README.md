# Firefox App Validator (central module)

This node module runs both the manifest and icon validation rules.

## Configuration setup

If you are using a custom 'fs' or 'url' module instead of the node one, then you can override the paths to these modules in config.json using config.json-dist as the sample.

## Example

    var validator = require('firefox-app-validator-central');

    var results = validator('/path/to/manifest.webapp', '/path/to/icon.png', false);
    console.log(results);

    // First argument is a path to the manifest file, second is a path to the icon file, third argument is whether or not this is a packaged app

## License

Mozilla Public License Version 2.0
