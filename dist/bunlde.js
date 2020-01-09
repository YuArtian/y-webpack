
    (function(modules){
      function require(filePath){
        const fn = modules[filePath]
        const module = {
          exports: {}
        }
        fn(module, module.exports, require)
        return module.exports
      }
      require('/Users/XueYu.Zhao/Documents/own/y-webpack/src/index.js')
    })({'/Users/XueYu.Zhao/Documents/own/y-webpack/src/index.js': function (module, exports, require) { "use strict";

var _a = _interopRequireDefault(require("./a.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

console.log('a', _a["default"]); },'/Users/XueYu.Zhao/Documents/own/y-webpack/src/a.js': function (module, exports, require) { "use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _b = _interopRequireDefault(require("./b.js"));

var _c = _interopRequireDefault(require("./c.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var a = {
  a: 'A',
  b: _b["default"],
  c: _c["default"]
};
var _default = a;
exports["default"] = _default; },'/Users/XueYu.Zhao/Documents/own/y-webpack/src/b.js': function (module, exports, require) { "use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var b = 'B';
var _default = b;
exports["default"] = _default; },'/Users/XueYu.Zhao/Documents/own/y-webpack/src/c.js': function (module, exports, require) { "use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var c = 'C';
var _default = c;
exports["default"] = _default; },})
  