const gulp = require('gulp');
const sass = require('gulp-sass');
const less = require('gulp-less');
const connect = require('gulp-connect');
const concat = require('gulp-concat');
const uglify = require('gulp-uglify');
const minifyCSS = require('gulp-minify-css');
const imagemin = require('gulp-imagemin');

const rename = require('gulp-rename');

// 使用 npx gulp <命令>

gulp.task('testGulp', done => {
  console.log('Hello World!');
  done();
});

// 将 index.html 拷贝到 dist 目录下
gulp.task('copy-index', function() {
  return gulp.src('index.html')
             .pipe(gulp.dest('dist'))
             .pipe(connect.reload());
})

// 将 images 下面的 jpg 复制到 dist 下
gulp.task('images', function() {
  return gulp.src('images/*.jpg')
             .pipe(gulp.dest('dist/images'));
})

// 将 images 下面的 图片 复制到 dist 下
gulp.task('images1', function() {
  return gulp.src('images/*.{jpg,png}')
             .pipe(gulp.dest('dist/images'));
})

// 将 images 下面的 图片 包括文件夹 复制到 dist 下
gulp.task('images2', function() {
  return gulp.src('images/**/*.{jpg,png}')
             .pipe(gulp.dest('dist/images'));
})

// 压缩图片
gulp.task('images-mini', function() {
  return gulp.src('images/**/*.{jpg,png}')
             .pipe(imagemin())
             .pipe(gulp.dest('dist/images'));
})

// 匹配多个任务，将这些文件放到 data 下
gulp.task('data', function() {
  return gulp.src(['html/*.html', 'json/*.json'])
             .pipe(gulp.dest('dist/data'));
})

// 排除相应文件，例：排除 json 下 secret 开头的文件
gulp.task('data1', function() {
  return gulp.src(['html/*.html', 'json/*.json', '!json/secret-*.json'])
             .pipe(gulp.dest('dist/data'));
})

// 先去执行他依赖的三个任务，在去执行他自己要做的任务
gulp.task('build', gulp.series(['copy-index', 'images', 'data'], function(done) {
  console.log('编译成功');
  done()
}))

// 监视一些文件，文件发生变化，就去执行一些命令
gulp.task('watch', (cb) => {
  gulp.watch('index.html', gulp.series(['copy-index'], function(done) {
    console.log('html watch成功');
    done()
  }));
  gulp.watch('images/**/*.{jpg,png}', gulp.series(['images2'], function(done) {
    console.log('图片 watch成功成功');
    done()
  }));
  gulp.watch('json/*.json', gulp.series(['data'], function(done) {
    console.log('json watch成功');
    done()
  }));
  cb();
})

// plugin

// 处理 sass
gulp.task('sass', () => {
  return gulp.src('styles/**/*.scss')
             .pipe(sass())
             .pipe(gulp.dest('dist/sass'))
})

// 处理 less
gulp.task('less', () => {
  return gulp.src('styles/**/*.less')
             .pipe(less())
             .pipe(gulp.dest('dist/less'))
})

// 压缩 css
gulp.task('less-mini', () => {
  return gulp.src('styles/**/*.less')
             .pipe(less())
             .pipe(gulp.dest('dist/less'))
             .pipe(minifyCSS())
             .pipe(rename('style.min.css'))
             .pipe(gulp.dest('dist/less'))
});

// 创建一个本地服务器
gulp.task('server', (cb) => {
  connect.server({
    root: './dist',
    port: 3000,
    livereload: true, // 启用 浏览器实时刷新
  });
  cb();
})

// 合并 js 文件
gulp.task('scripts', done => {
  return gulp.src(['js/index.js', 'js/two.js'])
             .pipe(concat('vendor.js'))
             .pipe(gulp.dest('dist/js'));
});

// 压缩 js 文件
gulp.task('scripts-mini', done => {
  return gulp.src(['js/index.js', 'js/two.js'])
             .pipe(concat('vendor.js'))
             .pipe(uglify())
             .pipe(gulp.dest('dist/js'));
});

// 重命名文件
gulp.task('scripts-rename', done => {
  return gulp.src(['js/index.js', 'js/two.js'])
             .pipe(concat('vendor.js'))
             .pipe(gulp.dest('dist/js'))
             .pipe(uglify())
             .pipe(rename('vendor.min.js'))
             .pipe(gulp.dest('dist/js'));
});

// 压缩图片


// 默认的任务
gulp.task('default', gulp.series(['server', 'watch'], () => {
  console.log('浏览器启动成功');
}))




