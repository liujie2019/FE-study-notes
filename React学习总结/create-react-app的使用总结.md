我们用 React.js 开发单页面应用时，通常后端 API 与前端开发服务器并不在一个域内：

React.js 开发服务器运行在 localhost:3000

API 服务器运行在 localhost:4200

如果使用 create-react-app 开发 React 项目，则可以使用它的 proxy 功能。我们需要在 package.json 文件中新增一个字段：

```
{
  "proxy": "http://localhost:4200"
}
```
这样，React 项目中 API 请求就会转发到 http://localhost:4200，不再有跨域的问题。
### 参考文档
1. [create-react-app的使用及原理分析](http://www.cnblogs.com/axl234/p/8269018.html)