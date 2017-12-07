'use strict';

// Adapted from https://github.com/sindresorhus/map-obj
// Updates only arrays and plain objects

const isObject = require('is-plain-obj');

/**
 * @param {object} obj
 * @param {Function} fn
 * @param {WeakMap} seen
 * @return {object}
 */
module.exports = function mapObj(obj, fn, seen) {
	seen = seen || new WeakMap();

	if (seen.has(obj)) {
		return seen.get(obj);
	}

	const target = {};

	seen.set(obj, target);

	for (const key of Object.keys(obj)) {
		const val = obj[key];
		const res = fn(key, val, obj);
		let newVal = res[1];

		if (isObject(newVal)) {
			if (Array.isArray(newVal)) {
				newVal = newVal.map(x => (isObject(x) ? mapObj(x, fn, seen) : x));
			} else {
				newVal = mapObj(newVal, fn, seen);
			}
		}

		target[res[0]] = newVal;
	}

	return target;
};
