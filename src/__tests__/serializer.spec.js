'use strict';

const path = require('path');
const serializer = require('../../serializer');

const rootDir = path.resolve(__dirname, '../..');

describe('test()', () => {
	test('array returns true', () => {
		expect(serializer.test([1, 2])).toBe(true);
	});
	test('object returns true', () => {
		expect(serializer.test({})).toBe(true);
	});
	test('returns false', () => {
		expect(serializer.test(null)).toBe(false);
		expect(serializer.test(undefined)).toBe(false);
		expect(serializer.test(1)).toBe(false);
		expect(serializer.test('x')).toBe(false);
		expect(serializer.test(/x/)).toBe(false);
	});
	test('visited object returns false', () => {
		expect(serializer.test({ __JEST_SERIALIZER_DEABSDEEP__: undefined })).toBe(
			false
		);
	});
});

const serializeValue = x => x.toString();

describe('print()', () => {
	test('serializes array', () => {
		expect(serializer.print([`${rootDir}/a/b.js`, 2], serializeValue)).toBe(
			'~/a/b.js,2'
		);
	});
});
