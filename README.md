# y-webpack
自己简单实现的webpack

基本流程
1. 执行 bin/y-webpack.js<br>
   1.1 根据命令行或配置文件生成配置<br>
   1.2 根据配置进行 y-webpack 打包逻辑
2. AST语法转换<br>
   2.1 [babel/parser](https://babeljs.io/docs/en/babel-parser) 解析语法 生成AST<br>
   2.2 [babel/traverse](https://babeljs.io/docs/en/babel-traverse) 遍历AST 分析记录依赖关系<br>
   2.3 [babel/core](https://babeljs.io/docs/en/babel-core) babel.transformFromAst + [babel/preset-env](https://babeljs.io/docs/en/babel-preset-env) 将AST转换为ES5 JavaScript
3. 处理模块加在依赖
4. 生成一个可以在浏览器加载执行的 js 文件