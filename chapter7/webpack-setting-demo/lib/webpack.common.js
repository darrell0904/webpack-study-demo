const fs = require('fs');
const webpack = require('webpack');
const AddAssetHtmlWebpackPlugin = require('add-asset-html-webpack-plugin');
const path = require('path');
const autoprefixer = require('autoprefixer');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HardSourceWebpackPlugin = require('hard-source-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
// const HappyPack = require('happypack');

const projectRoot = process.cwd();

const glob = require('glob');
const PurgecssPlugin = require('purgecss-webpack-plugin');

const PATHS = {
  src: path.join(projectRoot, './src'),
};

const setMPA = () => {
  const entry = {};
  const htmlWebpackPlugins = [];
  const entryFiles = glob.sync(path.join(projectRoot, './src/*/index.js'));

  Object.keys(entryFiles)
    .map((index) => {
      const entryFile = entryFiles[index];

      const match = entryFile.match(/src\/(.*)\/index\.js/);
      const pageName = match && match[1];

      entry[pageName] = entryFile;

      return htmlWebpackPlugins.push(
        new HtmlWebpackPlugin({
          inlineSource: '.css$',
          template: path.join(projectRoot, `./src/${pageName}/index.html`),
          filename: `${pageName}.html`,
          chunks: ['vendors', pageName],
          inject: true,
          minify: {
            html5: true,
            collapseWhitespace: true,
            preserveLineBreaks: false,
            minifyCSS: true,
            minifyJS: true,
            removeComments: false,
          },
        })
      );
    });

  return {
    entry,
    htmlWebpackPlugins,
  };
};

const { entry, htmlWebpackPlugins } = setMPA();

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
    new MiniCssExtractPlugin({
      filename: '[name].css', // 直接引用
      chunkFilename: '[name].chunk.css', // 间接引用
    }),
    new HardSourceWebpackPlugin(),
    new PurgecssPlugin({
      paths: glob.sync(`${PATHS.src}/**/*`, { nodir: true }),
    }),
  ];

  return plugins.concat(htmlWebpackPlugins);;
};

const commonConfig = {
  entry,
  output: {
    filename: '[name]_[chunkhash:8].js',
    chunkFilename: '[name]_chunk.js', // 简介引入代码输出的名字
    path: path.resolve(projectRoot, './dist'),
  },
  resolve: {
    extensions: ['.js', '.jsx'],
    alias: {
      alias: path.resolve(projectRoot, './src/alias'),
    },
  },
  module: {
    rules: [{
      test: /\.jsx?$/,
      use: [
        {
          loader: 'thread-loader',
          options: {
            workers: 3,
          },
        },
        {
          loader: 'babel-loader',
          options: {
            cacheDirectory: true,
          },
        },
      ],
    }, {
      test: /\.less$/,
      include: path.resolve(projectRoot, './src'),
      use: [
        {
          loader: MiniCssExtractPlugin.loader,
          options: {
            // 只在开发模式中启用热更新
            hmr: true,
            // 如果模块热更新不起作用，重新加载全部样式
            reloadAll: true,
          },
        },
        {
          loader: 'css-loader',
          options: {
            importLoaders: 2,
          },
        },
        'less-loader',
        'postcss-loader'
      ],
    }, {
      test: /\.css$/,
      include: path.resolve(projectRoot, './src'),
      use: [
        {
          loader: MiniCssExtractPlugin.loader,
          options: {
            hmr: true,
          },
        },
        {
          loader: 'css-loader',
          options: {
            modules: true,
          },
        },
      ],
    }, {
      test: /\.(png|jpg|gif)$/,
      use: [
        {
          loader: 'file-loader',
          options: {
            name: '[name]_[hash].[ext]',
            outputPath: 'images/',
          },
        },
        {
          loader: 'image-webpack-loader',
          options: {
            mozjpeg: {
              progressive: true,
              quality: 65,
            },
            // optipng.enabled: false will disable optipng
            optipng: {
              enabled: false,
            },
            pngquant: {
              quality: [0.65, 0.9],
              speed: 4,
            },
            gifsicle: {
              interlaced: false,
            },
            // the webp option will enable WEBP
            webp: {
              quality: 75,
            },
          },
        },
      ],
    }, {
      test: /\.(eot|ttf|svg|woff|woff2)$/,
      use: {
        loader: 'file-loader',
      },
    }],
  },
  performance: false, // 关闭性能上的一些问题
};

commonConfig.plugins = makePlugins(commonConfig);

module.exports = commonConfig;
