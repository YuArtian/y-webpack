const fs = require('fs')
const babylon = require('babylon')
const parser = require('@babel/parser')
const traverse = require('@babel/traverse').default
const { transformFromAst } = require('@babel/core')

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

module.exports = function (entry) {
  const ast = getAST(entry)
  return {
    filePath: entry,
    dependencies: getDependence(ast),
    code: getCode(ast)
  }
}
