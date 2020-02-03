const path = require('path');
const merge = require('webpack-merge');
const commonConfig = require('./webpack.common.js');

const prodConfig = {
	mode: 'production',
  devtool: 'cheap-module-source-map', // production
  externals: 'lodash',
  // externals: ['lodash'],
  // externals: {
  //   commonjs: 'lodash',
  //   root: '_',
  // }
	output: {
		path: path.resolve(__dirname, '../dist'),
		filename: 'library.js',
		library: 'root',
    libraryTarget: 'this',
    libraryExport: 'default'
	}
}

module.exports = merge(commonConfig, prodConfig);