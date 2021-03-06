---
title: Vue 题解
date: 2020-07-18
sidebar: auto
tags:
  - Vue
categories:
  - Vue
  - 面试
---## 什么是 MVVM?

MVVM 是 model-view-ViewModel 的缩写，是一种基于前端开发的架构模式，核心是对 view 和 viewModel 的双向数据绑定。viewModel 是 view 和 model 层的桥梁，数据会绑定到 viewModel 层并自动将数据渲染到页面中。视图变化的时候会通知 viewModel 层更新数据.
在 vue 中，将视图层的 dom 元素做数据劫持。通过 gettter 和 setter 暴露循环作用域下的变量，产生闭包。他能在内部让 vue 追踪依赖，在被访问和修改时通知变更。实现双向数据绑定。

### 那么 vue 中怎么做到双向数据绑定的

所谓的双向数据绑定对于单向数据绑定来说，其实就是为元素的变更绑定了相应的变更事件，实现的方式大致有以下几种

- 发布订阅者模式
- 脏值检查-在指定的一些事件触发时，对比数据是否变更来决定是否更新视图
- 数据劫持

vue 采用数据劫持结合发布订阅者模式 通过 object. defineProperty()来劫持各个属性的 setget，数据变动时发布消息给订阅者，出发相应的监听回调（在 3. 0 中改用 proxy）

## VUE 的性能优化

1. 编码阶段

- 尽量减少 data 中的数据，data 中的数据都会增加 getter 和 setter，会收集对应的 watcher，object 引入的类型可以使用 object.freeze 冻结减少数据监听。
- v-if 和 v-for 不能连用
- 如果需要使用 v-for 时，若是需要循环数量很大时，可以考虑使用事件代理（会提高一点性能），无论是监听器数量还是内存占比率都会比绑定在子元素上少。react 是将事件委托到了 document 上，然后自己生成了合成事件，冒泡到 document 的时候进入合成事件，然后通过 getParent()获取该事件源的所有合成事件，触发完毕后继续冒泡。
- SPA 页面采用 keep-alive 缓存组件。
- 根据需求情况选择 v-if 还是用 v-show
- 使用路由懒加载、异步组件
- 图片懒加载
- 防抖、节流
- 第三方模块按需导入
- 长列表滚动到可视区域动态加载

2. SEO

- 预渲染
- 服务端渲染 SSR

3. 打包优化

- 压缩代码 (css: MiniCssExtractPlugin)(js: terser-webpack-plugin)
- Tree shaking/ scope Hoisting
- 使用 CDN 加载第三方模块
- 多线程打包 happypack(happypack/loader?id=happy-eslint-js)
- splitChunk 抽离公共文件
- sourceMap 优化(dev:cheap-module-source-map, prod:source-map)

## css 样式穿透

由于 scoped 属性的样式隔离，修改不到第三方组件的样式，需要做样式穿透（在 css 预处理器中使用才生效）

- less 使用/deep/

```css
<style scoped lang="less">
.content /deep/ .el-button {
  height:20px;
}
</style>
```

- scss 使用 ::v-deep

```scss
<style scoped lang="scss">
.content ::v-deep .el-button {
  height:20px;
}
</style>
```

- stylus 使用 >>>

```scss
<style scoped lang="stylus">
.content >>> .el-button {
  height:20px;
}
</style>
```

## 请详细说下你对 vue 生命周期的理解？

总共分为 8 个阶段创建前/后，载入前/后，更新前/后，销毁前/后

- beforeCreate 创建前执行（vue 实例的挂载元素\$el 和数据对象 data 都为 undefined，还未初始化）

- created 完成创建 （完成了 data 数据初始化，el 还未初始化）

- beforeMount 载入前（vue 实例的\$el 和 data 都初始化了，但还是挂载之前为虚拟的 dom 节点，data.message 还未替换。）

- mounted 载入后 html 已经渲染(vue 实例挂载完成，data.message 成功渲染。)

- beforeUpdate 更新前状态（view 层的数据变化前，不是 data 中的数据改变前）

- updated 更新状态后

- beforeDestroy 销毁前

- destroyed 销毁后 （在执行 destroy 方法后，对 data 的改变不会再触发周期函数，说明此时 vue 实例已经解除了事件监听以及和 dom 的绑定，但是 dom 结构依然存在）

说一下每一个阶段可以做的事情

- beforeCreate:可以在这里加一个 loading 事件，在加载实例时触发。

- created:初始化完成时的事件写这里，如果这里结束了 loading 事件，异步请求也在这里调用。

- mounted:挂在元素，获取到 DOM 节点

- updated:对数据进行处理的函数写这里。

- beforeDestroy:可以写一个确认停止事件的确认框。

## data 是如何被访问的

vue 在执行过程中，会将 data 和 prop 都挂载在 vm 实例上，这个时候源码做了一个判断，如果是相同的命名则会报错。在源码中，其对 data 中的元素进行了 proxy 代理：

```javascript
const sharedPropertyDefinition = {
  enumerable: true,
  configurable: true,
  get: noop,
  set: noop,
};
function proxy(target: Object, sourceKey: string, key: string) {
  sharedPropertyDefinition.get = function proxyGetter() {
    return this[sourceKey][key];
  };
  sharedPropertyDefinition.set = function proxySetter(val) {
    this[sourceKey][key] = val;
  };
  Object.defineProperty(target, key, sharedPropertyDefinition);
}

// proxy(_vm, _data, key) 所以我们在vm._data中也可以访问到data中的对象
```

render：
在 vue 中可以写 template 和 render 函数，最终都会被 vue 编译成 render function 的形式，render()函数里有一个 createElement 方法，我们可以调用这个方法传入我们所
需要渲染的 dom 元素，createElement 方法其实是对\_createElement 函数的封装，他通过用户传入更多的参数，在处理完传入的参数后，调用真正创建 Vnode 的函数\_createElement

```javascript
export function createElement (
  context: Component,
  tag: any,
  data: any,
  children: any,
  normalizationType: any,
  alwaysNormalize: boolean
)
```

\_createElement  方法有 5 个参数，context  表示 VNode 的上下文环境，它是  Component  类型；tag  表示标签，它可以是一个字符串，也可以是一个  Component；data  表示 VNode 的数据，它是一个  VNodeData  类型，可以在  flow/vnode.js  中找到它的定义；children  表示当前 VNode 的子节点，它是任意类型的，它接下来需要被规范为标准的 VNode 数组；normalizationType  表示子节点规范的类型，类型不同规范的方法也就不一样，它主要是参考  render  函数是编译生成的还是用户手写的。
由于 Virtual DOM 实际上是一个树状结构，每一个 VNode 可能会有若干个子节点，这些子节点应该也是 VNode 的类型。\_createElement  接收的第 4 个参数 children 是任意类型的，因此我们需要把它们规范成 VNode 类型。
其实源码是很复杂繁琐的，我们要从源码中学习到 函数式的写法，柯里化的运用

## virtual dom 的优势在哪里

> 重要的一点，虚拟 dom 赋予了在渲染到浏览器之前我们以编程方式构造、检查、克隆以及操作所需的 dom 结构的能力
> Dom 引擎、js 引擎相互独立，但又工作在同一线程，js 代码调用 dom api 必须挂起 js 引擎，转换传入参数数据、激活 dom 引擎，dom 重绘后再转换可能有的返回值，最后激活 js 引擎并继续执行若有频繁的 dom api 调用，且浏览器厂商不做“批量处理”优化。
> 引擎间切换的单位代价将迅速积累若其中有强制重绘的 dom api 调用，重新计算布局、重新绘制图像会引起更大的性能消耗。

优势：

1. 虚拟 dom 不会立马进行排版和重绘操作。
2. 虚拟 dom 会在进行频繁修改过后一次性修改真实的 dom，减少操作真实 dom 频繁触发排版和重绘。
3. 虚拟 dom 有效降低大面积真实 dom 的重绘和排版，因为最终与真实 dom 比较差异，可以只渲染局部。

## 你对 template 与 jsx 写法的看法

当我们在书写一些复杂的 ui 组件或是业务组件的时候，他们往往只含有少量的标签，却拥有大量的交互逻辑，在这种情况下，模版语法有时候会限制你更容易的表达潜在的逻辑，这个时候你会发现会有许多的逻辑你写在 template 中，还有许多的逻辑写在了 javascript 中。而 render 函数的写法允许我们把这些逻辑组合到一个地方。

## vue 核心源码简写

1.x 版本

```js
utils = {
  getValue(expr, vm) {
    return vm.$data[expr.trim()];
  },
  setValue(expr, vm, newValue) {
    vm.$data[expr.trim()] = newValue;
  },
  modelUpdater(node, value) {
    node.value = value;
  },
  textUpdater(node, value) {
    node.textContent = value;
  },
  model(node, value, vm) {
    const initValue = this.getValue(value, vm);
    new Wacher(value, vm, (newVal) => {
      this.modelUpdater(node, newVal);
    });
    node.addEventListener("input", (e) => {
      const newValue = e.target.value;
      this.setValue(value, vm, newValue);
    });
    this.modelUpdater(node, initValue);
  },
  text(node, value, vm) {
    let result;
    if (value.includes("{{")) {
      result = value.replace(/\{\{(.+?)\}\}/g, (...args) => {
        const expr = args[1];
        new Wacher(expr, vm, (newVal) => {
          this.textUpdater(node, newVal);
        });
        return this.getValue(expr, vm);
      });
    } else {
      result = this.getValue(value, vm);
    }
    this.textUpdater(node, result);
  },
  on(node, value, vm, eventName) {
    console.log(node, value, vm, eventName);
    const eventMethod = vm.$options.methods ? vm.$options.methods[value] : null;
    eventMethod &&
      node.addEventListener(eventName, eventMethod.bind(vm), false);
  },
};

class Dep {
  constructor() {
    this.subs = [];
  }
  addSubs(sub) {
    this.subs.push(sub);
  }
  notify() {
    this.subs.forEach((w) => w.updated());
  }
}
class Wacher {
  constructor(expr, vm, cb) {
    this.expr = expr;
    this.vm = vm;
    this.cb = cb;
    // 为了能够触发一次defineProperty,将相同变量的事件挂载在同一个对象上
    this.oldValue = this.getOldValue();
  }
  getOldValue() {
    // 这里的Dep也可以换成任意一个全局变量 做定义
    Dep.target = this;
    // 调用了getValue方法从而调用了$data.get() 做事件劫持
    const oldValue = utils.getValue(this.expr, this.vm);
    Dep.target = null;
    return oldValue;
  }
  updated() {
    const newValue = utils.getValue(this.expr, this.vm);
    if (newValue !== this.oldValue) {
      this.cb(newValue);
    }
  }
}

class Compiler {
  constructor(el, vm) {
    this.el = this.isElementNode(el) ? el : document.querySelector(el);
    this.vm = vm;
    /**
     * 1. 创建碎片元素
     */
    const fragment = this.compileFragment(this.el);
    this.compile(fragment);
    this.el.appendChild(fragment);
  }
  isElementNode(el) {
    return el.nodeType && el.nodeType === 1;
  }
  isTextNode(el) {
    return el.nodeType && el.nodeType === 3;
  }
  isDirector(name) {
    return name.startsWith("v-");
  }
  isEventName(name) {
    return name.startsWith("@");
  }
  compileElement(node) {
    // v-
    const attributes = Array.from(node.attributes);
    attributes.forEach((attr) => {
      const { name, value } = attr;
      if (this.isDirector(name)) {
        const [, directive] = name.split("-");
        const [compileKey, eventName] = directive.split(":");
        console.log(compileKey, eventName, name);
        utils[compileKey](node, value, this.vm, eventName);
      } else if (this.isEventName(name)) {
        const [, eventName] = name.split("@");
        utils["on"](node, value, this.vm, eventName);
      }
    });
  }
  compileText(node) {
    const content = node.textContent;
    if (/\{\{(.+?)\}\}/.test(content)) {
      console.log("content:", content);
      utils["text"](node, content, this.vm);
    }
  }
  compile(node) {
    const childNodes = Array.from(node.childNodes);
    childNodes.forEach((childNode) => {
      if (this.isElementNode(childNode)) {
        this.compileElement(childNode);
      } else if (this.isTextNode(childNode)) {
        this.compileText(childNode);
      }
      if (childNode.childNodes && childNode.childNodes.length) {
        this.compile(childNode);
      }
    });
  }
  compileFragment(el) {
    const f = document.createDocumentFragment();
    let firstChild;
    while ((firstChild = el.firstChild)) {
      f.appendChild(firstChild);
    }
    return f;
  }
}
class Observer {
  constructor(data) {
    this.observe(data);
  }
  observe(data) {
    if (data && typeof data === "object") {
      Object.keys(data).forEach((key) => {
        this.defineReactive(data, key, data[key]);
      });
    }
  }
  defineReactive(data, key, value) {
    this.observe(value);
    const dep = new Dep();
    Object.defineProperty(data, key, {
      enumerable: true,
      configurable: true,
      get: () => {
        const target = Dep.target;
        target && dep.addSubs(target);
        return value;
      },
      set: (newValue) => {
        if (value === newValue) return;
        this.observe(newValue);
        value = newValue;
        dep.notify();
      },
    });
  }
}
class Vue {
  constructor(options) {
    this.$options = options;
    this.$data = options.data;
    this.$el = options.el;

    new Observer(this.$data);
    new Compiler(this.$el, this);

    this.proxyData(this.$data);
  }

  proxyData(data) {
    Object.keys(data).forEach((key) => {
      Object.defineProperty(this, key, {
        enumerable: true,
        configurable: true,
        get: () => {
          return data[key];
        },
        set: (newValue) => {
          data[key] = newValue;
        },
      });
    });
  }
}
```

## vue3.0

vue3.0 版本将所有的功能以包的形式分割开来，其中有一个@vue/reactivity 包，里面有 reactive、effect、computed、ref，通过 reactive({haha : 'asdasas'}) 进行了 proxy 代理，通过 effect 为状态，像 react。
Vue3.0 源码有哪几个核心模块组成？
reactivity 文件中，分别有 effect、reactive、computed、ref、公共常量及依赖收集的模块

Vue3.0 中响应式原理的作用是什么？ 为什么比 Vue2.0 性能高？
3。0 中改用了 proxy 进行依赖收集，对对象进行递归劫持，对处理值的变化进行判断。
2。0 的时候是通过 Dep 和 Watcher 进行依赖的收集和分发，3.0 使用了 effect 将视图渲染和数据响应式分离开来。且采用模块化的引入的形式，在不使用某一些功能的时候即不需要引入功能模块，可以减少打包编译的大小和时间。vue3。0 是在使用到当前对象时才初始化代理，而 vue2.0 的响应式是在一开始便用递归重写被代理对象的 Object.defineProperty。

proxy 和 defineProperty 有什么区别嘛？
一个是劫持操作，一个是劫持属性。
proxy 只需要代理了一个对象的 set、get 操作，那么相当于对这个对象的所有子属性做了劫持。
而 defineProperty 则需要对每一个属性进行遍历然后劫持。因此在 2.x 里，vue 需要对 data 数据进行递归遍历，对 data 数据做深度的 Observer 处理，因此如果传入的 data 是比较深的层级，或者有很多没有用到的数据，都会影响到 vue 的初始化的速度。而 3.x 只需要在对象上做一层代理，而这个对象上就算有很多无需做响应式处理的数据也没关西，因为子对象是否需要被递归代理是在用到的时候才决定的。可以说相比 2.x 基本上没有了 initData 这部分的时间。也无须要通过\$set 来添加新属性的监听了。

Vue3 中计算属性为什么要优先于 effect 执行
因为如果通过 effect 去获取计算属性中的值的时候，计算属性通过 dirty 来进行缓存避免多次计算值的调用。如果计算属性内所需要被监听的值发生了改变，但是 computed.value 并没有被及时的修改，就会导致 effect 出来的值不是最新的值，所以需要优先执行并且将 dirty 设为 true。

Vue3 中计算属性中 dirty 的含义
dirty 是为了对计算属性的值是否发生变更所做的一个锁，函数内通过识别 dirty 的值来判断是否需要重新运行计算属性中传入的函数/对象 setter。已避免计算属性在 getter 的过程中多次触发执行 effect。
