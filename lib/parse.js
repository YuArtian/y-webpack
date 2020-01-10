const fs = require('fs')
const babylon = require('babylon')
const parser = require('@babel/parser')
const traverse = require('@babel/traverse').default
const { transformFromAst } = require('@babel/core')
const resolve = require('./resolve')

/* 将文件转为 AST */
function getAST (entry) {
  const content = fs.readFileSync(entry, 'utf-8')
  return babylon.parse(content, {
    sourceType: 'module',
  })
}

/* 遍历AST 获取依赖关系 更新 node.source.value 为绝对路径 */
async function getDependence (ast, config) {
  let dependencies = []
  let results = []
  let map = {}
  //遍历AST得到依赖文件列表
  traverse(ast, {
    ImportDeclaration: ({node}) => {
      dependencies.push(node.source.value);
    },
  })
  //将依赖文件路径转换为绝对路径
  for (const filePath of dependencies) {
    const absoluteFilePath = await resolve(filePath, config)
    map[filePath] = absoluteFilePath
    results.push(absoluteFilePath)
  }
  //更新AST
  traverse(ast, {
    ImportDeclaration: ({node}) => {
      node.source.value = map[node.source.value]
    },
  })
  return results
}

/* 转换AST为js语法 */
function getCode (ast) {
  const { code } = transformFromAst(ast, null, {
    presets: ['@babel/preset-env']
  })
  return code
}

/* 解析文件 生产依赖关系 */
module.exports = async function (filePath, config) {
  try {
    const absoluteFilePath = await resolve(filePath, config)
    const ast = getAST(absoluteFilePath)
    return {
      filePath: absoluteFilePath,
      dependencies: await getDependence(ast, config),
      code: getCode(ast)
    }
  } catch (error) {
    console.error('parse error',error);
  }
}
