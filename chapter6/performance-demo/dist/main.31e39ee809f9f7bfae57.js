(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[0],{

/***/ 1:
/***/ (function(module, exports, __webpack_require__) {

module.exports = (__webpack_require__(140))(0);

/***/ }),

/***/ 140:
/***/ (function(module, exports) {

module.exports = react;

/***/ }),

/***/ 141:
/***/ (function(module, exports) {

module.exports = vendors;

/***/ }),

/***/ 145:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "images/build_be9020f7f0468210934a9f27314c6dea.png";

/***/ }),

/***/ 334:
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin
    if(false) { var cssReload; }
  

/***/ }),

/***/ 337:
/***/ (function(module, exports, __webpack_require__) {

module.exports = (__webpack_require__(141))(4);

/***/ }),

/***/ 341:
/***/ (function(module, exports, __webpack_require__) {

module.exports = (__webpack_require__(141))(3);

/***/ }),

/***/ 342:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);

// EXTERNAL MODULE: ./node_modules/@babel/runtime/helpers/classCallCheck.js
var classCallCheck = __webpack_require__(51);
var classCallCheck_default = /*#__PURE__*/__webpack_require__.n(classCallCheck);

// EXTERNAL MODULE: ./node_modules/@babel/runtime/helpers/createClass.js
var createClass = __webpack_require__(52);
var createClass_default = /*#__PURE__*/__webpack_require__.n(createClass);

// EXTERNAL MODULE: ./node_modules/@babel/runtime/helpers/possibleConstructorReturn.js
var possibleConstructorReturn = __webpack_require__(53);
var possibleConstructorReturn_default = /*#__PURE__*/__webpack_require__.n(possibleConstructorReturn);

// EXTERNAL MODULE: ./node_modules/@babel/runtime/helpers/getPrototypeOf.js
var getPrototypeOf = __webpack_require__(54);
var getPrototypeOf_default = /*#__PURE__*/__webpack_require__.n(getPrototypeOf);

// EXTERNAL MODULE: ./node_modules/@babel/runtime/helpers/inherits.js
var inherits = __webpack_require__(55);
var inherits_default = /*#__PURE__*/__webpack_require__.n(inherits);

// EXTERNAL MODULE: ./node_modules/@babel/polyfill/lib/index.js
var lib = __webpack_require__(76);

// EXTERNAL MODULE: delegated ./node_modules/react/index.js from dll-reference react
var reactfrom_dll_reference_react = __webpack_require__(1);
var reactfrom_dll_reference_react_default = /*#__PURE__*/__webpack_require__.n(reactfrom_dll_reference_react);

// EXTERNAL MODULE: ./node_modules/react-router-dom/esm/react-router-dom.js
var react_router_dom = __webpack_require__(74);

// EXTERNAL MODULE: ./node_modules/react-router/esm/react-router.js + 1 modules
var react_router = __webpack_require__(33);

// EXTERNAL MODULE: delegated ./node_modules/react-dom/index.js from dll-reference react
var react_domfrom_dll_reference_react = __webpack_require__(73);
var react_domfrom_dll_reference_react_default = /*#__PURE__*/__webpack_require__.n(react_domfrom_dll_reference_react);

// EXTERNAL MODULE: ./node_modules/jquery/dist/jquery.js
var jquery = __webpack_require__(340);

// EXTERNAL MODULE: delegated ./node_modules/lodash/lodash.js from dll-reference vendors
var lodashfrom_dll_reference_vendors = __webpack_require__(341);

// EXTERNAL MODULE: ./src/assets/build.png
var build = __webpack_require__(145);
var build_default = /*#__PURE__*/__webpack_require__.n(build);

// CONCATENATED MODULE: ./src/home.js













var home_Home =
/*#__PURE__*/
function (_Component) {
  inherits_default()(Home, _Component);

  function Home() {
    classCallCheck_default()(this, Home);

    return possibleConstructorReturn_default()(this, getPrototypeOf_default()(Home).apply(this, arguments));
  }

  createClass_default()(Home, [{
    key: "render",
    value: function render() {
      return reactfrom_dll_reference_react_default.a.createElement("div", {
        className: "navcontact"
      }, "HomePage", reactfrom_dll_reference_react_default.a.createElement("img", {
        src: build_default.a
      }));
    }
  }]);

  return Home;
}(reactfrom_dll_reference_react["Component"]);

/* harmony default export */ var home = (home_Home);
// CONCATENATED MODULE: ./src/alias/index.js
/* harmony default export */ var alias = ('我是 alias 的 demo');
// CONCATENATED MODULE: ./src/list/list2/list.jsx











var list_List =
/*#__PURE__*/
function (_Component) {
  inherits_default()(List, _Component);

  function List() {
    classCallCheck_default()(this, List);

    return possibleConstructorReturn_default()(this, getPrototypeOf_default()(List).apply(this, arguments));
  }

  createClass_default()(List, [{
    key: "render",
    value: function render() {
      return reactfrom_dll_reference_react_default.a.createElement("div", null, "ListPage ", alias, " ");
    }
  }]);

  return List;
}(reactfrom_dll_reference_react["Component"]);

/* harmony default export */ var list = (list_List);
// EXTERNAL MODULE: ./src/index.less
var src = __webpack_require__(334);

// CONCATENATED MODULE: ./src/index.js








 // import _ from 'lodash';
// import $ from 'jquery';



 // console.log(_);
// console.log($);

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
      return reactfrom_dll_reference_react_default.a.createElement(react_router_dom["a" /* BrowserRouter */], null, reactfrom_dll_reference_react_default.a.createElement("div", {
        className: "navcontact"
      }, reactfrom_dll_reference_react_default.a.createElement(react_router["a" /* Route */], {
        path: "/",
        exact: true,
        component: home
      }), reactfrom_dll_reference_react_default.a.createElement(react_router["a" /* Route */], {
        path: "/list",
        component: list
      })));
    }
  }]);

  return App;
}(reactfrom_dll_reference_react["Component"]);

react_domfrom_dll_reference_react_default.a.render(reactfrom_dll_reference_react_default.a.createElement(src_App, null), document.getElementById('root'));

/***/ }),

/***/ 73:
/***/ (function(module, exports, __webpack_require__) {

module.exports = (__webpack_require__(140))(8);

/***/ })

},[[342,1,2]]]);
//# sourceMappingURL=main.31e39ee809f9f7bfae57.js.map