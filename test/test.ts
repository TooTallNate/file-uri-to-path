import { sep } from 'path';
import assert from 'assert';
import uri2path from '../src';
import _tests from './tests.json';

const tests = _tests as { [input: string]: string };

describe('file-uri-to-path', function() {
	for (const uri of Object.keys(tests)) {
		// The test cases were generated from Windows' `PathCreateFromUrlA()`
		// function. On Unix, we have to replace the path separator with the
		// Unix one instead of the Windows one.
		const expected = tests[uri].replace(/\\/g, sep);

		it(
			`should convert ${
				JSON.stringify(uri)
				} to ${
				JSON.stringify(expected)}`,
			function() {
				const actual = uri2path(uri);
				assert.equal(actual, expected);
			}
		);
	}
});
