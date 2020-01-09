const parse = require('./parse')
const bundle = require('./bundle')

module.exports = async function (config) {
  try {
    let entry = config.entry.indexOf('.js') === -1 ? config.entry + '.js' : config.entry
    const mainFile = await parse(entry, config)
    let queue = [mainFile]
    for (const asset of queue) {
      for (const dep of asset.dependencies) {
        let child = await parse(dep, config)
        queue.push(child)
      }
    }
    return bundle(entry, queue)
  } catch (error) {
    console.error('y-webpack error', error);
  }
}