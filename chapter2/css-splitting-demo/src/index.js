import './index.less';

document.addEventListener('click', () => {
  import('./async.js').then(({default: func}) => {
    func();
  })
})
