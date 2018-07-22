### 1. Context
Context 通过组件树提供了一个传递数据的方法，从而避免了在每一个层级手动的传递 props 属性。
#### 1.1 API
##### React.createContext
```
const {Provider, Consumer} = React.createContext(defaultValue);
```
创建一对 { Provider, Consumer }。当 React 渲染 context 组件 Consumer 时，它将从组件树的上层中最接近的匹配的 Provider 读取当前的 context 值。

如果上层的组件树没有一个匹配的 Provider，而此时你需要渲染一个 Consumer 组件，那么你可以用到 defaultValue 。这有助于在不封装它们的情况下对组件进行测试。
##### Provider
```
<Provider value={/* some value */}>
```
React 组件允许 Consumers 订阅 context 的改变。

接收一个 value 属性传递给 Provider 的后代 Consumers。一个 Provider 可以联系到多个 Consumers。Providers 可以被嵌套以覆盖组件树内更深层次的值。

##### Consumer
```
<Consumer>
  {value => /* render something based on the context value */}
</Consumer>
```
一个可以订阅 context 变化的 React 组件。
#### 1.2 demo
```
// App.jsx
import * as React from 'react';
import { ThemeContext, themes } from './theme-context';
import ThemeButton from './ThemeButton';

function Toolbar(props) {
    return (
        <ThemeButton onClick={props.changeTheme} txt="Change Theme func" />
    );
}

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            theme: themes.light
        };
        this.toggleTheme = () => {
            this.setState(state => ({
                theme: state.theme === themes.dark ? themes.light : themes.dark
            }));
        };
    }

    render() {
        return (
            <React.Fragment>
                <ThemeContext.Provider value={this.state.theme}>
                    <Toolbar changeTheme={this.toggleTheme} />
                </ThemeContext.Provider>
            </React.Fragment>
        );
    }
}

export default App;
```
```
// ThemeButton.jsx
import * as React from 'react';
import { ThemeContext } from './theme-context';

function ThemeButton(props) {
    return (
        <ThemeContext.Consumer>
            {
                theme => (
                    <button
                        {...props}
                        style={{ backgroundColor: theme.background }}
                     >
                        {props.txt}
                    </button>
                )
            }
        </ThemeContext.Consumer>
    );
}

export default ThemeButton;
```
```
// ThemeContext.jsx
import * as React from 'react';

export const themes = {
    light: {
        foreground: '#fff',
        background: '#f00'
    },
    dark: {
        foreground: '#000',
        background: '#eee'
    }
};

export const ThemeContext = React.createContext(
    themes.dark
);
```

### 参考文档
1. [React 16.3来了：带着全新的Context API](https://juejin.im/post/5a7b41605188257a6310fbec)
2. [React 全新的 Context API](https://juejin.im/entry/5a9caa786fb9a028e46e2011)
3. [React](https://reactjs.org/docs/context.html#api)
4. [React v16 新特性实践](https://cloud.tencent.com/developer/article/1137778)