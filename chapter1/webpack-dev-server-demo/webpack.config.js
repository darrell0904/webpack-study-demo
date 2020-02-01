const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = {
	mode: 'development',
	devtool: 'cheap-module-eval-source-map', // development
	entry: './src/index.js',
	devServer: {
		contentBase: './dist',
		open: true,
		port: 8080,
		historyApiFallback: true,
		publicPath: "/assets/"
	},
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
				'style-loader',
				{
					loader: 'css-loader',
					options: {
						importLoaders: 2,
						// modules: true,
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
		filename: 'main.js',
		path: path.resolve(__dirname, 'dist')
	}
}