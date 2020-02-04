const webpack = require('webpack');
const merge = require('webpack-merge');
const commonConfig = require('./webpack.common.js');

const devConfig = {
	mode: 'development',
  devtool: 'cheap-module-eval-source-map', // development
  devServer: {
		contentBase: './dist',
		open: true,
		port: 3002,
		hot: true
  },
  plugins: [
		new webpack.HotModuleReplacementPlugin()
	],
}

module.exports = merge(commonConfig, devConfig);

