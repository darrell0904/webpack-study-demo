const path = require('path');
const fs = require('fs');
const webpack = require('webpack');
const HappyPack = require('happypack');
const TerserPlugin = require('terser-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const AddAssetHtmlWebpackPlugin = require('add-asset-html-webpack-plugin');
const HardSourceWebpackPlugin = require('hard-source-webpack-plugin');
const devConfig = require('./webpack.dev.js');
const prodConfig = require('./webpack.prod.js');
const merge = require('webpack-merge');
const glob = require('glob');
const PurgecssPlugin = require('purgecss-webpack-plugin');

const PATHS = {
	src: path.join(__dirname, './src')
};

const SpeedMeasurePlugin = require("speed-measure-webpack-plugin");
const smp = new SpeedMeasurePlugin({
	customUglifyName: AddAssetHtmlWebpackPlugin,
});

const makePlugins = (configs) => {
	const plugins = [
		new CleanWebpackPlugin(),
		new BundleAnalyzerPlugin({
			analyzerHost: '127.0.0.1',
			analyzerPort: 8889,
			openAnalyzer: false,
		}),
		// new HappyPack({
		// 	loaders: [ 'babel-loader' ]
		// }),
		new HardSourceWebpackPlugin(),
		new PurgecssPlugin({
			paths: glob.sync(`${PATHS.src}/**/*`,  { nodir: true }),
		}),
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
	});
	return plugins;
}

const commonConfig = {
	entry: {
		main: "./src/index.js",
		// entry2: "./src/entry2.js",
		// entry3: "./src/entry3.js",
		// entry4: "./src/entry4.js",
		// entry5: "./src/entry5.js",
		// entry6: "./src/entry6.js",
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
			// exclude: /node_modules/,
			// include: path.resolve(__dirname, '../src'), 
			use: [
				{
					loader: 'thread-loader',
					options: {
						workers: 3,
					}
				},
				// 'happypack/loader'
				{
					loader: 'babel-loader',
					options: {
						cacheDirectory: true,
					}
				},
			]
		}, {
			test: /\.(png|jpg|gif)$/,
			use: [
				{
					loader: 'file-loader',
					options: {
						name: '[name]_[hash].[ext]',
						outputPath: 'images/',
					}
				},
				{
					loader: 'image-webpack-loader',
					options: {
						mozjpeg: {
							progressive: true,
							quality: 65
						},
						// optipng.enabled: false will disable optipng
						optipng: {
							enabled: false,
						},
						pngquant: {
							quality: [0.65, 0.9],
							speed: 4
						},
						gifsicle: {
							interlaced: false,
						},
						// the webp option will enable WEBP
						webp: {
							quality: 75
						}
					}
				}
			]
		}, {
			test: /\.(eot|ttf|svg|woff|woff2)$/,
			use: {
				loader: 'file-loader',
			}
		}]
	},
	optimization: {
		minimize: true,
		minimizer: [
			// new TerserPlugin({
			// 	parallel: false,
			// })
		],
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
		const endConfig = merge(commonConfig, prodConfig);
		return endConfig;
	} else {
		return merge(commonConfig, devConfig);
	}
};