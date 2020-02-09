const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const merge = require('webpack-merge');
const commonConfig = require('./webpack.common.js');

const prodConfig = {
	mode: 'production',
  devtool: 'cheap-module-source-map', // production
  module: {
		rules: [{
			test: /\.less$/,
			use: [
				{
					loader: MiniCssExtractPlugin.loader,
					options: {
						publicPath: '/public/path/to/',
						hmr: true,
					},
				},
				{
					loader: 'css-loader',
					options: {
						importLoaders: 2,
					}
				},
				'less-loader',
				'postcss-loader',
			]
		}]
  },
  plugins: [
		new MiniCssExtractPlugin({
			filename: '[name].css', // 直接引用
			chunkFilename: '[name].chunk.css' // 间接引用
    }),
  ],
  optimization: {
		minimizer: [new OptimizeCSSAssetsPlugin({})]
	},
}

module.exports = merge(commonConfig, prodConfig);