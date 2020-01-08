
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

var a = 'aaa'; },})
  