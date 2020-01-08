module.exports = function (entry, queue) {
  let modules = ''
  queue.forEach(mod => {
    modules += `'${mod.filePath}': function (module, exports, require) { ${mod.code} },`
  });
  const result = `
    (function(modules){
      function require(filePath){
        const fn = modules[filePath]
        const module = {
          exports: {}
        }
        fn(module, module.exports, require)
        return module.exports
      }
      require('${entry}')
    })({${modules}})
  `
  return result
}