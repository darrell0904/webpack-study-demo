const path = require('path');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const webpack = require('webpack');

const devConfig = {
	mode: 'development',
  devtool: 'cheap-module-eval-source-map', // development
	module: {
		rules: [{
			test: /\.less$/,
			use: [
				{
					loader: MiniCssExtractPlugin.loader,
					options: {
						publicPath: '/public/path/to/',
						// 只在开发模式中启用热更新
						hmr: true,
						// 如果模块热更新不起作用，重新加载全部样式
						reloadAll: true,
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
	devServer: {
		contentBase: './dist',
		// open: true,
		port: 8080,
		hot: true
	},
  plugins: [
		new webpack.HotModuleReplacementPlugin(),
		new MiniCssExtractPlugin({
			filename: '[name].css', // 直接引用
			chunkFilename: '[name].chunk.css' // 间接引用
    }),
	],
	output: {
		filename: "[name].bundle.js",
		chunkFilename: '[name].chunk.js', // 简介引入代码输出的名字
		path: path.resolve(__dirname, '../dist')
	},
	optimization: {
		minimizer: [new OptimizeCSSAssetsPlugin({})]
	},
}

module.exports = devConfig;

