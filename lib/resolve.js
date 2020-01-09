const fs = require('fs')
const path = require('path')

/* 依照模块查找的逻辑 生成可能匹配的文件路径 */
function generateFilePath (context, filePath) {
  let filePaths = []
  let currentPath = filePath
  //绝对路径
  if (path.isAbsolute(currentPath)) {
    //没有后缀 自动解析成 .js
    if (!path.extname(currentPath)) {
      currentPath = currentPath + '.js'
    }
    filePaths.push(currentPath)
  }
  //相对路径
  else if (filePath.startsWith('./') || filePath.startsWith('../')) {
    filePaths.push(path.resolve(context, filePath))
  }
  //模块名字
  else {
    let ext = path.extname(filePath)
    if (!ext) {
      ext = '.js'
    }
    let paths = context.split(path.sep)
    let length = path.length
    for (let i = length; i > 1; i--) {
      let newContext = paths.slice(0, i).join(path.sep);
      filePaths.push(path.resolve(newContext, `./${filePath}${ext}`));
      filePaths.push(path.resolve(newContext, `./node_modules`, `./${filePath}${ext}`));
      filePaths.push(path.resolve(newContext, './node_modules', `./y-${filePath}-loader`, `index${ext}`));
    }
  }
  return filePaths
}

/* 检查是否存在文件 */
function checkFile (filePath) {
  return new Promise(resolve => {
    fs.stat(filePath, function(err, stats){
      console.log('checkFile Promise stats');
      if (stats && stats.isFile()) {
        resolve(filePath)
      }
      //不存在
      resolve(false)
    })
  })
}

/* 解析文件路径 */
module.exports = async function (filePath, config) {
  try {
    const context = config.context
    let results = []
    let files = generateFilePath(context, filePath)
    console.log('files',files);
    for (const file of files) {
      let isExist = await checkFile(file)
      console.log('isExist', isExist);
      if (isExist) {
        results.push(isExist)
      }
    }
    console.log('results',results);
    return results[0]
  } catch (error) {
    console.error('resolve error', error);
  }
}
