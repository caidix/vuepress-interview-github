# 数组篇

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

2. 使用JSON存储数组内的元素，若JSON内存在相同元素则返回。用空间换时间
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

## 4. [移动零](https://leetcode-cn.com/problems/move-zeroes/solution/tu-jie-shuang-zhi-zhen-by-muyids/)
给定一个数组 nums，编写一个函数将所有 0 移动到数组的末尾，同时保持非零元素的相对顺序。

示例:

输入: [0,1,0,3,12]
输出: [1,3,12,0,0]
说明:

必须在原数组上操作，不能拷贝额外的数组。
尽量减少操作次数。

1. 暴力破解
```javascript
/**
 * @param {number[]} nums
 * @return {void} Do not return anything, modify nums in-place instead.
 */
var moveZeroes = function(nums) {
    for(let i = nums.length-2; i> -1; i--) {
        if(nums[i] === 0) {
            nums.push(nums.splice(i, 1))
        }
    }
};
```

2. 解构法移动次序 （双指针类似）
依次遍历，将不为0的数字和为0的数字交换位置至0都到尾部
```javascript
/**
 * @param {number[]} nums
 * @return {void} Do not return anything, modify nums in-place instead.
 */
var moveZeroes = function(nums) {
    let j = 0;
    for(let i = 0; i< nums.length; i++) {
        if(nums[i] !== 0) {
            [nums[j++], nums[i]] = [nums[i], nums[j]]
        }
    }
};
```

3. 双指针
```javascript
/**
 * @param {number[]} nums
 * @return {void} Do not return anything, modify nums in-place instead.
 */
var moveZeroes = function(nums) {  
    for(let i = 0, j = 0; i< nums.length; i++) {
        if (nums[i] !== 0 ) {
            if (j<i) {
                nums[j] = nums[i];
                nums[i] = 0;   
            }
            j++
        }
    }
};
```

## 5. [只出现一次的数字](https://leetcode-cn.com/problems/single-number/solution/zhi-chu-xian-yi-ci-de-shu-zi-by-leetcode-solution/)
给定一个非空整数数组，除了某个元素只出现一次以外，其余每个元素均出现两次。找出那个只出现了一次的元素。

说明：

你的算法应该具有线性时间复杂度。 你可以不使用额外空间来实现吗？

示例 1:

输入: [2,2,1]
输出: 1
示例 2:

输入: [4,1,2,1,2]
输出: 4

1.  按位异或
^运算符跟|类似，但有一点不同的是 如果两个操作位都为1的话，结果产生0。

1的二进制表示为 0 0 0 0 0 0 1

3的二进制表示为 0 0 0 0 0 1 1

所以 1 ^ 3的结果为2
任何数和 0 做异或运算，结果仍然是原来的数
任何数和其自身做异或运算，结果是 0。
异或运算满足交换律和结合律。
时间复杂度：O(n) 其中 n 是数组长度。只需要对数组遍历一次。

空间复杂度：O(1)。

```javascript
/**
 * @param {number[]} nums
 * @return {number}
 */
var singleNumber = function(nums) {
    let res = nums[0]
    for(let i = 1 ; i< nums.length;i++) {
        res = res^nums[i]
    }
    return res
};
```

2. json存储并添加每一项出现的次数，最后遍历json找出只有一次的那个值

## 6. [加一](https://leetcode-cn.com/problems/plus-one/)

给定一个由整数组成的非空数组所表示的非负整数，在该数的基础上加一。

最高位数字存放在数组的首位， 数组中每个元素只存储单个数字。

你可以假设除了整数 0 之外，这个整数不会以零开头。

示例 1:

输入: [1,2,3]
输出: [1,2,4]
解释: 输入数组表示数字 123。
示例 2:

输入: [4,3,2,1]
输出: [4,3,2,2]
解释: 输入数组表示数字 4321。
```javascript
/**
 * @param {number[]} digits
 * @return {number[]}
 */
var plusOne = function(digits) {
    let i = digits.length -1;
    while(i> -1) {
        if (digits[i] == 9) {
            digits[i] = 0;
            if(i == 0) {
                return [1,...digits];
            }
            i--;
        } else {
            digits[i]++;
            return digits
        }
    }
};
```

## 7. [两数之和](https://leetcode-cn.com/problems/plus-one/)
给定一个整数数组 nums 和一个目标值 target，请你在该数组中找出和为目标值的那 两个 整数，并返回他们的数组下标。

你可以假设每种输入只会对应一个答案。但是，数组中同一个元素不能使用两遍。

 

示例:

给定 nums = [2, 7, 11, 15], target = 9

因为 nums[0] + nums[1] = 2 + 7 = 9
所以返回 [0, 1]

1. 暴力解法 
使用两次for循环，分别针对单个元素去查找数组内是否有元素与其之和等于target。
时间复杂度为O(n^2)
空间复杂度为O(1) 用了个数个元素

2. target减去元素判断差值是否存在数组
时间复杂度为最多O(n^2)
空间复杂度为O(1)
```javascript
/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number[]}
 */
var twoSum = function(nums, target) {
    let i = nums.length -1;
    while(i > -1) {
        let j = nums.indexOf(target - nums[i])
        if (j > -1 && j != i) {
            return [j, i]
        }
        i--;
    }
    return []
};
```

3. 一次哈希表 - 空间换时间
空间复杂度为O(n)所需的额外空间取决于哈希表中存储的元素数量，该表中存储了 n 个元素。
时间复杂度O(n)
```javascript
/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number[]}
 */
var twoSum = function(nums, target) {
  let json = {};
  for (let i = 0; i < nums.length; i++) {
    let res = target - nums[i];
    if (json.hasOwnProperty(res)) {
      return [json[res], i];
    }
    json[nums[i]] = i;
  }
};
```


## 8. [有效的数独]
判断一个 9x9 的数独是否有效。只需要根据以下规则，验证已经填入的数字是否有效即可。

数字 1-9 在每一行只能出现一次。
数字 1-9 在每一列只能出现一次。
数字 1-9 在每一个以粗实线分隔的 3x3 宫内只能出现一次。


<img src="https://upload.wikimedia.org/wikipedia/commons/thumb/f/ff/Sudoku-by-L2G-20050714.svg/250px-Sudoku-by-L2G-20050714.svg.png" style="height: 250px; width: 250px;">

上图是一个部分填充的有效的数独。
数独部分空格内已填入了数字，空白格用 '.' 表示。

示例 1:

输入:
[
  ["5","3",".",".","7",".",".",".","."],
  ["6",".",".","1","9","5",".",".","."],
  [".","9","8",".",".",".",".","6","."],
  ["8",".",".",".","6",".",".",".","3"],
  ["4",".",".","8",".","3",".",".","1"],
  ["7",".",".",".","2",".",".",".","6"],
  [".","6",".",".",".",".","2","8","."],
  [".",".",".","4","1","9",".",".","5"],
  [".",".",".",".","8",".",".","7","9"]
]
输出: true
示例 2:

输入:
[
  ["8","3",".",".","7",".",".",".","."],
  ["6",".",".","1","9","5",".",".","."],
  [".","9","8",".",".",".",".","6","."],
  ["8",".",".",".","6",".",".",".","3"],
  ["4",".",".","8",".","3",".",".","1"],
  ["7",".",".",".","2",".",".",".","6"],
  [".","6",".",".",".",".","2","8","."],
  [".",".",".","4","1","9",".",".","5"],
  [".",".",".",".","8",".",".","7","9"]
]
输出: false
解释: 除了第一行的第一个数字从 5 改为 8 以外，空格内其他数字均与 示例1 相同。
     但由于位于左上角的 3x3 宫内有两个 8 存在, 因此这个数独是无效的。
说明:

一个有效的数独（部分已被填充）不一定是可解的。
只需要根据以上规则，验证已经填入的数字是否有效即可。
给定数独序列只包含数字 1-9 和字符 '.' 。
给定数独永远是 9x9 形式的。



# 字符串篇

## 1. 反转字符串
编写一个函数，其作用是将输入的字符串反转过来。输入字符串以字符数组 char[] 的形式给出。

不要给另外的数组分配额外的空间，你必须原地修改输入数组、使用 O(1) 的额外空间解决这一问题。

你可以假设数组中的所有字符都是 ASCII 码表中的可打印字符。

 

示例 1：

输入：["h","e","l","l","o"]
输出：["o","l","l","e","h"]
示例 2：

输入：["H","a","n","n","a","h"]
输出：["h","a","n","n","a","H"]

```javascript
/**
 * @param {character[]} s
 * @return {void} Do not return anything, modify s in-place instead.
 */
var reverseString = function(s) {
    s.reverse()
};
```

从中间入手
```javascript
var reverseString = function(s) {
    for(let i = 0, j = s.length -1; i<j;i++, j--) {
        [s[i],s[j]] = [s[j],s[i]]
    }
};
```

## 2. 整数反转
给出一个 32 位的有符号整数，你需要将这个整数中每位上的数字进行反转。

示例 1:

输入: 123
输出: 321
 示例 2:

输入: -123
输出: -321
示例 3:

输入: 120
输出: 21
注意:

假设我们的环境只能存储得下 32 位的有符号整数，则其数值范围为 [−231,  231 − 1]。请根据这个假设，如果反转后整数溢出那么就返回 0。

1. 想试着用一下replace
```javascript
var reverse = function(x) {
  let resp;
  `${x}`.replace(/(-)?(\d*)/, (a, b, c) => {
    let res = parseInt(
      c
        .split("")
        .reverse()
        .join("")
    );
    if (res > Math.pow(2, 31) - 1 || res < -Math.pow(2, 31)) return (resp = 0);
    resp = b ? b + res : res;
  });
  return resp;
};
```

2. 转换为字符串后反转再转回int判断
```
/**
 * @param {number} x
 * @return {number}
 */
var reverse = function(x) {
    let sign = Math.sign(x)
    let res = (Math.abs(x) + '').split('').reverse().join('') * sign
    if (res > Math.pow(2, 31) - 1 || res < Math.pow(2, 31) * -1) res = 0
    return res
};
```

3. 从末位开始按位取，使用新的内存空间存储
```javascript
var reverse = function(x) {
  let res = 0;
  while(x != 0) {
      let lastValue = x%10;
      res = res * 10 + lastValue;
      if (res > Math.pow(2, 31) - 1 || res < -Math.pow(2, 31)) {
        return 0;
      }
      x =  res > 0 ? Math.floor(x/10) : Math.ceil(x/10)
  }
  return res
};
```

## 3. 字符串中的第一个唯一字符
给定一个字符串，找到它的第一个不重复的字符，并返回它的索引。如果不存在，则返回 -1。

案例:

s = "leetcode"
返回 0.

s = "loveleetcode",
返回 2.

1. indexOf 与 lastIndexOf 遍历
 ```javascript
 /**
 * @param {string} s
 * @return {number}
 */
var firstUniqChar = function(s) {
    if (s.length < 1) {
        return -1;
    }
    for(let i = 0 ;i < s.length; i++) {
        if (s.lastIndexOf(s[i]) == s.indexOf(s[i]) ) {
            return i;
        }
    } 
    return -1;
};
 ```

 2. json二次遍历
 时间空间复杂度为o(n)
 ```javascript
 /**
 * @param {string} s
 * @return {number}
 */
var firstUniqChar = function(s) {
    if (s.length < 1) {
        return -1;
    }
    let json = {}
    for(let i = 0; i< s.length; i++) {
        if (json.hasOwnProperty(s[i])) {
            json[s[i]] = -1
        } else {
            json[s[i]] = i
        }
    }
    for(let i in json) {
        if (json[i] > -1) {return json[i]}
    }
    return -1;
};
 ```