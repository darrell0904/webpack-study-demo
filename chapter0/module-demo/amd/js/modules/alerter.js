define(['dataService', 'jquery'], function (dataService, $) {
  let name = 'darrell';

  function showMsg() {
    $('body').css('background', 'gray')
    alert(dataService.getMsg() + ', ' + name)
  }

  return {
  	showMsg: showMsg,
  }

})
