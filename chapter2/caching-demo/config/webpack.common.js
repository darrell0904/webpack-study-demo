const HtmlWebpackPlugin = require('html-webpack-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = {
	entry: {
		main: "./src/index.js",
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