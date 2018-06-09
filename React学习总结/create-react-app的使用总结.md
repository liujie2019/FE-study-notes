### 1. 实现简单的React组件
```
class App extends Component {
  render() {
    return (
      <div className="App">
        <p>
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
      </div>
    );
  }
}

export default App;
```
以上是最简单的React组件了，自己实现组件也是分这么几个步骤：

1. import React(引入react)
2. 新建一个类，继承React.Component，React里每个组件都可以写成一个类
3. 类的render函数返回值，就是显示在页面的内容
4. render里返回的是东西有点诡异，表面上是html其实Babel会把JSX转成React.createElememt来执行
5. 由于JSX本质就是 js，class是 js 的关键字，所以要用className代替
6. 如果想在JSX里渲染变量，使用{}包裹即可

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
2. [开发 react 应用最好用的脚手架 create-react-app](https://www.rails365.net/articles/kai-fa-react-ying-yong-zui-hao-jiao-shou-jia-create-react-app)