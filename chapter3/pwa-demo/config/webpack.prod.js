const path = require('path');
const merge = require('webpack-merge');
const WorkboxPlugin = require('workbox-webpack-plugin');
const commonConfig = require('./webpack.common.js');

const prodConfig = {
	mode: 'production',
  devtool: 'cheap-module-source-map', // production
  plugins: [
		new WorkboxPlugin.GenerateSW({
			clientsClaim: true,
			skipWaiting: true
		})
	],
	output: {
		path: path.resolve(__dirname, '../dist'),
		filename: "[name].[contenthash].js",
	}
}

module.exports = merge(commonConfig, prodConfig);