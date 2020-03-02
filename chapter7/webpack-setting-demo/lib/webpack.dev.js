const webpack = require('webpack');
const merge = require('webpack-merge');
const commonConfig = require('./webpack.common');

const devConfig = {
  mode: 'development',
  devtool: 'cheap-module-eval-source-map', // development
  devServer: {
    hot: true,
    stats: 'errors-only',
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
  ],
};


module.exports = devConfig;
