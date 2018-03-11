### 1. fis构建
```
-h, --help            print this help message
-d, --dest <path>     release output destination
-l, --lint            with lint
-w, --watch           monitor the changes of project
-L, --live            automatically reload your browser
-c, --clean           clean compile cache
-u, --unique          use unique compile caching
```
```
#-w 启用文件监听
#-d 指定打包目录
fis3 release -w
fis3 release -d
```
#### 1.1 浏览器自动刷新
```
#FIS3 支持浏览器自动刷新功能，只需要给 release 命令添加 -L 参数，通常 -w 和 -L 一起使用
fis3 release -wL
```
### fis-receiver(发布到远端机器)

### 参考文档
1. [fis-receiver：一行命令将项目部署到远程服务器](https://yq.aliyun.com/articles/36271)
2. [fis官方文档](http://fis.baidu.com/fis3/docs/beginning/debug.html)