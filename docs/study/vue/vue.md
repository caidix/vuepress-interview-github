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