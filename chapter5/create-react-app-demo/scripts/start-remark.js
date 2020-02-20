'use strict';

// 首先，这样任何读取它的代码都知道正确的环境。定义开发环境
process.env.BABEL_ENV = 'development';
process.env.NODE_ENV = 'development';

// 遇到无法处理的异常，就直接抛出异常，停止往下执行。
// 而不是忽略异常，继续往下执行，
// 做一些错误的及时处理
process.on('unhandledRejection', err => {
  throw err;
});

// 引入 env 环境配置
// 确保读取环境变量。
require('../config/env');

const fs = require('fs');

// 命令行提示更加美观
const chalk = require('react-dev-utils/chalk');

const webpack = require('webpack');

// 引入 webpack-dev-server
const WebpackDevServer = require('webpack-dev-server');

// 清除控制台，希望以跨平台的方式。
const clearConsole = require('react-dev-utils/clearConsole');

// react-dev-utils 中的插件
// 确保所有传递的文件都存在，文件名应该是必须的。
// 如果找不到文件，则输出警告消息并返回false。
const checkRequiredFiles = require('react-dev-utils/checkRequiredFiles');

// 返回一些 server 配置
// http://npm.taobao.org/package/react-dev-utils
const {
  choosePort,
  createCompiler,
  prepareProxy,
  prepareUrls,
} = require('react-dev-utils/WebpackDevServerUtils');

// 以给定的 URL 打开浏览器。
const openBrowser = require('react-dev-utils/openBrowser');

// 项目路径配置文件
const paths = require('../config/paths');

// webpack 核心配置文件
const configFactory = require('../config/webpack.config');

// webpack-dev-server 配置文件
const createDevServerConfig = require('../config/webpackDevServer.config');

// 是否使用了 Yarn
const useYarn = fs.existsSync(paths.yarnLockFile);

const isInteractive = process.stdout.isTTY;

// 如果缺少所需文件，则警告并退出
if (!checkRequiredFiles([paths.appHtml, paths.appIndexJs])) {
  process.exit(1);
}

// 设置端口号 和 HOST
const DEFAULT_PORT = parseInt(process.env.PORT, 10) || 3000;
const HOST = process.env.HOST || '0.0.0.0';

if (process.env.HOST) {
  console.log(
    chalk.cyan(
      `Attempting to bind to HOST environment variable: ${chalk.yellow(
        chalk.bold(process.env.HOST)
      )}`
    )
  );
  console.log(
    `If this was unintentional, check that you haven't mistakenly set it in your shell.`
  );
  console.log(
    `Learn more here: ${chalk.yellow('https://bit.ly/CRA-advanced-config')}`
  );
  console.log();
}

// 我们要求您明确设置浏览器，并且不要回退到默认为 browserslist。
const { checkBrowsers } = require('react-dev-utils/browsersHelper');
checkBrowsers(paths.appPath, isInteractive)
  .then(() => {
    // 首先尝试使用默认端口，但如果繁忙，则在其他端口上运行
    return choosePort(HOST, DEFAULT_PORT);
  })
  .then(port => {
    if (port == null) {
      // 没找到端口，直接返回
      return;
    }

    const config = configFactory('development');
    const protocol = process.env.HTTPS === 'true' ? 'https' : 'http';
    const appName = require(paths.appPackageJson).name;
    const useTypeScript = fs.existsSync(paths.appTsConfig);
    const tscCompileOnError = process.env.TSC_COMPILE_ON_ERROR === 'true';
    const urls = prepareUrls(
      protocol,
      HOST,
      port,
      paths.publicUrlOrPath.slice(0, -1)
    );
    const devSocket = {
      warnings: warnings =>
        devServer.sockWrite(devServer.sockets, 'warnings', warnings),
      errors: errors =>
        devServer.sockWrite(devServer.sockets, 'errors', errors),
    };
    // 创建一个配置了自定义消息的 webpack 编译器。
    const compiler = createCompiler({
      appName,
      config,
      devSocket,
      urls,
      useYarn,
      useTypeScript,
      tscCompileOnError,
      webpack,
    });
    // 加载代理配置
    const proxySetting = require(paths.appPackageJson).proxy;
    const proxyConfig = prepareProxy(
      proxySetting,
      paths.appPublic,
      paths.publicUrlOrPath
    );
    // 生成 webpack-dev-server 配置文件
    const serverConfig = createDevServerConfig(
      proxyConfig,
      urls.lanUrlForConfig
    );
    const devServer = new WebpackDevServer(compiler, serverConfig);
    // 启动 WebpackDevServer.
    devServer.listen(port, HOST, err => {
      if (err) {
        return console.log(err);
      }
      if (isInteractive) {
        clearConsole();
      }

      // 之前是根据`NODE_PATH`支持解析模块。
      // 现在不推荐使用此方法，而推荐使用 jsconfig / tsconfig.json。
      // 这样可以在大型 monorepos 内的导入中使用绝对路径。
      if (process.env.NODE_PATH) {
        console.log(
          chalk.yellow(
            'Setting NODE_PATH to resolve modules absolutely has been deprecated in favor of setting baseUrl in jsconfig.json (or tsconfig.json if you are using TypeScript) and will be removed in a future major release of create-react-app.'
          )
        );
        console.log();
      }

      console.log(chalk.cyan('Starting the development server...\n'));
      openBrowser(urls.localUrlForBrowser);
    });

    ['SIGINT', 'SIGTERM'].forEach(function(sig) {
      process.on(sig, function() {
        devServer.close();
        process.exit();
      });
    });
  })
  .catch(err => {
    if (err && err.message) {
      console.log(err.message);
    }
    process.exit(1);
  });
