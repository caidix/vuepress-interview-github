var rotate = function(nums, k) {
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
rotate(nums, 3);
console.log(nums);

const curry = (fn) => {
  const f = (...allargs) => {
    return fn.length <= allargs.length
      ? fn(...allargs)
      : (...args) => f(...allargs, ...args);
  };
  return f;
};

var maxProfit = function(prices) {
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
      total = total + (prices[right] - prices[left]);
      left = right + 1;
      right += 2;
    }
  }
  return total;
};

// console.log(maxProfit([2, 1, 4, 5, 2, 9, 7,12]))
var twoSum = function(nums, target) {
  let json = {};
  for (let i = 0; i < nums.length; i++) {
    let res = target - nums[i];
    console.log(json[res]);
    if (json.hasOwnProperty(res)) {
      return [json[res], i];
    }
    json[nums[i]] = i;
  }
};
// console.log(twoSum([2, 7, 11, 15], 9))

var twice = function(s) {
  for (let i = 0, j = s.length - 1; i != j, i + 1 !== j; i++, j--) {
    [s[i], s[j]] = [s[j], s[i]];
  }
};
// let s = ["H", "a", "n", "n", "a", "h"]
// twice(s)
// console.log(s)

"1230".replace(/(-)?(\d*)/, (a, b, c) => {
  console.log(
    a,
    b,
    parseInt(
      c
        .split("")
        .reverse()
        .join("")
    )
  );
});
var firstUniqChar = function(s) {
  for (let i = 0; i < s.length; i++) {
    if (s.lastIndexOf(s[i]) == i) {
      return i;
    }
  }
  return -1;
};
console.log(firstUniqChar("leetcode"));

/**
 * @param {string} str
 * @return {number}
 */
var myAtoi = function(str) {
  // 自动机类
  class Automaton {
    constructor() {
      // 执行阶段，默认处于开始执行阶段
      this.state = "start";
      // 正负符号，默认是正数
      this.sign = 1;
      // 数值，默认是0
      this.answer = 0;
      /*
      关键点：
      状态和执行阶段的对应表
      含义如下：
      [执行阶段, [空格, 正负, 数值, 其他]]
      */
      this.map = new Map([
        ["start", ["start", "signed", "in_number", "end"]],
        ["signed", ["end", "end", "in_number", "end"]],
        ["in_number", ["end", "end", "in_number", "end"]],
        ["end", ["end", "end", "end", "end"]],
      ]);
    }

    // 获取状态的索引
    getIndex(char) {
      if (char === " ") {
        // 空格判断
        return 0;
      } else if (char === "-" || char === "+") {
        // 正负判断
        return 1;
      } else if (typeof Number(char) === "number" && !isNaN(char)) {
        // 数值判断
        return 2;
      } else {
        // 其他情况
        return 3;
      }
    }

    /*
    关键点：
    字符转换执行函数
    */
    get(char) {
      /*
      易错点：
      每次传入字符时，都要变更自动机的执行阶段
      */
      this.state = this.map.get(this.state)[this.getIndex(char)];

      if (this.state === "in_number") {
        /*
        小技巧：
        在JS中，对字符串类型进行减法操作，可以将得到一个数值型（Number）的值

        易错点：
        本处需要利用括号来提高四则运算的优先级
        */
        this.answer = this.answer * 10 + (char - 0);

        /*
        易错点：
        在进行负数比较时，需要将INT_MIN变为正数
        */
        this.answer =
          this.sign === 1
            ? Math.min(this.answer, Math.pow(2, 31) - 1)
            : Math.min(this.answer, -Math.pow(-2, 31));
      } else if (this.state === "signed") {
        /*
        优化点：
        对于一个整数来说，非正即负，
        所以正负号的判断，只需要一次。
        故，可以降低其判断的优先级
        */
        this.sign = char === "+" ? 1 : -1;
      }
    }
  }

  // 生成自动机实例
  let automaton = new Automaton();

  // 遍历每个字符
  for (let char of str) {
    // 依次进行转换
    automaton.get(char);
  }

  // 返回值，整数 = 正负 * 数值
  return automaton.sign * automaton.answer;
};
