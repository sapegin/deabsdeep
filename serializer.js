const deabsDeep = require('./src');
const isObject = require('./src/isObject');

// Borrowed from https://github.com/eyolas/jest-serializer-supertest
const KEY = '__JEST_SERIALIZER_DEABSDEEP__';

module.exports = {
	test(val) {
		return !Object.prototype.hasOwnProperty.call(val, KEY) && (Array.isArray(val) || isObject(val));
	},
	print(val, serialize) {
		const newVal = deabsDeep(val);

		// To skip maximum call stack size exceeded
		Object.defineProperty(newVal, KEY, {
			enumerable: false,
		});

		return serialize(newVal);
	},
};
