const path = require('path');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HtmlWebpackPlugin = require('html-webpack-plugin');
const OptimizeCSSAssetsPlugin = require("");optimize-css-assets-webpack-plugin
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

console.log('---process.env.NODE_ENV--', process.env.NODE_ENV);
module.exports = {
	mode: 'production',
	// devtool: 'eval',
	devtool: 'cheap-module-eval-source-map', // development
	entry: './src/index.js',
	devServer: {
		contentBase: './dist',
		open: true,
		port: 8999,
		historyApiFallback: true,
		publicPath: "/"
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
				MiniCssExtractPlugin.loader,
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
			inject: true,
			minify: {
				html5: true,
				collapseWhitespace: true,
				preserveLineBreaks: false,
				minifyCSS: true,
				minifyJS: true,
				removeComments: false,
			}
		}),
		new MiniCssExtractPlugin({
			filename: '[name].css', // 直接引用
			chunkFilename: '[name].chunk.css' // 间接引用
    }),
	],
	optimization: {
		minimizer: [new OptimizeCSSAssetsPlugin({})]
	},
	output: {
		filename: '[name]_[Hash:8].js',
		path: path.resolve(__dirname, 'dist')
	}
}