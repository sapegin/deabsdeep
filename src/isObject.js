// Borrowed from https://github.com/sindresorhus/map-obj

/**
 * @param {any} x
 * @return {boolean}
 */
module.exports = function isObject(x) {
	return (
		typeof x === 'object' &&
		x !== null &&
		!(x instanceof RegExp) &&
		!(x instanceof Error) &&
		!(x instanceof Date)
	);
};
