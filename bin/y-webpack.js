#!/usr/bin/env node

const fs = require('fs')
const path = require('path')
const argv = require('yargs').argv
const ora = require('ora')
const chalk = require('chalk')
const y_webpack = require('../lib/y-webpack')
const delDir = require('./tools/delDir')
const log = console.log;
//当前工作目录
const projectPath = process.cwd()
//当前配置文件
const configPath = path.join(projectPath, 'y-webpack.config.js')

/* 内置默认配置 */
let _config = Object.create(null)
//入口
_config.entry = 'src/index.js'
//出口
_config.output = 'dist/bunlde.js'

/* 配置文件处理 */
if(fs.existsSync(configPath)){
  let config = require(configPath)
  _config = Object.assign(Object.create(null), _config, config)
}

/* 命令行参数处理 */
let options = argv._
//第一个参数为入口配置
if (options[0]) {
  _config.entry = options[0]
}
//第二个参数为出口配置
if (options[1]) {
  _config.output = options[1]
}

/* 最终可用配置处理 */
//实际入口路径
_config.entry = path.join(projectPath, _config.entry)
_config.output = path.join(projectPath, _config.output)

/* 初始化 */
function init () {
  console.log('init');
  let spinner = ora(chalk.blue('开始打包...')).start()
  //找不到入口文件
  if (!fs.existsSync(_config.entry)) {
    spinner.stop()
    chalk.red('找不到入口文件')
  }
  //获取打包结果
  const result = y_webpack(_config)
  //输出打包结果
  try {
    spinner.info('开始写入文件')
    if (fs.existsSync(_config.output)) {
      spinner.warn('已存在文件夹')
      delDir(_config.output)
    }
    fs.mkdirSync(path.dirname(_config.output))
    fs.writeFileSync(_config.output, result)
  } catch (error) {
    log(chalk.red('打包输出出错'),error)
    spinner.stop(chalk.red('打包输出出错'))
  }
  spinner.succeed('已生成对应文件')
}

init()
