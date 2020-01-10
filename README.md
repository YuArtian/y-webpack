# y-webpack
🤡 自己简单实现的 webpack(伪) 🤡

🤣 并没有 `Tapable` 🤣

😜 所以也并没有实现真正的webpack 😜

🤖 就只是一个连打包都可能有bug的小玩具 🤖

🙏 如果你有幸玩出了 `bug` 💩， 请一定要提`issus`哦 🙏

#### 基本流程

1. 生成配置
  
  ​&emsp;&emsp;-> 根据 `命令行参数` 和 `配置文件` 生成最终可用的配置
  
2. 开始打包

  ​&emsp;&emsp;-> 找到入口文件并从入口文件开始解析文件

3. 通过 `parse.js` 解析文件

  ​&emsp;&emsp;-> 先通过 `resolve.js` 找到文件的实际位置，也就是绝对路径，记录在 `filePath` 字段中

  ​&emsp;&emsp;-> 读取路径下的文件内容，用 `babylon` 转换成为 `AST`

  ​&emsp;&emsp;-> `@babel/traverse` 遍历 `AST`，获取引入的模块列表，记录在 `dependencies` 字段中

  ​&emsp;&emsp;-> `@babel/core` 将 `AST` 转为 `ES5`，记录在 `code` 字段中

  ​&emsp;&emsp;-> 最终返回记录了当前文件信息的对象 `{filePath, dependencies, code}`

4. 深度优先遍历 `dependencies` 中的模块，执行第3步解析文件的逻辑

  ​&emsp;&emsp;-> 用 `queue` 存储遍历的结果

5. 执行 `bundle.js`，对解析的结果（`queue`） 打包

  ​&emsp;&emsp;-> 将各个模块的代码进行拼接，生成最终可执行的，符合CommonJS规范的，可在浏览器执行的一个(目前打包只做了单文件的)JS文件

6. 将结果写入到配置的输出目录中

   

##### `resolve.js`查找模块位置的逻辑

​&emsp;&emsp;-> 绝对路径 直接采用，自动补全 `.js` 后缀

​&emsp;&emsp;-> 相对路径 根据当前文件的位置 `context` 查找文件

​&emsp;&emsp;-> 其他的命名，视为模块名字

​&emsp;&emsp;&emsp;&emsp;-> 基于当前文件位置，逐层往上的依次查找 当前目录，`node_modules` 和 `node_modules` 下的 `loader`

##### AST语法转换相关

- [babel/parser](https://babeljs.io/docs/en/babel-parser) 解析语法 生成AST
- [babel/traverse](https://babeljs.io/docs/en/babel-traverse) 遍历AST 分析记录依赖关系
- [babel/core](https://babeljs.io/docs/en/babel-core) babel.transformFromAst + [babel/preset-env](https://babeljs.io/docs/en/babel-preset-env) 将AST转换为ES5 JavaScript

#### 如何运行

```shell
yarn
yarn link
y-webpack
```
