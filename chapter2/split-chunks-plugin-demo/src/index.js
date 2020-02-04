// 工具库
import _ from 'lodash';
import $ from 'jquery';

console.log(_.join(['a', 'b', 'c'], '***'));
console.log($);

// import(/* webpackChunkName: "common-async.js" */"./async").then(common => {
//   console.log(common);
// })