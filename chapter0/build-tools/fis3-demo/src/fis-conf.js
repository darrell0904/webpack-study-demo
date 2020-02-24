// 在 src 下 使用 npx fis3 release -d ../output 命令
// 或者根目录下 使用 npm run dev

// 配置配置文件，注意，清空所有的配置，只留下以下代码即可。
fis.match('*.{png,js,css,less}', {
  release: '/static/$0'
});

//清除其他配置，只剩下如下配置
fis.match('*.{js,css,less,png}', {
  useHash: true
});

// css 压缩
fis.match('*.css', {
  useHash: false, //default is `true`
  // compress css invoke fis-optimizer-clean-css
  optimizer: fis.plugin('clean-css', {
    // option of clean-css
  })
});

// 使用 less
fis.match('**/*.less', {
  rExt: '.css', // from .less to .css
  parser: fis.plugin('less-2.x', {
      // fis-parser-less-2.x option
  })
});

// 压缩css
fis.match('*.js', {
  // fis-optimizer-uglify-js 插件进行压缩，已内置
  optimizer: fis.plugin('uglify-js')
});

// 压缩png
fis.match('*.png', {
  // fis-optimizer-png-compressor 插件进行压缩，已内置
  optimizer: fis.plugin('png-compressor')
});