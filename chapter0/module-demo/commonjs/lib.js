/* 不变的例子 */

var counter = 3;

function incCounter() {
  counter++;
}

module.exports = {
  counter: counter,
  incCounter: incCounter,
};

/* 函数 */
// var counter = 3;

// function incCounter() {
//   counter++;
// }

// module.exports = {
//   get counter() {
//     return counter;
//   },
//   incCounter: incCounter,
// };