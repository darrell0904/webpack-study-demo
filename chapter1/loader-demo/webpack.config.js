const path = require('path');

module.exports = {
	mode: 'development',
	entry: './src/index.js',
	module: {
		rules: [{
			test: /\.png$/,
			use: {
				loader: 'file-loader',
			}
		}]
	},
	output: {
		filename: 'bundle.js',
		path: path.resolve(__dirname, 'bundle')
	}
}