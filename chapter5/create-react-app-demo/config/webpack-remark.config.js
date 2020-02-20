// webpack 核心配置文件

'use strict';

const fs = require('fs');
const path = require('path');
const webpack = require('webpack');

// 实现 `Node.js` 的 `require.resolve()` 方法
// https://github.com/browserify/resolve
const resolve = require('resolve');

// 全称 `Plug-and-Play`，译文为即插即用。应该是帮 webpack 自动配置 `resolver` 和 `resolveLoader` 的一个插件
// https://github.com/arcanis/pnp-webpack-plugin
const PnpWebpackPlugin = require('pnp-webpack-plugin');

// 生成 html 的 plugin
const HtmlWebpackPlugin = require('html-webpack-plugin');

// 强制Webpack要求区分大小写的路径。
// 这个Webpack插件将强制所有必需模块的整个路径与磁盘上实际路径的确切情况相匹配。 使用此插件有助于缓解OSX上的开发人员不遵循严格的路径区分大小写的情况
// https://github.com/Urthen/case-sensitive-paths-webpack-plugin
const CaseSensitivePathsPlugin = require('case-sensitive-paths-webpack-plugin');

// react-dev-utils 中的插件
// 将指定的代码文件通过行内的形式 嵌入到的 `html` 文件中
const InlineChunkHtmlPlugin = require('react-dev-utils/InlineChunkHtmlPlugin');

// 压缩 js 的插件
// https://github.com/webpack-contrib/terser-webpack-plugin
const TerserPlugin = require('terser-webpack-plugin');

// 将 css 提取出来的插件
// https://github.com/webpack-contrib/mini-css-extract-plugin
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

// 压缩 css 的插件
// https://github.com/NMFR/optimize-css-assets-webpack-plugin
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');

// `PostCSS` 的容错 `CSS` 解析器，它将查找并修复语法错误，能够解析任何输入。
// https://github.com/postcss/postcss-safe-parser
const safePostCssParser = require('postcss-safe-parser');

// 这个插件用来生成一份 assets 资源清单的 json 文件，即 chunks 插入到 html 中的地址，与 chunks 一一对应
// https://github.com/danethurber/webpack-manifest-plugin
const ManifestPlugin = require('webpack-manifest-plugin');

// react-dev-utils 中的插件
// 用于向 html 中注入相应的环境变量
const InterpolateHtmlPlugin = require('react-dev-utils/InterpolateHtmlPlugin');

// 帮助 webpack 打包 pwa，它可以帮助您构建一个由 Next.js 驱动的渐进式Web应用程序（PWA）。
// https://github.com/ragingwind/next-workbox-webpack-plugin
const WorkboxWebpackPlugin = require('workbox-webpack-plugin');

// react-dev-utils 中的插件
// https://www.npmjs.com/package/react-dev-utils
// 该webpack插件可确保 npm install <library> 强制进行项目重建。
const WatchMissingNodeModulesPlugin = require('react-dev-utils/WatchMissingNodeModulesPlugin');

// react-dev-utils 中的插件
// https://www.npmjs.com/package/react-dev-utils
// 这个 webpack 插件可确保从应用程序源目录的相对导入 不会到达外部。
const ModuleScopePlugin = require('react-dev-utils/ModuleScopePlugin');

// react-dev-utils 中的插件
// 为CSS模块创建一个类名，该类名使用文件名或文件夹名（如果命名为index.module.css）。
// 用于 import styles from 'style1.css'; 开启了 css module 的时候
const getCSSModuleLocalIdent = require('react-dev-utils/getCSSModuleLocalIdent');

// 引入 项目路径配置文件
const paths = require('./paths');

// 引入 项目模块配置文件
const modules = require('./modules');

// 引入 项目环境配置文件
const getClientEnvironment = require('./env');

// react-dev-utils 中的插件
// 这为未找到模块的错误提供了必要的上下文，提示相应的错误
const ModuleNotFoundPlugin = require('react-dev-utils/ModuleNotFoundPlugin');

// react-dev-utils 中的插件
// 估计是检查 typescript 代码 
// https://github.com/TypeStrong/fork-ts-checker-webpack-plugin
const ForkTsCheckerWebpackPlugin = require('react-dev-utils/ForkTsCheckerWebpackPlugin');

// react-dev-utils 中的插件
// 格式化 typescrpt
const typescriptFormatter = require('react-dev-utils/typescriptFormatter');

// 帮你引入浏览器列表中所需的normalize.css（或sanitize.css）部分，
// https://github.com/csstools/postcss-normalize
const postcssNormalize = require('postcss-normalize');

// package.json 的路径
const appPackageJson = require(paths.appPackageJson);

// 是否开启 sourceMap
// 源映射占用大量资源，并且可能导致大型源文件的内存不足问题。
const shouldUseSourceMap = process.env.GENERATE_SOURCEMAP !== 'false';

// 是否开启 将代码 以行内的形式嵌入到 html 中
// 有些不需要考虑 http 请求数量的话，就不需要开启
// 是构建流程更加顺畅
const shouldInlineRuntimeChunk = process.env.INLINE_RUNTIME_CHUNK !== 'false';


// 将图片打包近 js 中的 limit-size
// 用于 url-loader
const imageInlineSizeLimit = parseInt(
  process.env.IMAGE_INLINE_SIZE_LIMIT || '10000'
);

// 查看是否存在 ts 配置文件，以方便之后打包 ts 文件
const useTypeScript = fs.existsSync(paths.appTsConfig);

// 样式处理的一些正则，用于 loader 匹配相应的 样式文件
const cssRegex = /\.css$/;
const cssModuleRegex = /\.module\.css$/;
const sassRegex = /\.(scss|sass)$/;
const sassModuleRegex = /\.module\.(scss|sass)$/;

// 导出一个 构建配置文件的 方法
// 传入相应的环境变量
module.exports = function(webpackEnv) {
  // 开发环境
  const isEnvDevelopment = webpackEnv === 'development';
  // 生产环境
  const isEnvProduction = webpackEnv === 'production';

  // 用于在生产环境中启用性能分析的变量
  // 默认在生产环境 同时参数中有 `--profile` 参数的时候开启。
  const isEnvProductionProfile =
    isEnvProduction && process.argv.includes('--profile');

  // 获取到项目中 定义的 全局环境变量
  // 并将 `paths.publicUrlOrPath` 传入进去
  const env = getClientEnvironment(paths.publicUrlOrPath.slice(0, -1));

  // common function to get style loaders
  // 获取样式加载 loader 的方法
  const getStyleLoaders = (cssOptions, preProcessor) => {
    const loaders = [
      isEnvDevelopment && require.resolve('style-loader'),
      isEnvProduction && {
        loader: MiniCssExtractPlugin.loader,
        // css is located in `static/css`, use '../../' to locate index.html folder
        // in production `paths.publicUrlOrPath` can be a relative path
        // 因为打包好的 css 文件是放到 `static/css` 下的，如果是相对路径的话，就需要使用 “../../” 定位 `index.html` 文件夹
        options: paths.publicUrlOrPath.startsWith('.')
          ? { publicPath: '../../' }
          : {},
      },
      {
        loader: require.resolve('css-loader'),
        options: cssOptions,
      },
      {
        // 使用 postcss-loader
        loader: require.resolve('postcss-loader'),
        options: {
          ident: 'postcss',
          plugins: () => [
            // 解决 flex 的一些问题
            // https://github.com/luisrudge/postcss-flexbugs-fixes
            require('postcss-flexbugs-fixes'), 
            // 将现代 CSS 转换为大多数浏览器可以理解的内容，并根据目标浏览器或运行时环境确定所需的 polyfill。
            // https://preset-env.cssdb.org/
            require('postcss-preset-env')({
              autoprefixer: {
                flexbox: 'no-2009',
              },
              stage: 3,
            }),
            // 帮你引入浏览器列表中所需的normalize.css（或sanitize.css）部分，
            postcssNormalize(),
          ],
          sourceMap: isEnvProduction && shouldUseSourceMap,
        },
      },
    ].filter(Boolean);
    if (preProcessor) {
      loaders.push(
        {
          loader: require.resolve('resolve-url-loader'),
          options: {
            sourceMap: isEnvProduction && shouldUseSourceMap,
          },
        },
        {
          loader: require.resolve(preProcessor),
          options: {
            sourceMap: true,
          },
        }
      );
    }
    return loaders;
  };

  return {
    mode: isEnvProduction ? 'production' : isEnvDevelopment && 'development',
    // 遇到错误时，及时停止
    // 开发环境，遇到错误，可以继续打包；
    // 生产环境，遇到错误，立即停止；
    bail: isEnvProduction,
    // 根据环境配置，确定是否开启 sourceMap
    devtool: isEnvProduction
      ? shouldUseSourceMap
        ? 'source-map'
        : false
      : isEnvDevelopment && 'cheap-module-source-map',
    // 项目入口文件配置
    entry: [
      // 解决本地开发中，热更新的时候，websocket 可能存在一些问题
      // 它是 WebpackDevServer 的替代客户端，此客户端会显示语法错误覆盖。
      // https://github.com/react-doc/webpack-hot-dev-clients
      isEnvDevelopment &&
        require.resolve('react-dev-utils/webpackHotDevClient'), 
      // 入口文件
      paths.appIndexJs,
    ].filter(Boolean), // Array.filter(Boolean) 是过滤掉所有的 ”false“ 类型元素
    // 打包输出配置
    output: {
      // 项目打包目录
      path: isEnvProduction ? paths.appBuild : undefined,
      // 是否保留注释，默认在 开发环境保留；此选项默认值是 false
      pathinfo: isEnvDevelopment,
      // filename 根据环境 配置
      filename: isEnvProduction
        ? 'static/js/[name].[contenthash:8].js'
        : isEnvDevelopment && 'static/js/bundle.js',
      // 告诉 webpack 使用未来的版本，或者说最新的版本，去处理产出的文件
      // 在 webpack 5.0 会被移除
      futureEmitAssets: true,
      // chunkFilename 配置，如果你使用了代码分割的话，不是主入口引入的chunk 文件的名称
      chunkFilename: isEnvProduction
        ? 'static/js/[name].[contenthash:8].chunk.js'
        : isEnvDevelopment && 'static/js/[name].chunk.js',
      // 指定在浏览器中所引用的「此输出目录对应的公开 URL」，默认是 `/`
      publicPath: paths.publicUrlOrPath,
      // 自定义每个 source map 的 sources 数组中使用的名称，将源映射条目指向原始磁盘位置（在Windows上为URL格式）
      // 从而帮助我们使用 sourcemap 解决定位不准的问题
      devtoolModuleFilenameTemplate: isEnvProduction
        ? info =>
            path
              .relative(paths.appSrc, info.absoluteResourcePath)
              .replace(/\\/g, '/')
        : isEnvDevelopment &&
          (info => path.resolve(info.absoluteResourcePath).replace(/\\/g, '/')),
      // 如果在同一网页中使用了多个（来自不同编译过程(compilation)的）webpack runtime，则需要修改此选项。
      jsonpFunction: `webpackJsonp${appPackageJson.name}`,
      // 默认是指向 window，但是如果设置为 this 之后，便可以 `Node` 中去使用 
      globalObject: 'this',
    },
    // webpack4.0 优化代码配置项
    optimization: {
      // 根据环境，选择是不是压缩
      minimize: isEnvProduction,
      minimizer: [
        // 在生产环境下，压缩 js 的配置
        // 具体的配置大家可以参考 https://github.com/webpack-contrib/terser-webpack-plugin
        new TerserPlugin({
          terserOptions: {
            parse: {
              // We want terser to parse ecma 8 code. However, we don't want it
              // to apply any minification steps that turns valid ecma 5 code
              // into invalid ecma 5 code. This is why the 'compress' and 'output'
              // sections only apply transformations that are ecma 5 safe
              // https://github.com/facebook/create-react-app/pull/4234
              ecma: 8,
            },
            compress: {
              ecma: 5,
              warnings: false,
              // Disabled because of an issue with Uglify breaking seemingly valid code:
              // https://github.com/facebook/create-react-app/issues/2376
              // Pending further investigation:
              // https://github.com/mishoo/UglifyJS2/issues/2011
              comparisons: false,
              // Disabled because of an issue with Terser breaking valid code:
              // https://github.com/facebook/create-react-app/issues/5250
              // Pending further investigation:
              // https://github.com/terser-js/terser/issues/120
              inline: 2,
            },
            mangle: {
              safari10: true,
            },
            // 为可以在 devtools 中进行分析而添加
            keep_classnames: isEnvProductionProfile,
            keep_fnames: isEnvProductionProfile,
            output: {
              ecma: 5,
              comments: false,
              // Turned on because emoji and regex is not minified properly using default
              // https://github.com/facebook/create-react-app/issues/2488
              ascii_only: true,
            },
          },
          sourceMap: shouldUseSourceMap,
        }),
        // 压缩 css
        new OptimizeCSSAssetsPlugin({
          cssProcessorOptions: {
            parser: safePostCssParser,
            map: shouldUseSourceMap
              ? {
                  // `inline: false` 代表将文件强制输出到单独的文件中
                  inline: false,
                  // `annotation：true` 将 sourceMappingURL 附加到 css 文件中去，帮助 浏览器 找到 源映射文件
                  annotation: true,
                }
              : false,
          },
          cssProcessorPluginOptions: {
            preset: ['default', { minifyFontValues: { removeQuotes: false } }],
          },
        }),
      ],
      // 使用默认的 webpack 的 splitChunks
      splitChunks: {
        chunks: 'all',
        name: false,
      },
      // 将 runtime 文件单独的提取出来
      runtimeChunk: {
        name: entrypoint => `runtime-${entrypoint.name}`,
      },
    },
    resolve: {
      // 告诉 webpack 解析模块时应该搜索的目录。
      modules: ['node_modules', paths.appNodeModules].concat(
        modules.additionalModulePaths || []
      ),
      // 自动解析确定的扩展。默认值为：[".js", ".json"]
      extensions: paths.moduleFileExtensions
        .map(ext => `.${ext}`)
        .filter(ext => useTypeScript || !ext.includes('ts')),
      // 创建 import 或 require 的别名，来确保模块引入变得更简单。
      alias: {
        // Support React Native Web
        // https://www.smashingmagazine.com/2016/08/a-glimpse-into-the-future-with-react-native-for-web/
        'react-native': 'react-native-web',
        // Allows for better profiling with ReactDevTools
        ...(isEnvProductionProfile && {
          'react-dom$': 'react-dom/profiling',
          'scheduler/tracing': 'scheduler/tracing-profiling',
        }),
        ...(modules.webpackAliases || {}),
      },
      plugins: [
        // 增加了对使用 Plug'n'Play 安装的支持，从而加快了安装和添加过程
        PnpWebpackPlugin,
        // 确保从应用程序源目录的相对导入不会到达外部。
        new ModuleScopePlugin(paths.appSrc, [paths.appPackageJson]),
      ],
    },
    resolveLoader: {
      plugins: [
        // PnpWebpackPlugin 的配置
        PnpWebpackPlugin.moduleLoader(module),
      ],
    },
    module: {
      // 被引入的模块必须要有明确的exports语句才能正确导入
      strictExportPresence: true,
      rules: [
        // 禁用 require.ensure
        { parser: { requireEnsure: false } },

        // enforce: 'pre' 表示 lint 在 babel 解析之前执行。
        {
          test: /\.(js|mjs|jsx|ts|tsx)$/,
          enforce: 'pre',
          use: [
            {
              options: {
                cache: true,
                // create-react-app 的自定义ESLint格式化程序，可与 Create React App 控制台输出很好地集成。
                formatter: require.resolve('react-dev-utils/eslintFormatter'),
                eslintPath: require.resolve('eslint'),
                resolvePluginsRelativeTo: __dirname,
                
              },
              loader: require.resolve('eslint-loader'),
            },
          ],
          include: paths.appSrc,
        },
        {
          // `oneOf` 将遍历所有后续 loader，直到一个满足条件为止，若都不满足，则掉入 `file-loader`
          oneOf: [
            // 处理图片文件
            {
              test: [/\.bmp$/, /\.gif$/, /\.jpe?g$/, /\.png$/],
              loader: require.resolve('url-loader'),
              options: {
                limit: imageInlineSizeLimit,
                name: 'static/media/[name].[hash:8].[ext]',
              },
            },
            // 使用 babel 处理 js 文件，也包括其他后缀名 `mjs`、`jsx`、`ts`、`tsx`
            {
              test: /\.(js|mjs|jsx|ts|tsx)$/,
              include: paths.appSrc,
              loader: require.resolve('babel-loader'),
              options: {
                customize: require.resolve(
                  'babel-preset-react-app/webpack-overrides'
                ),
                
                plugins: [
                  [
                    require.resolve('babel-plugin-named-asset-import'),
                    {
                      loaderMap: {
                        svg: {
                          ReactComponent:
                            '@svgr/webpack?-svgo,+titleProp,+ref![path]',
                        },
                      },
                    },
                  ],
                ],
                // babel-loader 启用缓存，加快构建速度
                cacheDirectory: true,
                // 默认为 true。设置后，每个Babel变换输出将使用Gzip压缩。如果您要选择不使用缓存压缩，请将其设置为 false
                cacheCompression: false,
                compact: isEnvProduction,
              },
            },
            // 使用Babel处理应用程序外部的任何JS。
            // 与应用程序JS不同，我们仅编译标准ES功能。
            {
              test: /\.(js|mjs)$/,
              exclude: /@babel(?:\/|\\{1,2})runtime/,
              loader: require.resolve('babel-loader'),
              options: {
                babelrc: false,
                configFile: false,
                compact: false,
                presets: [
                  [
                    require.resolve('babel-preset-react-app/dependencies'),
                    { helpers: true },
                  ],
                ],
                cacheDirectory: true,
                // See #6846 for context on why cacheCompression is disabled
                cacheCompression: false,
                sourceMaps: shouldUseSourceMap,
                inputSourceMap: shouldUseSourceMap,
              },
            },
            // 开始解析 css
            // `postcss` 加载程序将 `autoprefixer` 应用于我们的 CSS。
            // css-loader 解析 CSS 中的路径，并将 打包文件 添加为依赖项。
            // style-loader 将 CSS 转换为注入 <style> 标签的 JS 模块。
            // 生产环境，使用 MiniCSSExtractPlugin 提取 css 到单独的 css 文件中
            // 默认情况下，我们支持扩展名为 .module.css 的 CSS 模块，即 `style.module.css`
            {
              test: cssRegex,
              exclude: cssModuleRegex,
              use: getStyleLoaders({
                importLoaders: 1,
                sourceMap: isEnvProduction && shouldUseSourceMap,
              }),
              // 开启 tree-shaking，忽略 import './style.less' 这样的代码
              sideEffects: true,
            },
            // 如果要开启 css-modules，则需要将样式文件写成 ***.module.css
            // 更多可以参考 https://github.com/css-modules/css-modules
            {
              test: cssModuleRegex,
              use: getStyleLoaders({
                importLoaders: 1,
                sourceMap: isEnvProduction && shouldUseSourceMap,
                modules: {
                  getLocalIdent: getCSSModuleLocalIdent,
                },
              }),
            },
            // 支持 sass
            {
              test: sassRegex,
              exclude: sassModuleRegex,
              use: getStyleLoaders(
                {
                  importLoaders: 3,
                  sourceMap: isEnvProduction && shouldUseSourceMap,
                },
                'sass-loader'
              ),
              // 开启 tree-shaking，忽略 import './style.less' 这样的代码
              sideEffects: true,
            },
            // 支持 sass 的 CSS Modules
            {
              test: sassModuleRegex,
              use: getStyleLoaders(
                {
                  importLoaders: 3,
                  sourceMap: isEnvProduction && shouldUseSourceMap,
                  modules: {
                    getLocalIdent: getCSSModuleLocalIdent,
                  },
                },
                'sass-loader'
              ),
            },
            // 当没有进入任何一个条件，便进入 file-loader，
            {
              loader: require.resolve('file-loader'),
              exclude: [/\.(js|mjs|jsx|ts|tsx)$/, /\.html$/, /\.json$/],
              options: {
                name: 'static/media/[name].[hash:8].[ext]',
              },
            },
            // 在 `file-loader` 之前添加你的 loader
          ],
        },
      ],
    },
    plugins: [
      // 生成一个注入了生成 chunks 的 index.html
      // 更多参数大家可参考 https://github.com/jantimon/html-webpack-plugin
      new HtmlWebpackPlugin(
        Object.assign(
          {},
          {
            inject: true,
            template: paths.appHtml,
          },
          isEnvProduction
            ? {
                minify: {
                  removeComments: true,
                  collapseWhitespace: true,
                  removeRedundantAttributes: true,
                  useShortDoctype: true,
                  removeEmptyAttributes: true,
                  removeStyleLinkTypeAttributes: true,
                  keepClosingSlash: true,
                  minifyJS: true,
                  minifyCSS: true,
                  minifyURLs: true,
                },
              }
            : undefined
        )
      ),
      // 将指定的代码文件通过行内的形式 嵌入到的 `html` 文件中
      isEnvProduction &&
        shouldInlineRuntimeChunk &&
        new InlineChunkHtmlPlugin(HtmlWebpackPlugin, [/runtime-.+[.]js/]),
      // 用于向 html 中注入相应的环境变量
      // 如 <link rel="icon" href="%PUBLIC_URL%/favicon.ico">
      new InterpolateHtmlPlugin(HtmlWebpackPlugin, env.raw),
      // 未找到的错误提供了一些必要的上下文
      new ModuleNotFoundPlugin(paths.appPath),
      // 我们可以通过 DefinePlugin 向 js 代码中注入相关的环境变量
      // DefinePlugin 允许创建一个在编译时可以配置的全局常量。
      // 具体可参考 https://webpack.js.org/plugins/define-plugin/
      new webpack.DefinePlugin(env.stringified),
      // 开启热更新
      isEnvDevelopment && new webpack.HotModuleReplacementPlugin(),
      // 强制Webpack要求区分大小写的路径。
      isEnvDevelopment && new CaseSensitivePathsPlugin(),
      // 确保 npm install <library> 强制进行项目重建。
      isEnvDevelopment &&
        new WatchMissingNodeModulesPlugin(paths.appNodeModules),
      
      // 将 css 配置文件单独打包出来
      isEnvProduction &&
        new MiniCssExtractPlugin({
          // 配置项与 webpack.output 类似
          filename: 'static/css/[name].[contenthash:8].css',
          chunkFilename: 'static/css/[name].[contenthash:8].chunk.css',
        }),
      // 这个插件用来生成一份 assets 资源清单的 json 文件，即 chunks 插入到 html 中的地址，与 chunks 一一对应
      new ManifestPlugin({
        fileName: 'asset-manifest.json',
        publicPath: paths.publicUrlOrPath,
        generate: (seed, files, entrypoints) => {
          const manifestFiles = files.reduce((manifest, file) => {
            manifest[file.name] = file.path;
            return manifest;
          }, seed);
          const entrypointFiles = entrypoints.main.filter(
            fileName => !fileName.endsWith('.map')
          );

          return {
            files: manifestFiles,
            entrypoints: entrypointFiles,
          };
        },
      }),
      // 忽略第三方包指定目录，让这些指定目录不要被打包进去
      new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),
      // 对于 pwa 的打包
      isEnvProduction &&
        new WorkboxWebpackPlugin.GenerateSW({
          clientsClaim: true,
          exclude: [/\.map$/, /asset-manifest\.json$/],
          importWorkboxFrom: 'cdn',
          navigateFallback: paths.publicUrlOrPath + 'index.html',
          navigateFallbackBlacklist: [
            // 排除以 `/_` 开头的URL，因为它们很可能是 `API` 调用
            new RegExp('^/_'),
            // Exclude any URLs whose last part seems to be a file extension
            // as they're likely a resource and not a SPA route.
            // URLs containing a "?" character won't be blacklisted as they're likely
            // a route with query params (e.g. auth callbacks).
            new RegExp('/[^/?]+\\.[^/]+$'),
          ],
        }),
      // TypeScript 类型检查
      useTypeScript &&
        new ForkTsCheckerWebpackPlugin({
          typescript: resolve.sync('typescript', {
            basedir: paths.appNodeModules,
          }),
          async: isEnvDevelopment,
          useTypescriptIncrementalApi: true,
          checkSyntacticErrors: true,
          resolveModuleNameModule: process.versions.pnp
            ? `${__dirname}/.js`
            : undefined,
          resolveTypeReferenceDirectiveModule: process.versions.pnp
            ? `${__dirname}/pnpTs.js`
            : undefined,
          tsconfig: paths.appTsConfig,
          reportFiles: [
            '**',
            '!**/__tests__/**',
            '!**/?(*.)(spec|test).*',
            '!**/src/setupProxy.*',
            '!**/src/setupTests.*',
          ],
          silent: true,
          // 在线上环境使用 `typescriptFormatter`，开发环境中不使用
          // 多进程方案
          formatter: isEnvProduction ? typescriptFormatter : undefined,
        }),
    ].filter(Boolean),
    // 有的时候打包代码会跑在 Node 的环境下面，所以需要做一点 Node 的配置
    // 告诉 webpack 为它们提供空的模拟，将其导入即可。
    node: {
      module: 'empty',
      dgram: 'empty',
      dns: 'mock',
      fs: 'empty',
      http2: 'empty',
      net: 'empty',
      tls: 'empty',
      child_process: 'empty',
    },
    // 不提示打包时的性能问题
    performance: false,
  };
};
