var rotate = function (nums, k) {
  let n = nums.length; // 7
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
      3;
      // 同时当前索引指向了之前next索引所在的位置
      currentIndex = nextIndex;
      // 每执行一次换位操作count++
      count++;
      // 当再次currentIndex = i注意是再次，说明已经换过一轮了
      // 再按当前i去置换只会重复之前的换位，所以结束这一轮换位开始下一轮换位
    } while (currentIndex != i);
  }
};
let nums = [1, 2, 3, 4, 5, 6, 7];
// rotate(nums, 3);
// console.log(nums);

const curry = (fn) => {
  const f = (...allargs) => {
    return fn.length <= allargs.length ? fn(...allargs) : (...args) => f(...allargs, ...args)
  }
  return f
}

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

// console.log(maxProfit([2, 1, 4, 5, 2, 9, 7,12]))

var user = [
  {
    id: 1, name: 'a'
  },
  {
    id: 2, name: 'a'
  },
  {
    id: 3, name: 'b'
  },
  {
    id: 4, name: 'v'
  },
  {
    id: 5, name: 'v'
  },
]

// Array.prototype.unique = function () {
//   let arr = Array.prototype.slice.call(this)
//   return arr.reduce((prev, next) => {
//     if (!prev.includes(next.name)) {
//       prev.push(next.name)
//     }
//     return prev
//   }, [])
// }
// console.log(user.unique())

var isAnagram = function (s, t) {
  if (s.length != t.length) {
    return false;
  }
  let json = {}
  for (let i of s) {
    if (json[i]) {
      json[i]++
    } else {
      json[i] = 1
    }
  }
  for (let i of t) {
    json[i]--;
    console.log(json)
    if (isNaN(json[i]) || json[i] < 0) {
      return false
    }
  }
  return true
};

// console.log(isAnagram("a", "b"))
let i = new Array(10000000).fill(1)
let time = 0
let start = new Date().getTime()
// for (let u = 0; u < i.length; u++) {
//   time++;
// }
i.forEach(element => {
  time++;
});
let end = new Date().getTime()
console.log(end - start, time)