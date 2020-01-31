import webpackSrc from './webpack.png';
import style from './index.less'

function createAvatar () {
  var img = new Image();
  img.src = webpackSrc;
  img.classList.add(style.avatar); // 添加类名

  var dom = document.getElementById('root');
  dom.append(img);

}

export default createAvatar;