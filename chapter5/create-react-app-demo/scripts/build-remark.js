'use strict';

// 首先，这样任何读取它的代码都知道正确的环境。定义环境
process.env.BABEL_ENV = 'production';
process.env.NODE_ENV = 'production';


// 遇到无法处理的异常，就直接抛出异常，停止往下执行，而不是忽略异常，继续往下执行，
// 做一些错误的及时处理
process.on('unhandledRejection', err => {
  throw err;
});


// 引入 env 文件，他存放了一些环境配置
// 确保读取环境变量。
require('../config/env');


const path = require('path');
// 命令行提示更加美观
const chalk = require('react-dev-utils/chalk');

// fs-extra 模块是系统 fs 模块的扩展。
// 提供了更多便利的 API，并继承了 fs 模块的 API
const fs = require('fs-extra');
const webpack = require('webpack');

// webpack 核心配置文件
const configFactory = require('../config/webpack.config');

// 项目路径配置文件
const paths = require('../config/paths');

// react-dev-utils 中的插件
// 确保所有传递的文件都存在，文件名应该是必须的。
// 如果找不到文件，则输出警告消息并返回false。
const checkRequiredFiles = require('react-dev-utils/checkRequiredFiles');

// 从 webpack stats 对象中提取并整理警告和错误消息。
const formatWebpackMessages = require('react-dev-utils/formatWebpackMessages');

// 构建项目后打印托管说明。
const printHostingInstructions = require('react-dev-utils/printHostingInstructions');

// 获取打包的文件大小
const FileSizeReporter = require('react-dev-utils/FileSizeReporter');

// 美化一些已知的构建错误。 传递一个Error对象以在控制台中记录一个经过修饰的错误消息。
const printBuildError = require('react-dev-utils/printBuildError');

// 在传递的 buildFolder 中捕获 JS 和 CSS 文件大小。 保存结果值以在构建后进行比较。
const measureFileSizesBeforeBuild =
  FileSizeReporter.measureFileSizesBeforeBuild;

// 在构建后打印 JS 和 CSS 文件大小，
// 并包括与之前使用 measureFileSizesBeforeBuild() 捕获的 previousFileSizes 的大小比较。 
const printFileSizesAfterBuild = FileSizeReporter.printFileSizesAfterBuild;

// 是否使用了 Yarn
const useYarn = fs.existsSync(paths.yarnLockFile);

// 定义最大打包后 bundle 文件大小
const WARN_AFTER_BUNDLE_GZIP_SIZE = 512 * 1024;

// 定义最大打包后 chunk 文件大小
const WARN_AFTER_CHUNK_GZIP_SIZE = 1024 * 1024;

const isInteractive = process.stdout.isTTY;

// 如果缺少所需文件，则警告并退出
if (!checkRequiredFiles([paths.appHtml, paths.appIndexJs])) {
  process.exit(1);
}

// 生成 Webpack 核心配置文件
const config = configFactory('production');

// 我们要求您明确设置浏览器，并且不要回退到默认为 browserslist。
const { checkBrowsers } = require('react-dev-utils/browsersHelper');
checkBrowsers(paths.appPath, isInteractive)
  .then(() => {
    // 首先，在构建目录中读取当前文件大小。
    // 这可以让我们显示它们以后发生了多少变化。
    return measureFileSizesBeforeBuild(paths.appBuild);
  })
  .then(previousFileSizes => {
    // 删除 build 中的文件，但是包留目录
    fs.emptyDirSync(paths.appBuild);
    // 与公用文件夹合并
    copyPublicFolder();
    // 开始构建webpack
    return build(previousFileSizes);
  })
  .then(
    ({ stats, previousFileSizes, warnings }) => {
      if (warnings.length) {
        console.log(chalk.yellow('Compiled with warnings.\n'));
        console.log(warnings.join('\n\n'));
        console.log(
          '\nSearch for the ' +
            chalk.underline(chalk.yellow('keywords')) +
            ' to learn more about each warning.'
        );
        console.log(
          'To ignore, add ' +
            chalk.cyan('// eslint-disable-next-line') +
            ' to the line before.\n'
        );
      } else {
        console.log(chalk.green('Compiled successfully.\n'));
      }

      console.log('File sizes after gzip:\n');
      printFileSizesAfterBuild(
        stats,
        previousFileSizes,
        paths.appBuild,
        WARN_AFTER_BUNDLE_GZIP_SIZE,
        WARN_AFTER_CHUNK_GZIP_SIZE
      );
      console.log();

      const appPackage = require(paths.appPackageJson);
      const publicUrl = paths.publicUrlOrPath;
      const publicPath = config.output.publicPath;
      const buildFolder = path.relative(process.cwd(), paths.appBuild);
      printHostingInstructions(
        appPackage,
        publicUrl,
        publicPath,
        buildFolder,
        useYarn
      );
    },
    err => {
      const tscCompileOnError = process.env.TSC_COMPILE_ON_ERROR === 'true';
      if (tscCompileOnError) {
        console.log(
          chalk.yellow(
            'Compiled with the following type errors (you may want to check these before deploying your app):\n'
          )
        );
        printBuildError(err);
      } else {
        console.log(chalk.red('Failed to compile.\n'));
        printBuildError(err);
        process.exit(1);
      }
    }
  )
  .catch(err => {
    if (err && err.message) {
      console.log(err.message);
    }
    process.exit(1);
  });

// 构建 webpack
function build(previousFileSizes) {
  // 我们曾经根据`NODE_PATH`支持解析模块。
  // 现在不推荐使用此方法，而推荐使用 jsconfig / tsconfig.json
  // 这使您可以在大型 monorepos 内的导入中使用绝对路径：
  if (process.env.NODE_PATH) {
    console.log(
      chalk.yellow(
        'Setting NODE_PATH to resolve modules absolutely has been deprecated in favor of setting baseUrl in jsconfig.json (or tsconfig.json if you are using TypeScript) and will be removed in a future major release of create-react-app.'
      )
    );
    console.log();
  }

  console.log('Creating an optimized production build...');

  const compiler = webpack(config);
  return new Promise((resolve, reject) => {
    compiler.run((err, stats) => {
      let messages;
      if (err) {
        if (!err.message) {
          return reject(err);
        }

        let errMessage = err.message;

        // 添加有关 postcss 错误的其他信息
        if (Object.prototype.hasOwnProperty.call(err, 'postcssNode')) {
          errMessage +=
            '\nCompileError: Begins at CSS selector ' +
            err['postcssNode'].selector;
        }

        messages = formatWebpackMessages({
          errors: [errMessage],
          warnings: [],
        });
      } else {
        messages = formatWebpackMessages(
          stats.toJson({ all: false, warnings: true, errors: true })
        );
      }
      if (messages.errors.length) {
        // 仅保留第一个错误。 其他通常是指示同样的问题，会让读者感到困惑。
        if (messages.errors.length > 1) {
          messages.errors.length = 1;
        }
        return reject(new Error(messages.errors.join('\n\n')));
      }
      if (
        process.env.CI &&
        (typeof process.env.CI !== 'string' ||
          process.env.CI.toLowerCase() !== 'false') &&
        messages.warnings.length
      ) {
        console.log(
          chalk.yellow(
            '\nTreating warnings as errors because process.env.CI = true.\n' +
              'Most CI servers set it automatically.\n'
          )
        );
        return reject(new Error(messages.warnings.join('\n\n')));
      }

      return resolve({
        stats,
        previousFileSizes,
        warnings: messages.warnings,
      });
    });
  });
}


// 
function copyPublicFolder() {
  fs.copySync(paths.appPublic, paths.appBuild, {
    dereference: true,
    filter: file => file !== paths.appHtml,
  });
}
