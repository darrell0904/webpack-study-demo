// ES Moudule 模块引入方式
// import webpackSrc from './webpack.png';
// import createAvatar from './createAvatar';
// import './index.less';
import style from './index.less'

// createAvatar();
// var img = new Image();
// img.src = webpackSrc;
// img.classList.add(style.avatar); // 添加类名

// var dom = document.getElementById('root');
// dom.append(img);
var dom = document.getElementById('root');
dom.innerHTML = "<div class='iconfont icon-left'></div>"

