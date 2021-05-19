---
title: node.js的事件循环模型
date: 2021-05-20
sidebar: auto
tags:
  - Node
categories:
  - Node
--- 

## 什么是事件循环

事件循环使 Node.js 可以通过将操作转移到系统内核中来执行非阻塞 I/O 操作（尽管 JavaScript 是单线程的）。

由于大多数现代内核都是多线程的，因此它们可以处理在后台执行的多个操作。 当这些操作之一完成时，内核会告诉 Node.js，以便可以将适当的回调添加到轮询队列中以最终执行。

Node.js 启动时，它将初始化事件循环，处理提供的输入脚本，这些脚本可能会进行异步 API 调用，调度计时器或调用 process.nextTick， 然后开始处理事件循环。

```
   ┌───────────────────────────┐
┌─>│           timers          │
│  └─────────────┬─────────────┘
│  ┌─────────────┴─────────────┐
│  │     pending callbacks     │
│  └─────────────┬─────────────┘
│  ┌─────────────┴─────────────┐
│  │       idle, prepare       │
│  └─────────────┬─────────────┘      ┌───────────────┐
│  ┌─────────────┴─────────────┐      │   incoming:   │
│  │           poll            │<─────┤  connections, │
│  └─────────────┬─────────────┘      │   data, etc.  │
│  ┌─────────────┴─────────────┐      └───────────────┘
│  │           check           │
│  └─────────────┬─────────────┘
│  ┌─────────────┴─────────────┐
└──┤      close callbacks      │
   └───────────────────────────┘
```

每个阶段都有一个要执行的回调 FIFO 队列。 尽管每个阶段都有其自己的特殊方式，但是通常，当事件循环进入给定阶段时，它将执行该阶段特定的任何操作，然后在该阶段的队列中执行回调，直到队列耗尽或执行回调的最大数量为止。 当队列已为空或达到回调限制时，事件循环将移至下一个阶段，依此类推。

## 各阶段概览

1. timers：此阶段执行由 setTimeout 和 setInterval 设置的回调。
2. pending callbacks：执行推迟到下一个循环迭代的 I/O 回调。
3. idle, prepare, ：仅在内部使用。
4. poll：取出新完成的 I/O 事件；执行与 I/O 相关的回调（除了关闭回调，计时器调度的回调和 setImmediate 之外，几乎所有这些回调） 适当时，node 将在此处阻塞。
5. check：在这里调用 setImmediate 回调。
6. close callbacks：一些关闭回调，例如 socket.on('close', ...)。

在每次事件循环运行之间，Node.js 会检查它是否正在等待任何异步 I/O 或 timers，如果没有，则将其干净地关闭。

## 各阶段详细解析

### timers 计时器阶段

计时器可以在回调后面指定时间阈值，但这不是我们希望其执行的确切时间。 计时器回调将在经过指定的时间后尽早运行。 但是，操作系统调度或其他回调的运行可能会延迟它们。-- 执行的实际时间不确定

```js
const fs = require("fs");

function someAsyncOperation(callback) {
  // Assume this takes 95ms to complete
  fs.readFile("/path/to/file", callback);
}

const timeoutScheduled = Date.now();

setTimeout(() => {
  const delay = Date.now() - timeoutScheduled;

  console.log(`${delay}ms have passed since I was scheduled`);
}, 100);

// do someAsyncOperation which takes 95 ms to complete
someAsyncOperation(() => {
  const startCallback = Date.now();

  // do something that will take 10ms...
  while (Date.now() - startCallback < 10) {
    // do nothing
  }
});
```

当事件循环进入 poll 阶段时，它有一个空队列（fs.readFile 尚未完成），因此它将等待直到达到最快的计时器 timer 阈值为止。
等待 95 ms 过去时，fs.readFile 完成读取文件，并将需要 10ms 完成的其回调添加到轮询 (poll) 队列并执行。
回调完成后，队列中不再有回调，此时事件循环已达到最早计时器 (timer) 的阈值 (100ms)，然后返回到计时器 (timer) 阶段以执行计时器的回调。
在此示例中，您将看到计划的计时器与执行的回调之间的总延迟为 105ms。

### pending callbacks 阶段

此阶段执行某些系统操作的回调，例如 TCP 错误。 平时无需关注

### 轮询 poll 阶段

轮询阶段具有两个主要功能：

1. 计算应该阻塞并 I/O 轮询的时间
2. 处理轮询队列 (poll queue) 中的事件

当事件循环进入轮询 (poll) 阶段并且没有任何计时器调度 (timers scheduled) 时，将发生以下两种情况之一：

1. 如果轮询队列 (poll queue) 不为空，则事件循环将遍历其回调队列，使其同步执行，直到队列用尽或达到与系统相关的硬限制为止 (到底是哪些硬限制？)。
2. 如果轮询队列为空，则会发生以下两种情况之一：
   2.1 如果已通过 setImmediate 调度了脚本，则事件循环将结束轮询 poll 阶段，并继续执行 check 阶段以执行那些调度的脚本。
   2.2 如果脚本并没有 setImmediate 设置回调，则事件循环将等待 poll 队列中的回调，然后立即执行它们。

一旦轮询队列 (poll queue) 为空，事件循环将检查哪些计时器 timer 已经到时间。 如果一个或多个计时器 timer 准备就绪，则事件循环将返回到计时器阶段，以执行这些计时器的回调。

### 检查阶段 check

此阶段允许在轮询 poll 阶段完成后立即执行回调。 如果轮询 poll 阶段处于空闲，并且脚本已使用 setImmediate 进入 check 队列，则事件循环可能会进入 check 阶段，而不是在 poll 阶段等待。

setImmediate 实际上是一个特殊的计时器，它在事件循环的单独阶段运行。 它使用 libuv API，该 API 计划在轮询阶段完成后执行回调。

通常，在执行代码时，事件循环最终将到达轮询 poll 阶段，在该阶段它将等待传入的连接，请求等。但是，如果已使用 setImmediate 设置回调并且轮询阶段变为空闲，则它将将结束并进入 check 阶段，而不是等待轮询事件。

### close callbacks 阶段

如果套接字或句柄突然关闭（例如 socket.destroy），则在此阶段将发出 'close' 事件。 否则它将通过 process.nextTick 发出。

## setImmediate 和 setTimeout 的区别

setImmediate 和 setTimeout 相似，但是根据调用时间的不同，它们的行为也不同。

- setImmediate 设计为在当前轮询 poll 阶段完成后执行脚本。
- setTimeout 计划在以毫秒为单位的最小阈值过去之后运行脚本。

Tips: 计时器的执行顺序将根据调用它们的上下文而有所不同。 如果两者都是主模块中调用的，则时序将受到进程性能的限制.

来看两个例子：

1. 在主模块中执行

   两者的执行顺序是不固定的, 可能 timeout 在前, 也可能 immediate 在前

   ```js
   setTimeout(() => {
     console.log("timeout");
   }, 0);

   setImmediate(() => {
     console.log("immediate");
   });
   ```

2. 在同一个 I/O 回调里执行

   setImmediate 总是先执行

   ```js
   const fs = require("fs");

   fs.readFile(__filename, () => {
     setTimeout(() => {
       console.log("timeout");
     }, 0);
     setImmediate(() => {
       console.log("immediate");
     });
   });
   ```

问题：那为什么在外部 (比如主代码部分 mainline) 这两者的执行顺序不确定呢？

解答：在 主代码 部分执行 setTimeout 设置定时器 (此时还没有写入队列)，与 setImmediate 写入 check 队列。

mainline 执行完开始事件循环，第一阶段是 timers，这时候 timers 队列可能为空，也可能有回调；
如果没有那么执行 check 队列的回调，下一轮循环在检查并执行 timers 队列的回调；
如果有就先执行 timers 的回调，再执行 check 阶段的回调。因此这是 timers 的不确定性导致的。

## process.nextTick

process.nextTick 从技术上讲不是事件循环的一部分。 相反，无论事件循环的当前阶段如何，都将在当前操作完成之后处理 nextTickQueue

### process.nextTick 和 setImmediate 的区别

- process.nextTick 在同一阶段立即触发
- setImmediate fires on the following iteration or 'tick' of the event loop (在事件循环接下来的阶段迭代中执行 - check 阶段)。

### nextTick 在事件循环中的位置

```
           ┌───────────────────────────┐
        ┌─>│           timers          │
        │  └─────────────┬─────────────┘
        │           nextTickQueue
        │  ┌─────────────┴─────────────┐
        │  │     pending callbacks     │
        │  └─────────────┬─────────────┘
        │           nextTickQueue
        │  ┌─────────────┴─────────────┐
        |  |     idle, prepare         │
        |  └─────────────┬─────────────┘
  nextTickQueue     nextTickQueue
        |  ┌─────────────┴─────────────┐
        |  │           poll            │
        │  └─────────────┬─────────────┘
        │           nextTickQueue
        │  ┌─────────────┴─────────────┐
        │  │           check           │
        │  └─────────────┬─────────────┘
        │           nextTickQueue
        │  ┌─────────────┴─────────────┐
        └──┤       close callbacks     │
           └───────────────────────────┘
```

## Microtasks 微任务

在 Node 领域，微任务是来自以下对象的回调：

1. process.nextTick()
2. then()

在主线结束后以及事件循环的每个阶段之后，立即运行微任务回调。

resolved 的 promise.then 回调像微处理一样执行，就像 process.nextTick 一样。 虽然，如果两者都在同一个微任务队列中，则将首先执行 process.nextTick 的回调。

优先级 process.nextTick > promise.then

### 看代码输出顺序

```js
async function async1() {
  console.log("async1 start");
  await async2();
  console.log("async1 end");
}
async function async2() {
  console.log("async2");
}
console.log("script start");
setTimeout(function () {
  console.log("setTimeout0");
  setTimeout(function () {
    console.log("setTimeout1");
  }, 0);
  setImmediate(() => console.log("setImmediate"));
}, 0);

process.nextTick(() => console.log("nextTick"));
async1();
new Promise(function (resolve) {
  console.log("promise1");
  resolve();
  console.log("promise2");
}).then(function () {
  console.log("promise3");
});
console.log("script end");
```
