'use strict';

const path = require('path');

/**
 * @param {string} [dir]
 * @return {string}
 */
module.exports = function gtRootDir(dir) {
	dir = dir || __dirname;
	const m = dir.match(/[\\/]node_modules[\\/]/);
	return m
		? dir.substring(0, m.index)
		: path.resolve(require.resolve('.'), '../..');
};
