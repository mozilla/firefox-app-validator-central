# Firefox App Validator (central module)

This node module runs both the manifest and icon validation rules.

## Example

    var validator = require('firefox-app-validator-central');

    var results = validator('/path/to/manifest.webapp', '/path/to/icon.png', false);
    console.log(results);

    // First argument is a path to the manifest file, second is a path to the icon file

## License

Mozilla Public License Version 2.0
