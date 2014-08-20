'use strict';

process.env.NODE_ENV = 'test';

var should = require('should');

var validator = require('../index');

describe('validator', function () {
  it('should validate a minimal manifest and icon with no errors', function () {
    var results = validator('test/manifest.webapp', false);

    results.errors.should.be.empty;
    results.warnings.should.be.empty;
  });

  it('should validate a minimal manifest and icon with some errors', function () {
    var results = validator('test/manifest-error.webapp', false);
    results.errors.MandatoryFieldName.should.equal('Mandatory field name is missing');
    results.errors.InvalidIconSize.should.equal('The icon must be a square');
    results.warnings.should.be.empty;
  });
});
