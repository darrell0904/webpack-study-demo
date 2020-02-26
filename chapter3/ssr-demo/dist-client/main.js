(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[0],{

/***/ 12:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "images/lufei_d832ab01f950cd2e68095a683294ba3c.jpg";

/***/ }),

/***/ 20:
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin
    if(false) { var cssReload; }
  

/***/ }),

/***/ 21:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);

// EXTERNAL MODULE: ./node_modules/@babel/runtime/helpers/classCallCheck.js
var classCallCheck = __webpack_require__(1);
var classCallCheck_default = /*#__PURE__*/__webpack_require__.n(classCallCheck);

// EXTERNAL MODULE: ./node_modules/@babel/runtime/helpers/createClass.js
var createClass = __webpack_require__(2);
var createClass_default = /*#__PURE__*/__webpack_require__.n(createClass);

// EXTERNAL MODULE: ./node_modules/@babel/runtime/helpers/possibleConstructorReturn.js
var possibleConstructorReturn = __webpack_require__(3);
var possibleConstructorReturn_default = /*#__PURE__*/__webpack_require__.n(possibleConstructorReturn);

// EXTERNAL MODULE: ./node_modules/@babel/runtime/helpers/getPrototypeOf.js
var getPrototypeOf = __webpack_require__(5);
var getPrototypeOf_default = /*#__PURE__*/__webpack_require__.n(getPrototypeOf);

// EXTERNAL MODULE: ./node_modules/@babel/runtime/helpers/inherits.js
var inherits = __webpack_require__(6);
var inherits_default = /*#__PURE__*/__webpack_require__.n(inherits);

// EXTERNAL MODULE: ./node_modules/react/index.js
var react = __webpack_require__(0);
var react_default = /*#__PURE__*/__webpack_require__.n(react);

// EXTERNAL MODULE: ./node_modules/react-dom/index.js
var react_dom = __webpack_require__(10);
var react_dom_default = /*#__PURE__*/__webpack_require__.n(react_dom);

// EXTERNAL MODULE: ./node_modules/@babel/runtime/regenerator/index.js
var regenerator = __webpack_require__(7);
var regenerator_default = /*#__PURE__*/__webpack_require__.n(regenerator);

// EXTERNAL MODULE: ./node_modules/@babel/runtime/helpers/asyncToGenerator.js
var asyncToGenerator = __webpack_require__(11);
var asyncToGenerator_default = /*#__PURE__*/__webpack_require__.n(asyncToGenerator);

// EXTERNAL MODULE: ./node_modules/@babel/runtime/helpers/assertThisInitialized.js
var assertThisInitialized = __webpack_require__(4);
var assertThisInitialized_default = /*#__PURE__*/__webpack_require__.n(assertThisInitialized);

// EXTERNAL MODULE: ./node_modules/@babel/runtime/helpers/defineProperty.js
var defineProperty = __webpack_require__(8);
var defineProperty_default = /*#__PURE__*/__webpack_require__.n(defineProperty);

// EXTERNAL MODULE: ./src/index.less
var src = __webpack_require__(20);

// EXTERNAL MODULE: ./src/assets/lufei.jpg
var lufei = __webpack_require__(12);
var lufei_default = /*#__PURE__*/__webpack_require__.n(lufei);

// CONCATENATED MODULE: ./src/home.js













var home_Home =
/*#__PURE__*/
function (_React$Component) {
  inherits_default()(Home, _React$Component);

  function Home(props) {
    var _this;

    classCallCheck_default()(this, Home);

    _this = possibleConstructorReturn_default()(this, getPrototypeOf_default()(Home).call(this, props));

    defineProperty_default()(assertThisInitialized_default()(_this), "fetchData",
    /*#__PURE__*/
    asyncToGenerator_default()(
    /*#__PURE__*/
    regenerator_default.a.mark(function _callee() {
      var data;
      return regenerator_default.a.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _context.next = 2;
              return new Promise(function (resolve) {
                setTimeout(function () {
                  resolve({
                    data: [{
                      id: 1
                    }, {
                      id: 2
                    }]
                  });
                }, 5000);
              });

            case 2:
              data = _context.sent;

              _this.setState({
                demoList: data
              });

            case 4:
            case "end":
              return _context.stop();
          }
        }
      }, _callee);
    })));

    defineProperty_default()(assertThisInitialized_default()(_this), "addNum", function () {
      _this.setState({
        name: _this.state.name + 1
      });
    });

    _this.state = {
      name: 1,
      demoList: {}
    };
    return _this;
  }

  createClass_default()(Home, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      this.fetchData();
    }
  }, {
    key: "UNSAFE_componentWillMount",
    value: function UNSAFE_componentWillMount() {
      var _this2 = this;

      console.log('哈哈哈~ ！准备渲染了');
      setTimeout(function () {
        _this2.setState({
          name: 10
        });
      }, 3000);
    }
  }, {
    key: "render",
    value: function render() {
      var _this$state = this.state,
          name = _this$state.name,
          demoList = _this$state.demoList;
      var data = demoList.data;
      return react_default.a.createElement("div", {
        className: "Home"
      }, "HomePage", react_default.a.createElement("img", {
        src: lufei_default.a,
        alt: "bg",
        onClick: this.addNum
      }), name, data && data.map(function (item) {
        return react_default.a.createElement("li", {
          key: item.id
        }, item.id);
      }));
    }
  }]);

  return Home;
}(react_default.a.Component); // module.exports = Home;


/* harmony default export */ var home = (home_Home);
// CONCATENATED MODULE: ./src/index.js









var src_App =
/*#__PURE__*/
function (_Component) {
  inherits_default()(App, _Component);

  function App() {
    classCallCheck_default()(this, App);

    return possibleConstructorReturn_default()(this, getPrototypeOf_default()(App).apply(this, arguments));
  }

  createClass_default()(App, [{
    key: "render",
    value: function render() {
      return react_default.a.createElement("div", null, react_default.a.createElement(home, null));
    }
  }]);

  return App;
}(react["Component"]);

react_dom_default.a.render(react_default.a.createElement(src_App, null), document.getElementById('root'));

/***/ })

},[[21,1,2]]]);