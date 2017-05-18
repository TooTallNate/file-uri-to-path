'use strict';

const assert = require('assert');
const path = require('path');
const tests = require('./tests.json');
const uri2path = require('../');

describe('file-uri-to-path', () => {
  const toString = JSON.stringify;

  Object.keys(tests).forEach((uri) => {
    // the test cases were generated from Windows' PathCreateFromUrlA() function.
    // On Unix, we have to replace the path separator with the Unix one instead of
    // the Windows one.
    const expected = tests[uri].replace(/\\/g, path.sep);

    it(`should convert ${toString(uri)} to ${toString(expected)}`, () => {
      assert.equal(uri2path(uri), expected);
    });
  });

  it('should throw an error for invalid file URIs', () => {
    try {
      uri2path();
      assert.ok(false);
    } catch (e) {
      assert.ok(e instanceof TypeError);
    }

    try {
      uri2path('');
      assert.ok(false);
    } catch (e) {
      assert.ok(e instanceof TypeError);
    }
  });

});
