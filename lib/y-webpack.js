const parse = require('./parse')
const bundle = require('./bundle')

let config = {}

module.exports = function (options) {
  config = options
  const mainFile = parse(options.entry, options)
  let queue = [mainFile]
  for (const asset of queue) {
    asset.dependencies.forEach(dep => {
      let child = parse(dep)
      queue.push(child)
    });
  }
  return bundle(options.entry, queue)
}