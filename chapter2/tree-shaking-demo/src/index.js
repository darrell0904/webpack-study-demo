//  Tree Shaking 只支持 ES Moudle 静态
// 动态 CommonJS 不支持
// sideEffects 没有导出内容的，都给它忽略掉
// import '@babel/polly-fill'


// 都要做的话，设置为 false

import './index.less'
import header from './header.js';

header();