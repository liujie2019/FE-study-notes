浏览器将CORS请求分成两类：简单请求和非简单请求。简单请求在之前博客中总结过了，详见[传送门](http://blog.csdn.net/liujie19901217/article/details/50723702)
这里主要总结一下非简单请求。非简单请求是那种**对服务器有特殊要求的请求**，比如请求方法是PUT或DELETE，或者Content-Type字段的类型是application/json。
##**预检请求**##
非简单请求的CORS请求，会在正式通信之前，增加一次HTTP查询请求，称为**预检请求（preflight）**。
浏览器先询问服务器，当前网页所在的域名是否在服务器的许可名单之中，以及可以使用哪些HTTP动词和头信息字段。只有得到肯定答复，浏览器才会发出正式的XMLHttpRequest请求，否则就报错。
**Demo:**

```
<script type="text/javascript">
        function createXhr(){
            if(typeof XMLHttpRequest){
                return new XMLHttpRequest();
            }else if(typeof ActiveXObject){
                return new ActiveXObject("Microsoft.XMLHTTP");
            }
        }
        var xhr=createXhr();
        xhr.onreadystatechange=function(){
            if(xhr.readyState==4){
                if(xhr.status==200){
     var data = JSON.parse(xhr.responseText);
    console.log(data.name+'--'+data.age+'--'+data.job);//lisi--24--worker
                }
            }
        }
        xhr.open("put","http://www.abc.com/mywork/21code/example.php",true);
        xhr.setRequestHeader('X-Custom-Header', 'value');
        xhr.send(null);
    </script>
```
**example.php**

```
<?php
    header("Content-Type: text/plain");//文本类型
    //允许的域名
    header("Access-Control-Allow-Origin:http://www.example.com");
    //响应类型
    header("Access-Control-Allow-Methods: GET, POST, PUT");
    //头部字段
    header("Access-Control-Allow-Headers: X-Custom-Header");
    $res = array('name'=>'lisi','age'=>24,'job'=>'worker');
    echo json_encode($res);
?>
```
上面代码中，HTTP请求的方法是PUT，并且发送一个自定义头信息X-Custom-Header。
浏览器发现，这是一个非简单请求，就自动发出一个预检请求，要求服务器确认可以这样请求。下面是这个预检请求的HTTP头信息以及预检请求的回应。
![这里写图片描述](http://img.blog.csdn.net/20160809164823763)
**预检请求**用的请求方法是OPTIONS，表示这个请求是用来询问的。头信息里面，关键字段是Origin，表示请求来自哪个源。
除了Origin字段，预检请求的头信息包括两个特殊字段：

 - **Access-Control-Request-Method**
该字段是必须的，用来列出浏览器的CORS请求会用到哪些HTTP方法，上面例子中是PUT。
 - **Access-Control-Request-Headers**
该字段是一个逗号分隔的字符串，指定浏览器CORS请求会**额外发送的头信息字段**，上例是X-Custom-Header。
![这里写图片描述](http://img.blog.csdn.net/20160809164843950)

服务器收到预检请求后，检查了Origin、Access-Control-Request-Method和Access-Control-Request-Headers字段以后，确认允许跨源请求，就可以做出回应。
上面的HTTP回应中，关键的是Access-Control-Allow-Origin字段，表示http://www.example.com可以请求数据。该字段也可以设为星号，表示同意任意跨源请求。

**如果浏览器否定了预检请求，会返回一个正常的HTTP回应，但是没有任何CORS相关的头信息字段。**这时，浏览器就会认定，服务器不同意预检请求，因此**触发一个错误**，被XMLHttpRequest对象的onerror回调函数捕获。控制台会打印出相应的报错信息。
## 服务器响应的其他CORS相关字段 ##

```
Access-Control-Allow-Methods: GET, POST, PUT
Access-Control-Allow-Headers: X-Custom-Header
Access-Control-Allow-Credentials: true
Access-Control-Max-Age: 180000
```
 - **Access-Control-Allow-Methods**
该字段必需，它的值是**逗号分隔的一个字符串，表明服务器支持的所有跨域请求的方法。**注意，返回的是所有支持的方法，而不单是浏览器请求的那个方法。这是为了避免多次预检请求。
 - **Access-Control-Allow-Headers**
如果浏览器请求包括Access-Control-Request-Headers字段，则Access-Control-Allow-Headers字段是必需的。它也是一个逗号分隔的字符串，**表明服务器支持的所有头信息字段**，不限于浏览器在预检中请求的字段。
 - **Access-Control-Allow-Credentials**
该字段可选。它的值是一个布尔值，表示是否允许发送Cookie。默认情况下，Cookie不包括在CORS请求之中。**设为true，即表示服务器明确许可，Cookie可以包含在请求中，一起发给服务器**。这个值也只能设为true，如果服务器不要浏览器发送Cookie，删除该字段即可。
 - **Access-Control-Max-Age**
该字段可选，用来指定本次预检请求的有效期，单位为秒。上面结果中，有效期是180000秒，即允许缓存该条响应180000秒，在此期间，不用发出另一条预检请求。

## **浏览器的正常请求和响应** ##
一旦服务器通过了预检请求，以后每次浏览器正常的CORS请求，就都跟简单请求一样，会有一个Origin头信息字段。服务器的响应，也都会有一个Access-Control-Allow-Origin头信息字段。
**经过预检请求后，正式通信的请求与相应如下所示：**
![这里写图片描述](http://img.blog.csdn.net/20160809162734645)

上面请求头信息的**Origin字段是浏览器自动添加的**，Access-Control-Allow-Origin字段是每次响应都必定包含的。


### 参考文档
1. [跨域资源共享 CORS 详解](http://www.ruanyifeng.com/blog/2016/04/cors.html)
2. [跨域资源共享 CORS](http://corsbook.rails365.net/467077)