const path = require('path');
const fs = require('fs');
const webpack = require('webpack');
const autoprefixer = require('autoprefixer');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const AddAssetHtmlWebpackPlugin = require('add-asset-html-webpack-plugin');
const HardSourceWebpackPlugin = require('hard-source-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
// const HappyPack = require('happypack');

const glob = require('glob');
const PurgecssPlugin = require('purgecss-webpack-plugin');

const PATHS = {
  src: path.join(__dirname, './src'),
};

// const SpeedMeasurePlugin = require('speed-measure-webpack-plugin');

// const smp = new SpeedMeasurePlugin({
// });

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
  Object.keys(configs.entry).forEach((item) => {
    plugins.push(
      new HtmlWebpackPlugin({
        template: 'src/index.html',
        filename: `${item}.html`,
        chunks: ['runtime', 'vendors', item],
      }),
    );
  });
  const files = fs.readdirSync(path.resolve(__dirname, '../dll'));
  files.forEach((file) => {
    if (/.*\.dll.js/.test(file)) {
      plugins.push(new AddAssetHtmlWebpackPlugin({
        filepath: path.resolve(__dirname, '../dll', file),
      }));
    }
    if (/.*\.manifest.json/.test(file)) {
      plugins.push(new webpack.DllReferencePlugin({
        manifest: path.resolve(__dirname, '../dll', file),
      }));
    }
  });
  return plugins;
};

const commonConfig = {
  entry: {
    main: './src/index.js',
  },
  output: {
    filename: '[name].bundle.js',
    chunkFilename: '[name].chunk.js', // 简介引入代码输出的名字
    path: path.resolve(__dirname, '../dist'),
  },
  resolve: {
    extensions: ['.js', '.jsx'],
    alias: {
      alias: path.resolve(__dirname, '../src/alias'),
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
      include: path.resolve(__dirname, '../src'),
      use: [
        {
          loader: MiniCssExtractPlugin.loader,
          options: {
            publicPath: '/public/path/to/',
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
        {
          loader: 'postcss-loader',
          options: {
            plugins: () => [
              autoprefixer({
                browsers: ['last 2 version', '>1%', 'ios 7'],
              }),
            ],
          },
        },
      ],
    }, {
      test: /\.css$/,
      include: path.resolve(__dirname, '../src'),
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
