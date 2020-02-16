// index.js code

"use strict"

var _message = _interopRequireDefault(require("./message.js"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
console.log(_message["default"]);

// message.js code

"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports["default"] = void 0;

var _word = require("./word.js");
var message = "say ".concat(_word.word);
var _default = message;

exports["default"] = _default;


// word.js code