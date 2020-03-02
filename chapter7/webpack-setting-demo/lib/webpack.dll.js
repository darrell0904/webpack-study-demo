const path = require('path');
const webpack = require('webpack');

module.exports = {
  mode: 'production',
  entry: {
    vendors: ['lodash'],
    react: ['react', 'react-dom'],
  },
  output: {
    filename: '[name]_[chunkhash].dll.js',
    path: path.join(__dirname, '../dll'),
    library: '[name]',
  },
  plugins: [
    new webpack.DllPlugin({
      name: '[name]',
      path: path.join(__dirname, '../dll/[name].manifest.json'),
    }),
  ],
};
