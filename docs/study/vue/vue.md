# VUE合集
## 1.什么是MVVM?
 MVVM是model-view-ViewModel的缩写，是一种基于前端开发的架构模式，核心是对view和viewModel的双向数据绑定。viewModel是view和model层的桥梁，数据会绑定到viewModel层并自动将数据渲染到页面中。视图变化的时候会通知viewModel层更新数据. 
 在vue中，将视图层的dom元素做数据劫持。通过gettter和setter暴露循环作用域下的变量，产生闭包。他能在内部让vue追踪依赖，在被访问和修改时通知变更。实现双向数据绑定。
 ### 那么vue中怎么做到双向数据绑定的
 所谓的双向数据绑定对于单向数据绑定来说，其实就是为元素的变更绑定了相应的变更事件，实现的方式大致有以下几种
 - 发布订阅者模式
 - 脏值检查-在指定的一些事件触发时，对比数据是否变更来决定是否更新视图
 - 数据劫持

vue采用数据劫持结合发布订阅者模式 通过object. defineProperty()来劫持各个属性的setget，数据变动时发布消息给订阅者，出发相应的监听回调（在3. 0中改用proxy）

## 2.VUE的性能优化
1. 编码阶段
- 尽量减少data中的数据，data中的数据都会增加getter和setter，会收集对应的watcher，object引入的类型可以使用object.freeze冻结减少数据监听。
- v-if和v-for不能连用 
- 如果需要使用v-for时，若是需要循环数量很大时，可以考虑使用事件代理（会提高一点性能），无论是监听器数量还是内存占比率都会比绑定在子元素上少。react是将事件委托到了document上，然后自己生成了合成事件，冒泡到document的时候进入合成事件，然后通过getParent()获取该事件源的所有合成事件，触发完毕后继续冒泡。
- SPA页面采用keep-alive缓存组件。
- 根据需求情况选择v-if还是用v-show
- 使用路由懒加载、异步组件
- 图片懒加载
- 防抖、节流
- 第三方模块按需导入
- 长列表滚动到可视区域动态加载
2. SEO
- 预渲染
- 服务端渲染SSR
3. 打包优化
- 压缩代码 (css: MiniCssExtractPlugin)(js: terser-webpack-plugin)
- Tree shaking/ scope Hoisting
- 使用CDN加载第三方模块
- 多线程打包happypack(happypack/loader?id=happy-eslint-js)
- splitChunk 抽离公共文件
- sourceMap优化(dev:cheap-module-source-map, prod:source-map)

## 3.css样式穿透
由于scoped属性的样式隔离，修改不到第三方组件的样式，需要做样式穿透（在css预处理器中使用才生效）

- less使用/deep/
```css
<style scoped lang="less">
.content /deep/ .el-button {
  height:20px;
}
</style>
```

- scss使用 ::v-deep
```scss
<style scoped lang="scss">
.content ::v-deep .el-button {
  height:20px;
}
</style>
```

- stylus使用 >>>
```scss
<style scoped lang="stylus">
.content >>> .el-button {
  height:20px;
}
</style>
```

## 4. 请详细说下你对vue生命周期的理解？
总共分为8个阶段创建前/后，载入前/后，更新前/后，销毁前/后

- beforeCreate 创建前执行（vue实例的挂载元素$el和数据对象data都为undefined，还未初始化）

- created 完成创建 （完成了data数据初始化，el还未初始化）

- beforeMount 载入前（vue实例的$el和data都初始化了，但还是挂载之前为虚拟的dom节点，data.message还未替换。）

- mounted 载入后html已经渲染(vue实例挂载完成，data.message成功渲染。)

- beforeUpdate 更新前状态（view层的数据变化前，不是data中的数据改变前）

- updated 更新状态后

- beforeDestroy 销毁前

- destroyed 销毁后 （在执行destroy方法后，对data的改变不会再触发周期函数，说明此时vue实例已经解除了事件监听以及和dom的绑定，但是dom结构依然存在）

说一下每一个阶段可以做的事情

- beforeCreate:可以在这里加一个loading事件，在加载实例时触发。

- created:初始化完成时的事件写这里，如果这里结束了loading事件，异步请求也在这里调用。

- mounted:挂在元素，获取到DOM节点

- updated:对数据进行处理的函数写这里。

- beforeDestroy:可以写一个确认停止事件的确认框。

## 5. data是如何被访问的
vue在执行过程中，会将data和prop都挂载在vm实例上，这个时候源码做了一个判断，如果是相同的命名则会报错。在源码中，其对data中的元素进行了proxy代理：
```javascript
const sharedPropertyDefinition = {
  enumerable:true,
  configurable: true,
  get: noop,
  set: noop
}
function proxy (target: Object, sourceKey: string, key: string) {
  sharedPropertyDefinition.get = function proxyGetter() {
    return this[sourceKey][key]
  }
  sharedPropertyDefinition.set = function proxySetter(val) {
    this[sourceKey][key] = val
  }
  Object.defineProperty(target, key, sharedPropertyDefinition)
}

// proxy(_vm, _data, key) 所以我们在vm._data中也可以访问到data中的对象
```

render：
在vue中可以写template和render函数，最终都会被vue编译成render function的形式，render()函数里有一个createElement方法，我们可以调用这个方法传入我们所
需要渲染的dom元素，createElement方法其实是对_createElement函数的封装，他通过用户传入更多的参数，在处理完传入的参数后，调用真正创建Vnode的函数_createElement

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
_createElement 方法有 5 个参数，context 表示 VNode 的上下文环境，它是 Component 类型；tag 表示标签，它可以是一个字符串，也可以是一个 Component；data 表示 VNode 的数据，它是一个 VNodeData 类型，可以在 flow/vnode.js 中找到它的定义；children 表示当前 VNode 的子节点，它是任意类型的，它接下来需要被规范为标准的 VNode 数组；normalizationType 表示子节点规范的类型，类型不同规范的方法也就不一样，它主要是参考 render 函数是编译生成的还是用户手写的。
由于 Virtual DOM 实际上是一个树状结构，每一个 VNode 可能会有若干个子节点，这些子节点应该也是 VNode 的类型。_createElement 接收的第 4 个参数 children 是任意类型的，因此我们需要把它们规范成 VNode 类型。 
其实源码是很复杂繁琐的，我们要从源码中学习到  函数式的写法，柯里化的运用

## virtual dom的优势在哪里
Dom引擎、js引擎相互独立，但又工作在同一线程，js代码调用dom api必须挂起js引擎，转换传入参数数据、激活dom引擎，dom重绘后再转换可能有的返回值，最后激活js引擎并继续执行若有频繁的dom api调用，且浏览器厂商不做“批量处理”优化。
引擎间切换的单位代价将迅速积累若其中有强制重绘的dom api调用，重新计算布局、重新绘制图像会引起更大的性能消耗。

优势：
1. 虚拟dom不会立马进行排版和重绘操作。
2. 虚拟dom会在进行频繁修改过后一次性修改真实的dom，减少操作真实dom频繁触发排版和重绘。
3. 虚拟dom有效降低大面积真实dom的重绘和排版，因为最终与真实dom比较差异，可以只渲染局部。
