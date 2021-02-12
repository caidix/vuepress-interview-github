---
title: react-router 源码及简单实现
date: 2021-02-05
tags:
  - JavaScript
categories:
  - JavaScript
  - React
---
## 什么是路由

> 路由的概念来源于服务端，在服务端中路由描述的是 URL 与处理函数之间的映射关系。 在 Web 前端单⻚应⽤ SPA(Single Page Application)中，路由描述的是 URL 与 UI 之间的映射关 系，这种映射是单向的，即 URL 变化引起 UI 更新（⽆需刷新⻚⾯）。

## 路由实现需要

1. 通过方法改变路由并不引起页面刷新

   > 不引起页面刷新有两种方法：第一种是 history、第二种是 hash

   ```js
   // history
   /*
   state: 代表状态对象，这让我们可以给每个路由记录创建自己的状态，并且它还会序列化后保存在用户的磁盘上，以便用户重新启动浏览器后可以将其还原。
   title: 目前没用
   url: 这就是我们要改变路由的路径
   */
   history.pushState(state, title[, url])
   history.replaceState(state, title[, url])

   // hash
   location.hash = 'foo'
   ```

2. 监听路由的变化
   > history 中可以通过监听 popstate 来监听浏览器的前进、后退事件，hash 可以通过监听 hashchange 事件监听 hash 值的变化。但当我们使用 pushState 这类的方法的时候不会触发 popstate 的监听，这里我们可以通过新建自定义事件来解决。下面也会有写到
3. 改变后重新出发渲染
   > 通过改变最外层组件的响应式参数触发其以及子组件的重新渲染，从而展示新的界面。

## 流程梗概

## 源码简单实现

先附两个必看的链接
[react-router 源码地址](https://github.com/ReactTraining/react-router/),并推荐使用 Octotree 谷歌插件快速切换文件查看真实源码学习了解路由原理。
[react-router 使用指南](https://reactrouter.com/web/api/HashRouter)

### Router

首先我们看到在使用的时候我们经常会使用 BrowerRouter 或是 HashRouter 在最外层做包裹，其实查看[源码](https://github.com/ReactTraining/react-router/blob/master/packages/react-router-dom/modules/BrowserRouter.js)，我们会发现其实就只是个名称罢了，在此基础上返回了 Router 组件，并通过第三方库创建并传入了 history 变量。这里我们直接写 Router 组件

Router.jsx

```js
import React from 'react'
import ReactContext from './RouteContext'
import registerHistoryListener from './historyListen'

class Router extends React.Component {
  static computeRootMatch(pathname) {
    return {
      path: '/',
      url: '/',
      params: {},
      isExact: pathname === '/',
    }
  }
  constructor(props) {
    super(props)
    this.state = {
      location: window.location,
    }
  }
  // registerHistoryListener 是对pushstate、replacestate等事件绑定监听的方法，下面会有源码展示
  componentDidMount() {
    if (this.listen) return
    this.listen = registerHistoryListener(this.changeState)
  }
  componentWillUnmount() {
    if (this.listen) {
      this.listen()
      this.listen = null
    }
  }
  // 改变location方法，源码用的第三方库，这里我们直接使用window.location，调用函数以实现重新渲染整个组件
  changeState = () => {
    this.setState({
      location: window.location,
    })
  }
  render() {
    return (
      // 通过createContext 为其下的所有子组件传入参数
      <ReactContext.Provider
        value={{
          location: this.state.location,
          history: window.history, // 在
          match: Router.computeRootMatch(this.state.location.pathname),
          changeState: this.changeState,
        }}
      >
        {this.props.children}
      </ReactContext.Provider>
    )
  }
}

export default Router
```

RouteContext.js

```js
import React from 'react'
const RouteContext = React.createContext()
RouteContext.displayName = 'react-router'

export default RouteContext
```

historyListen.js

```js
// 自定义pushState、replaceState事件监听，并重写其在window上的方法，在内触发自定义事件
function createHistoryCustomEvent(type) {
  const baseEvent = window.history[type]
  if (!baseEvent || typeof baseEvent !== 'function') return
  const event = new Event(type)
  window.history[type] = function (...args) {
    const res = baseEvent.apply(this, ...args)
    window.dispatchEvent(event)
    return res
  }
}

function registerHistoryListener(func = () => {}) {
  createHistoryCustomEvent('pushState')
  createHistoryCustomEvent('replaceState')
  window.addEventListener('pushState', func)
  window.addEventListener('replaceState', func)
  window.addEventListener('popstate', func)
  return function () {
    window.removeEventListener('pushState', func)
    window.removeEventListener('replaceState', func)
    window.removeEventListener('popstate', func)
  }
}
export default registerHistoryListener
```

Route.jsx

```js
import React from 'react'
import ReactContext from './RouteContext'
import matchPath from './matchPath'

// 判断子节点中有多少个是属于react组件的子节点
function isEmptyChidren(child) {
  return React.Children.count(child) === 0
}

class Route extends React.Component {
  constructor(props) {
    super(props)
  }
  render() {
    return (
      <ReactContext.Consumer>
        {(context) => {
          const location = this.props.location || context.location // 其实这里拿的就是window.location

          // this.props.computedMatch参数其实是在Switch组件中做了筛选后并传入的，这里判断如果没有的话，自行调用matchPath方法获取改变的url是否与想要展示的组件的path相匹配，具体代码在下面一段
          const match = this.props.computedMatch
            ? this.props.computedMatch
            : this.props.path
            ? matchPath(location.pathname, this.props)
            : context.match

          const props = { ...context, match, location }

          let { children, render, component } = this.props
          // Preact uses an empty array as children by
          // default, so use null if that's the case.
          if (Array.isArray(children) && isEmptyChidren(children)) {
            children = null
          }
          // return 的时候，按照children -> component -> render 的顺序执行
          return (
            <ReactContext.Provider value={props}>
              {props.match
                ? children
                  ? typeof children === 'function'
                    ? children(props)
                    : children
                  : component
                  ? React.createElement(component, props)
                  : render
                  ? render(props)
                  : null
                : null}
            </ReactContext.Provider>
          )
        }}
      </ReactContext.Consumer>
    )
  }
}

export default Route
```

matchPath.js

> url 路径与 path 的路径是否匹配的判断是使用了第三方库[path-to-regexp](https://github.com/pillarjs/path-to-regexp)来进行的。

```js
import { pathToRegexp } from 'path-to-regexp'

const cache = {}
const cacheLimit = 10000
let cacheCount = 0

function compilePath(path, options) {
  const cacheKey = `${options.end}${options.strict}${options.sensitive}`
  const pathCache = cache[cacheKey] || (cache[cacheKey] = {})
  if (pathCache[path]) return pathCache[path]
  const keys = []
  // 在这里做匹配，用法具体看三方库详解
  const regexp = pathToRegexp(path, keys, options)
  const result = {
    regexp,
    keys,
  }
  // 做缓存，省的做上面的匹配步骤
  if (cacheCount < cacheLimit) {
    pathCache[path] = result
    cacheCount++
  }
  return result
}

/**
 * Public API for matching a URL pathname to a path.
 */
function matchPath(pathname, options = {}) {
  if (typeof options === 'string' || Array.isArray(options)) {
    options = { path: options }
  }
  const { path, exact = false, strict = false, sensitive = false } = options
  const paths = [].concat(path)

  return paths.reduce((matched, path) => {
    if (!path && path !== '') return null
    if (matched) return matched
    const { regexp, keys } = compilePath(path, {
      end: exact,
      strict,
      sensitive,
    })
    const match = regexp.exec(pathname)
    if (!match) return null
    const [url, ...values] = match
    const isExact = url === pathname
    if (exact && !isExact) return null
    return {
      path,
      url: path === '/' && url === '' ? '/' : url,
      isExact,
      params: keys.reduce((prev, key, index) => {
        prev[key.name] = values[index]
        return prev
      }, {}),
    }
  }, null)
}

export default matchPath
```

Switch.jsx

```js
import React from 'react'
import ReactContext from './RouteContext'
import matchPath from './matchPath'
class Switch extends React.Component {
  constructor(props) {
    super(props)
  }
  render() {
    return (
      <ReactContext.Consumer>
        {(context) => {
          const location = this.props.location || context.location
          if (!this.props.children) return null
          let children,
            match = null
          React.Children.forEach(this.props.children, (child) => {
            if (match === null && React.isValidElement(child)) {
              const path = child.props.path || child.props.from
              children = child
              match = path
                ? matchPath(location.pathname, { ...child.props, path })
                : null
            }
          })
          return match
            ? React.cloneElement(children, { location, computedMatch: match })
            : null
        }}
      </ReactContext.Consumer>
    )
  }
}

export default Switch
```

withRouter.jsx

```js
import React from 'react'
import RouteContext from './RouteContext'
function withRouter(Component) {
  const hoc = (props) => {
    const { warpRef } = props
    return (
      <RouteContext.Consumer>
        {(context) => <Component {...context} ref={warpRef} />}
      </RouteContext.Consumer>
    )
  }
  return hoc
}

export default withRouter
```

Redirect.js

> 重定向的源码其实是根据匹配过去和现在的路由做判断并且通过生命周期 mount、update 执行更换 url 的方式重新触发渲染，这里就懒得写了，主要记录一下在函数中增加生命周期的方法（实质就是用一个 class 组件来代替执行）

```js
import Lifecycle from './Lifecycle'
import RouteContext from './RouteContext'
function Redirect(props) {
  const { form, to, push = false } = props
  if (to === null) return null
  const routeTo = () => {
    const method = push ? window.history.pushState : window.history.replaceState
    window.history.pushState({}, '', to || to === '' ? to : '/')
  }
  return (
    <RouteContext.Consumer>
      {() => (
        <Lifecycle
          onMount={() => {
            window.history.pushState({}, '', to || to === '' ? to : '/')
          }}
          update={(self, prevProps) => {
            console.log(self, prevProps)
            // const prevLocation = createLocation(prevProps.to);
            // if (
            //   !locationsAreEqual(prevLocation, {
            //     ...location,
            //     key: prevLocation.key
            //   })
            // ) {
            //   method(location);
            // }
          }}
        />
      )}
    </RouteContext.Consumer>
  )
}

export default Redirect
```

Lifecycle.js

```js
import React from 'react'

class Lifecycle extends React.Component {
  componentDidMount() {
    if (this.props.onMount) {
      this.props.onMount.call(this, this)
    }
  }
  // prevProps, prevState, snapShot
  componentDidUpdate(prevProps, prevState, snapShot) {
    this.props.update && this.props.update.call(this, this, prevProps)
  }
  getSnapshotBeforeUpdate(prevProps, prevState) {
    if (prevState) {
      return prevState
    }
    return null
  }
  componentWillUnmount() {
    this.props.unmount && this.props.unmount.call(this, this)
  }
  render() {
    return null
  }
}

export default Lifecycle
```
