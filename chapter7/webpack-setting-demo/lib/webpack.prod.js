const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const commonConfig = require('./webpack.common');

const prodConfig = {
  mode: 'production',
  devtool: 'cheap-module-source-map', // production
  optimization: {
    minimize: true,
    minimizer: [
      new TerserPlugin({
      	parallel: false,
      }),
      new OptimizeCSSAssetsPlugin({}),
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
        },
      },
    },
  },
};

module.exports = merge(commonConfig, prodConfig);
