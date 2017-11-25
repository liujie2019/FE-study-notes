### npm定义
npm是javascript的包管理工具，是前端模块化下的一个标志性产物。简单地地说，就是通过npm下载模块，复用已有的代码，提高工作效率。

### 使用npm安装包
npm安装的方式有两种：本地安装和全局安装。

```
npm install 模块
#安装好后不写入package.json中
npm install 模块 --save 
#安装好后写入package.json的dependencies中（生产环境依赖）
npm install 模块 --save-dev 
#安装好后写入package.json的devDepencies中（开发环境依赖）
```
### 删除npm包

```
#删除全局模块
npm uninstall -g <package>
#删除本地模块
npm uninstall 模块 
#删除本地模块时你应该思考的问题：是否将在package.json上的相应依赖信息也消除？
npm uninstall 模块
#删除模块，但不删除模块留在package.json中的对应信息
npm uninstall 模块 --save 
#删除模块，同时删除模块留在package.json中dependencies下的对应信息
npm uninstall 模块 --save-dev
#删除模块，同时删除模块留在package.json中devDependencies下的对应信息
```


### 参考文档
[利用npm安装/删除/发布/更新/撤销发布包](http://www.cnblogs.com/penghuwan/p/6973702.html)