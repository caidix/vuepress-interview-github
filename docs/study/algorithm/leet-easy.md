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
