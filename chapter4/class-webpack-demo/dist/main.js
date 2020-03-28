
(function(modules) {
    function require(fileName) {
        const fn = modules[fileName];

        const module = { exports : {} };

        fn(require, module, module.exports);

        return module.exports;
    }

    require('/Users/fujiawei/Desktop/github/webpack-study-demo/chapter4/class-webpack-demo/src/index.js');
})(
  {
    '/Users/fujiawei/Desktop/github/webpack-study-demo/chapter4/class-webpack-demo/src/index.js': function (require, module, exports) {
        "use strict";

        var _greeting = require("./greeting.js");

        document.write((0, _greeting.greeting)('Darrell'));
      },
      
    './greeting.js': function (require, module, exports) {
      "use strict";

      Object.defineProperty(exports, "__esModule", {
        value: true
      });
      exports.greeting = greeting;

      function greeting(name) {
        return 'hello' + name;
      } 
    },
})
    