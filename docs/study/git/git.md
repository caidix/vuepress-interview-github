# Git

前言：
[一份值得收藏的 Git 异常处理清单](https://juejin.im/post/5edcf3a36fb9a047fa04fbc3)

<img src="./git.jpg"/>
- Workspace: 工作区
- Index / Stage: 暂存区
- Repository: 本地仓库
- Remote: 远程仓库

- 添加当前目录的所有文件到暂存区
  \$ git add \*
- 提交暂存区到仓库区
  \$ git commit -m [message]
- 为远程 Git 更名为 origin
  \$ git remote add origin git@github.com:abcd/tmp.git
- 推送此次修改，这是首次推送需要加上-u,之后推送就可以直接 git push origin master,origin 是远程 Git 名字，
  这个可以自己定义，不过一般是用 origin 罢了，master 是默认的分支，如果不在 master 分支提交需要写清楚分支名称
  \$ git push -u origin master

- 添加指定文件到暂存区
  \$ git add [file1][file2] ...
- 添加指定目录到暂存区，包括子目录
  \$ git add [dir]
- 添加当前目录的所有文件到暂存区
  \$ git add \*
- 添加每个变化前，都会要求确认
  对于同一个文件的多处变化，可以实现分次提交
  \$ git add -p
- 删除工作区文件，并且将这次删除放入暂存区
  \$ git rm [file1][file2] ...
- 停止追踪指定文件，但该文件会保留在工作区
  \$ git rm --cached [file]
- 改名文件，并且将这个改名放入暂存区
  \$ git mv [file-original][file-renamed]
- 提交暂存区到仓库区
  \$ git commit -m [message]
- 提交暂存区的指定文件到仓库区
  \$ git commit [file1][file2] ... -m [message]
- 提交工作区自上次 commit 之后的变化，直接到仓库区
  \$ git commit -a
- 提交时显示所有 diff 信息
  \$ git commit -v
- 使用一次新的 commit，替代上一次提交
  如果代码没有任何新变化，则用来改写上一次 commit 的提交信息
  \$ git commit --amend -m [message]
- 重做上一次 commit，并包括指定文件的新变化
  \$ git commit --amend [file1][file2] ...
- 提交更改到远程仓库
  \$ git push origin master
- 拉取远程更改到本地仓库默认自动合并
  \$ git pull origin master
  但如果是多人协作的话，git 的魅力就开始提现出来了，每个人有自己的一个分支，各自在自己的分支上工作互不干扰

- 列出所有本地分支
  \$ git branch
- 列出所有远程分支
  \$ git branch -r
- 列出所有本地分支和远程分支
  \$ git branch -a
- 新建一个分支，但依然停留在当前分支
  \$ git branch [branch-name]
- 新建一个分支，并切换到该分支
  \$ git checkout -b [branch]
- 新建一个分支，指向指定 commit
  \$ git branch [branch][commit]
- 新建一个分支，与指定的远程分支建立追踪关系
  \$ git branch --track [branch][remote-branch]
- 切换到指定分支，并更新工作区
  \$ git checkout [branch-name]
- 切换到上一个分支
  \$ git checkout -
- 建立追踪关系，在现有分支与指定的远程分支之间
  \$ git branch --set-upstream [branch][remote-branch]
- 合并指定分支到当前分支，如果有冲突需要手动合并冲突（就是手动编辑文件保存咯），然后 add,commit 再提交
  \$ git merge [branch]
- 选择一个 commit，合并进当前分支
  \$ git cherry-pick [commit]
- 删除分支
  \$ git branch -d [branch-name]
- 删除远程分支
  $ git push origin --delete [branch-name]
$ git branch -dr [remote/branch]

标签的作用主要是用来做版本回退的，关于版本回退，这也是 Git 的亮点之一，起到了后悔药的功能·

- 列出所有 tag
  \$ git tag
- 新建一个 tag 在当前 commit
  \$ git tag [tag]
- 新建一个 tag 在指定 commit
  \$ git tag [tag][commit]
- 删除本地 tag
  \$ git tag -d [tag]
- 删除远程 tag
  \$ git push origin :refs/tags/[tagName]
- 查看 tag 信息
  \$ git show [tag]
- 提交指定 tag
  \$ git push [remote][tag]
- 提交所有 tag
  \$ git push [remote] --tags
- 新建一个分支，指向某个 tag
  \$ git checkout -b [branch][tag]
  想一下在你写完 N 个文件代码后，commit 到了本地仓库，突然发现整个应用崩溃了！咋整？Git 给了我们吃后悔药
  的机会：
- 恢复暂存区的指定文件到工作区
  \$ git checkout [file]
- 恢复某个 commit 的指定文件到暂存区和工作区
  \$ git checkout [commit][file]
- 恢复暂存区的所有文件到工作区
  \$ git checkout .
- 回退到上一个版本，在 Git 中，用 HEAD 表示当前版本
  \$ git reset --hard HEAD^
- 重置暂存区的指定文件，与上一次 commit 保持一致，但工作区不变
  \$ git reset [file]
- 重置暂存区与工作区，与上一次 commit 保持一致
  \$ git reset --hard
- 重置当前分支的指针为指定 commit，同时重置暂存区，但工作区不变
  \$ git reset [commit]
- 重置当前分支的 HEAD 为指定 commit，同时重置暂存区和工作区，与指定 commit 一致
  \$ git reset --hard [commit]
- 重置当前 HEAD 为指定 commit，但保持暂存区和工作区不变
  \$ git reset --keep [commit]
- 新建一个 commit，用来撤销指定 commit
- 后者的所有变化都将被前者抵消，并且应用到当前分支
  \$ git revert [commit]
- 暂时将未提交的变化移除，稍后再移入
  $ git stash
$ git stash pop

文件信息

- 显示当前分支的版本历史
  \$ git log
- 显示 commit 历史，以及每次 commit 发生变更的文件
  \$ git log --stat
- 搜索提交历史，根据关键词
  \$ git log -S [keyword]
- 显示某个 commit 之后的所有变动，每个 commit 占据一行
  \$ git log [tag] HEAD --pretty=format:%s
- 显示某个 commit 之后的所有变动，其"提交说明"必须符合搜索条件
  \$ git log [tag] HEAD --grep feature
- 显示某个文件的版本历史，包括文件改名
  $ git log --follow [file]
$ git whatchanged [file]
- 显示指定文件相关的每一次 diff
  \$ git log -p [file]
- 显示过去 5 次提交
  \$ git log -5 --pretty --oneline
- 显示所有提交过的用户，按提交次数排序
  \$ git shortlog -sn
- 显示指定文件是什么人在什么时间修改过
  \$ git blame [file]
- 显示暂存区和工作区的差异
  \$ git diff
- 显示暂存区和上一个 commit 的差异
  \$ git diff --cached [file]
- 显示工作区与当前分支最新 commit 之间的差异
  \$ git diff HEAD
- 显示两次提交之间的差异
  \$ git diff [first-branch]...[second-branch]
- 显示今天你写了多少行代码
  \$ git diff --shortstat "@{0 day ago}"
- 显示某次提交的元数据和内容变化
  \$ git show [commit]
- 显示某次提交发生变化的文件
  \$ git show --name-only [commit]
- 显示某次提交时，某个文件的内容
  \$ git show [commit]:[filename]

## git 如何丢弃所有没有 add 到暂存区的代码？

git checkout .

## git 上次修改有缺陷，但是 commit 了怎么办？

git add . 此次修改
git commit --amend -m "新的提交信息" 或者 git commit --amend --no-edit

- 会对最新一条 commit 修正，会把当前 commit 里的内容和最新加入暂存区的代码进行合并后建立一个新的 commit，代替掉之前的那条 commit
- --no-edit 的意思是不会修改提交信息，按上次提交的信息来

## git 代码已经 push 上去发现有问题想强制输出到远程

git push origin branch -f
-f 是 --force 的缩写，意为「忽略冲突，强制 push」
如果出错内容已经 push 到了 master 分支
这种情况可以使用 Git 的 revert 指令。
git revert HEAD^
上面这行代码就会增加一条新的 commit，它的内容和倒数第二个 commit 是相反的，从而和倒数第二个 commit 相互抵消，达到撤销的效果。
在 revert 完成之后，把新的 commit 再 push 上去，这个 commit 的内容就被撤销了。（revert 与前面说的 reset 最主要的区别是，这次改动只是被「反转」了，并没有在历史中消失掉，你的历史中会存在两条 commit ：一个原始 commit ，一个对它的反转 commit。

## git如何关联账号
```
git config user.name   --查看git当前配置用户名
git config user.email  --查看git当前配置的邮箱
git config user.name 名称 设置用户名
git config user.email 邮箱 设置git邮箱
```
全局命令设置
```
 git config  --global user.name 你的目标用户名；
 git config  --global user.email 你的目标邮箱名;
```

## git 规范类型
- feat：新功能（feature）
- fix：修补bug
- docs：文档（documentation）
- 0style： 格式（不影响代码运行的变动）
- refactor：重构（即不是新增功能，也不是修改bug的代码变动）
- test：增加测试
- chore：其他修改，比如构建过程或辅助工具的变动

## 本地工作区文件恢复
git checkout <filename/dirname>

## 修改提交时的备注内容
git commit --amend

## 修改分支名，实现无缝衔接
例如，我们的想新建的分支名为 feature/story-13711，却写成了  feature/stor-13711：
语法：git branch -m <oldbranch> <newbranch>
命令：git branch -m feature/stor-13711 feature/story-13711

## 撤销当前的commit操作
语法： git reset --soft [<commit-id>/HEAD~n>]
命令：git reset --soft HEAD~1

用新的更改替换撤回的更改
提交之中可能有些地方需要优化，我们可以撤销本次的 commit 以及文件暂存状态，修改之后再重新添加到暂存区进行提交。
语法： git reset --mixed [<commit-id>/HEAD~n>]
命令：git reset --mixed HEAD~1

本地提交了错误的文件
本地将完全错误的，本不应提交的内容提交到了仓库，需要进行撤销，可以使用 --hard 参数

语法： git reset --hard [<commit-id>/HEAD~n>]
命令：git reset --hard HEAD~1
文件的修改都会被撤销。-hard 参数需要谨慎使用。

## 撤销本地分支合并
1. 将所有的合并内容的撤销到之前的样子
git reset --hard
2.将所有的合并撤销，并保留合并分支和撤回记录
语法：git revert <commit-id>
命令：git revert 700920

## 恢复误删的本地分支
误删的分支为 feature/delete，使用 git reflog 命令可查看到该仓库下的所有历史操作
语法：git checkout -b <branch-name> <commit-id>
命令：git checkout -b feature/delete HEAD@{2}
命令执行完成后，分支恢复到 HEAD@{2} 的快照，即从 master 分支拉取 feature/delete 分支的内容，仍然缺少“新增xxx文件”的提交，直接将文件内容恢复到最新的提交内容，使用命令 git reset --hard HEAD@{1} 即可实现硬性覆盖本地工作区内容的目的。git reflog 命令获取到的内容为本地仓库所有发生过的变更，可谓恢复利器，既可向前追溯，亦可向后调整。

## git对大小写不敏感，想修改文件的大小写并且与别的分支合并怎么办？
- git config core.ignorecase false   关闭忽略大小写设置
- git rm xxx   (删掉想更换大小写的文件，在这之前记得copy备份一个文件)
- 修改备份文件名
- git add commit push