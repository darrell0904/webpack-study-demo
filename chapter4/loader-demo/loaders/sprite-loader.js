// 引入依赖
const Spritesmith = require('spritesmith');
const fs = require('fs');
const path = require('path');

const cwd = process.cwd();

// 生成雪碧图
// 自己的图片
// var sprites = [
//   `${cwd}/src/assets/1.jpg`,
//   `${cwd}/src/assets/2.jpg`,
//   `${cwd}/src/assets/3.jpg`,
// ];
// console.log('---sprites---', sprites);
// // 执行 run 方法，并获取结果
// Spritesmith.run({
//   src: sprites,
// }, (err, result) => {
//   console.log('---err---', err);
//   console.log('---result---', result);
// });

module.exports = function (source) {
  const callback = this.async();
  const imgs = source.match(/url\((\S*)\?__sprite/g);
  const matchedImgs = [];

  for (let i = 0; i < imgs.length; i++) {
    const img = imgs[i].match(/url\((\S*)\?__sprite/)[1];
    console.log('---img---', img);
    matchedImgs.push(path.join(`${cwd}/src`, img));
  }

  console.log('---imgs---', imgs);
  console.log('---matchedImgs---', matchedImgs);

  Spritesmith.run({
    src: matchedImgs,
  }, (err, result) => {
    fs.writeFileSync(path.join(process.cwd(), 'dist/sprite.jpg'), result.image);

    source = source.replace(/url\((\S*)\?__sprite/g, (match) => {
      return `url(dist/sprite.jpg`;
    });

    fs.writeFileSync(path.join(process.cwd(), 'dist/index.css'), source);
    callback(null, source);
  });
}