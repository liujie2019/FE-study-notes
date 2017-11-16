## babel学习总结
Babel是一个广泛使用的转码器，可以将ES6代码转为ES5代码，从而在现有环境执行。
###基础安装
如果在CLI(command-line interface命令行界面)使用babel的话，请安装babel-cli：

```
$ npm install -g babel-cli
```

如果你想结合node.js来写的话，需要安装babel-core：

```
$ npm install -g babel-core
```

###插件和预设(Plugins and Presets)
babel6里并没有默认的转换规则，所以你安装了如上两项，用babel运行你的文件会发现并没有什么变化，因此我们需要安装所需插件，并在`.babelrc`文件做一些设置:
####例如使用箭头函数

```
$ npm install --save-dev babel-plugin-transform-es2015-arrow-functions
```

同时在.babelrc文件添加：

```
{
  "plugins": ["transform-es2015-arrow-functions"]
}
```

当然还有很多细节我们不可能一点点全部去安装，我们如果想要转换某些特性的话，可以去安装某个版本的预置，babel可以去向下兼容：

```
$ npm install --save-dev babel-preset-es2015//.babelrc文件
{
  "presets": ["es2015"]
}
```
如果想包含所有javascript版本的话：

```
$ npm install --save-dev babel-preset-env//.babelrc文件
{
  "presets": ["env"]
}
```

###编译使用
在安装了babel-cli之后，在命令行使用babel命令去编译文件:

```
#编译文件
babel es6.js  
#输出编译后的文件
babel es6.js -o compiled.js
监听编译文件变动
babel es6.js -o -w compiled.js
```

安装完babel-cli和babel-core之后，使用babel-node命令去编译并运行文件(不适于生产环境)

```
#编译并运行文件
$ babel-node es6.js
```


###配置文件.babelrc
Babel的配置文件是 `.babelrc` ，存放在项目的根目录下。使用Babel的第一步，就是配置这个文件。
该文件用来设置转码规则和插件，基本格式如下：

```
{
  "presets": [],
  "plugins": []
}
```
`presets` 字段设定转码规则，官方提供以下的规则集，你可以根据需要安装：

```
ES2015转码规则
$ npm install --save-dev babel-preset-es2015

react转码规则
$ npm install --save-dev babel-preset-react

ES7不同阶段语法提案的转码规则（共有4个阶段），选装一个
$ npm install --save-dev babel-preset-stage-0
$ npm install --save-dev babel-preset-stage-1
$ npm install --save-dev babel-preset-stage-2
$ npm install --save-dev babel-preset-stage-3
```
然后，将这些规则加入 `.babelrc`：

```
 {
    "presets": [
      "es2015",
      "react",
      "stage-2"
    ],
    "plugins": []
  }
```
**注意：** 所有Babel工具和模块的使用，都必须先写好 `.babelrc` 。

### 命令行转码babel-cli
Babel提供 `babel-cli` 工具，用于命令行转码。
安装命令如下:

```
$ npm install -g babel-cli
```
基本用法:

```
转码结果输出到标准输出(输出到命令行窗口)
$ babel example.js

转码结果写入一个新的文件
--out-file 或 -o 参数指定输出文件
$ babel example.js --out-file compiled.js
或者
$ babel example.js -o compiled.js

整个目录转码
--out-dir 或 -d 参数指定输出目录
$ babel src --out-dir lib
或者
$ babel src -d lib

-s 参数生成source map文件
$ babel src -d lib -s
```
在上面给出的转码命令是在全局环境下利用Babel进行转码。也就是说，如果项目要运行，全局环境必须有Babel，这就导致项目对环境产生了依赖。另一方面，这样做也无法支持不同项目使用不同版本的Babel。
尽管你可以把 Babel CLI 全局安装在你的机器上，但是在项目中安装会更好。
有两个主要的原因：
1. 在同一台机器上的不同项目或许会依赖不同版本的 Babel 并允许你有选择的更新。
2. 这意味着项目对工作环境没有隐式依赖，这可以让项目有很好的可移植性并且易于安装。
对这一问题，相应的解决办法是将 `babel-cli` 安装在项目中：

```
安装命令
$ npm install --save-dev babel-cli
```
然后，在 `package.json` 文件中的 `scripts` 字段中加入：

```
"scripts": {
    "build": "babel src -d lib"
  }
```
要对项目文件进行转码的时候，就执行下面的命令：

```
$ npm run build
```
**注意：** 由于全局运行 Babel 是一个坏习惯，如果你要卸载全局安装的版本可以执行：

```
npm uninstall -g babel-cli
```

### babel-node(运行代码)
`babel-cli` 工具自带一个 `babel-node ` 命令，提供一个支持ES6的REPL环境。它支持Node的REPL环境的所有功能，而且可以直接运行ES6代码。
它不用单独安装，而是随 `babel-cli` 一起安装。然后，执行 `babel-node` 就进入PEPL环境。

```
$ babel-node
> (x => x * 3)(2)
6
```
`babel-node` 命令可以直接运行ES6脚本。将上面的代码放入脚本文件demo.js，然后直接运行:

```
$ babel-node demo.js
6
```
`babel-node` 也可以安装在项目中:

```
$ npm install --save-dev babel-cli
```
然后，改写package.json文件中的 `scripts` 字段：

```
  "scripts": {
    "script-name": "babel-node script.js"
  }
```
上面代码中，使用 `babel-node` 替代 `node` ，这样script.js本身就不用做任何转码处理。

### babel-register
`babel-register` 模块改写 `require` 命令，为它加上一个钩子。此后，每当使用 `require` 加载 `.js` 、 `.jsx` 后缀名的文件，就会先用 `Babel` 进行转码。

```
$ npm install --save-dev babel-register
```
使用时，必须首先加载 `babel-register` 。

```
require("babel-register");
require("./index.js");
```
然后，就不需要手动对index.js转码了。
需要注意的是， `babel-register` 只会对 `require` 命令加载的文件转码，而不会对当前文件转码。另外，由于它是实时转码，所以只适合在 **开发环境** 中使用。

### babel-core
如果某些代码需要调用Babel的API进行转码，就要使用 `babel-core` 模块。
安装命令如下：

```
$ npm install babel-core --save
```
然后，在项目中就可以调用 `babel-core` ：

```
var babel = require('babel-core');
```
