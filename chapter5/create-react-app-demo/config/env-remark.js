'use strict';

const fs = require('fs');
const path = require('path');
const paths = require('./paths');

// 在 node 中 被引入的模块将被缓存在这个对象中。 
// 所以要删除一下缓存 './paths'  ，确保下次可以拿到 require 重新加载被删除的模块，获取最新的内容 
delete require.cache[require.resolve('./paths')];

// 判断打包环境，没有打包环境则抛出错误，由 build.js 或者 start.js 中设置
const NODE_ENV = process.env.NODE_ENV;
if (!NODE_ENV) {
  throw new Error(
    'The NODE_ENV environment variable is required but was not specified.'
  );
}

// 读取 根目录下面 .env 相关的配置
// npm start 支持 优先级从前往后: .env.development.local, .env.development, .env.local, .env
// npm run build 支持 优先级从前往后: .env.production.local, .env.production, .env.local, .env

// https://github.com/bkeepers/dotenv#what-other-env-files-can-i-use

const dotenvFiles = [
  `${paths.dotenv}.${NODE_ENV}.local`,
  `${paths.dotenv}.${NODE_ENV}`,
  NODE_ENV !== 'test' && `${paths.dotenv}.local`,
  paths.dotenv,
].filter(Boolean);

// console.log('---dotenvFiles---', dotenvFiles);

// 取到上面的 dotenvFiles 路径，会判断路径是否存在
// 存在则 通过 dotenv 设置相应的环境变量

// https://github.com/motdotla/dotenv
// https://github.com/motdotla/dotenv-expand

dotenvFiles.forEach(dotenvFile => {
  // console.log('---dotenvFile--', dotenvFile);
  if (fs.existsSync(dotenvFile)) {
    require('dotenv-expand')(
      require('dotenv').config({
        path: dotenvFile,
      })
    );
  }
});


// 获取当前项目的路径，经过一些列的处理之后，定义到 NODE_PATH 中去
// 与 Node 本身的 NODE_PATH 类似
// path Node 的核心模块

const appDirectory = fs.realpathSync(process.cwd());
process.env.NODE_PATH = (process.env.NODE_PATH || '')
  .split(path.delimiter)
  .filter(folder => folder && !path.isAbsolute(folder)) // 过滤出 目录存在并且不是绝对路径的
  .map(folder => path.resolve(appDirectory, folder))
  .join(path.delimiter);



// 获取 NODE_ENV 和 REACT_APP_ * 环境变量
// 并通过 webpack 配置中的 DefinePlugin 注入到应用程序中。

const REACT_APP = /^REACT_APP_/i;

// 这个函数结合外部传进来的一些变量参数，
// 并对全局变量进行整理的一个函数

function getClientEnvironment(publicUrl) {
  const raw = Object.keys(process.env)
    .filter(key => REACT_APP.test(key))
    .reduce(
      (env, key) => {
        env[key] = process.env[key];
        return env;
      },
      {
        // 设置项目的打包环境
        NODE_ENV: process.env.NODE_ENV || 'development',
        // 设置静态资源路径。比如可以这样写：<img src = {process.env.PUBLIC_URL +'/img/logo.png'} />
        PUBLIC_URL: publicUrl,
        // 设置 socket 相关配置，比如设置连接“主机名”，“路径名”和“端口”。
        WDS_SOCKET_HOST: process.env.WDS_SOCKET_HOST,
        WDS_SOCKET_PATH: process.env.WDS_SOCKET_PATH,
        WDS_SOCKET_PORT: process.env.WDS_SOCKET_PORT,
      }
    );
  // 将全局变量 字符串化，以便我们可以将其输入到 webpack 中 DefinePlugin。
  const stringified = {
    'process.env': Object.keys(raw).reduce((env, key) => {
      env[key] = JSON.stringify(raw[key]);
      return env;
    }, {}),
  };

  return { raw, stringified };
}

module.exports = getClientEnvironment;
