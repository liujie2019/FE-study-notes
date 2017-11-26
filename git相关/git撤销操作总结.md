### 在本地创建一个项目

```
$ mkdir hello-world  //创建项目目录hello-world
$ cd hello-world  //进入项目目录
$ git init  //初始化项目 
$ touch README
$ git add README  //添加README文件到暂存区
$ git commit -m 'first commit'   //提交更新，并注释信息“first commit”
$ git remote add origin git@github.test/hellotest.git    //与远程github仓库建立连接 
$ git push -u origin master   //将本地仓库的更改更新到github仓库上去
```

### git工作流
![](../static/git.gif)

```
#把所有文件放入暂存区
git add .
#把所有文件从暂存区提交到本地仓库 
git commit -m "comment"
#把所有文件从本地仓库推送到相应的远程仓库
git push origin <branch>
```

### 4个区

git之所以令人费解，主要是它相比于svn等等传统的版本管理工具，多引入了一个`暂存区(Stage)`的概念，就因为多了这一个概念，而使很多人疑惑。其实，在初学者来说，每个区具体怎么工作的，我们完全不需要关心，而只要知道有这么4个区就够了：

* 工作区( Working Area )
* 暂存区( Stage )
* 本地仓库( Local Repository )
* 远程仓库( Remote Repository )

### 5种状态

上面提到的4个区，进入每一个区成功之后会产生一个状态，再加上最初始的一个状态，一共是 5 种状态。以下我们把这 5 种状态分别命名为：

* 未修改( Origin )
* 已修改( Modified )
* 已暂存( Staged )
* 已提交( Committed )
* 已推送( Pushed )

### 检查修改

了解了基本概念之后，我们来谈一谈犯错误之后如何撤销的问题。首先，我们要了解如何检查这 3 个步骤当中每一个步骤修改了什么，然后才好判断有没有修改成功。检查修改的二级命令都相同，都是 `git diff`，只是参数有所不同。

#### 已修改，未暂存

```
git diff
```
首先，对文件进行了修改，但是还没有做 `git add . `之前，我们如何检查有哪些修改：

![](../static/git_diff.png)
这里可以看出在原文件中添加了`修改文件`四个字。

#### 已暂存，未提交(进行了git add操作)

```
git diff --cached
```
现在我们先把修改放入暂存区。执行 `git add .` ，然后执行 `git diff`，发现没有任何结果。这说明 `git diff` 这个命令只检查我们的`工作区和暂存区`之间的差异，如果我们想看到`暂存区和本地仓库`之间的差异，就需要加一个参数`git diff --cached`。

#### 已提交，未推送

```
git diff master origin/master
```
现在，我们把修改从`暂存区提交到本地仓库` ，再看一下差异。先执行`git commit`，然后再执行`git diff --cached`，没有差异，执行`git diff master origin/master`，可以看到差异。
在这里， `master`就是你的本地仓库 ，而`origin/master` 就是你的远程仓库 ，`master`是主分支，因为我们都在主分支上工作，所以这里两边都是`master` ，而 `origin` 就代表远程。

### 撤销修改

了解清楚如何检查各种修改之后，我们开始尝试各种撤销操作。

#### 已修改，未暂存
如果我们只是在编辑器里修改了文件，但还没有执行`git add .` ，这时候我们的文件还在工作区 ，并没有进入`暂存区` ，我们可以用：

```
git checkout .
或者
git reset --hard
来进行撤销操作。
```
可以看到，在执行完 git checkout . 之后，修改已被撤销， git diff 没有任何内容了。

`git add .`的反义词是`git checkout .`。做完修改之后，如果你想向前走一步，让修改进入暂存区 ，就执行`git add .`，如果你想向后退一步，撤销刚才的修改，就执行`git checkout .`。

#### 已暂存，未提交

你已经执行了 `git add .` ，但还没有执行 `git commit -m "comment"` 。这时候你意识到了错误，想要撤销，你可以执行：

```
git reset 或者 git reset HEAD <file>
git checkout .
或者
git reset --hard
```

`git reset` 只是把修改退回到了 `git add .` 之前的状态，也就是说文件本身还处于`已修改未暂存 状态`，你如果想退回`未修改状态`，还需要执行 `git checkout .` 。

或许你已经注意到了，以上两个步骤都可以用同一个命令`git reset --hard`来完成。是的，就是这个强大的命令，可以一步到位地把你的修改完全恢复到`未修改`的状态。

#### 已提交，未推送

你的手太快，你既执行了 `git add .` ，又执行了 `git commit` ，这时候你的代码已经进入了你的 本地仓库 ，然而你后悔了，怎么办？不要着急，还有办法。

```
git reset --hard origin/master
```
还是这个 `git reset --hard` 命令，只不过这次多了一个参数 `origin/master` ，正如我们上面讲过的， `origin/master` 代表远程仓库 ，既然你已经污染了你的本地仓库 ，那么就从远程仓库把代码取回来吧。

#### 已推送

很不幸，你的手实在是太快了，你既 `git add` 了，又 `git commit` 了，并且还 `git push`了，这时你的代码已经进入 远程仓库 。如果你想恢复的话，还好，由于你的 本地仓库 和 远程仓库 是等价的，你只需要先恢复 本地仓库 ，再强制 push 到 远程仓库 就好了：

```
git reset --hard HEAD^
git push -f
```