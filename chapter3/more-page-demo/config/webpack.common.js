const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const devConfig = require('./webpack.dev.js');
const prodConfig = require('./webpack.prod.js');
const merge = require('webpack-merge');

const makePlugins = (configs) => {

	const plugins = [
		new CleanWebpackPlugin(),
	];

	Object.keys(configs.entry).forEach(item => {
		plugins.push(
			new HtmlWebpackPlugin({
				template: 'src/index.html',
				filename: `${item}.html`,
				chunks: ['runtime', 'vendors', item]
			})
		)
	});

	return plugins;
}

const commonConfig = {
	entry: {
		main: "./src/index.js",
		list: "./src/list.js",
		details: "./src/details.js",
		userInfo: "./src/userinfo.js",
	},
	module: {
		rules: [{ 
			test: /\.js|jsx$/, 
			exclude: /node_modules/, 
			use: [
				'babel-loader',
				{
					loader: 'eslint-loader',
					options: {
						
					}
				}
			]
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
		}]
	},
	plugins: [
		new CleanWebpackPlugin(),

		new HtmlWebpackPlugin({
			template: 'src/index.html',
			filename: 'index.html',
			chunks: ['runtime', 'vendors', 'main'],
		}),
		new HtmlWebpackPlugin({
			template: 'src/index.html',
			filename: 'list.html',
			chunks: ['runtime', 'vendors', 'list'],
		}),
		new HtmlWebpackPlugin({
			template: 'src/index.html',
			filename: 'details.html',
			chunks: ['runtime', 'vendors', 'details'],
		}),

		new BundleAnalyzerPlugin({
			analyzerHost: '127.0.0.1',
			analyzerPort: 8889,
			openAnalyzer: false,
		}),
		new webpack.ProvidePlugin({
			$: 'jquery',
			_: 'lodash',
			_join: ['lodash', 'join']
		})
	],
	optimization: {
		usedExports: true,
		runtimeChunk: {
			name: 'runtime',
		},
		splitChunks: {
			chunks: 'all',
			cacheGroups: {
				vendors: {
					test: /[\\/]node_modules[\\/]/,
					priority: -10,
					name: 'vendors',
				}
			}
		},
	},
	performance: false, // 关闭性能上的一些问题
}

commonConfig.plugins = makePlugins(commonConfig);

module.exports = (production) => {
	if (production) {
		return merge(commonConfig, prodConfig);
	} else {
		return merge(commonConfig, devConfig);
	}
};