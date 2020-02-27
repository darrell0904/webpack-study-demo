import './entry2.less';

document.addEventListener('click', () => {
  import('./async.js').then(({default: func}) => {
    func();
  })
})
