## Vim的模式与一些常用命令
### Vim的模式
Vim有三种模式：Normal 、Insert 、 Visual。
在Normal模式下，可以输入运行命令；((按`esc`键可以退出Insert模式和Visual模式回到Normal模式))
在Insert模式下，可以输入编辑文本(输入`i`进入Insert模式)；
在Visual模式下，可以对选定的文本运行命令操作并该命令仅仅作用于选定文本(输入`v`进入Insert模式)。
### 常用命令
复制文本：
先进入Visual模式，按上下键选中需要进行复制的文本，输入`y`对文本进行复制，然后切换到Insert模式，输入`p`进行文本的粘贴。

 1. :wq → 存盘 + 退出 (:w 存盘, :q 退出)  
 2. i → Insert 模式，按 ESC 回到 Normal 模式
 3. p → 粘贴内容到剪贴板
 4. y → 复制内容到剪贴板
 5. hjkl (强例推荐使用其移动光标，但不必需) →你也可以使用光标键 (←↓↑→). 注: j 就像下箭头。
 6. `:help <command> `→ 显示相关命令的帮助。你也可以就输入 :help 而不跟命令。（注：退出帮助需要输入:q）

### 参考博文
1. [vim简单使用教程](https://www.cnblogs.com/lijia0511/p/5644566.html)
2. [Linux vi/vim](http://www.runoob.com/linux/linux-vim.html)
3. [Vim入门教程](http://blog.jobbole.com/86132/)
4. [简明 VIM 练级攻略](https://coolshell.cn/articles/5426.html)

