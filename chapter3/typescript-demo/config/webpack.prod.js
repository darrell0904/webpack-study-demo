const path = require('path');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");

const prodConfig = {
	mode: 'production',
  // devtool: 'cheap-module-source-map', // production
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
	output: {
		filename: "[name].[contenthash].js",
		chunkFilename: '[name].[contenthash].js', // 简介引入代码输出的名字
		path: path.resolve(__dirname, '../dist')
	}
}

module.exports = prodConfig;