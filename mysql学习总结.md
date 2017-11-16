### 定义mysql别名

```
#输入alias命令
alias mysql=/usr/local/mysql/bin/mysql
#回车，再输入
alias mysqladmin=/usr/local/mysql/bin/mysqladmin
```

### 设置mysql root帐号的密码

```
#设置初始密码
mysqladmin -u root password 当前密码
#如果设置完密码后，需要修改，执行命令
mysqladmin -u root -p  password
```
执行修改密码命令后，输入一次旧密码，再输入两次新密码。

### 连接数据库

```
mysql -u root -p
然后输入root账户密码即可登录
```
### 增加新用户

格式如下：

```
grant 操作权限 on 数据库.* to 用户名@登陆主机地址 identified by '密码';
```
意思是：授予，某主机上的某用户（附带该用户的登陆密码）在某数据库上，执行某些操作的权限

(1)比如：任意主机上("%")，用户（用户名：test1，密码：adc）在所有数据库上，执行任意操作的权限（很危险）

```
grant all privileges on *.* to test1@"%" identified by "abc";
```
其中all privileges表示查询，插入，修改，删除的权限：select,insert,update,delete。

以上命令等价于：

```
grant select,insert,update,delete on *.* to test1@"%" identified by "abc";
```
然后刷新权限：

```
flush privileges;
```

(2)授权本地主机上的用户操作数据库的权限

创建数据库：

```
create database openfire;
```

授予本地主机用户（用户名：test，密码：123）访问数据库(数据库名称：openfire)的操作权限：

```
grant all privileges on openfire.* to test@localhost identified by "123";
#刷新权限
flush privileges;
```
之后，就可以用新的用户test访问openfire数据库了


2.更新指定帐户的密码（用户名：test1，新密码：1234）

```
update mysql.user set password=password('1234') where User="test1" and Host="localhost";
```

3.删除用户

```
#先使用mysql数据库
use mysql;
#删除mysql数据库中user表中的某个本地用户（test7）
delete from user where User="test7" and Host="localhost";
```

4.显示命令

(1）显示所有数据库列表：

```
show databases;
```
初始化只有两个数据库：mysql和test

注意：MYSQL的系统信息都存储在mysql库中，比如：修改密码和新增用户，实际上就是用这个库进行操作

（2）打开某个数据库(比如数据库：open fire)：use openfire;

（3）显示本库中的所有表：show tables;

（4）显示某表（table1）的结构：describe table1;

（5）建库：create database 库名;

（6）建表：
    use 库名;
    create table 表名 (字段设定列表);
 
（7）删库：drop database 库名;

（8）删表：drop table 表名;

（9）将表中的记录清空：delete from 表名;

（10）显示表中的记录：select * from 表名;

### 退出mysql

```
1.exit
2.quit
3.\q
```

### 启动和停止MySQL
```
#启动
/usr/local/mysql/share/mysql.server start
#停止
/usr/local/mysql/bin/mysqladmin -u root -p shutdown
然后输入root密码即可停止
```