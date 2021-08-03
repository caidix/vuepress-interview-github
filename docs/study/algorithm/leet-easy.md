---
title: Leecode Easy算法
date: 2020-08-03
tags:
  - 算法
  - JavaScript
categories:
  - 算法
  - JavaScript
  - 面试
---

## 存在重复元素

给定一个整数数组，判断是否存在重复元素。

如果存在一值在数组中出现至少两次，函数返回 true 。如果数组中每个元素都不相同，则返回 false 。

示例 1:

输入: [1,2,3,1]
输出: true

示例 2:

输入: [1,2,3,4]
输出: false

> 计数题

```javascript
const hash = {};
for (num of nums) {
  if (hash[num]) {
    return true;
  }
  hash[num] = true;
}
return false;
```

## 字符串中的第一个唯一字符

给定一个字符串，找到它的第一个不重复的字符，并返回它的索引。如果不存在，则返回 -1。

示例：

s = "leetcode"
返回 0

s = "loveleetcode"
返回 2

// 提示：你可以假定该字符串只包含小写字母

> 计数题

```js
var firstUniqChar = function(s) {
  const hash = {};
  for (let v of s) hash[v] = (hash[v] || 0) + 1;
  for (let i = 0; i < s.length; i++) if (hash[s[i]] === 1) return i;
  return -1;
};
```

## 有效的字母异位词

给定两个字符串 s 和 t ，编写一个函数来判断 t 是否是 s 的字母异位词。

注意：若 s 和 t 中每个字符出现的次数都相同，则称 s 和 t 互为字母异位词。

示例 1:

输入: s = "anagram", t = "nagaram"
输出: true
示例 2:

输入: s = "rat", t = "car"
输出: false

> 计数题

```js
var isAnagram = function(s, t) {
  if (s.length !== t.length) return false;
  const hash = {};
  for (let v of s) hash[v] = (hash[v] || 0) + 1;
  for (let v of t) {
    if (!hash[v]) return false;
    hash[v]--;
  }
  return true;
};
```

## 多数元素

给定一个大小为 n 的数组，找到其中的多数元素。多数元素是指在数组中出现次数 大于 ⌊ n/2 ⌋ 的元素。

你可以假设数组是非空的，并且给定的数组总是存在多数元素。

示例 1：

输入：[3,2,3]
输出：3
示例 2：

输入：[2,2,1,1,1,2,2]
输出：2

> 计数题

```js
var majorityElement = function(nums) {
  const hash = {};
  const half = nums.length >> 1; // >>右移运算符，除以2
  for (let num of nums) {
    hash[num] = (hash[num] || 0) + 1;
    if (hash[num] > half) {
      return num;
    }
  }
};
```

## 只出现一次的数字

给定一个非空整数数组，除了某个元素只出现一次以外，其余每个元素均出现两次。找出那个只出现了一次的元素。

说明：

你的算法应该具有线性时间复杂度。你可以不使用额外空间来实现吗？

示例 1:

输入: [2,2,1]
输出: 1
示例 2:

输入: [4,1,2,1,2]
输出: 4

```js
// 计数法
var singleNumber = function(nums) {
  let map = new Map();
  nums.forEach((item) => {
    map.set(item, map.has(item) ? map.get(item) + 1 : 1);
  });
  for (let [key, val] of map.entries()) {
    if (val === 1) return key;
  }
};
// 异或
/*
 1 + 1 = 0
 1 + 0 = 1
 0 + 1 = 1
 0 + 0 = 0
*/
var singleNumber = function(nums) {
  let init = nums[0];
  for (let i = 1; i < nums.length; i++) {
    init ^= nums[i];
  }
  return init;
};
```

1. 任何数和自己做异或运算，结果为 0，即 a⊕a=0。
2. 任何数和 0 做异或运算，结果还是自己，即 a⊕0=a。
3. 异或运算中，满足交换律和结合律，也就是 a⊕b⊕a=b⊕a⊕a=b⊕(a⊕a)=b⊕0=b

## 位 1 的个数

编写一个函数，输入是一个无符号整数（以二进制串的形式），返回其二进制表达式中数字位数为 '1' 的个数（也被称为汉明重量）。

示例 1：
输入：00000000000000000000000000001011
输出：3
解释：输入的二进制串 00000000000000000000000000001011 中，共有三位为 '1'。

示例 2：
输入：00000000000000000000000010000000
输出：1
解释：输入的二进制串 00000000000000000000000010000000 中，共有一位为 '1'。

> 理论上我们把它变成字符串然后循环出 1 有几个就行了, 但是下面有数学的方法

原理：
每执行一次 x = x & (x-1)，会将 x 用二进制表示时最右边的一个 1 变为 0，因为 x-1 将会将该位(x 用二进制表示时最右边的一个 1)变为 0。因此，对 x 重复该操作，直到 x 变成 0，则操作次数即为 x 的二进制数中的 1 的数目。

```js
/**
 * @param {number} n - a positive integer
 * @return {number}
 */
var hammingWeight = function(n) {
  let ret = 0;
  while (n) {
    n &= n - 1;
    ret++;
  }
  return ret;
};
```

## 两数组交集

题目如下：给定两个数组，编写一个函数来计算它们的交集。

示例 1：

输入：nums1 = [1,2,2,1], nums2 = [2,2]
输出：[2]
示例 2：

输入：nums1 = [4,9,5], nums2 = [9,4,9,8,4]
输出：[9,4]

说明：

输出结果中的每个元素一定是唯一的。
我们可以不考虑输出结果的顺序。

> 先用 map 存储键值对，相同的取出再将 map 的值取反即可

```js
/**
 * @param {number[]} nums1
 * @param {number[]} nums2
 * @return {number[]}
 */
var intersection = function(nums1, nums2) {
  const map = {};
  const arr = [];
  nums1.forEach((i) => (map[i] = true));
  nums2.forEach((item) => {
    if (map[item]) {
      arr.push(item);
      map[item] = false;
    }
  });
  return arr;
};
```

分析**找规律题**

## 罗马数字转整数

罗马数字的 map 如下

```js
字符          数值
I             1
V             5
X             10
L             50
C             100
D             500
M             1000

```

例如， 罗马数字 2 写做  II ，即为两个并列的 1。12 写做  XII ，即为  X + II 。 27 写做   XXVII, 即为  XX + V + II 。

通常情况下，罗马数字中小的数字在大的数字的右边。但也存在特例，例如 4 不写做  IIII，而是  IV。数字 1 在数字 5 的左边，所表示的数等于大数 5 减小数 1 得到的数值 4 。同样地，数字 9 表示为  IX。这个特殊的规则只适用于以下六种情况：

I  可以放在  V (5) 和  X (10) 的左边，来表示 4 和 9。
X  可以放在  L (50) 和  C (100) 的左边，来表示 40 和  90。 
C  可以放在  D (500) 和  M (1000) 的左边，来表示  400 和  900。
给定一个罗马数字，将其转换成整数。输入确保在 1  到 3999 的范围内。

示例  1:
输入: "III"
输出: 3

示例  2:
输入: "IV"
输出: 4

示例  3
输入: "IX"
输出: 9

示例  4:
输入: "LVIII"
输出: 58
解释: L = 50, V= 5, III = 3.

示例  5:
输入: "MCMXCIV"
输出: 1994
解释: M = 1000, CM = 900, XC = 90, IV = 4.

> 如果先死 hashMap 来做的话

```js
var romanToInt = function(s) {
  const romaHash = {
    I: 1,
    V: 5,
    IV: 4,
    IX: 9,
    X: 10,
    XL: 40,
    XC: 90,
    L: 50,
    C: 100,
    CD: 400,
    CM: 900,
    D: 500,
    M: 1000,
  };
  let ans = 0;
  for (let i = 0; i < s.length; ) {
    if (i + 1 < s.length && romaHash[s.substring(i, i + 2)]) {
      ans += romaHash[s.substring(i, i + 2)];
      i += 2;
    } else {
      ans += romaHash[s.substring(i, i + 1)];
      i++;
    }
  }
  return ans;
};
```

> 不用拼凑时

```js
var romanToInt = function(s) {
  const map = new Map();
  map.set("I", 1);
  map.set("V", 5);
  map.set("X", 10);
  map.set("L", 50);
  map.set("C", 100);
  map.set("D", 500);
  map.set("M", 1000);

  let ans = 0;
  const len = s.length;
  for (let i = 0; i < len; i++) {
    const value = map.get(s[i]);
    if (i < len - 1 && map.get(s[i]) < map.get(s[i + 1])) {
      ans -= value;
    } else {
      ans += value;
    }
  }
  return ans;
};
```

## 最长公共前缀

编写一个函数来查找字符串数组中的最长公共前缀。

如果不存在公共前缀，返回空字符串 ""。

示例 1：

输入：strs = ["flower","flow","flight"]
输出："fl"

示例 2：
输入：strs = ["dog","racecar","car"]
输出：""
解释：输入不存在公共前缀。

提示：

0 <= strs.length <= 200
0 <= strs[i].length <= 200
strs[i] 仅由小写英文字母组成

```js
var longestCommonPrefix = function(strs) {
  if (strs.length === 0) return "";
  let str = strs[0];
  for (let i = 1; i < strs.length; i++) {
    while (strs[i].indexOf(str) != 0) {
      str = str.slice(0, str.length - 1);
    }
  }
  return str;
};

var longestCommonPrefix = function(strs) {
  if (strs.length === 1) {
    return strs[0];
  }
  let curStr = "",
    nextStr = "",
    str = strs[0];
  for (let i = 0; i < strs[0].length; i++) {
    const el = strs[0].slice(0, i + 1);
    for (let j = 1; j < strs.length; j++) {
      const exp = new RegExp(`^${el}`);
      if (exp.test(strs[j])) {
        curStr = el;
      } else {
        return strs[0].slice(0, i);
      }
    }
  }
  return curStr;
};
```

## 合并两个有序链表

将两个升序链表合并为一个新的 升序 链表并返回。新链表是通过拼接给定的两个链表的所有节点组成的。

示例 1：
![prototype](/assets/algorithm/merge_ex1.jpg)
输入：l1 = [1,2,4], l2 = [1,3,4]
输出：[1,1,2,3,4,4]

示例 2：
输入：l1 = [], l2 = []
输出：[]

示例 3：
输入：l1 = [], l2 = [0]
输出：[0]

提示：

两个链表的节点数目范围是 [0, 50]
-100 <= Node.val <= 100
l1 和 l2 均按 非递减顺序 排列

```js
/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * @param {ListNode} l1
 * @param {ListNode} l2
 * @return {ListNode}
 */
var mergeTwoLists = function(l1, l2) {
  const rest = (newList = new ListNode(null));
  while (l1 && l2) {
    if (l1.val >= l2.val) {
      newList.next = l2;
      l2 = l2.next;
    } else {
      newList.next = l1;
      l1 = l1.next;
    }
    newList = newList.next;
  }
  newList.next = l1 || l2;
  return rest.next;
};
```

## 实现 strStr()

实现 strStr() 函数。

给你两个字符串 haystack 和 needle ，请你在 haystack 字符串中找出 needle 字符串出现的第一个位置（下标从 0 开始）。如果不存在，则返回 -1 。

示例 1：

输入：haystack = "hello", needle = "ll"
输出：2

示例 2：

输入：haystack = "aaaaa", needle = "bba"
输出：-1

示例 3：

输入：haystack = "", needle = ""
输出：0

提示：

0 <= haystack.length, needle.length <= 5 \* 104
haystack 和 needle 仅由小写英文字符组成

不用 KMP 算法时思路：

1. 遍历字符串看是否有和需要找的字符串第一个字母相同
2. 如果相同，就截取字符串跟需要找的字符串相同长度的字符串对比
3. 相同就返回下标，不同就继续遍历原字符串

```js
/**
 * @param {string} haystack
 * @param {string} needle
 * @return {number}
 */
var strStr = function(haystack, needle) {
  const len = needle.length;
  if (!len) return 0;
  for (let i = 0; i + len <= haystack.length; i++) {
    const splitStr = haystack.slice(i, len + i);
    if (splitStr === needle) {
      return i;
    }
  }
  return -1;
};
```

## 杨辉三角

![prototype](/assets/algorithm/PascalTriangleAnimated2.gif)

输入: 5
输出:
[
[1],
[1,1],
[1,2,1],
[1,3,3,1],
[1,4,6,4,1]
]

思路：

- 看到上图可以发现，生成杨辉三角 numRows 行，数组就有 numRows 行
- 每一行，它的数组第一个位置和最后一个位置都是 1
- 每一行，除了第一个和最后一个位置，其它位置的值等于上一行的两个值相加

```js
var generate = function(numRows) {
  if (numRows === 0) {
    return [];
  }
  const result = Array.from(new Array(numRows), () => []);
  for (let i = 0; i < numRows; i++) {
    result[i][0] = 1;
    result[i][i] = 1;
    for (let j = 1; j < i; j++) {
      result[i][j] = result[i - 1][j - 1] + result[i - 1][j];
    }
  }
  return result;
};
```
