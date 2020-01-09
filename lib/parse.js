const fs = require('fs')
const babylon = require('babylon')
const parser = require('@babel/parser')
const traverse = require('@babel/traverse').default
const { transformFromAst } = require('@babel/core')
const resolve = require('./resolve')

function getAST (entry) {
  const content = fs.readFileSync(entry, 'utf-8')
  return babylon.parse(content, {
    sourceType: 'module',
  })
}

function getDependence (ast) {
  let dependencies = []
  traverse(ast, {
    ImportDeclaration: ({node}) => {
      dependencies.push(node.source.value);
    },
  })
  return dependencies
}

function getCode (ast) {
  const { code } = transformFromAst(ast, null, {
    presets: ['@babel/preset-env']
  })
  return code
}

module.exports = async function (filePath, config) {
  try {
    const absoluteFilePath = await resolve(filePath, config)
    console.log('absoluteFilePath',absoluteFilePath);
    const ast = getAST(absoluteFilePath)
    return {
      filePath: absoluteFilePath,
      dependencies: getDependence(ast),
      code: getCode(ast)
    }
  } catch (error) {
    console.error('parse error',error);
  }
}
