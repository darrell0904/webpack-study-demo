'use strict';

// webpack-dev-server 配置文件
// 具体可参考 https://webpack.js.org/configuration/dev-server/
// 其中涉及到很多中间件，笔者也不是也别清楚，不乏有很多理解错误的地方

const fs = require('fs');

// react-dev-utils 中的插件
// https://www.npmjs.com/package/react-dev-utils
// 不是特别清楚，应该是错误提示的弹窗之类的中间件
const errorOverlayMiddleware = require('react-dev-utils/errorOverlayMiddleware');

// react-dev-utils 中的插件
// https://www.npmjs.com/package/react-dev-utils
// 不是特别清楚，应该是跟 sourcemap 有关的相关配置
const evalSourceMapMiddleware = require('react-dev-utils/evalSourceMapMiddleware');

// 返回提供 ${servedPath} /service-worker.js 的 Express 中间件，该中间件会重置任何先前设置的服务工作者配置。 对开发有用。
// https://www.npmjs.com/package/noop-service-worker-middleware
const noopServiceWorkerMiddleware = require('react-dev-utils/noopServiceWorkerMiddleware');

// 不是特别清楚，应该是忽略某些文件的中间件
const ignoredFiles = require('react-dev-utils/ignoredFiles');

// 如果req.url并非以servePath开头，则返回重定向到$ {servedPath} / $ {req.path}的Express中间件。 对开发有用。
const redirectServedPath = require('react-dev-utils/redirectServedPathMiddleware');

const paths = require('./paths');

// 获取 https 的配置文件
const getHttpsConfig = require('./getHttpsConfig');

const host = process.env.HOST || '0.0.0.0';
const sockHost = process.env.WDS_SOCKET_HOST;
const sockPath = process.env.WDS_SOCKET_PATH; // default: '/sockjs-node'
const sockPort = process.env.WDS_SOCKET_PORT;

module.exports = function(proxy, allowedHost) {
  return {
    // 设置为true时，此选项将绕过主机检查。
    // 不建议这样做，因为不检查主机的应用容易受到DNS重新绑定攻击的攻击。
    disableHostCheck:
      !proxy || process.env.DANGEROUSLY_DISABLE_HOST_CHECK === 'true',
    // 一切服务都启用gzip 压缩
    compress: true,
    // 当使用inline mode，devTools的命令行中将会显示一些调试信息，但是这些信息一般是没有用的，而且会让输出变得比较乱。
    // 如：before loading，before an error 或 Hot Module Replacement被启用。
    // 可以通过如下设置禁止显示上述的调试信息。
    // 不过此设置仍会显示编译警告和错误。
    clientLogLevel: 'none',
    // 告诉服务器从哪里提供内容。只有在你想要提供静态文件时才需要。
    contentBase: paths.appPublic,
    contentBasePublicPath: paths.publicUrlOrPath,
    // 默认情况下，来自 `contentBase` 的文件不会触发页面重新加载。
    // 启用后，文件更改将触发整个页面重新加载。
    watchContentBase: true,
    // 开启热更新
    hot: true,
    // 指定浏览器或其他客户端如何与devServer通信。
    // 现在默认是 `sockjs`，下一个版本默认就是 `ws`
    transportMode: 'ws',
    // 防止WS客户端被注入
    injectClient: false,
    // 为 Websocket 连接启用自定义 sockjs 主机名，路径名和端口
    sockHost,
    sockPath,
    sockPort,
    // 此路径下的打包文件可在浏览器中访问。
    // paths.publicUrlOrPath.slice(0, -1)：删除最后一个斜杠
    publicPath: paths.publicUrlOrPath.slice(0, -1),
    // 启用 quiet 后，除了初始启动信息之外的任何内容都不会被打印到控制台。
    // 这也意味着来自 webpack 的错误或警告在控制台不可见。
    quiet: true,
    // 对于某些系统，监听大量文件系统会导致大量的 CPU 或内存占用。
    // 这个选项可以排除一些巨大的文件夹，例如 node_modules：
    // https://www.webpackjs.com/configuration/watch/#watchoptions-ignored
    watchOptions: {
      ignored: ignoredFiles(paths.appSrc),
    },
    // 默认情况下，dev-server 通过 HTTP 提供服务。也可以选择带有 HTTPS 的 HTTP/2 提供服务：
    https: getHttpsConfig(),
    host,
    overlay: false,
    historyApiFallback: {
      // Paths with dots should still use the history fallback.
      // See https://github.com/facebook/create-react-app/issues/387.
      // disableDotRule
      disableDotRule: true,
      index: paths.publicUrlOrPath,
    },
    public: allowedHost,
    // proxy 代理
    proxy,
    // 提供在服务器内部先于所有其他中间件执行自定义中间件的功能。
    // 这可以用于定义自定义处理程序
    before(app, server) {
      // 保留`evalSourceMapMiddleware`和`errorOverlayMiddleware`
      // 这可以让我们从webpack中获取错误覆盖的源内容，中间件内容
      app.use(evalSourceMapMiddleware(server));
      // 使我们可以从运行时错误覆盖中打开文件。中间件
      app.use(errorOverlayMiddleware());

      if (fs.existsSync(paths.proxySetup)) {
        // 配置代理
        // 在 src 下，建立 src/setupProxy.js 文件进行配置
        require(paths.proxySetup)(app);
      }
    },
    // 提供在服务器内部在所有其他中间件之后执行自定义中间件的功能。
    after(app) {
      // 如果网址不匹配，则从 package.json 重定向到 PUBLIC_URL 或 homepage
      app.use(redirectServedPath(paths.publicUrlOrPath));

      // 返回服务于服务工作者的Express中间件，该中间件会重置任何先前设置的服务工作者配置。 对开发有用。
      app.use(noopServiceWorkerMiddleware(paths.publicUrlOrPath));
    },
  };
};
