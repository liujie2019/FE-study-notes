### mac_iterm2+zsh命令行调用VS Code
编辑根目录下的zsh配置文件`~/.zshrc`，添加`alias`，具体写法：

```
alias vscode = "/Applications/Visual\ Studio\ Code.app/Contents/Resources/app/bin/code"
```
保存更改并退出，重启iterm2，输入命令`vscode --status`发现正常调用，再使用测试命令`vscode test.txt`发现正确打开test.txt。至此，配置完成。
### 参考文档
1. [能让你开发效率翻倍的 VSCode 插件配置（上)](https://juejin.im/post/5a08d1d6f265da430f31950e)
2. [能让你开发效率翻倍的 VSCode 插件配置（中）](https://juejin.im/post/5ad13d8a6fb9a028ce7c0721)
3. [vscode: Visual Studio Code 常用快捷键](https://lzw.me/a/vscode-visual-studio-code-shortcut.html#%E4%B8%BB%E5%91%BD%E4%BB%A4%E6%A1%86)