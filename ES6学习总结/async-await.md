async 函数是 Generator 函数的语法糖。使用 关键字 async 来表示，在函数内部使用 await 来表示异步。相较于 Generator，async 函数的改进在于下面四点：

1. 内置执行器。Generator 函数的执行必须依靠执行器，而 async 函数自带执行器，调用方式跟普通函数的调用一样；
2. 更好的语义。async 和 await 相较于 * 和 yield；
3. 更加语义化更广的适用性。co 模块约定，yield 命令后面只能是 Thunk 函数或 Promise对象。而 async 函数的 await 命令后面则可以是 Promise 或者 原始类型的值（Number，string，boolean，但这时等同于同步操作；
4. 返回值是 Promise。async 函数返回值是 Promise 对象，比 Generator 函数返回的 Iterator 对象方便，可以直接使用 then() 方法进行调用。

### async-await和Promise的关系
async-await是promise和generator的语法糖。只是为了让我们书写代码时更加流畅，当然也增强了代码的可读性。简单来说：async-await 是建立在 promise机制之上的，并不能取代其地位。
### 基本语法
```
async function fn() {
 	// await会把结果转化为一个Promise对象
    const result = await Math.random();
    console.log(result);
}

fn();
```
#### async
async用来表示函数是异步的，定义的函数会返回一个Promise对象，可以使用then方法添加回调函数。

```
async function demo1(params) {
    return 'demo1';
}

demo1().then(val => {
    console.log(val); // 'demo1'
});
```
若 async 定义的函数有返回值，return 123;相当于Promise.resolve(123),没有声明式的 return则相当于执行了Promise.resolve();

#### await
await 可以理解为是 async wait 的简写。await 必须出现在 async 函数内部，不能单独使用。

```

```
await 后面可以跟任何的JS 表达式。虽然说 await 可以等很多类型的东西，但是它最主要的意图是用来等待 Promise 对象的状态被 resolved。如果await的是 promise对象会造成异步函数停止执行并且等待 promise 的解决,如果等的是正常的表达式则立即执行。
### 参考文档
1. [理解 async/await](https://segmentfault.com/a/1190000010244279)
2. [ES6系列文章 异步神器async-await](https://segmentfault.com/a/1190000011526612)
3. [一次性让你懂async/await，解决回调地狱](https://juejin.im/post/5b1ffff96fb9a01e345ba704)