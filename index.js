const mapObj = require('map-obj');

const MASK = '~';
const DIRNAME = __dirname.substring(0, __dirname.indexOf('/node_modules/')) || __dirname;

/**
 * Recursively replace absolute paths in object keys and values or in array values with a “~”.
 *
 * @param {object} obj
 * @param {object} [options]
 * @param {string} [options.root]
 * @param {string} [options.mask]
 * @return {object}
 */
module.exports = function(obj, options) {
	options = options || {};
	const root = options.root || DIRNAME;
	const mask = options.mask || MASK;

	const regExp = new RegExp(root, 'g');
	const deabs = s => (typeof s === 'string' ? s.replace(regExp, mask) : s);

	if (Array.isArray(obj)) {
		return obj.map(deabs);
	}

	return mapObj(obj, (key, value) => [deabs(key), deabs(value)], { deep: true });
};
