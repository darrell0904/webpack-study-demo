const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackExternalsPlugin = require('html-webpack-externals-plugin');
const devConfig = require('./webpack.dev.js');
const prodConfig = require('./webpack.prod.js');
const merge = require('webpack-merge');

const commonConfig = {
	entry: {
		main: "./src/index.js",
	},
	module: {
		rules: [{ 
			test: /\.js$/, 
			exclude: /node_modules/, 
			use: [
				{
					loader: 'babel-loader'
				}, 
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
		}),
		new BundleAnalyzerPlugin({
			analyzerHost: '127.0.0.1',
			analyzerPort: 8889,
			openAnalyzer: false,
		}),
		new HtmlWebpackExternalsPlugin({
			externals: [
				{
					module: 'react',
					entry: 'https://11.url.cn/now/lib/16.2.0/react.min.js',
					global: 'React',
				},
				{
					module: 'react-dom',
					entry: 'https://11.url.cn/now/lib/16.2.0/react-dom.min.js',
					global: 'ReactDOM',
				},
			]
		}),
	],
	optimization: {
		usedExports: true,
		// splitChunks: {
		// 	chunks: 'all',
		// 	cacheGroups: {
		// 		vendors: {
		// 			test: /[\\/]node_modules[\\/]/,
		// 			priority: -10,
		// 			name: 'vendors',
		// 		}
		// 	}
		// },
	},
	performance: false, // 关闭性能上的一些问题
}

module.exports = (production) => {
	console.log('production', production);
	if (production) {
		return merge(commonConfig, prodConfig);
	} else {
		return merge(commonConfig, devConfig);
	}
};