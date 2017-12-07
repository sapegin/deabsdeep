const deabsDeep = require('../index');

test('recursively replace absolute paths in keys and values', () => {
	const result = deabsDeep({
		[`${__dirname}/a/b.js`]: `${__dirname}/c/d.js`,
		foo: {
			[`${__dirname}/e/f.txt`]: `${__dirname}/g/h.txt`,
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
		`${__dirname}/a/b.js`,
		`${__dirname}/e/f.txt`,
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
	const result = deabsDeep([`${__dirname}/a/b.js`], { mask: '<rootDir>' });
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
		e: new Date('1984-12-05T03:24:00'),
		f: /x/,
		g: new Pizza('x'),
	});
	expect(result).toMatchSnapshot();
});
