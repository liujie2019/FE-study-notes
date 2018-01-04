### 为什么要学习Go
1. 支持并发，这是Go与生俱来的特性
2. 简单易学，与C语言类似，学过Java的也推荐学习，性能可以于C比肩
3. 静态类型语言，静态类型的语言就是可以在编译的时候检查出来隐藏的大多数问题
4. 跨平台编译
5. 内嵌C支持

### Go可以做些什么
1. 网络编程，开发Web应用、API应用等
2. 内存数据库，前一段时间Google开发的groupcache，couchbase的部分组建
3. 云平台，目前国外很多云平台在采用Go开发

### *和&

两者同c一样

`*`是代表指针，也可以从地址中获取内容

`&`获取一个对象的地址

```
i := 1
point := &i // point等于一个地址
data = *point //data == 1
```
另外函数中要分清楚值传递和指针传递，这是一个交换函数，很清晰

```
func change(a *int,b *int) {
  c := *a
  *a = *b
  *b = c
}
a := 3
b := 4
func(&a,&b)
```
### 参考文档
1. [Go简明教程](http://smallsoho.com/backend/2016/11/20/Go%E7%AE%80%E6%98%8E%E6%95%99%E7%A8%8B/)
2. [GO语言学习资源整理](https://zhuanlan.zhihu.com/p/25493806?utm_source=tuicool&utm_medium=referral)
3. [入门学习](https://github.com/zoeminghong/go-library)
4. [Go指南](https://tour.go-zh.org/welcome/1)
5. [Go Web 编程》模板使用指南](https://github.com/astaxie/build-web-application-with-golang/blob/master/zh/01.0.md)
6. [Beego官方文档](https://beego.me/docs/quickstart/view.md)