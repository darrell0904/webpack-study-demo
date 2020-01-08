define(function () {
  let msg = 'hello, require.js';

  function getMsg() {
    return msg.toUpperCase()
  };

  return {
  	getMsg: getMsg,
  }
})