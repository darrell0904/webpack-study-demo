/* vue.config.js */
const configs = require('./config');

// 用于做相应的 merge 处理
const merge = require('webpack-merge');

// 根据环境判断使用哪份配置
const cfg = process.env.NODE_ENV === 'production' ? configs.build.env : configs.dev.env;

module.exports = {
  chainWebpack: config => {
    config.plugin('define')
      .tap(args => {
        let name = 'process.env';
        // 使用 merge 保证原始值不变
        args[0][name] = merge(args[0][name], cfg);
        return args
    })
  },
}