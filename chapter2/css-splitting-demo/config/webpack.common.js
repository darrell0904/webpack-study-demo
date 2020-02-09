const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

function recursiveIssuer(m) {
  if (m.issuer) {
    return recursiveIssuer(m.issuer);
  } else if (m.name) {
    return m.name;
  } else {
    return false;
  }
}

module.exports = {
	entry: {
		main: "./src/index.js",
		entry2: "./src/entry2.js",
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
		splitChunks: {
			chunks: 'all',
			minSize: 0,
			automaticNameDelimiter: '~',
			cacheGroups: {
				fooStyles: {
          name: 'main',
          test: (m, c, entry = 'main') =>
            m.constructor.name === 'CssModule' && recursiveIssuer(m) === entry,
          chunks: 'all',
          enforce: true,
        },
        barStyles: {
          name: 'entry2',
          test: (m, c, entry = 'entry2') =>
            m.constructor.name === 'CssModule' && recursiveIssuer(m) === entry,
          chunks: 'all',
          enforce: true,
        },
      }
		},
	},
	output: {
		filename: "[name].bundle.js",
		chunkFilename: '[name].chunk.js', // 简介引入代码输出的名字
		path: path.resolve(__dirname, '../dist')
	}
}