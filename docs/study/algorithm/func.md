---
title: 算法函数
date: 2020-07-10
tags:
 - 算法
 - JavaScript
categories:
 - 算法
 - JavaScript
 - 面试
---

1. 函数柯里化

```javascript
function curry(fn) {
  const genarator = (...allArgs) => {
    return allArgs.length >= fn.length
      ? fn(...allArgs)
      : (...args) => genarator(...allArgs, ...args);
  };
  return genarator;
}
let add = (a, b, c, d) => a + b + c + d;
let i = curry(add);

console.log(i(1, 2, 3)(4));
```
