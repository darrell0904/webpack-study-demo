(function () {
  //配置
  requirejs.config({
    //基本路径
    baseUrl: "js/",
    //模块标识名与模块路径映射
    paths: {
      "alerter": "modules/alerter",
      "dataService": "modules/dataService",
 			'jquery': 'libs/jquery-1.7.2'
    }
  })
  
  //引入使用模块
  requirejs( ['alerter'], function(alerter) {
    alerter.showMsg()
  })
})()
