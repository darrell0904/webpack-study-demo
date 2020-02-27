const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = {
	mode: 'development',
	entry: './src/index.js',
	module: {
		rules: [{
			test: /\.(png|jpg|gif)$/,
			use: {
				loader: 'file-loader',
				options: {
					name: '[name]_[hash].[ext]',
					outputPath: 'images/',
				}
			}
		}, {
			test: /\.(eot|ttf|svg|woff|woff2)$/,
			use: {
				loader: 'file-loader',
			}
		}, {
			test: /\.less$/,
			use: [
				{
					loader: 'style-loader',
					options: {
						insertAt: 'top', // 样式插入到 <head>
						singleton: true, //将所有的style标签合并成一个
					}
				},
				{
					loader: 'css-loader',
					options: {
						importLoaders: 2,
						// modules: true,
					}
				},
				{
					loader: 'px2rem-loader',
					options: {
						remUnit: 75,
						remPrecision: 8
					}
				},
				'less-loader',
				'postcss-loader',
			]
		}]
	},
	plugins: [
		new CleanWebpackPlugin(),
		new HtmlWebpackPlugin({
			template: 'src/index.html',
		}),
	],
	output: {
		filename: 'bundle.js',
		path: path.resolve(__dirname, 'bundle')
	}
}