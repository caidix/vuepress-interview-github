# leetcode 题记

## 1. [删除排序数组中的重复项](https://leetcode-cn.com/problems/remove-duplicates-from-sorted-array/)
给定一个排序数组，你需要在 原地 删除重复出现的元素，使得每个元素只出现一次，返回移除后数组的新长度。

不要使用额外的数组空间，你必须在 原地 修改输入数组 并在使用 O(1) 额外空间的条件下完成。

示例 1:

给定数组 nums = [1,1,2],

函数应该返回新的长度 2, 并且原数组 nums 的前两个元素被修改为 1, 2。

你不需要考虑数组中超出新长度后面的元素。
示例 2:

给定 nums = [0,0,1,1,1,2,2,3,3,4],

函数应该返回新的长度 5, 并且原数组 nums 的前五个元素被修改为 0, 1, 2, 3, 4。

你不需要考虑数组中超出新长度后面的元素。

快慢指针-此题告诉我们，在需求中若是遇到删除已排序同类相的，并不需要一直对原数组做删除操作，这样是及其不明智的， 转而使用修改变量及快慢指针的方式去操作数组。

```javascript
/**
 * @param {number[]} nums
 * @return {number}
 */
var removeDuplicates = function(nums) {
  if (nums.length < 2) {
    return nums.length;
  }
  let left = 0;
  let right = 1;
  while (right < nums.length) {
    if (nums[left] !== nums[right]) {
      left++;
      nums[left] = nums[right];
    }
    right++;
  }
  return left + 1;
};
```

## 2. [旋转数组](https://leetcode-cn.com/problems/rotate-array/)

给定一个数组，将数组中的元素向右移动  k  个位置，其中  k  是非负数。

示例 1:

输入: [1,2,3,4,5,6,7] 和 k = 3
输出: [5,6,7,1,2,3,4]
解释:
向右旋转 1 步: [7,1,2,3,4,5,6]
向右旋转 2 步: [6,7,1,2,3,4,5]
向右旋转 3 步: [5,6,7,1,2,3,4]
示例  2:

输入: [-1,-100,3,99] 和 k = 2
输出: [3,99,-1,-100]
解释:
向右旋转 1 步: [99,-1,-100,3]
向右旋转 2 步: [3,99,-1,-100]
说明:

尽可能想出更多的解决方案，至少有三种不同的方法可以解决这个问题。
要求使用空间复杂度为  O(1) 的   原地   算法。

```javascript
/**
 * @param {number[]} nums
 * @param {number} k
 * @return {void} Do not return anything, modify nums in-place instead.
 */
var rotate = function(nums, k) {
  nums.splice(0, 0, ...nums.splice(nums.length - k));
};
var rotate = function(nums, k) {
  nums.unshift(...nums.splice(nums.length - k));
};
```

官方环状替换解法
该解法的思路是：一个数组[1,2,3,4,5,6,7] 及一个右移数字3, 严格意义来说就是将每一个元素都向右移动到第三格，最右边的三个元素到数组的首位。从头开始将每一个元素移动到其相应的位置，例如此时的 1 右移三格，将在现在4的位置，这个时候将1赋值到这里，并在这之前开辟内存保存4这个数字，这个时候数字4也是一个没有存在于数组的数，他也需要找到属于他的位置，这个时候以4的位置为指针的起点继续往后移动三格，到达7的位置，将4赋值到7的位置上，并将7取出保存。这时候7是不是也该找到他之后的位置？ 继续进行以上的操作，因为每个元素都需要移动1次，所以定义一个计数器，当计数器等于数组长度时，即换位完成

```javascript
var rotate = function(nums, k) {
  let n = nums.length;
  // 定义一个计数器，因为每个元素都需要移动1次，所以当计数器等于数组长度时，即换位完成
  let count = 0;
  for (let i = 0; count < n; i++) {
    // 定义当前指针指向开头
    let currentIndex = i;
    // 获取当前指针的数据
    let pre = nums[i];
    // 对移动位数取模，直接往后加会数组越界
    k = k % n;
    // 这里需要先执行再判断
    do {
      // 获取当前pre需要移去的位置,同样需要取模防止越界
      // 这里的目的是为了完成单双轮次的移动
      let nextIndex = (currentIndex + k) % n;
      // 缓存需要被换位置也就是当前nextIndex的数据,因为他的位置等下
      // 要被他前面的兄弟也就是pre占了，把它缓存起来等下去占他后面兄弟的
      // 位置依次类推
      let temp = nums[nextIndex];
      console.log(
        "currentIndex:" +
          currentIndex +
          ",nextIndex:" +
          nextIndex +
          ",temp:" +
          temp +
          ",pre:" +
          pre
      );
      // pre要来占next的位置了
      nums[nextIndex] = pre;
      // 将被占位的老哥赋值给pre，用来去占下一个老哥的位置
      pre = temp;
      // 同时当前索引指向了之前next索引所在的位置
      currentIndex = nextIndex;
      // 每执行一次换位操作count++
      count++;
      // 当再次currentIndex = i注意是再次，说明已经换过一轮了
      // 再按当前i去置换只会重复之前的换位，所以结束这一轮换位开始下一轮换位
    } while (currentIndex != i);
  }
};
```
## 3. [买卖股票的最佳时机 II](https://leetcode-cn.com/problems/best-time-to-buy-and-sell-stock-ii/)

给定一个数组，它的第 i 个元素是一支给定股票第 i 天的价格。

设计一个算法来计算你所能获取的最大利润。你可以尽可能地完成更多的交易（多次买卖一支股票）。

注意：你不能同时参与多笔交易（你必须在再次购买前出售掉之前的股票）。

示例 1:

输入: [7,1,5,3,6,4]
输出: 7
解释: 在第 2 天（股票价格 = 1）的时候买入，在第 3 天（股票价格 = 5）的时候卖出, 这笔交易所能获得利润 = 5-1 = 4 。
     随后，在第 4 天（股票价格 = 3）的时候买入，在第 5 天（股票价格 = 6）的时候卖出, 这笔交易所能获得利润 = 6-3 = 3 。
示例 2:

输入: [1,2,3,4,5]
输出: 4
解释: 在第 1 天（股票价格 = 1）的时候买入，在第 5 天 （股票价格 = 5）的时候卖出, 这笔交易所能获得利润 = 5-1 = 4 。
     注意你不能在第 1 天和第 2 天接连购买股票，之后再将它们卖出。
     因为这样属于同时参与了多笔交易，你必须在再次购买前出售掉之前的股票。
示例 3:

输入: [7,6,4,3,1]
输出: 0
解释: 在这种情况下, 没有交易完成, 所以最大利润为 0。

峰谷法 快慢指针
```javascript
/**
 * @param {number[]} prices
 * @return {number}
 */
var maxProfit = function (prices) {
  let left = 0;
  let right = 1;
  let total = 0;
  while (right < prices.length) {
    if (prices[left] > prices[right]) {
      left++;
      right++;
    } else if (prices[right] < prices[right + 1]) {
      right++;
    } else {
      total = total + (prices[right] - prices[left])
      left = right + 1;
      right += 2;
    }
  }
  return total
};

```

贪心算法（如果买卖不需要手续费的时候）
```javascript
/**
 * @param {number[]} prices
 * @return {number}
 */
var maxProfit = function(prices) {
    let t = 0 ;
    let total = 0;
    let difference;
    while(t<prices.length-1) {
        difference = prices[t + 1] -prices[t]
        if (difference > 0) {
            total+=difference;
        }
        t++
    }
    return total
};

```

## 3. [ 存在重复元素]()
给定一个整数数组，判断是否存在重复元素。

如果任意一值在数组中出现至少两次，函数返回 true 。如果数组中每个元素都不相同，则返回 false 。

 

示例 1:

输入: [1,2,3,1]
输出: true
示例 2:

输入: [1,2,3,4]
输出: false
示例 3:

输入: [1,1,1,3,3,4,3,2,4,2]
输出: true

解题方案：循环不变式, 线性查找，排序和哈希表。

1. 从后遍历 对每个元素使用indexof再次遍历查找。时间复杂度高，执行用时很长
时间复杂度 : O(n^2).最坏的情况下需要检查n(n+1)/2对整数
空间复杂度 : O(1)。只使用了常数额外空间。
```javascript
/**
 * @param {number[]} nums
 * @return {boolean}
 */
var containsDuplicate = function(nums) {
    for(let i = nums.length-1; i> 0;i--) {
        if (nums.indexOf(nums[i]) !== i) {
            return true;
        }
    }
    return false
};
```

2. 使用JSON存储数组内的元素，若JSON内存在相同元素则返回。
时间复杂度 : O(n)。JSON的查找 和 添加 各自使用 n 次，每个操作耗费常数时间。
空间复杂度 : O(n)。哈希表占用的空间与元素数量是线性关系。
```javascript
/**
 * @param {number[]} nums
 * @return {boolean}
 */
var containsDuplicate = function(nums) {
    let obj = {}
    for(let i = 0 ; i< nums.length;i++) {
        if (obj[nums[i]]){return true}
        obj[nums[i]] = true;
    }
    return false
};
```

3. 排序
因为做了排序 修改了传入值的内容，时间复杂度高。最坏的环境下所有的元素都会改变位置。
```javascript
var containsDuplicate = function(nums) {
    nums.sort((a,b)=>a-b);
    for(let i = 1,len = nums.length;i<len;i++){
        if(nums[i-1] == nums[i]){
            return true;
        }
    }
    return false;
};
```

4. set去重比对
```javascript
var containsDuplicate = function(nums) {
    return new Set(nums).size != nums.length;
};
```

## 4. [移动零]
给定一个数组 nums，编写一个函数将所有 0 移动到数组的末尾，同时保持非零元素的相对顺序。

示例:

输入: [0,1,0,3,12]
输出: [1,3,12,0,0]
说明:

必须在原数组上操作，不能拷贝额外的数组。
尽量减少操作次数。