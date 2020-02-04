// 工具库
// 1MB
// import _ from 'lodash';

// 业务代码
// 业务逻辑 1MB
// console.log(_.join(['a', 'b', 'c'], '***'));

//  main.js  2MB
// 打包文件很大，加载实践很长
// lodash 的代码基本上不需要修改，我们改了业务代码之后，还有重新加载 2MB 的内容，很麻烦


// 第二种方式
// 两个各 1MB，lodash.js，和 main.js ，

// 浏览器 可以并行加载文件，所以加载 两个 1M的，可能不加载 一个 2M的要快，
// 并且我们可以讲一些不常改动的数据库 放在 cdn 上，浏览器也会自动缓存
// 业务逻辑变化的时候，只需要加载 main.js 就行了

// 　代码拆分
// 性能更快，体验更好

// 本质上和 webpack 没有关系


import getComponent from './async.js'

getComponent().then(element => {
	document.body.appendChild(element);
});