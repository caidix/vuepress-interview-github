# 自定义指令

> 编写 vue 的自定义指令可以使得许多事情变得轻松起来，只需要使用 v-xxx=“”并传入想要传入的参数即可。

## 点击绑定指令外的元素关闭该元素

> 即 [clickoutside（v-clickoutside）](http://blog.cdhouse.top/article/detail?id=18##toc12)

````javascript

let nodeList = [];// 元素搜集器，会将页面中所有绑定了clickoutside指令的dom元素存储起来，方便控制管理
let seed = 0;
let nowClickDom;
const rtx = "@clickOutSide";
const addEvent = (function() {
  if (document.addEventListener) {
    return function(element, event, func) {
      if (element && event && func) {
        element.addEventListener(event, func, false);
      }
    };
  } else {
    return function(element, event, func) {
      if (element && event && func) {
        element.attachEvent("on" + event, func);
      }
    };
  }
})();

addEvent(document, "mousedown", (e) => (nowClickDom = e));
addEvent(document, "mouseup", (e) => {
  nodeList.forEach((dom) => {
    dom[rtx].documentHandler(e, nowClickDom);
  });
});

function createDocumentHandler(el, binding, vnode) {
  return function(mouseup = {}, mousedown = {}) {
    if (
      !vnode ||
      !vnode.context || //vnode.context 是否存在，不存在退出
      !mouseup.target || // mouseup.target 是否存在，不存在退出
      !mousedown.target || //mousedown.target 是否存在，不存在退出
      el.contains(mousedown.target) || //el是否包含mouseup.target/mousedown.target子节点，如果包含说明点击的是绑定元素的内部，则不执行clickoutside指令内容
      el.contains(mouseup.target) ||
      el === mouseup.target || //绑定对象el是否等于mouseup.target，等于说明点击的就是绑定元素自身，也不执行clickoutside指令内容
      (vnode.context.popperElm &&
        (vnode.context.popperElm.contains(mouseup.target) ||
          vnode.context.popperElm.contains(mousedown.target)))
    ) {
      return;
    }
    el[rtx].bindingFn && el[rtx].bindingFn();
  };
}
export default {
  bind(el, binding, vnode) {
    nodeList.push(el);
    const id = seed++;
    el[rtx] = {
      id, // 生成唯一id
      documentHandler: createDocumentHandler(el, binding, vnode),
      methods: binding.expression,
      bindingFn: binding.value,
    };
  },
  update(el, binding, vnode) {
    el[rtx].documentHandler = createDocumentHandler(el, binding, vnode);
    el[rtx].methods = binding.expression;
    el[rtx].bindingFn = binding.value;
  },
  unbind(el) {
    for (let index = 0; index < nodeList.length; index++) {
      let node = nodeList[index];
      if (node === el) {
        nodeList.splice(index, 1);
        break;
      }
    }
    delete el[rtx];
  },
};

````

## 点击数据上报
```javascript
function reportClick(el, binding) {
   ajax....
}

export default = (Vue) => {
  Vue.directive('report', {
    bind(el, binding, vnode) {
      el.addEventListener('click', reportClick(el, binding))
    },
    unbind(el, binding, vnode) {
      el.removeEventListener('click', reportClick)
    }
  })
}

```