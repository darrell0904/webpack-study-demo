const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const ssrConfig = {
  mode: 'production',
  entry: {
    main: path.resolve(__dirname, '../src/index-server.js'),
  },
  target: 'node',
  module: {
    rules: [{
      test: /\.less$/,
      use: [
        {
          loader: MiniCssExtractPlugin.loader,
          options: {
            publicPath: '/public/path/to/',
            hmr: true,
          },
        },
        {
          loader: 'css-loader',
          options: {
            importLoaders: 2,
          },
        },
        'less-loader',
        'postcss-loader',
      ],
    }, {
      test: /\.js|jsx$/,
      exclude: /node_modules/,
      use: [
        {
          loader: 'babel-loader',
          options: {
            presets: [
            ],
          },
        },
      ],
    }, {
      test: /\.(png|jpg|gif)$/,
      use: {
        loader: 'file-loader',
        options: {
          name: '[name]_[hash].[ext]',
          outputPath: 'images/',
        },
      },
    }, {
      test: /\.(eot|ttf|svg|woff|woff2)$/,
      use: {
        loader: 'file-loader',
      },
    }],
  },
  plugins: [
    new CleanWebpackPlugin(),
    new MiniCssExtractPlugin({
      filename: '[name].css', // 直接引用
      chunkFilename: '[name].chunk.css', // 间接引用
    }),
    new HtmlWebpackPlugin({
      template: 'src/index.html',
    }),
  ],
  optimization: {
    minimizer: [new OptimizeCSSAssetsPlugin({})],
  },
  output: {
    path: path.resolve(__dirname, '../dist'),
    filename: '[name]-server.js',
    libraryTarget: 'umd',
    libraryExport: 'default',
  },
  performance: false,
};

module.exports = ssrConfig;
