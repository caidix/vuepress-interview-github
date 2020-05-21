# 函数

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
