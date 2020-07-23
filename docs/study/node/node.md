## node

1. node 中，绝大部分的操作都是以异步的形式进行调用，这样的意义在于，在Node中，我们可以从语言层面很自然的进行并行I/O操作，每个调用之间无需等待之前的I/O调用结束。在编程模型上可以大大提升效率。

2. Node模块的实现
 在node中引入模块需要经历以下三个步骤：
 - 路径分析
 - 文件定位
 - 编译执行

在Node中，模块分为两类：一类是node提供的模板，称为核心模块。另一类是用户编写的模块，成为文件模块。
核心模块在node源代码的编译过程中，编译进了二进制文件。在Node进程启动时,部分核心模块就被直接加载进内存中,所以这部分核心模块引入时,文件定位和编译执行这两个步骤可以省略掉,并且在路径分析中优先判断,所以它的加载速度是最快的。
不论是核心模块还是文件模块, require()方法对相同模块的二次加载都一律采用缓存优先的方式,这是第一优先级的。不同之处在于核心模块的缓存检査先于文件模块的缓存检査。
Node缓存的是编译和执行后的对象

## Node是单线程的吗？
首先，进程是计算机系统进行资源分配和调度的基本单位，是操作系统结构的基础，是资源分配最小的单位。进程是线程的容器，是一对多的关系。每开启一个服务、运行一个实例，就是开一个服务进程。每一个进程都拥有自己的独立空间地址、数据栈，一个进程无法访问另外一个进程里定义的变量、数据结构，只有建立了IPC通信，进程之间才能数据共享。
### 单线程
javascript就是属于单线程，程序按顺序执行。若存在队列中，前面一个执行完后，后面才可以执行，当你在使用单线程语言编码时切勿有过多耗时的同步操作，否则线程会造成阻塞，导致后续响应无法处理。
- node虽然是单线程，但是其基于事件驱动、异步非阻塞模式，可以应用于高并发场景，避免了线程创建、线程之间上下文切换所产生的资源开销。
- 当你的项目中需要有大量计算，CPU耗时的操作时候，要注意考虑开启多进程来完成了。
- Node在开发过程中，错误会引起整体应用退出，所以异常的捕获抛出及进程的守护是很有必要的。

1. node中的进程
node中的进程Process是一个全局对象。


## 3. node中的模块
fs模块是唯一一个同时提供同步和异步api的模块。

### 流stream

- stdin:标准输入
- stdout:标准输出
- stderr:标准错误

stream实现文件分块读取
```javascript
var stream = fs.createReadStream('mytext.txt')
stream.on('data', function(chunk) {
  ...
})
stream.on('end', function (chunk) {
  ...
})
```

### 工作目录
- __dirname 获取执行文件时该文件在文件系统中所在的目录
- process.cwd()获取程序运行时当前的工作目录
- process.chdir()更改工作目录
- process.env变量访问shell环境下的变量
- process.exit推出


### Koa与Express的比较
1. 发送
> 信息传递上express函数里传递了对应的请求对象和响应对象，而koa使用content上下文，并对其写入相应的属性。比如查看ctx.query\ctx.params。
Koa 实际上对标的是 Connect[10]（Express 底层的中间件层），而不包含 Express 所拥有的其他功能，例如路由、模板引擎、发送文件等。
express
```js
(req, res) => {
  res.send('Hello Express');
}
```
koa
```js
app.use((ctx) => {
  ctx.body = 'Hello Koa';
});
```

2. 模型角度
> express 的执行方式是将请求依次通过中间件进行处理，最后走到处理响应的函数返回处理的结果。

express
```js
// 分类路由
  router.post('/article/add', adminArticle.add);
  router.post('/article/edit', adminArticle.editArticle);

// 执行
(req, res, next) => {
  ...
  next(xxx) // （携带参数）前往下一个执行地点
}

/**
 * 响应
 * @param {响应方法} res 
 * @param {http返回响应值} httpCode 
 * @param {返回是否是成功的值：0为成功} code 
 * @param {返回的提示信息} message 
 * @param {返回的字段内容} data 
 */
function returnClient(res, httpCode = 500, code = 200, message = '服务器异常', data = {}) {
  res.status(httpCode).json({
    code,
    message,
    data
  })
}
// 简单形式
res.send();
```