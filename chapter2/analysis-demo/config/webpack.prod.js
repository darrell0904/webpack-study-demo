const merge = require('webpack-merge');
const commonConfig = require('./webpack.common.js');

const prodConfig = {
	mode: 'production',
  devtool: 'cheap-module-source-map', // production
}

module.exports = merge(commonConfig, prodConfig);