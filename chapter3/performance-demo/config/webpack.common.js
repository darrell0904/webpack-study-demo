const path = require('path');
const fs = require('fs');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const AddAssetHtmlWebpackPlugin = require('add-asset-html-webpack-plugin');
const devConfig = require('./webpack.dev.js');
const prodConfig = require('./webpack.prod.js');
const merge = require('webpack-merge');

const plugins = [
	new CleanWebpackPlugin(),
	new HtmlWebpackPlugin({
		template: 'src/index.html',
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
];

const files = fs.readdirSync(path.resolve(__dirname, '../dll'));

files.forEach(file => {
	if(/.*\.dll.js/.test(file)) {
		plugins.push(new AddAssetHtmlWebpackPlugin({
			filepath: path.resolve(__dirname, '../dll', file)
		}))
	}
	if(/.*\.manifest.json/.test(file)) {
		plugins.push(new webpack.DllReferencePlugin({
			manifest: path.resolve(__dirname, '../dll', file)
		}))
	}
})

const commonConfig = {
	entry: {
		main: "./src/index.js",
	},
	resolve: {
		extensions: ['.js', '.jsx'],
		mainFiles: ['index', 'list'],
		alias: {
			alias: path.resolve(__dirname, '../src/alias'), 
		}
	},
	module: {
		rules: [{ 
			test: /\.jsx?$/, 
			exclude: /node_modules/,
			include: path.resolve(__dirname, '../src'), 
			use: ['babel-loader']
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
	plugins,
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

module.exports = (production) => {
	if (production) {
		return merge(commonConfig, prodConfig);
	} else {
		return merge(commonConfig, devConfig);
	}
};