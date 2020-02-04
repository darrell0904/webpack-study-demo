const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = {
	entry: {
		main: './src/index.js',
	},
	module: {
		rules: [{ 
			test: /\.js$/, 
			exclude: /node_modules/, 
			loader: 'babel-loader',
		}, {
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
	optimization: {
		splitChunks: {
			chunks: "all",
			minSize: 30000,
			// minChunks: 1,
			// maxAsyncRequests: 5,
			// maxInitialRequests: 1,
			// automaticNameDelimiter: '~',
			// name: true,
			// cacheGroups: {
			// 	vendors: false,
			// 	default: false,
			// },
			cacheGroups: {
				'jquery': {
          test: /jquery/, // 直接使用 test 来做路径匹配
          chunks: "initial",
          name: "jquery",
          enforce: true,
				},
				'lodash': {
          test: /lodash/, // 直接使用 test 来做路径匹配
          chunks: "initial",
          name: "lodash",
          enforce: true,
        },
			}
		},
		// runtimeChunk: {
		// 	name: 'runtime'
		// }
	},
	output: {
		filename: '[name].js',
		path: path.resolve(__dirname, '../dist')
	}
}