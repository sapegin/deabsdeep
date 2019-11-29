'use strict';

const path = require('path');
const deabsDeep = require('../index');

const rootDir = path.resolve(__dirname, '../..');

test('recursively replace absolute paths in keys and values', () => {
	const result = deabsDeep({
		[`${rootDir}/a/b.js`]: `${rootDir}/c/d.js`,
		foo: {
			[`${rootDir}/e/f.txt`]: `${rootDir}/g/h.txt`,
			bar: 1,
		},
	});
	expect(result).toMatchSnapshot();
});

test('recursively replace custom paths in keys and values', () => {
	const result = deabsDeep(
		{
			[`/foo/bar/a/b.js`]: `/foo/bar/c/d.js`,
			foo: {
				[`/foo/bar/e/f.txt`]: `/foo/bar/g/h.txt`,
				bar: {
					baz: 42,
				},
			},
		},
		{ root: '/foo/bar' }
	);
	expect(result).toMatchSnapshot();
});

test('absolute paths in array values', () => {
	const result = deabsDeep([
		`${rootDir}/a/b.js`,
		`${rootDir}/e/f.txt`,
		42,
		{
			bar: {
				baz: 42,
			},
		},
	]);
	expect(result).toMatchSnapshot();
});

test('custom mask', () => {
	const result = deabsDeep([`${rootDir}/a/b.js`], { mask: '<rootDir>' });
	expect(result).toMatchSnapshot();
});

test('ignore non plain objects', () => {
	class Pizza {
		constructor(x) {
			this.data = x;
		}
	}
	const result = deabsDeep({
		a: undefined,
		b: null,
		c: 1,
		d: 'x',
		f: /x/,
		g: new Pizza('x'),
	});
	expect(result).toMatchSnapshot();
});

test('load absolute path on windows too', () => {
	const result = deabsDeep({
		winPath: __dirname,
	});
	expect(result.winPath).toMatchInlineSnapshot(`"~/src/__tests__"`);
});
