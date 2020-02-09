document.addEventListener('click', () => {
  import(/* webpackPrefetch: true */ './async.js').then(({default: func}) => {
    func();
  })
})
