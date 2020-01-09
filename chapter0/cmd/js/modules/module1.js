// module1.js文件
define(function (require, exports, module) {
  //内部变量数据
  var data = 'Hello，sea.js';
  //内部函数
  function show() {
    console.log('module1 show() ' + data)
  }
  //向外暴露
  exports.show = show;
});
