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

## 买卖股票的最佳时机

给定一个数组 prices ，它的第 i 个元素 prices[i] 表示一支给定股票第 i 天的价格。

你只能选择 某一天 买入这只股票，并选择在 未来的某一个不同的日子 卖出该股票。设计一个算法来计算你所能获取的最大利润。

返回你可以从这笔交易中获取的最大利润。如果你不能获取任何利润，返回 0 。

示例 1：

输入：[7,1,5,3,6,4]
输出：5
解释：在第 2 天（股票价格 = 1）的时候买入，在第 5 天（股票价格 = 6）的时候卖出，最大利润 = 6-1 = 5 。
注意利润不能是 7-1 = 6, 因为卖出价格需要大于买入价格；同时，你不能在买入前卖出股票。
示例 2：

输入：prices = [7,6,4,3,1]
输出：0
解释：在这种情况下, 没有交易完成, 所以最大利润为 0。

提示：

1 <= prices.length <= 105
0 <= prices[i] <= 104

> 只要今天比昨天低，就可以用今天的减去最小值，就是利润，然后每次都比较这个利润是不是最大就行了

```js
/**
 * @param {number[]} prices
 * @return {number}
 */
var maxProfit = function(prices) {
  let min = prices[0];
  let max = 0;
  for (let i = 1; i < prices.length; i++) {
    if (prices[i] < min) {
      min = prices[i];
    }
    if (min < prices[i]) {
      max = Math.max(max, prices[i] - min);
    }
  }
  return max;
};
```

## 买卖股票的最佳时机 II

给定一个数组 prices ，其中  prices[i] 是一支给定股票第 i 天的价格。

设计一个算法来计算你所能获取的最大利润。你可以尽可能地完成更多的交易（多次买卖一支股票）。

注意：你不能同时参与多笔交易（你必须在再次购买前出售掉之前的股票）。

示例 1:

输入: prices = [7,1,5,3,6,4]
输出: 7
解释: 在第 2 天（股票价格 = 1）的时候买入，在第 3 天（股票价格 = 5）的时候卖出, 这笔交易所能获得利润 = 5-1 = 4 。
  随后，在第 4 天（股票价格 = 3）的时候买入，在第 5 天（股票价格 = 6）的时候卖出, 这笔交易所能获得利润 = 6-3 = 3 。

示例 2:

输入: prices = [1,2,3,4,5]
输出: 4
解释: 在第 1 天（股票价格 = 1）的时候买入，在第 5 天 （股票价格 = 5）的时候卖出, 这笔交易所能获得利润 = 5-1 = 4 。
  注意你不能在第 1 天和第 2 天接连购买股票，之后再将它们卖出。因为这样属于同时参与了多笔交易，你必须在再次购买前出售掉之前的股票。

提示：

1 <= prices.length <= 3 \* 104
0 <= prices[i] <= 104

```js
/**
 * @param {number[]} prices
 * @return {number}
 */
// 无脑把前一个数小于后面某个数的差值加起来就行
var maxProfit = function(prices) {
  let total = 0,
    min = prices[0];
  for (let i = 1; i < prices.length; i++) {
    if (prices[i] > min) {
      total += prices[i] - min;
    }
    min = prices[i];
  }
  return total;
};

// 差值法 只要今天减去昨天，是正数就是利润
var maxProfit = function(prices) {
  let result = 0;
  for (let i = 1; i < prices.length; i++) {
    if (prices[i] > prices[i - 1]) {
      result += prices[i] - prices[i - 1];
    }
  }
  return result;
};
```

## 反转链表

给你单链表的头节点 head ，请你反转链表，并返回反转后的链表
![反转链表](https://assets.leetcode.com/uploads/2021/02/19/rev1ex1.jpg)

输入：head = [1,2,3,4,5]
输出：[5,4,3,2,1]

> 关键点在于把链表前面加一个 null，这样翻转前和翻转后就一致了。
> ![prototype](/assets/algorithm/fzlb1.png)

```js
/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * @param {ListNode} head
 * @return {ListNode}
 */

var reverseList = function(head) {
  let [pre, node] = [null, head];
  while (node) {
    const temp = node.next;
    node.next = pre;
    pre = node;
    node = temp;
  }
  return pre;
};
```

## 删除有序数组中的重复项

给你一个有序数组 nums ，请你 原地 删除重复出现的元素，使每个元素 只出现一次 ，返回删除后数组的新长度。

不要使用额外的数组空间，你必须在 原地 修改输入数组 并在使用 O(1) 额外空间的条件下完成。

说明:

为什么返回数值是整数，但输出的答案是数组呢?

请注意，输入数组是以「引用」方式传递的，这意味着在函数里修改输入数组对于调用者是可见的。

你可以想象内部操作如下:

// nums 是以“引用”方式传递的。也就是说，不对实参做任何拷贝
int len = removeDuplicates(nums);

// 在函数里修改输入数组对于调用者是可见的。
// 根据你的函数返回的长度, 它会打印出数组中 该长度范围内 的所有元素。
for (int i = 0; i < len; i++) {
    print(nums[i]);
}

示例 1：

输入：nums = [1,1,2]
输出：2, nums = [1,2]
解释：函数应该返回新的长度 2 ，并且原数组 nums 的前两个元素被修改为 1, 2 。不需要考虑数组中超出新长度后面的元素。
示例 2：

输入：nums = [0,0,1,1,1,2,2,3,3,4]
输出：5, nums = [0,1,2,3,4]
解释：函数应该返回新的长度 5 ， 并且原数组 nums 的前五个元素被修改为 0, 1, 2, 3, 4 。不需要考虑数组中超出新长度后面的元素。

提示：

0 <= nums.length <= 3 \* 104
-104 <= nums[i] <= 104
nums 已按升序排列

> 双指针 之 快慢指针

```js
/**
 * @param {number[]} nums
 * @return {number}
 */
var removeDuplicates = function(nums) {
  let sum = 0,
    l = 0;
  for (let r = 1; r < nums.length; r++) {
    if (nums[l] !== nums[r]) {
      nums[l + 1] = nums[r];
      l++;
    }
  }
  return l + 1;
};
```

## 合并两个有序数组

给你两个有序整数数组 nums1 和 nums2，请你将 nums2 合并到 nums1 中，使 nums1 成为一个有序数组。

初始化 nums1 和 nums2 的元素数量分别为 m 和 n 。你可以假设 nums1 的空间大小等于 m + n，这样它就有足够的空间保存来自 nums2 的元素。

示例 1：

输入：nums1 = [1,2,3,0,0,0], m = 3, nums2 = [2,5,6], n = 3
输出：[1,2,2,3,5,6]
示例 2：

输入：nums1 = [1], m = 1, nums2 = [], n = 0
输出：[1]

提示：

nums1.length == m + n
nums2.length == n
0 <= m, n <= 200
1 <= m + n <= 200
-109 <= nums1[i], nums2[i] <= 109

> 因为是有序数组，第一个数组还有正好满足假如第二数组的空间，所以这里可以采取双指针来解答，从后往前遍历

```js
// 直接排序push到新数组的方法
var merge = function(nums1, m, nums2, n) {
  const newArr = [];
  let s1 = (s2 = 0);
  while (s1 < m || s2 < n) {
    if (s1 >= m) {
      newArr.push(nums2[s2++]);
    } else if (s2 >= n) {
      newArr.push(nums1[s1++]);
    } else if (nums1[s1] > nums2[s2]) {
      newArr.push(nums2[s2++]);
    } else {
      newArr.push(nums1[s1++]);
    }
  }
  console.log(newArr);
  return newArr;
};

// 快慢指针从后面进入，我们知道第一个数组已经留好了空位
var merge = function(nums1, m, nums2, n) {
  let total = m + n - 1;
  m--;
  n--;
  while (m >= 0 || n >= 0) {
    if (m === -1) {
      nums1[total] = nums2[n--];
    } else if (n === -1) {
      nums1[total] = nums1[m--];
    } else if (nums1[m] > nums2[n]) {
      nums1[total] = nums1[m--];
    } else {
      nums1[total] = nums2[n--];
    }
    total--;
  }
  return nums1;
};
// 优化下判断
var merge = function(nums1, m, nums2, n) {
  let total = m + n - 1;
  m--;
  n--;
  while (m >= 0 || n >= 0) {
    if (m === -1 || nums1[m] <= nums2[n]) {
      nums1[total] = nums2[n--];
    } else {
      nums1[total] = nums1[m--];
    }
    total--;
  }
  return nums1;
};
```

## 验证回文串

给定一个字符串，验证它是否是回文串，只考虑字母和数字字符，可以忽略字母的大小写。

说明：本题中，我们将空字符串定义为有效的回文串。

示例 1:

输入: "A man, a plan, a canal: Panama"
输出: true
解释："amanaplanacanalpanama" 是回文串
示例 2:

输入: "race a car"
输出: false
解释："raceacar" 不是回文串

> 用双指针头尾向中间靠拢

```js
var isPalindrome = function(s) {
  s = s.replace(/[^A-Za-z0-9]/g, "").toLowerCase();
  let l = 0,
    r = s.length - 1;
  while (l <= r) {
    if (s[l] === s[r]) {
      l++;
      r--;
    } else {
      return false;
    }
  }
  return true;
};
```

## 回文链表

请判断一个链表是否为回文链表。

示例 1:

输入: 1->2
输出: false
示例 2:

输入: 1->2->2->1
输出: true

思路 1 ： 把值全部放进数组里然后头尾指针遍历

思路 2：
先用快慢指针的手法，让我们知道这个链表的中点是哪，然后从中点截断
然后截断成为两个链表，把后面的链表翻转
最后依次去判断这两个链表每一项是否相同

```js
/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * @param {ListNode} head
 * @return {boolean}
 */
var isPalindrome = function(head) {
  let l = head,
    r = head,
    prev;
  while (r && r.next) {
    l = l.next;
    r = r.next.next;
  }
  // 1 2 3 4
  let next = null;
  while (l) {
    const pre = l.next;
    l.next = next;
    next = l;
    l = pre;
  }
  console.log(next, head, l);
  while (next && head) {
    if (next.val !== head.val) {
      return false;
    }
    next = next.next;
    head = head.next;
  }
  return true;
};
```

## 移动零

题目如下：给定一个数组 nums，编写一个函数将所有 0 移动到数组的末尾，同时保持非零元素的相对顺序。

示例:

输入: [0,1,0,3,12]
输出: [1,3,12,0,0]
说明:

必须在原数组上操作，不能拷贝额外的数组。
尽量减少操作次数。

> 快慢指针 将非 0 的位置和 0 的位置不断置换

```js
var moveZeroes = function(nums) {
  let i = (j = 0);
  while (i < nums.length) {
    if (nums[i] !== 0) {
      [nums[i], nums[j]] = [nums[j], nums[i]];
      j++;
    }
    i++;
  }

  return nums;
};
```

## 反转字符串

编写一个函数，其作用是将输入的字符串反转过来。输入字符串以字符数组 char[] 的形式给出。

不要给另外的数组分配额外的空间，你必须原地修改输入数组、使用 O(1) 的额外空间解决这一问题。

你可以假设数组中的所有字符都是 ASCII 码表中的可打印字符。

示例 1：

输入：["h","e","l","l","o"]
输出：["o","l","l","e","h"]
示例 2：

输入：["H","a","n","n","a","h"]
输出：["h","a","n","n","a","H"]

```js
var reverseString = function(s) {
  let l = 0;
  let r = s.length - 1;
  while (l < r) {
    [s[l], s[r]] = [s[r], s[l]];
    l++;
    r--;
  }
  return s;
};
```

## 两个数组的交集 II

示例 1：

输入：nums1 = [1,2,2,1], nums2 = [2,2]
输出：[2,2]
示例 2:

输入：nums1 = [4,9,5], nums2 = [9,4,9,8,4]
输出：[4,9]

说明：

输出结果中每个元素出现的次数，应与元素在两个数组中出现次数的最小值一致。
我们可以不考虑输出结果的顺序。
进阶：

如果给定的数组已经排好序呢？你将如何优化你的算法？
如果  nums1  的大小比  nums2  小很多，哪种方法更优？
如果  nums2  的元素存储在磁盘上，内存是有限的，并且你不能一次加载所有的元素到内存中，你该怎么办？

> 先排序后去比对

```js
const sort = (nums) => {
  if (nums.length <= 1) return nums;
  let i = 0;
  while (i < nums.length) {
    let j = 0;
    while (j < i) {
      if (nums[i] < nums[j]) [nums[i], nums[j]] = [nums[j], nums[i]];
      j++;
    }
    i++;
  }
  return nums;
};
var intersect = function(nums1, nums2) {
  let n1 = (n2 = 0);
  const num1 = sort(nums1);
  const num2 = sort(nums2);
  const arr = [];
  while (n1 < num1.length && n2 < num2.length) {
    if (num1[n1] === num2[n2]) {
      arr.push(num1[n1]);
      n1++;
      n2++;
    } else if (num1[n1] > num2[n2]) {
      n2++;
    } else {
      n1++;
    }
  }
  console.log(num1, num2, arr);
  return arr;
};
```

**二叉树（DFS）**题目

首先我们要学会二叉树的前序遍历，中序遍历以及后序遍历

## 前序遍历

> （按照访问根节点——左子树——右子树的方式遍历这棵树）

![prototype](/assets/algorithm/640.webp)

深度优先遍历，先遍历左子树，再遍历右子树

```js
// 迭代 出入栈
var preorderTraversal = function(root) {
  let stack = [];
  let arr = [];
  while (root || stack.length) {
    while (root) {
      stack.push(root);
      arr.push(root.val);
      root = root.left;
    }
    root = stack.pop();
    root = root.right;
  }
  return arr;
};

// 递归
var preorderTraversal = function(root) {
  let arr = [];
  if (root) {
    arr.push(root.val);
  } else {
    return arr;
  }
  if (root.left) {
    arr = arr.concat(preorderTraversal(root.left));
  }
  if (root.right) {
    arr = arr.concat(preorderTraversal(root.right));
  }
  return arr;
};
```

## 中序遍历

> （按照访问左子树——根节点——右子树的方式遍历这棵树）

![prototype](/assets/algorithm/641.webp)

中序遍历在递归上就是简单把顺序改一下

```js
// 栈
var inorderTraversal = function(root) {
  const stack = [],
    arr = [];
  while (stack.length || root) {
    while (root) {
      stack.push(root);
      root = root.left;
    }
    root = stack.pop();
    arr.push(root.val);
    root = root.right;
  }
  return arr;
};
// 递归
var inorderTraversal = function(root) {
  const res = [];
  const loop = (root) => {
    if (!root) return;
    loop(root.left);
    res.push(root.val);
    loop(root.right);
  };
  loop(root);
  return res;
};
```

## 后序遍历

> （按照访问左子树——右子树——根节点的方式遍历这棵树）

![prototype](/assets/algorithm/642.webp)

栈的方法就和原来不一样了，需要从右边开始入栈，并且结果数组内的值需要从前开始插入，这样才能使得最顶端的根节点的值排在最后

```js
// 栈

// 递归。同样是换一个位置
var postorderTraversal = function(root) {
  const res = [];
  const loop = (root) => {
    if (!root) return;
    loop(root.left);
    loop(root.right);
    res.push(root.val);
  };
  loop(root);
  return res;
};
```

## 对称二叉树

给定一个二叉树，检查它是否是镜像对称的。

例如，二叉树  [1,2,2,3,4,4,3] 是对称的。

```js
   1
  /  \
  2   2
 / \ / \
3  4 4  3
```

但是下面这个  [1,2,2,null,3,null,3] 则不是镜像对称的:

```js
  1
 / \
2   2
 \   \
  3   3
```

```js
/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */
/**
 * @param {TreeNode} root
 * @return {boolean}
 */
var isSymmetric = function(root) {
  if (!root) return root;
  const isSame = (leftNode, rightNode) => {
    if (leftNode === null && rightNode === null) return true;
    if (leftNode === null || rightNode === null) return false;
    return (
      leftNode.val === rightNode.val &&
      isSame(leftNode.left, rightNode.right) &&
      isSame(leftNode.right, rightNode.left)
    );
  };
  return isSame(root.left, root.right);
};
```

## 二叉树的最大深度

给定一个二叉树，找出其最大深度。

二叉树的深度为根节点到最远叶子节点的最长路径上的节点数。

说明:  叶子节点是指没有子节点的节点。

示例：
给定二叉树 [3,9,20,null,null,15,7]，

```js
   3
  / \
  9  20
    /  \
   15   7
```

返回它的最大深度 3 。

> 只要遍历到这个节点既没有左子树，又没有右子树的时候
> 说明就到底部了，这个时候如果之前记录了深度，就可以比较是否比之前记录的深度大，大就更新深度
> 然后以此类推，一直比较到深度最大的

```js
/**
 * @param {TreeNode} root
 * @return {number}
 */
var maxDepth = function(root) {
  if (!root) return root;
  let maxDeep = 0;
  const loopDeep = (root, deep) => {
    if (!root.left && !root.right) {
      maxDeep = Math.max(deep, maxDeep);
    }
    if (root.left) {
      loopDeep(root.left, deep + 1);
    }
    if (root.right) {
      loopDeep(root.right, deep + 1);
    }
  };
  loopDeep(root, 1);
  return maxDeep;
};
```

## 将有序数组转化为二叉搜索树

给你一个整数数组 nums ，其中元素已经按 升序 排列，请你将其转换为一棵 高度平衡 二叉搜索树。

高度平衡 二叉树是一棵满足「每个节点的左右两个子树的高度差的绝对值不超过 1 」的二叉树。

![prototype](https://assets.leetcode.com/uploads/2021/02/18/btree1.jpg)

输入：nums = [-10,-3,0,5,9]
输出：[0,-3,9,-10,null,5]
解释：[0,-10,5,null,-3,null,9] 也将被视为正确答案：
![prototype](https://assets.leetcode.com/uploads/2021/02/18/btree2.jpg)

输入：nums = [1,3]
输出：[3,1]
解释：[1,3] 和 [3,1] 都是高度平衡二叉搜索树。
![prototype](https://assets.leetcode.com/uploads/2021/02/18/btree.jpg)

- 构建一颗树包括：构建 root、构建 root.left 和 root.right
- 题目要求"高度平衡" — 构建 root 时候，选择数组的中间元素作为 root 节点值，即可保持平衡。
- 递归函数可以传递数组，也可以传递指针，选择传递指针的时候：l r 分别代表参与构建 BST 的数组的首尾索引。

> 中序遍历(一种方法，三种策略)，总是选择中间位置左边的数字作为根节点

```js
var sortedArrayToBST = function(nums) {
  return toBST(nums, 0, nums.length - 1);
};

const toBST = function(nums, l, r) {
  if (l > r) {
    return null;
  }
  const mid = (l + r) >> 1;
  //(l + r + 1)  中序遍历，总是选择中间位置右边的数字作为根节点
  // Math.floor(Math.random() * 2 ) 中序遍历，选择任意一个中间位置数字作为根节点
  const root = new TreeNode(nums[mid]);
  root.left = toBST(nums, l, mid - 1);
  root.right = toBST(nums, mid + 1, r);

  return root;
};
```

## 有效的括号

这是一道很典型的用栈解决的问题， 给定一个只包括 '('，')'，'{'，'}'，'['，']' 的字符串 s ，判断字符串是否有效。

有效字符串需满足：

左括号必须用相同类型的右括号闭合。左括号必须以正确的顺序闭合。

示例 1：

输入：s = "()"
输出：true
示例 2：

输入：s = "()[]{}"
输出：true
示例 3：

输入：s = "(]"
输出：false
示例 4：

输入：s = "([)]"
输出：false

右括号前面，必须是相对应的左括号，才能抵消！
右括号前面，不是对应的左括号，那么该字符串，一定不是有效的括号！
也就是说左括号我们直接放入栈中即可，发现是右括号就要对比是否跟栈顶元素相匹配，不匹配就返回 false

```js
var isValid = function(s) {
  if (s.length <= 1) return false;
  const stack = [];
  const hash = {
    "(": ")",
    "{": "}",
    "[": "]",
  };
  let i = 0;
  while (i < s.length) {
    if (hash[s[i]]) {
      stack.push(s[i]);
    } else if (stack.length && hash[stack[stack.length - 1]] === s[i]) {
      stack.pop();
    } else {
      return false;
    }
    i++;
  }
  if (stack.length) return false;
  return true;
};
// 相同的方法
var isValid = function(s) {
  const stask = [];
  const enums = {
    "}": "{",
    "]": "[",
    ")": "(",
  };
  let i = 0;
  while (i < s.length) {
    stask.push(s[i]);

    let len = stask.length;
    if (len < 2) {
      i++;
      continue;
    }
    const el1 = stask[len - 1];
    const el2 = stask[len - 2];
    if (enums[el1] === el2) {
      stask.pop();
      stask.pop();
    }
    i++;
  }
  return stask.length === 0;
};
```

## 最小栈

设计一个支持 push ，pop ，top 操作，并能在常数时间内检索到最小元素的栈。

push(x) —— 将元素 x 推入栈中。
pop() —— 删除栈顶的元素。
top() —— 获取栈顶元素。
getMin() —— 检索栈中的最小元素。

示例:

输入：
["MinStack","push","push","push","getMin","pop","top","getMin"][],[-2],[0],[-3],[],[],[],[]]

输出：
[null,null,null,null,-3,null,0,-2]

解释：
MinStack minStack = new MinStack();
minStack.push(-2);
minStack.push(0);
minStack.push(-3);
minStack.getMin(); --> 返回 -3.
minStack.pop();
minStack.top(); --> 返回 0.
minStack.getMin(); --> 返回 -2.

> 思路：用一个辅助栈来记录最小值，让其在每一刻时的入参都为最小值

```js
/**
 * initialize your data structure here.
 */
var MinStack = function() {
  this.stack = [];
  this.minStack = [];
};

/**
 * @param {number} val
 * @return {void}
 */
MinStack.prototype.push = function(val) {
  this.stack.push(val);
  if (
    this.minStack.length === 0 ||
    val < this.minStack[this.minStack.length - 1]
  ) {
    this.minStack.push(val);
  } else {
    this.minStack.push(this.minStack[this.minStack.length - 1]);
  }
};

/**
 * @return {void}
 */
MinStack.prototype.pop = function() {
  this.stack.pop();
  this.minStack.pop();
};

/**
 * @return {number}
 */
MinStack.prototype.top = function() {
  return this.stack[this.stack.length - 1];
};

/**
 * @return {number}
 */
MinStack.prototype.getMin = function() {
  return this.minStack[this.minStack.length - 1];
};

/**
 * Your MinStack object will be instantiated and called as such:
 * var obj = new MinStack()
 * obj.push(val)
 * obj.pop()
 * var param_3 = obj.top()
 * var param_4 = obj.getMin()
 */
```

**动态规划**算法

## 最大子序和

给定一个整数数组 nums ，找到一个具有最大和的连续子数组（子数组最少包含一个元素），返回其最大和。

示例 1：

输入：nums = [-2,1,-3,4,-1,2,1,-5,4]
输出：6
解释：连续子数组 [4,-1,2,1] 的和最大，为 6 。
示例 2：

输入：nums = [1]
输出：1
示例 3：

输入：nums = [0]
输出：0

> 思路：动态规划。我们动态转移方程中，dp 表示每一个 nums 下标的最大自序和，所以 dp[i]的意思为：包括下标 i 之前的最大连续子序列和为 dp[i]。
> dp[i]只有两个方向可以推出来：

1. 如果 dp[i - 1] < 0，也就是当前遍历到 nums 的 i，之前的最大子序和是负数，那么我们就没必要继续加它了，因为 dp[i] = dp[i - 1] + nums[i] 会比 nums[i]更小，所以此时还不如 dp[i] = nums[i]，就是目前遍历到 i 的最大子序和呢
2. 同理 dp[i - 1] > 0，说明 nums[i]值得去加 dp[i - 1]，此时可能会比 nums[i]更大

```js
/**
 * @param {number[]} nums
 * @return {number}
 */
var maxSubArray = function(nums) {
  let ads = 0,
    max = nums[0],
    arrs = [nums[0]];

  for (let i = 1; i < nums.length; i++) {
    const num = arrs[i - 1];
    if (num < 0) {
      arrs.push(nums[i]);
      arrs[i] = nums[i];
    } else {
      arrs[i] = num + nums[i];
    }
    max = Math.max(max, arrs[i]);
  }
  return max;
};

var maxSubArray = function(nums) {
  let pre = 0,
    maxAns = nums[0];
  nums.forEach((x) => {
    pre = Math.max(pre + x, x);
    maxAns = Math.max(maxAns, pre);
  });
  return maxAns;
};
```

## 爬楼梯

假设你正在爬楼梯。需要 n 阶你才能到达楼顶。

每次你可以爬 1 或 2 个台阶。你有多少种不同的方法可以爬到楼顶呢？

注意：给定 n 是一个正整数。

示例 1：

输入： 2
输出： 2
解释： 有两种方法可以爬到楼顶。

1.  1 阶 + 1 阶
2.  2 阶
    示例 2：

输入： 3
输出： 3
解释： 有三种方法可以爬到楼顶。

1.  1 阶 + 1 阶 + 1 阶
2.  1 阶 + 2 阶
3.  2 阶 + 1 阶

> 思路： 反过来看就是斐波那契数列。假如我要到第 10 层有 dp[10]种方法 ,那么我有可能是从第八层走也可能从第九层走，所以 dp[10] 的方法等于 dp[9]+dp[8]，从而可以算出动态规划方程为 dp[n] = dp[n-1] + dp[n-2]

```js
/**
 * @param {number} n
 * @return {number}
 */
var climbStairs = function(n) {
  let n1 = 1,
    n2 = 2;
  for (let i = 2; i <= n; i++) {
    [n2, n1] = [n2 + n1, n2];
  }
  return n1;
};
```

**数学问题**题目

## 加一

给定一个由 整数 组成的 非空 数组所表示的非负整数，在该数的基础上加一。

最高位数字存放在数组的首位， 数组中每个元素只存储单个数字。

你可以假设除了整数 0 之外，这个整数不会以零开头。

示例  1：

输入：digits = [1,2,3]
输出：[1,2,4]
解释：输入数组表示数字 123。
示例  2：

输入：digits = [4,3,2,1]
输出：[4,3,2,2]
解释：输入数组表示数字 4321。
示例 3：

输入：digits = [0]
输出：[1]

提示：

1 <= digits.length <= 100
0 <= digits[i] <= 9

> 思路： 简单粗暴法：直接判断最后一项是不是 9 是 9 就变成 0 然后循环倒数第 n-1 项是不是 9，不是的话就+1 结束，是的话继续循环即可。不断进位法：从后遍历所有的数然后取余等各种运算。

```js
var plusOne = function(digits) {
  let i = digits.length - 1;
  while (i > -1) {
    if (digits[i] == 9) {
      digits[i] = 0;
      if (i == 0) {
        digits.unshift(1);
        return digits;
      }
      i--;
    } else {
      digits[i] = digits[i] + 1;
      return digits;
    }
  }
  return digits;
};

var plusOne = function(digits) {
  let len = digits.length - 1,
    atd = 1,
    rest = 0;
  while (len >= 0) {
    const value = digits[len];
    const next = value + atd;
    atd = Math.floor(next / 10);
    const nvalue = next % 10;
    digits[len] = nvalue;
    len--;
  }
  if (atd === 1) {
    digits.unshift(atd);
  }
  console.log(rest);
  return digits;
};
```

## x 的平方根

实现 int sqrt(int x) 函数。

计算并返回 x 的平方根，其中 x 是非负整数。

由于返回类型是整数，结果只保留整数的部分，小数部分将被舍去。

示例 1:

输入: 4
输出: 2

示例 2:

输入: 8
输出: 2
说明: 8 的平方根是 2.82842...,
由于返回类型是整数，小数部分将被舍去。

这道题是典型的二分法解题，所以我们需要熟悉二分法的通用模板，我们出一个题：

在 [1, 2, 3, 4, 5, 6] 中找到 4，若存在则返回下标，不存在返回-1

```js
const arr = [1, 2, 3, 4, 5, 6];
function getIndex1(arr, key) {
  let low = 0;
  const high = arr.length - 1;
  while (low <= high) {
    const mid = Math.floor((low + high) / 2);
    if (key === arr[mid]) {
      return mid;
    }
    if (key > arr[mid]) {
      low = mid + 1;
    } else {
      height = mid - 1;
    }
  }
  return -1;
}
console.log(getIndex1(arr, 5)); // 4
```

所以这道题的意思就是，我们找一个数平方跟 x 最相近的数，二分法的用法中也有找相近数的功能

所以代码如下：

```js
var mySqrt = function(x) {
  let [l, r] = [0, x];
  let ans = -1;
  while (l <= r) {
    const mid = (l + r) >> 1;
    if (mid * mid > x) {
      r = mid - 1;
    } else if (mid * mid < x) {
      ans = mid; // 防止越界
      l = mid + 1;
    } else {
      ans = mid;
      return ans;
    }
  }
  return ans;
};
```
