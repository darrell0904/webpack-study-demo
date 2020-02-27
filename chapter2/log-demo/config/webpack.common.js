const HtmlWebpackPlugin = require('html-webpack-plugin');
// const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin');

module.exports = {
	entry: {
		main: "./src/index.js",
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
		}]
	},
	plugins: [
		new CleanWebpackPlugin(),
		new FriendlyErrorsWebpackPlugin(),
		new HtmlWebpackPlugin({
			template: 'src/index.html',
		}),
		// new BundleAnalyzerPlugin({
		// 	analyzerHost: '127.0.0.1',
		// 	analyzerPort: 8889,
		// 	openAnalyzer: false,
		// }),
		function() {
			this.hooks.done.tap('done', (stats) => {
					if (stats.compilation.errors && stats.compilation.errors.length && process.argv.indexOf('--watch') == -1)
					{
							console.log('build error，no babel loader');
							// process.exit(1);
					}
			})
	} 
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
	// performance: false, // 关闭性能上的一些问题
	stats: 'errors-only',
}