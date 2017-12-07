const deabsDeep = require('./src');
const isObject = require('is-plain-obj');

// Borrowed from https://github.com/eyolas/jest-serializer-supertest
const KEY = '__JEST_SERIALIZER_DEABSDEEP__';

module.exports = {
	test(val) {
		return (Array.isArray(val) || isObject(val)) && !Object.prototype.hasOwnProperty.call(val, KEY);
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
