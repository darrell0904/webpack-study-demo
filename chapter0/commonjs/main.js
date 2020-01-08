// example

// var example = require('./example.js'); //如果参数字符串以“./”开头，则表示加载的是一个位于相对路径

// console.log(example.x); // 5
// console.log(example.addX(1)); // 6

// lib.js

var mod = require('./lib');

console.log(mod.counter);  // 3

mod.incCounter();

console.log(mod.counter); // 3
