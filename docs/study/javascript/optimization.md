---
title: 代码层面优化
date: 2021-02-20
sidebar: auto
tags:
  - JavaScript
categories:
  - JavaScript
---

## vue 层面

### 1.1 v-if 和 v-show 区分场景使用

v-if 是真正的条件渲染，他的判断会重新触发组件的渲染将整个条件影响的 dom 元素销毁或是重建；v-show 则无论什么条件都会渲染元素，在条件更改的过程中仅仅是修改了元素的 display 的 hidden 属性来进行文档树上的显示隐藏。所以，v-if 适用于在运行时很少改变条件，不需要频繁切换条件的场景；v-show 则适用于需要非常频繁切换条件的场景。

### 1.2 对象类型优化

vue 会通过 Object.defineProperty 对数据进行劫持，来实现视图响应数据的变化，然而有些时候我们的组件就是纯粹的数据展示，不会有任何改变，我们就不需要 Vue 来劫持我们的数据，在大量数据展示的情况下，这能够很明显的减少组件初始化的时间，那如何禁止 Vue 劫持我们的数据呢？可以通过 Object.freeze 或者使用 Object.preventExtensions 方法来冻结一个对象，一旦被冻结的对象就再也不能被修改了。

### 1.3 事件的销毁

> Vue 组件销毁时，会自动清理它与其它实例的连接，解绑它的全部指令及事件监听器，但是仅限于组件本身的事件。 如果在 js 内使用 addEventListener 等方式是不会自动销毁的，我们需要在组件销毁时手动移除这些事件的监听，以免造成内存泄露

```js
mounted() {
  this.a = ()=>{}
  window.addEventListener('click',this.a)
}
beforeDestory() {
  window.removeEventListener('click', this.a)
}
```

### 1.4 图片资源懒加载

对于图片过多的界面，需要在图片没出现在可视窗口的时候暂时不去做图片资源的请求，在到达可视窗口的时候在请求。这样对于页面加载性能上会有很大的提升，也提高了用户体验。在 vue 项目中我们大多使用 Vue 的 (**vue-lazyload**)[https://github.com/hilongjw/vue-lazyload] 插件：

```js
import Vue from "vue";
import App from "./App.vue";
import VueLazyload from "vue-lazyload";

Vue.use(VueLazyload);

// or with options
const loadimage = require("./assets/loading.gif");
const errorimage = require("./assets/error.gif");

Vue.use(VueLazyload, {
  preLoad: 1.3,
  error: errorimage,
  loading: loadimage,
  attempt: 1,
});

new Vue({
  el: "body",
  components: {
    App,
  },
}) <
  // xxx.vue
  ul >
  (
    <li v-for="img in list">
      <img v-lazy="img.src"></li>
    </ul>
  );
```

### 1.5 路由懒加载

Vue 是单页面应用，可能会有很多的路由引入 ，这样使用 webpcak 打包后的文件很大，当进入首页时，加载的资源过多，页面会出现白屏的情况，不利于用户体验。如果我们能把不同路由对应的组件分割成不同的代码块，然后当路由被访问的时候才加载对应的组件，这样就更加高效了。这样会大大提高首屏显示的速度，但是可能其他的页面的速度就会降下来。

```js
const Foo = () => import("./Foo.vue");
const router = new VueRouter({
  routes: [{ path: "/foo", component: Foo }],
});
```

### 1.6 第三方插件的按需引入

我们在项目中经常会需要引入第三方插件，如果我们直接引入整个插件，会导致项目的体积太大，我们可以借助 plugin-syntax-dynamic-import ，然后可以只引入需要的组件，以达到减小项目体积的目的。此处以引入 ant-design 和 iview 为例
(1)安装

```js
npm install --save-dev @babel/plugin-syntax-dynamic-import
```

(2)babel.config.js

```js
module.exports = {
  presets: [
    [
      "@babel/preset-env",
      {
        targets: {
          browsers: ["last 3 versions", "ie>=9"],
        },
        useBuiltIns: "entry",
        debug: false,
      },
    ],
    "@vue/babel-preset-jsx",
  ],
  plugins: [
    "@babel/plugin-transform-runtime",
    "@babel/plugin-syntax-dynamic-import",
    "transform-vue-jsx",
    [
      "import",
      {
        libraryName: "ant-design-vue",
        libraryDirectory: "es",
        style: "css",
      },
      "ant-design-vue",
    ],
    [
      "import",
      {
        libraryName: "iview",
        libraryDirectory: "src/components",
      },
    ],
  ],
};
```

(3)组件中使用

```js
import { Button } from "iview";
```

### 1.7 无限下拉列表优化

如果我们有一个不断向下滚动出现内容的需求，在滚动的过程中会不断的渲染产生新的 dom 元素，这必然会对性能造成极大的开销，从而造成卡顿等问题。我们可以采用虚拟列表的方式：只渲染可视区域内的部分展示的元素，在滚动时将这部分 dom 元素移动到相应滚动位置并重新渲染这部分元素的内容，这部分的内容应为对应滚动位置下需要展示的元素的内容。我们也可以借助成熟的开源方案：[**vue-virtual-scroll-list**](https://github.com/tangbc/vue-virtual-scroll-list)或是[**vue-virtual-scroller**](https://github.com/Akryum/vue-virtual-scroller)

### 1.8 时间分片渲染大量数据

> 众所周知，页面的卡顿是由于同时渲染大量 DOM 所引起的，所以我们考虑将渲染过程分批进行。常见的分批渲染使用 setTimeout,requestAnimationFrame 和 DocumentFragment
> 众所周知，页面的卡顿是由于同时渲染大量 DOM 所引起的，所以我们考虑将渲染过程分批进行。常见的分批渲染使用 setTimeout,requestAnimationFrame 和 DocumentFragment

(1) 使用 setTimeout 分片

```js
// <ul id="container"></ul>
//需要插入的容器
let ul = document.getElementById("container");
// 插入十万条数据
let total = 100000;
// 一次插入 20 条
let once = 20;
//总页数
let page = total / once;
//每条记录的索引
let index = 0;
//循环加载数据
function loop(curTotal, curIndex) {
  if (curTotal <= 0) {
    return false;
  }
  //每页多少条
  let pageCount = Math.min(curTotal, once);
  setTimeout(() => {
    for (let i = 0; i < pageCount; i++) {
      let li = document.createElement("li");
      li.innerText = curIndex + i + " : " + ~~(Math.random() * total);
      ul.appendChild(li);
    }
    loop(curTotal - pageCount, curIndex + pageCount);
  }, 0);
}
loop(total, index);
```

> 使用 setTimeout 你会发现明显的闪屏现象，其主要原因如下：

setTimeout 的执行时间并不是确定的。在 JS 中，setTimeout 任务被放进事件队列中，只有主线程执行完才会去检查事件队列中的任务是否需要执行，因此 setTimeout 的实际执行时间可能会比其设定的时间晚一些。
刷新频率受屏幕分辨率和屏幕尺寸的影响，因此不同设备的刷新频率可能会不同，而 setTimeout 只能设置一个固定时间间隔，这个时间不一定和屏幕的刷新时间相同。

(2) 使用 requestAnimationFrame

与 setTimeout 相比，requestAnimationFrame 最大的优势是由系统来决定回调函数的执行时机。如果屏幕刷新率是 60Hz,那么回调函数就每 16.7ms 被执行一次，如果刷新率是 75Hz，那么这个时间间隔就变成了 1000/75=13.3ms，换句话说就是，requestAnimationFrame 的步伐跟着系统的刷新步伐走。它能保证回调函数在屏幕每一次的刷新间隔中只被执行一次，这样就不会引起丢帧现象

```js
//需要插入的容器
let ul = document.getElementById("container");
// 插入十万条数据
let total = 100000;
// 一次插入 20 条
let once = 20;
//总页数
let page = total / once;
//每条记录的索引
let index = 0;
//循环加载数据
function loop(curTotal, curIndex) {
  if (curTotal <= 0) {
    return false;
  }
  //每页多少条
  let pageCount = Math.min(curTotal, once);
  window.requestAnimationFrame(function() {
    for (let i = 0; i < pageCount; i++) {
      let li = document.createElement("li");
      li.innerText = curIndex + i + " : " + ~~(Math.random() * total);
      ul.appendChild(li);
    }
    loop(curTotal - pageCount, curIndex + pageCount);
  });
}
loop(total, index);
```

(3) 使用 DocumentFragment

从 MDN 的说明中，我们得知 DocumentFragments 是 DOM 节点，但并不是 DOM 树的一部分，可以认为是存在内存中的，所以将子元素插入到文档片段时不会引起页面回流。

```js
//需要插入的容器
let ul = document.getElementById("container");
// 插入十万条数据
let total = 100000;
// 一次插入 20 条
let once = 20;
//总页数
let page = total / once;
//每条记录的索引
let index = 0;
//循环加载数据
function loop(curTotal, curIndex) {
if (curTotal <= 0) {
return false;
}
//每页多少条
let pageCount = Math.min(curTotal, once);
window.requestAnimationFrame(function() {
let fragment = document.createDocumentFragment();
for (let i = 0; i < pageCount; i++) {
let li = document.createElement("li");
li.innerText = curIndex + i + " : " + ~~(Math.random() \* total);
fragment.appendChild(li);
}
ul.appendChild(fragment);
loop(curTotal - pageCount, curIndex + pageCount);
});
}
loop(total, index);
```

### 1.9 服务端渲染、客户端渲染、同构

### 1.10 处理大量数据采用长连接
