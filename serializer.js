const isPlainObj = require('is-plain-obj');
const deabsDeep = require('./index');

module.exports = {
	test(val) {
		return Array.isArray(val) || isPlainObj(val);
	},
	print(val) {
		return deabsDeep(val);
	},
};
