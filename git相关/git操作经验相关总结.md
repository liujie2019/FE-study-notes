Git保存的不是文件的变化或者差异，而是一系列不同时刻的文件快照。

1. 配置并初始化一个仓库(repository);
2. 开始或停止跟踪(track)文件;
3. 暂存(stage);
4. 提交(commit)更改。

### 1.获取Git仓库
有两种获取Git项目仓库的方法：

1. 在现有项目或目录下导入所有文件到Git中;
2. 从一个服务器克隆一个现有的Git仓库(推荐)。

#### 1.1 在现有目录中初始化仓库
如果打算使用Git来对现有的项目进行管理，需要在项目目录中执行如下命令：

```
git init
# 该命令将创建一个名为.git的子目录，这个子目录含有你初始化的Git仓库中所有的必须文件，这些文件是Git仓库的骨干。这一命令仅仅是做了一个初始化的操作，项目中的文件并没有被跟踪。

git add .
# 该命令来实现对所有文件的跟踪，git add命令使用文件或目录的路径作为参数；如果参数是目录的路径，该命令将递归地跟踪该目录下的所有文件。git add命令是一个多功能命令，可以用它开始跟踪新文件，或者把已跟踪的文件放到暂存区，还能用于合并时把有冲突的文件标记为已解决状态等。

git commit -m "提交描述"
#该命令实现对文件修改的提交

git clone [url]
#克隆git仓库
git clone https://github.com/libgit2/libgit2
#该命令会在当前目录下创建一个名为"libgit2"的目录，并在这个目录下初始化一个.git文件夹，从远程仓库拉取下所有数据放入.git文件夹，然后从中读取最新版本的文件的拷贝。

git clone https://github.com/libgit2/libgit2 mylibgit
#自定义本地仓库名称为mylibgit
```
#### 1.2 跟踪新文件和暂存已修改文件(git add)
![](../static/staged.png)
如上图所示：
只要在`Changes to be committed`这行下面的，就说明是已暂存状态。
出现在`Changes not staged for commit`这行下面，说明已跟踪文件的内容发生了变化，但还没有放到暂存区，要暂存这次更新，需要运行`git add`命令。

在提交文件之前首先要添加文件到分支中，很多人只知道：`git add .`。如果有文件删除，会发现这些删除的文件并没有被附加进去，肿么办？

```
#方式一
git add --all .
#方式二
git add -A .
```
* –all 参数，顾名思义，添加所有文件（change|delete|add）
* -A 参数，添加修改过和删除过的文件（change|delete）
* 不加 参数，添加修改过和添加的文件（change|add）

#### 1.3 提交文件
```
git commit -m "comment"

# 如果没有删除过文件，可以合并添加和提交文件为一步
git commit -am "add and commit"
```
#### 1.4 远程提交
将代码更改提交到远程仓库上：

```
# 将 master 提交到 origin 上
git push origin master
```
这一步操作可能会出现很多的问题，比如：

a) origin为一个多人开发的库，别人在你提交之前已经向 origin 上提交过一次（或者多次），那么此时你的版本是落后于远程服务器版本的，你需要先拉去线上最新的代码：

```
# 拉去远程分支到 master
git pull origin master
```
b) 执行 a) 之后，有可能也会有提醒：存在冲突，需要合并分支；
c) 如果你很自信，觉得线上的版本是存在问题，你这个版本木有问题，你可以强制提交你的代码：

```
git push -u origin master -f
```
这里需要特别注意，加了 `-f`参数，线上之前的修改就会被删掉，请谨慎使用！
### 2. 忽略文件(.gitignore)
一般我们总会有些文件无需纳入Git的管理，也不希望它们总出现在未跟踪文件列表。通常都是些自动生成的文件，比如日志文件，或者编译过程中创建的临时文件等。在这种情况下，我们可以创建一个名为`.gitignore`的文件，列出要忽略的文件模式。

1. 空行不匹配任何内容，所以可以作为块分隔符；
2. `#`开头表示注释，如果相匹配`#`，可以在前面加一个反斜杠，即`\#`；
3. 除非加了反斜杠，否则一连串的空格会被忽略；
4. 如果在匹配的内容前面加上 !，则这些匹配过的部分将被移出，如果要匹配以 ! 开头的内容，需要加上反斜杠，如 \!important.txt；
5. 如果一个匹配 pattern 后面有一个斜杠，如 foo/，则默认会匹配所有（包含父子文件夹）中的 foo 文件夹内容，并且它不会匹配单个的文件；
6. 如果一个匹配 pattern 不包含斜杠，如 foo，Git 会将其作为一个 shell 的查找命令匹配内容。

需要注意的`**`：

* 如果一个 pattern 以 ** 开头，如 **/foo，最后会匹配所有文件夹下的 foo 文件(夹)；
* 如果一个 pattern 以 /** 开头，如 abc/**，则表示匹配 abc 目录下的所有内容；
* 如果一个 pattern 中间包含 **，如 a/**/b，则会匹配 a/b、a/x/b、a/x/y/b 以及所有类似的内容。

```
# 忽略所有以.o或.a结尾的文件
*.[oa]

# 忽略所有以波浪号结尾的文件
*~

# 忽略node_modules/目录下的所有文件
node_modules/

# 忽略所有以.json的文件
*.json

# 忽略foo目录下除了foo/bar/中的内容
foo/
!foo/bar/
```
#### 2.1 git 操作中，add 之后再加入 gitignore
Git 操作中经常会出现这样的问题，当我们 git add 之后，突然想起来要添加一个 gitignore 文件，但是一些诸如 node_modules/, cache/ 等文件已经被 add 进去了，这些文件不会被 ignore 掉，怎么办？最直接的方式是：

```
# 这一步的操作相当于回到 git add 上一步
git rm -r --cached .
# 然后重新 add
git add --all .
```
### 3. 查看已暂存和未暂存的修改(可以使用git diff命令)
```
HEAD -> 表示上一次的 commit 版本
HEAD~n -> 表示第上 n 词的 commit 版本，这里的 n 是大于等于 1 的整数
```
了解了基本概念之后，我们来谈一谈犯错误之后如何撤销的问题。首先，我们要了解如何检查这 3 个步骤当中每一个步骤修改了什么，然后才好判断有没有修改成功。检查修改的二级命令都相同，都是`git diff`，只是参数有所不同。

#### 5.1 已修改，未暂存
```
git diff
```
首先，对文件进行了修改，但是还没有做 `git add . `之前，我们如何检查有哪些修改：

![](../static/git_diff.png)
这里可以看出在原文件中添加了`修改文件`四个字。

#### 5.2 已暂存，未提交(执行了git add操作)
```
git diff --cached
```
现在我们先把修改放入暂存区。执行 `git add .` ，然后执行 `git diff`，发现没有任何结果。这说明 `git diff` 这个命令只检查我们的`工作区和暂存区`之间的差异，如果我们想看到`暂存区和本地仓库`之间的差异，就需要加一个参数`git diff --cached`。
#### 5.3 已提交，未推送
```
git diff master origin/master
```
现在，我们把修改从`暂存区提交到本地仓库` ，再看一下差异。先执行`git commit`，然后再执行`git diff --cached`，没有差异，执行`git diff master origin/master`，可以看到差异。
在这里， `master`就是你的本地仓库 ，而`origin/master` 就是你的远程仓库 ，`master`是主分支，因为我们都在主分支上工作，所以这里两边都是`master` ，而 `origin` 就代表远程。
#### 5.4 比较多次代码之间的差异
```
# 比较上一次和本次代码之间的差异
git diff HEAD~1 HEAD

# 比较前第三次与本次代码之间的差异
git diff HEAD~3 HEAD

# 前第n次代码
HEAD~n
```
#### 5.5 SHA
关于SHA，其实就是每次执行`git cimmit`之后生成的cimmitId。使用`git log`命令可以看到每次提交的SHA。要比较两次提交之间的差异，可以直接执行：

```
git diff SHA1 SHA2
# 其中 SHA1 和 SHA2 是两次提交（commit）的标识
```
### 4. 提交更新
```
git commit -m "说明"
```
![](../static/gitCommit.png)
执行`git commit`命令后，可以看到，提交后git会告诉你当前在哪个分支(master)提交的，本次提交的完整SHA-1校验和是多少(463dc4f)，以及在本次提交中，有多少文件修改过，多少行添加和删改过。
### 5. 跳过使用暂存区域
```
#给git commit加上-a选项，Git就会自动把所有已经跟踪过的文件暂存起来一并提交，从而跳过git add 步骤。
git commit -am "说明"
```
### 6. 移除文件

### 7. git设置关闭自动换行
```
$ git config --global core.autocrlf false 
```
为了保证文件的换行符是以安全的方法，避免windows与unix的换行符混用的情况，最好也加上这么一句。

```
$ git config --global core.safecrlf true
```
### 8. git删除文件
要从Git中移除某个文件，就必须要从已跟踪文件清单中移除(确切地说，是从暂存区中移除)，然后提交。可以用`git rm`命令完成此项工作，并连带从工作目录中删除指定的文件，这样以后就不会出现在未跟踪文件清单中了。

* **删除文件跟踪并且删除文件系统中的文件file1**

```
# git rm命令后面可以列出文件或者目录的名字
# 删除文件file1
git rm file1
# 提交刚才的删除动作，之后git不再管理该文件
git commit
# 此命令删除log/目录下扩展名为.log的所有文件
git rm log/\*.log
# 删除以~结尾的所有文件
git rm \*~
```
如果删除之前修改过并且已经放到暂存区域的话，则必须要用强制删除选项`-f`。

* **删除文件跟踪但不删除文件系统中的文件**

这种情况是我们想把文件从Git仓库中删除(即从暂存区中移除)，但仍然希望保留在当前工作目录中。换句话说，就是想让文件保留在磁盘，但是并不想让Git继续跟踪。

```
git rm --cached file1 
# 提交刚才的删除动作，之后git不再管理该文件，但是文件系统中还是有file1
git commit
```

### 9. 移动文件(重命名操作)
```
git mv README.md READ
#git mv相当于运行了下面三条命令：
mv README.md READ
git rm README.md
git add README
```
### 10. 版本回退
版本回退用于线上系统出现问题后恢复旧版本的操作，回退到的版本。

```
git reset --hard 版本号 
```
这一回退操作针对的是所有文件，如果后悔回退，继续`git pull`操作就可以了。
### 11. 查看提交历史
`git log`提供的命令相当多，可以通过`git help log`查看，基本上可以满足我们日常查询需求。

* 查看日志
![](../static/gitLog.png)

```
# 普通查看
git log

# 简略形式(每次提交占一行)
git log --oneline

# 查看详细修改(只看最近两条)
git log -p -2

# 查看详细修改(只看5至8条)
git log -p --skip=5 -3

# 展示文件修改的量
git log --shortstat

# 简略展示，加分支情况
git log --pretty=format:"%h %s" --graph

# 查看单个文件被修改的情况
git log -p src/index.jsx

# 查看liujie修改过的.jsx文件
git log --author='liujie' \*.jsx

# 查看liujie在 2018 年 5 月内的所有动态：git log --author='liujie' --since='2018-05-01' --before='2018-06-01'

# 查看包含'Fix bug'的日志，一行展示
git log --grep='Fix bug' --oneline

# 查看某次修改的内容
git show 3a92f20(SHA)

# 查看 git-log 全貌命令，可以通过 alias 写到 .bashrc/.zshrc 中
alias gitlog="git log --all --graph --pretty=format:'%Cred%h%Creset -%C(yellow)%d%Creset %s %Cgreen(%cr) %C(bold blue)<%an>%Creset' --abbrev-commit --date=relative"
```
默认不用任何参数的话，`git log`会按提交时间列出所有的更新，最近的更新排在最上面。该命令会列出每个提交的`SHA-1`校验和、作者的名称和电子邮件地址、提交时间以及提交说明。

* 查看某一历史版本的提交内容，这里能看到版本的详细修改代码

```
git show 版本号
```
* 对比不同版本

```
git diff 版本号1 版本号2
```
### 12. 远程仓库的使用
#### 12.1 查看远程仓库
如果想查看你已经配置的远程仓库服务器，可以运行`git remote`命令。该命令会列出你指定的每一个远程服务器的简写。如果你已经克隆了自己的仓库，那么至少应该能看到`origin`-这是Git给你克隆的仓库服务器的默认名称。

```
git remote -v
#该命令会显示需要读写远程仓库使用的Git保存的简写与其对应的URL
```
#### 12.2 添加远程仓库

```
git remote add <shortname> <url>
```
#### 12.3 从远程仓库中抓取与拉取

```
#从远程仓库中获取数据，该命令会访问远程仓库，从中拉取所有你还没有的数据。执行完成后，你将会拥有那个远程仓库中所有分支的引用，可以随时合并或查看。
git fetch [remote-name]
# git fetch origin
```
如果使用`clone`命令克隆了一个仓库，命令会自动将其添加为远程仓库并默认以`origin`为简写。所以，`git fetch origin`会抓取克隆(或上一次抓取)后新推送的所有工作。必须注意`git fetch`命令会将数据拉取到你的本地仓库-它并不会自动合并或修改你当前的工作。当准备好时，必须手动将其合并入你的工作。

如果有一个分支设置为跟踪一个远程分支，可以使用`git pull`命令来自动的抓取，然后合并远程分支到当前分支。运行`git pull`命令通常会从最初克隆的服务器上抓取数据并自动尝试合并到当前所在的的分支。
#### 12.4 推送到远程仓库

```
#remote-name 远程仓库名称
#branch-name 远程仓库对应的分支名
git push [remote-name] [branch-name]
```
#### 12.5 查看远程仓库

```
# 查看某一个远程仓库的更多信息
git remote show [remote-name]
```
#### 12.6 远程仓库的移除与重命名

```
#重命名
git remote rename 旧名称 新名称
#移除
git remote rm 远程仓库名称
#重名名或者移除之后，可以使用git remote命令查看操作的结果
```
### 13. 分支的意义与管理
创建分支可以避免提交代码后对主分支的影响，同时也使你有了相对独立的开发环境。分支具有很重要的意义。

* 创建并切换分支(需要注意：提交代码后才能在其它机器拉分支代码)

```
git checkout -b 分支名
``` 
* 查看本地分支(查看本地创建了哪些分支)

```
git branch 
```
* 查看本地+远程分支

```
git branch -va
```
* 切换分支

```
git checkout 分支名
```
* 合并分支到当前分支

```
git merge 分支名
```
* 删除分支

```
git branch -d 分支名
```
* 删除远程分支

```
git push origin :branch_name
# 在需要删除的分支前面加一个冒号就可以了，push 上去之后，服务器上的分支自然就被删除了
```
* 切换到本地分支

```
git checkout 分支名
```
* 切换到远程分支

```
git checkout remotes/origin/branch_name
git checkout -b branch_name
# -b的意思是base，就是以当前分支为base，新建一个分支

# 或者直接执行
git checkout -t origin/branch_name
```
#### 13.1 变基(rebase)
在Git中整合来自不同分支的修改主要有两种方法： `merge和rebase`。步骤：

```
# 假设当前在dev分支上
# 将master分支上的更新同步到当前分支
1. git rebase master
# 切换回master分支
2. git checkout master
# 最后把dev分支的最新代码merge到master分支上
3. git merge dev
```
特别注意：这一步是最重要的，git此时会自动`merge master分支和当前分支dev`。如果自动merge成功，就不需要再管了；如果自动merge失败，此时`git status`查看哪个文件merge失败，打开该文件，手动修改文件中冲突的地方，执行`git add .`命令去更新相应内容的索引，然后，不需要执行`git commit`命令，只要执行`git rebase --continue`。这样git会继续应用(apply)余下的补丁。

需要注意的是：可以在任何时候，使用`git rebase --abort`命令来终止rebase的行动，并且当前分支会回到rebase开始前的状态。

#### 13.2 变基的基本操作
![](../static/rebase1.png)
从上图看出开发任务分叉到两个不同分支，又各自提交了更新。
![](../static/rebase2.png)
我们知道，整合分支最容易的方法是`git merge`命令。该命令会把两个分支的最新快照(C3和C4)以及两者最近的共同祖先(C2)进行三方合并，合并的结果是生成一个新的快照并提交。如上图所示：通过合并操作来整合分叉了的历史。
![](../static/rebase3.png)
除了`git merge`之外，整合分支还有一种方法：我们可以提取在`C4`中引入的补丁和修改，然后在C3的基础上再应用一次。在Git中，这种操作就叫做变基。我们可以使用`rebase`命令将提交到某一分支上的所有修改都移至另一个分支上，就好像"重新播放"一样。

```
git checkout experiment
git rebase master
```
这一操作的原理是：首先找到这两个分支(即当前分支experiment、变基操作的目标基底分支master)的最近共同祖先C2，然后对比当前分支`experiment`相对于该祖先的历次提交，提取相应的修改并存为临时文件，然后将当前分支指向目标基底C3，最后将之前另存为临时文件的修改依序应用。如上图所示：将C4中的修改变基到C3上。

```
#现在切换会master分支,进行一次快进合并
git checkout master
git merge experiment
```
这时候，C4'指向的快照就和上面使用`git merge`命令的例子中C5指向的快照一模一样了。这两种整合方法的最终结果没有任何区别，但是变基使得提交历史更加整洁。你在查看一个经过变基础的分支的历史记录时会发现，尽管实际的开发工作是并行的，但是它们看上去就像是先后串行的一样，提交历史是一条直线没有分叉。
![](../static/rebase4.png)
**特别注意：** 无论是通过变基，还是通过三方合并，整合的最终结果所指向的快照始终是一样的，只不过提交历史不同罢了。变基是将一系列提交按照原有次序依次应用到另一分支上，而合并是把最终结果合在一起。
#### 13.3 git pull和git pull --rebase的区别使用
两者的区别可以用如下的等式来做解释：

```
git pull = git fetch + git merge
git pull --rebase = git fetch + git rebase
```

### 14. git冲突文件编辑
冲突标记`<<<<<<< （7个<）与=======`之间的内容是我的修改，`=======与>>>>>>>`之间的内容是别人的修改。
解决冲突的关键：需要把代码合并好后重新走一遍代码提交流程就好了。

### 参考文章
1. [这些GIT经验够你用一年了](http://www.techug.com/post/some-git-tips.html)
2. [git rebase简介(基本篇)](http://blog.csdn.net/hudashi/article/details/7664631/)
3. [简单对比git pull和git pull --rebase的使用](https://www.cnblogs.com/kevingrace/p/5896706.html)
4. [Git，Github和Gitlab简介和基本使用](https://www.jianshu.com/p/8d497989f704)
5. [Git 常用操作总结](https://juejin.im/post/5a2cdfe26fb9a0452936b07f)
6. [用对 gitignore](https://www.barretlee.com/blog/2015/09/06/set-gitignore-after-add-file/)