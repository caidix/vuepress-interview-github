---
title: 排序算法
date: 2020-07-10
tags:
 - 算法
 - JavaScript
categories:
 - 算法
 - JavaScript
 - 面试
---

1. 冒泡排序
   > 冒泡排序只会操作相邻的两个数据，每次冒泡操作都会将相邻的两个元素进行比较，一次冒泡会让至少一个元素移动到它应该在的位置，重复 n 次，就完成了 n 个数据的排序工作。
   > <img alt="image" class="lazyload inited loaded" data-src="https://user-gold-cdn.xitu.io/2020/5/31/17268eba8157dbde?imageslim" data-width="300" data-height="180" src="https://user-gold-cdn.xitu.io/2020/5/31/17268eba8157dbde?imageslim">

```javascript
function bubbleSort(arr) {
  for (let i = 1; i < arr.length; i++) {
    for (let j = i; j > 0; j--) {
      if (arr[j] < arr[j - 1]) {
        [arr[j - 1], arr[j]] = [arr[j], arr[j - 1]];
      }
    }
  }
  console.log(arr);
}
```

2. 快速排序

```javascript
function quickSort(arr) {
  if (arr.length <= 1) return arr;
  let right = [],
    left = [],
    keys = arr.shift();
  for (let value of arr) {
    if (value > keys) {
      right.push(value);
    } else {
      left.push(value);
    }
  }
  return quickSort(left).concat(keys, quickSort(right));
}
```
