---
title: Vue实用方法及原理
date: 2020-07-18
sidebar: auto
tags:
  - Vue
categories:
  - Vue
  - 面试
---

## Emitter 方法分发事件 mixins

```js
function broadcast(componentName, eventName, params) {
  this.$children.forEach((child) => {
    const name = child.$options.name;
    if (name === componentName) {
      child.$emit.apply(child, [eventName].concat(params));
    } else {
      broadcast.call(child, componentName, eventName, params);
    }
  });
}
export default {
  methods: {
    /**
     * @desc 向上遍历找寻对应组件名称的父组件分发事件
     * @param {*} componentName
     * @param {*} eventName
     * @param {*} params
     */
    dispatch(componentName, eventName, params) {
      let parent = this.$parent || this.$root;
      let name = parent.$options.name;
      // 当有父级且父级没有命名或是名字不等于传入的名字时
      while (parent && (!name || name !== componentName)) {
        parent = parent.$parent;
        if (parent) {
          name = parent.$options.name;
        }
      }
      if (parent) {
        parent.$emit.apply(parent, [eventName].concat(params));
      }
    },
    /**
     * @desc 向下遍历找寻对应组件名称的子组件分发事件
     * @param {*} componentName
     * @param {*} eventName
     * @param {*} params
     */
    broadcast(componentName, eventName, params) {
      broadcast.call(this, componentName, eventName, params);
    },
  },
};
```

## 向上、向下寻找相应组件方法

```js
// 由一个组件，向上找到最近的指定组件
export function findComponentUpward(context, componentName) {
  let parent = context.$parent;
  let name = parent.$options.name;
  while (parent && (!name || [componentName].indexOf(name) < 0)) {
    parent = parent.$parent;
    if (parent) name = parent.$options.name;
  }
  return parent;
}
// 由一个组件，向上找到所有的指定组件
export function findComponentsUpward(context, componentName) {
  let parents = [];
  const parent = context.$parent;
  if (parent) {
    if (parent.$options.name === componentName) parents.push(parent);
    return parents.concat(findComponentsUpward(parent, componentName));
  } else {
    return [];
  }
}
// 由一个组件，向下找到最近的指定组件
export function findComponentDownward(context, componentName) {
  const childrens = context.$children;
  let children = null;
  if (childrens.length) {
    for (const child of childrens) {
      const name = child.$options.name;
      if (name === componentName) {
        children = child;
        break;
      } else {
        children = findComponentDownward(child, componentName);
        if (children) break;
      }
    }
  }
  return children;
}
// 由一个组件，向下找到所有指定的组件
export function findComponentsDownward(context, componentName) {
  return context.$children.reduce((components, child) => {
    if (child.$options.name === componentName) components.push(child);
    const foundChilds = findComponentsDownward(child, componentName);
    return components.concat(foundChilds);
  }, []);
}
// 由一个组件，找到指定组件的兄弟组件
export function findBrothersComponents(
  context,
  componentName,
  exceptMe = true
) {
  let res = context.$parent.$children.filter((item) => {
    return item.$options.name === componentName;
  });
  let index = res.findIndex((item) => item._uid === context._uid);
  if (exceptMe) res.splice(index, 1);
  return res;
}
```

## Vue 注册组件、挂载原型对象

```js
const install = function(Vue) {
  // 判断是否安装
  if (install.installed) return;
  Vue.component(component.name, component);
  Vue.prototype.$cdmessage = Message;
};

// 使用
Vue.use(cdui);
```

## 使用 JS 挂载使用组件（如 EL-Message）

extend 配合\$mount 挂载

> 这里使用 Message 组件源码来理解

```js
import Vue from "vue";
import Main from "./main.vue";
// 创建一个构造器,此时未挂载
let MessageConstructor = Vue.extend(Main);

let seed = 1;
let instance;
let instances = [];

const Message = function(options) {
  if (Vue.prototype.$isServer) return;
  options = options || {};
  // 若是传入非object对象类型，做兼容
  if (typeof options === "string") {
    options = {
      message: options,
    };
  }
  let id = "cdmessage_" + seed++;
  let onClose = options.onClose;
  options.onClose = function() {
    return Message.close(id, onClose);
  };
  // 传递data参数（调用$mount前,此时还未完成渲染)，new之后的instance已经是一个标准的vue组件实例了
  instance = new MessageConstructor({
    data: options,
  });
  instance.id = id;

  // 在mount挂载之后添加的属性是不会被拦截监听的，如果想要监听需要事先在vue文件内定义该属性走render
  instance.$mount();
  document.body.appendChild(instance.$el);

  // 距离顶口的偏移量，当出现多个提示时候，要根据次序排列距离顶部的高度，避免覆盖。
  if (options.offset && typeof options.offset !== "number") {
    window ? window.console.warn("offet value must be number!") : "";
  }
  let verticalOffset = options.offset || 20;
  instances.forEach((item) => {
    verticalOffset += item.$el.offsetHeight + 16;
  });
  instance.verticalOffset = verticalOffset;
  instance.visible = true;
  instances.push(instance);
  return instance;
};

const msgType = ["success", "info", "warning", "error", "loading"];
msgType.map((item) => {
  Message[item] = (options) => {
    options = options || {};
    if (typeof options === "string") {
      options = {
        message: options,
      };
    } else if (!options.type) {
      options.type = item;
    }
    return Message(options);
  };
});

Message.close = function(id, fn) {
  let len = instances.length;
  let index = -1;
  let removedHeight;
  for (let i = 0; i < len; i++) {
    if (instances[i] && instances[i].id === id) {
      index = i;
      removedHeight = instances[i].$el.offsetHeight;

      if (typeof fn === "function") {
        fn(instances[i]);
      }
      instances.splice(i, 1);
    }
  }
  /**
   * 经典判断：是否需要因为message的减少而进行top的位移
   * 1.若是不超过1个，则不发生位移
   * 2.未找到需要关闭的message
   * 3.当关闭的message是最后一个时
   */
  if (len <= 1 || index === -1 || index > instances.length - 1) return;
  for (let i = 0; i < instances.length; i++) {
    const element = instances[i];
    element.$el.style["top"] =
      parseInt(element.$el.style["top"], 10) - removedHeight - 16 + "px";
  }
};
// 全局销毁
Message.closeAll = function() {
  //for (let i = 0; i < instances.length; i++)!!这样的for循环是错的，因为会随着close减少instances的数量
  for (let i = instances.length - 1; i > -1; i--) {
    instances[i].close();
  }
};
export default Message;
```

newVue 实例挂载

```js
import Vue from "vue";
import xxx from "xxx.vue";
export function init() {
  const container = document.createELement("div");
  document.body.appendChild(container);
  new Vue({
    render: (h) => h(xxx),
  }).$mount(container);
}
```
