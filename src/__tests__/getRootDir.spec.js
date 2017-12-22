'use strict';

const path = require('path');
const getRootDir = require('../getRootDir');

describe('gtRootDir()', () => {
	const rootDir = path.resolve(__dirname, '../..');
	test('returns the first directory with node_modules', () => {
		expect(getRootDir(path.resolve(__dirname, '../../node_modules/debasdeep'))).toBe(rootDir);
	});

	test('returns project directory', () => {
		expect(getRootDir()).toBe(rootDir);
	});
});
