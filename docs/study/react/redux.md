```js
export function createStore(reducer, preloadedState, enhancer) {
  // 如果你除了reducer以外的参数都传递了函数，建议使用compose来整合他们进行使用,compose后面会写
  if (
    (typeof preloadedState === "function" && typeof enhancer === "function") ||
    (typeof enhancer === "function" && typeof arguments[3] === "function")
  ) {
    throw new Error(
      "It looks like you are passing several store enhancers to " +
        "createStore(). This is not supported. Instead, compose them " +
        "together to a single function."
    );
  }

  // enhancer可以作为第二、第三个参数来传入,默认传入的函数即为enhancer
  if (typeof preloadedState === "function" && typeof enhancer === "undefined") {
    enhancer = preloadedState;
    preloadedState = undefined;
  }

  // 倘若enhancer函数存在，则走入链式调用创建store的过程中，途中会调用到中间件，例如enhancer为：applyMiddleware(fn)
  if (typeof enhancer !== "undefined") {
    if (typeof enhancer !== "function") {
      throw new Error("Expected the enhancer to be a function.");
    }
    return enhancer(createStore)(reducer, preloadedState);
  }

  if (typeof reducer !== "function") {
    throw new Error("Expected the reducer to be a function.");
  }

  let currentReducer = reducer;
  let currentState = preloadedState; // preloadedS tate: 初始化 State
  let currentListeners = [];
  let isDispatching = false;

  function getState() {
    return currentState;
  }
  function subscribe(fn) {
    if (typeof fn !== "function") {
      throw new Error("触发监听得是数组宝贝");
    }
    if (isDispatching) {
      throw new Error("正在触发派发的过程中，你在这时候搞监听不得行的");
    }
    // 下面去除掉一些判断、处理逻辑，保留本职代码

    currentListeners.push(fn);
    return function() {
      const index = currentListeners.indexOf(listener);
      index > 0 && currentListeners.splice(index, 1);
    };
  }
  function dispatch(action) {
    // if (action.type === undefined) ......
    try {
      isDispatching = true;
      currentState = currentReducer(currentState, action);
    } finally {
      isDispatching = false;
    }
    currentListeners.forEach((item) => item && item());
  }
  function replaceReducer(nextRedux) {
    if (typeof nextRedux !== "function") {
      throw new Error();
    }
    // 替换reducer 用于热替换、按需加载等场景
    currentReducer = nextRedux;
    dispatch({
      type: "INIT", //用于派发整体更新
    });
  }
  function observable() {}

  dispatch({
    type: "INIT", //用于生成初始state树
  });
  return {
    getState,
    dispatch,
    subscribe,
    replaceReducer,
    observable,
  };
}
```
