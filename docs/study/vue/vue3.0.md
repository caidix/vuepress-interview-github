---
title: Vue3.0基础
date: 2021-01-01
sidebar: auto
tags:
  - Vue
categories:
  - Vue
---

## vue3 中如何进行像 2.X 那样的函数式调用组件

> 这里依旧用 vue2.x 那里的 message 组件类似的写法，重点在于 2 与 3 之间使用的渲染方法的区别。而 vue3 将其核心拆离出来，使用者可以自定义 render 函数生成在不同环境下的代码，如：androd、ios 等。

Vue3.0 的渲染分为

- Render Phase 渲染阶段
  在渲染阶段，将会调用 render 函数，它返回一个虚拟节点
- Mount Phase 挂载阶段
  在挂载阶段，会使用虚拟节点，并调用 Dom Api 挂载到 web 上
- patch Phase 补丁阶段
  在补丁阶段，渲染器会将旧的虚拟节点和新的虚拟节点（当 reactivity 监听到变化时，会再次调用 render 函数生成新的虚拟节点）进行比较并只更新网页变化的部分

```js
import { createVNode, render, isVNode, nextTick } from "vue";
import ImageConstructor from "./image.vue";

let vm;
let container;
/**
 * 传参：
 * @param urlList  {若为dom元素，则查找dom元素内所有的image图片，若为数组，则展示数组内的所有图片}
 * @param zIndex {层级}
 * @param emptyError {未找到img控制台提醒}
 * @param activeIndex {当前需要展示的图片路径，没有则默认展示数组第一张, number|string}
 */
const Image = function(
  opts: any = {
    urlList: [],
    emptyError: false,
    activeIndex: 0,
  }
) {
  if (opts.urlList instanceof HTMLDocument) {
    opts.urlList = Array.from(opts.urlList.getElementsByTagName("img")).map(
      (img) => img.src || ""
    );
  }

  if (!(opts.urlList instanceof Array) || !opts.urlList.length) {
    if (opts.emptyError) {
      console.error("所选模块|传入图片数组为空！");
    }
    return;
  }
  if (typeof opts.activeIndex === "string") {
    opts.activeIndex = opts.urlList.findIndex(opts.activeIndex) || 0;
  }
  container = document.createElement("div");
  opts.close = close;

  vm = createVNode(ImageConstructor, opts);
  console.log(vm);
  render(vm, container);
  document.body.appendChild(container);
};

function close() {
  render(null, vm);
  nextTick(() => {
    document.body.removeChild(container);
  });
}

export default Image;
```

> 在 2x 中其调用方法是挂载在其原型对象上，3x 则给我们提供了指定的挂载路径

```js
// 以下app为Vue为实例
//2x
app.prototype.$message = xxx;

// 3x
app.config.globalProperties.$message = xxx;
```

## render 函数 2 与 3 的不同

```js
//2 api
render(h) {
  return h('div', {
    attrs: {
      id: 'foo'
    },
    on: {
      click: this.xxx
    }
  }, 'hello')
}

// 3 api
import {h} from 'vue';
render() {
  return h('div', {
    id: 'foo',
    onClick:this.xxx,
  }, 'hello')
}
```

籍此，我们可以看到两者的不同，一是传入的 options 参数完全扁平化开，若组件内有需要的参数将会作为 props 传入，否则将传入 attrs 中。特别的一提：\$listener 也在 3.x 版本并入了 attrs 中。第二点是 createVNode 方法不再针对某个组件渲染，而是在 vue 中全局引入{h}。在 2 中，倘若想将一个大型的组件分割成很多个小的组件的时候，你可能必须要将这个 h 函数一路传递给这些分割函数，从而造成了一些麻烦，而全局的引入降低了心智负担。
