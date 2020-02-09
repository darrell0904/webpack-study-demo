import getComponent from './async';

document.addEventListener('click', () => {
  getComponent().then(element => {
    document.body.appendChild(element);
  });
})
