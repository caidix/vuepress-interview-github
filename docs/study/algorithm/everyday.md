## 丑数系列

什么是丑数？

> 丑数就是只包含质因数 2, 3, 5 的正整数。0 和负整数一定不是丑数。
> 输入：不会超过 32 位有符号整数的范围: [−2^31, 2^31 − 1]。
> 对于任意一个丑数 x，其与任意的质因数（2、3、5）相乘，结果（2x、3x、5x）仍为丑数

### 263. 丑数(简单)

给你一个整数 n ，请你判断 n 是否为 丑数 。如果是，返回 true ；否则，返回 false 。

丑数 就是只包含质因数  2、3 和/或  5  的正整数。

示例 1：

输入：n = 6
输出：true
解释：6 = 2 × 3
示例 2：

输入：n = 8
输出：true
解释：8 = 2 × 2 × 2
示例 3：

输入：n = 14
输出：false
解释：14 不是丑数，因为它包含了另外一个质因数  7 。
示例 4：

输入：n = 1
输出：true
解释：1 通常被视为丑数。

> 思路： 为判断 nn 是否满足上述形式，可以对 nn 反复除以 2,3,5，直到 n 不再包含质因数 2,3,5。若剩下的数等于 1，则说明 n 不包含其他质因数，是丑数；否则，说明 n 包含其他质因数（除了自身和 1 不能被其他数整除的数），不是丑数。

```js
/**
 * @param {number} n
 * @return {boolean}
 */
var isUgly = function(n) {
  if (n <= 0) return false;
  [2, 3, 5].map(i=>
    while(n % i === 0) {
      n = n / i
    }
  );
  return n === 1
};
```

### 264. 丑数 II(中等)

给你一个整数 n ，请你找出并返回第 n 个 丑数 。

丑数 就是只包含质因数  2、3 和/或  5  的正整数。

示例 1：

输入：n = 10
输出：12
解释：[1, 2, 3, 4, 5, 6, 8, 9, 10, 12] 是由前 10 个丑数组成的序列。
示例 2：

输入：n = 1
输出：1
解释：1 通常被视为丑数。

提示：

1 <= n <= 1690

思路：

1. 优先序列(小根堆)

- 起始先将最小丑数 1 放入队列
- 每次从队列取出最小值 x，然后将 x 所对应的丑数 2x、3x 和 5x 进行入队。
- 对步骤 2 循环多次，第 n 次出队的值即是答案。

2. 多路归并（多指针）解法
   我们「往后产生的丑数」都是基于「已有丑数」而来（使用「已有丑数」乘上「质因数」2、3、5）。
   因此我们可以使用三个指针来指向目标序列 arr 的某个下标（下标 0 作为哨兵不使用，起始都为 1），使用 arr[下标] \* 质因数 arr[下标]∗ 质因数 代表当前使用到三个有序序列中的哪一位，同时使用 idx 表示当前生成到 arr 哪一位丑数。

```js
/**
 * @param {number} n
 * @return {number}
 */

// 优先序列
var nthUglyNumber = function(n) {
  const ints = [2, 3, 5];
  const sets = new Set();
  const arrs = [];
  sets.add(1);
  arrs.push(1);
  for (let i = 1; i <= n; i++) {
    const res = arrs.shift();
    if (i === n) return res;
    for (let j of ints) {
      const t = j * res;
      if (!sets.has(t)) {
        sets.add(t);
        arrs.push(t);
        arrs.sort((a, b) => {
          return a - b;
        });
      }
    }
  }
  return -1;
};

// 多路归并（多指针）解法
var nthUglyNumber = function(n) {
  const arr = new Array(n + 1);
  arr[1] = 1;
  const xx = [2, 3, 5];
  for (let i1 = 1, i2 = 1, i3 = 1, idx = 2; idx <= n; idx++) {
    const id1 = arr[i1] * 2;
    const id2 = arr[i2] * 3;
    const id3 = arr[i3] * 5;
    const minValue = Math.min(id1, id2, id3);
    id1 === minValue && i1++;
    id2 === minValue && i2++;
    id3 === minValue && i3++;
    arr[idx] = minValue;
  }
  return arr[arr.length - 1];
};
```

## 313. [超级丑数](https://leetcode-cn.com/problems/super-ugly-number/solution/chao-ji-chou-shu-by-leetcode-solution-uzff/)

超级丑数 是一个正整数，并满足其所有质因数都出现在质数数组 primes 中。

给你一个整数 n 和一个整数数组 primes ，返回第 n 个 超级丑数 。

题目数据保证第 n 个 超级丑数 在 32-bit 带符号整数范围内。

示例 1：

输入：n = 12, primes = [2,7,13,19]
输出：32
解释：给定长度为 4 的质数数组 primes = [2,7,13,19]，前 12 个超级丑数序列为：[1,2,4,7,8,13,14,16,19,26,28,32] 。
示例 2：

输入：n = 1, primes = [2,3,5]
输出：1
解释：1 不含质因数，因此它的所有质因数都在质数数组 primes = [2,3,5] 中。

提示：

1 <= n <= 106
1 <= primes.length <= 100
2 <= primes[i] <= 1000
题目数据 保证 primes[i] 是一个质数
primes 中的所有值都 互不相同 ，且按 递增顺序 排列

```js
// 动态规划
var nthSuperUglyNumber = function(n, primes) {
  const dp = new Array(n + 1).fill(0);
  dp[1] = 1;
  const m = primes.length;
  const pointers = new Array(m).fill(1);
  for (let i = 2; i <= n; i++) {
    const nums = new Array(m).fill(m);
    let minNum = Number.MAX_SAFE_INTEGER;
    for (let j = 0; j < m; j++) {
      nums[j] = dp[pointers[j]] * primes[j];
      minNum = Math.min(minNum, nums[j]);
    }
    dp[i] = minNum;
    for (let j = 0; j < m; j++) {
      if (minNum == nums[j]) {
        pointers[j]++;
      }
    }
  }
  return dp[n];
};
// 最小堆
var nthSuperUglyNumber = function(n, primes) {
  const sets = new Set();
  const arrs = [];
  arrs.push(1);
  sets.add(1);
  for (let i = 1; i <= n; i++) {
    const item = arrs.shift();
    if (i === n) return item;
    for (let j of primes) {
      if (!sets.has(j * item)) {
        sets.add(j * item);
        arrs.push(j * item);
        arrs.sort((a, b) => a - b);
      }
    }
  }
  return -1;
};
```

## 等差数列划分

如果一个数列 至少有三个元素 ，并且任意两个相邻元素之差相同，则称该数列为等差数列。

例如，[1,3,5,7,9]、[7,7,7,7] 和 [3,-1,-5,-9] 都是等差数列。
给你一个整数数组 nums ，返回数组 nums 中所有为等差数组的 子数组 个数。

子数组 是数组中的一个连续序列。

示例 1：

输入：nums = [1,2,3,4]
输出：3
解释：nums 中有三个子等差数组：[1, 2, 3]、[2, 3, 4] 和 [1,2,3,4] 自身。
示例 2：

输入：nums = [1]
输出：0

提示：

1 <= nums.length <= 5000
-1000 <= nums[i] <= 1000

思路：

- 动态规划：动态规划方程 - 上上次的差值和上次的差值相同的时候就会是等差数列，不断累加。

```js
// 动态规划
var numberOfArithmeticSlices = function(nums) {
  let sum = 0,
    l = 0;
  for (let i = 2; i < nums.length; i++) {
    if (nums[i - 2] - nums[i - 1] === nums[i - 1] - nums[i]) {
      l++;
    } else {
      l = 0;
    }
    sum += l;
  }
  return sum;
};

// 差值划分
var numberOfArithmeticSlices = function(nums) {
  if (nums.length <= 1) return 0;
  let ex = nums[0] - nums[1],
    t = 0,
    sum = 0;
  for (let i = 2; i < nums.length; i++) {
    if (nums[i - 1] - nums[i] === ex) {
      t++;
    } else {
      t = 0;
      ex = nums[i - 1] - nums[i];
    }
    sum += t;
  }
  return sum;
};
```
