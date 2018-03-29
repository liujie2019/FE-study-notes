`this.setState()`方法可以接收一个函数作为参数，`prevState`是之前的`state`值。

```
 this.setState(prevState => ({
      seconds: prevState.seconds + 1
    }));
```
### 使用 PropTypes 进行类型检查
PropTypes 包含一整套验证器，可用于确保你接收的数据是有效的。在这个示例中，我们使用了 PropTypes.string。当你给属性传递了无效值时，JavsScript 控制台将会打印警告。出于性能原因，propTypes 只在**开发模式下**进行检查。

```
class Greeting extends React.Component {
  render() {
    return (
      <h1>Hello, {this.props.name}</h1>
    );
  }
}
// 为属性指定默认值:
Greeting.defaultProps = {
  name: 'Stranger'
};
```

### ref机制
```
#通过ref来获取dom元素的引用
ref = {
	function (el) {
		self._input = el;
	}
}
```