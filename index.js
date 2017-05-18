'use strict';

/**
 * Module dependencies.
 */

const path = require('path');
const url = require('url');

/**
 * Module exports.
 */

module.exports = fileUriToPath;

/**
 * File URI to Path function.
 *
 * @param {String} uri
 * @return {String} path
 * @api public
 */

function fileUriToPath (uri) {
  uri = url.parse(uri);

  if (uri.protocol !== 'file:' || url.pathname === null) {
    throw new TypeError('must pass in a file:// URI to convert to a file path');
  }
  // Based on the file URI Scheme:
  // https://tools.ietf.org/html/draft-hoffman-file-uri-03
  let host = uri.host;
  let pathname = unescape(uri.pathname);

  // 2.  Scheme Definition
  // As a special case, <host> can be the string "localhost" or the empty
  // string; this is interpreted as "the machine from which the URL is
  // being interpreted".
  if (host === 'localhost') {
    host = '';
  }
  else if (host) {
    host = path.sep + path.sep + host;
  }
  else {
    // Windows shares will have a pathname starting with "//".
    host = pathname.match(/^\/\/[^/]+|/)[0];
    pathname = pathname.slice(host.length);
  }

  // 3.2  Drives, drive letters, mount points, file system root
  // Drive letters are mapped into the top of a file URI in various ways,
  // depending on the implementation; some applications substitute
  // vertical bar ("|") for the colon after the drive letter, yielding
  // "file:///c|/tmp/test.txt". In some cases, the colon is left
  // unchanged, as in "file:///c:/tmp/test.txt". In other cases, the
  // colon is simply omitted, as in "file:///c/tmp/test.txt".
  pathname = path.normalize(pathname.replace(/^\/([a-zA-Z])[:|]/, '$1:'));

  return host + pathname;
}
