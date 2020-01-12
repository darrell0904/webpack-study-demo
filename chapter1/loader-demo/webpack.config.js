const path = require('path');

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
	output: {
		filename: 'bundle.js',
		path: path.resolve(__dirname, 'bundle')
	}
}