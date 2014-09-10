'use strict';

process.env.NODE_ENV = 'test';

var should = require('should');

var validator = require('../index');

describe('validator', function () {
  it('should validate a non-existent manifest with errors', function (done) {
    validator('test/invalid.webapp', {}, function (err, results) {
      should.exist(err);
      err.toString().should.equal("Error: ENOENT, open 'test/invalid.webapp'");
      done();
    });
  });

  it('should validate a minimal manifest and icon with no errors', function (done) {
    validator('test/manifest.webapp', {}, function (err, results) {
      results.errors.should.be.empty;
      results.warnings.should.be.empty;
      done();
    });
  });

  it('should validate a minimal manifest and icon with some errors', function (done) {
    validator('test/manifest-error.webapp', {}, function (err, results) {
      results.errors.MandatoryFieldName.should.equal('Mandatory field name is missing');
      results.errors.InvalidIconSize.should.equal('The icon must be a square');
      results.warnings.should.be.empty;
      done();
    });
  });
});
