## 1. JavaScript 中的垃圾回收和内存泄漏

> 由于字符串、对象和数组没有固定大小，当他们的大小已知时，才能对他们进行动态的存储分配。JavaScript 程序每次创建字符串、数组或对象时，解释器都必须分配内存来存储那个实体。只要像这样动态地分配了内存，最终都要释放这些内存以便他们能够被再用，否则，JavaScript 的解释器将会消耗完系统中所有可用的内存，造成系统崩溃。

- JavaScript 垃圾回收的机制很简单：找出不再使用的变量，然后释放掉其占用的内存，但是这个过程不是实时的，因为其开销比较大，所以垃圾回收器会按照固定的时间间隔周期性的执行。

### 垃圾回收有两种方法：标记清除、引用计数。

1. 标记清除
   这是 javascript 中最常用的垃圾回收方式。当变量进入执行环境是，就标记这个变量为“进入环境”。从逻辑上讲，永远不能释放进入环境的变量所占用的内存，因为只要执行流进入相应的环境，就可能会用到他们。当变量离开环境时，则将其标记为“离开环境”。
   垃圾收集器在运行的时候会给存储在内存中的所有变量都加上标记。然后，它会去掉环境中的变量以及被环境中的变量引用的标记。而在此之后再被加上标记的变量将被视为准备删除的变量，原因是环境中的变量已经无法访问到这些变量了。最后。垃圾收集器完成内存清除工作，销毁那些带标记的值，并回收他们所占用的内存空间。
2. 引用计数
   所谓"引用计数"是指语言引擎有一张"引用表"，保存了内存里面所有的资源（通常是各种值）的引用次数。如果一个值的引用次数是 0，就表示这个值不再用到了，因此可以将这块内存释放。如果一个值不再需要了，引用数却不为 0，垃圾回收机制无法释放这块内存，从而导致内存泄漏。

### 哪些情况会引起内存泄漏？

> 虽然 JavaScript 会自动垃圾收集，但是如果我们的代码写法不当，会让变量一直处于“进入环境”的状态，无法被回收。下面列一下内存泄漏常见的几种情况：

1. 意外的全局变量

```javascript
function foo(arg) {
  bar = "this is a hidden global variable";
  // bar没被声明,会变成一个全局变量,在页面关闭之前不会被释放。
  this.variable = "potential accidental global";
  // foo 调用自己，this 指向了全局对象（window）从而创建了全局的variable
}
foo();
```

2. 被遗忘的计时器或回调函数

```javascript
var someResource = getData();
setInterval(function() {
    var node = document.getElementById('Node');
    if(node) {
        // 处理 node 和 someResource
        node.innerHTML = JSON.stringify(someResource));
    }
}, 1000);

```

3. 闭包
   闭包可以维持函数内局部变量，使其得不到释放。

```javascript
// 定义事件回调时，由于函数内定义函数，并且内部函数--事件回调引用外部函数，形成了闭包

function bindEvent() {
  var obj = document.createElement("xxx");
  obj.onclick = function() {
    // Even if it is a empty function
  };
}
```

4. 没有清理的 DOM 元素引用
5. 避免内存泄漏的一些方式

- 减少不必要的全局变量，或者生命周期较长的对象，及时对无用的数据进行垃圾回收
- 注意程序逻辑，避免“死循环”之类
- 避免创建过多的对象

### 垃圾回收的使用场景优化

1. 数组 array 优化
   将[]赋值给一个数组对象，是清空数组的捷径(例如： arr = [];),但是需要注意的是，这种方式又创建了一个新的空对象，并且将原来的数组对象变成了一小片内存垃圾！实际上，将数组长度赋值为 0（arr.length = 0）也能达到清空数组的目的，并且同时能实现数组重用，减少内存垃圾的产生。

```javascript
const arr = [1, 2, 3, 4];
console.log("adsadsdas");
arr.length = 0; // 可以直接让数字清空，而且数组类型不变。
// arr = []; 虽然让a变量成一个空数组,但是在堆上重新申请了一个空数组对象。
```

2. 对象尽量复用
   对象尽量复用，尤其是在循环等地方出现创建新对象，能复用就复用。不用的对象，尽可能设置为 null，尽快被垃圾回收掉。
   ```javascript
   var t = {}; // 每次循环都会创建一个新对象。
   for (var i = 0; i < 10; i++) {
     // var t = {};// 每次循环都会创建一个新对象。
     t.age = 19;
     t.name = "123";
     t.index = i;
     console.log(t);
   }
   t = null; //对象如果已经不用了，那就立即设置为 null；等待垃圾回收。
   ```
   3. 在循环中的函数表达式，能复用最好放到循环外面。
      ```javascript
      // 在循环中最好也别使用函数表达式。
      for (var k = 0; k < 10; k++) {
        var t = function(a) {
          // 创建了 10 次 函数对象。
          console.log(a);
        };
        t(k);
      }
      function t(a) {
        console.log(a);
      }
      for (var k = 0; k < 10; k++) {
        t(k);
      }
      t = null;
      ```


## 2. 类型
javascript的数据类型一共有八种
Number, String, Object, Null, Boolean, Symbol, Undefined, bigInt,其中Object为复杂数据类型
typeof 检测null类型为object。

## 3. js的数据是如何存储的
在js的执行过程中，主要有三种类型内存空间。分别是代码空间、栈空间和堆空间。代码空间主要用于存储可执行代码。
栈空间用于存储执行上下文，当一段代码执行时，需要先编译，并创建执行上下文，然后按照顺序执行代码，当判断到 一个变量的值为引用类型时，js引擎不会直接将该对象存放到环境变量里，而是将他分配到堆空间里面去，并为变量分配一个指向该堆空间的地址，当js需要访问该数据的时候，是通过栈中的引用地址来访问的。
那么为什么其他变量会把数据存在栈中，引用类型却要放在堆中？
因为js引擎需要用栈来维护程序执行期间的上下文的状态，如果栈空间大了的话，所有的数据都存放在栈里面，会影响到上下切换的效率进而影响到整个程序的执行效率。

在 js 的执行过程中，主要有三种类型内存空间。分别是代码空间、栈空间和堆空间。代码空间主要用于存储可执行代码。
栈空间用于存储执行上下文，当一段代码执行时，需要先编译，并创建执行上下文，然后按照顺序执行代码，当判断到 一个变量的值为引用类型时，js 引擎不会直接将该对象存放到环境变量里，而是将他分配到堆空间里面去，并为变量分配一个指向该堆空间的地址，当 js 需要访问该数据的时候，是通过栈中的引用地址来访问的。
那么为什么其他变量会把数据存在栈中，引用类型却要放在堆中？
因为 js 引擎需要用栈来维护程序执行期间的上下文的状态，如果栈空间大了的话，所有的数据都存放在栈里面，会影响到上下切换的效率进而影响到整个程序的执行效率。

```javascript
function foo() {
  var myName = " wa123 ";
  let test1 = 1;
  const test2 = 2;
  var innerBar = {
    setName: function(newName) {
      myName = newName;
    },
    getName: function() {
      console.log(test1);
      return myName;
    },
  };
  return innerBar;
}
var bar = foo();
bar.setName(" hap123 ");
bar.getName();
console.log(bar.getName());
```

1. 当 JavaScript 引擎执行到 foo 函数时，首先会编译，并创建一个空执行上下文。
2. 在编译过程中，遇到内部函数 setName，JavaScript 引擎还要对内部函数做一次快速的词法扫描，发现该内部函数引用了 foo 函数中的 myName 变量，由于是内部函数引用了外部函数的变量，所以 JavaScript 引擎判断这是一个闭包，于是在堆空间创建换一个“closure(foo)”的对象（这是一个内部对象，JavaScript 是无法访问的），用来保存 myName 变量。
3. 接着继续扫描到 getName 方法时，发现该函数内部还引用变量 test1，于是 JavaScript 引擎又将 test1 添加到“closure(foo)”对象中。这时候堆中的“closure(foo)”对象中就包含了 myName 和 test1 两个变量了。
4. 由于 test2 并没有被内部函数引用，所以 test2 依然保存在调用栈中。
5. 当执行到 foo 函数时，闭包就产生了；当 foo 函数执行结束之后，返回的 getName 和 setName 方法都引用“clourse(foo)”对象，所以即使 foo 函数退出了，“clourse(foo)”依然被其内部的 getName 和 setName 方法引用。所以在下次调用 bar.setName 或者 bar.getName 时，创建的执行上下文中就包含了“clourse(foo)”。
   总的来说，产生闭包的核心有两步：第一步是需要预扫描内部函数；第二步是把内部函数引用的外部变量保存到堆中。

## 4. 隐式转换规则

## 5. 精确获取页面元素位置的方式
1. getBoundingClientRect()

1. getBoundingClientRect()

## . for while forEach map for of 谁的效率更高
forEach map for of这类ES6的方法效率并没有for while传统语法更快，
传统的for循环为: 
```javascript
第一种
for(var i = 0; i < testData.length; i++){
  code...
}
第二种
for(var i = 0,len = testData.length; i < len; i++){
  code...
}
```

运行这两种方法，当数组的长度较短的时候可以看到第二种的效率比第一种高。当数组长度上万级时，两者的差距就不明显了。

- forEach 与 for 的对比
  forEach 没有返回值 想要中途阻止循环，只能用 trycatch 异常 throw new Error()

```javascript
let i = new Array(10000000).fill(1);
let time = 0;
let start = new Date().getTime();
// for (let u = 0; u < i.length; u++) {
//   time++;
// }
i.forEach((element) => {
  time++;
});
let end = new Date().getTime();
console.log(end - start, time);
```

在代码的对比下发现传统的 for 的效率比 foreach 要高。
原因是 forEach 的作用主要是为了对数组内的每一个元素做处理。在源码中其实就是在使用 for 循环，并对 for 循环的每一个值传递给回调函数

```
function ArrayForEach(callbackfn/*, thisArg*/) {
  var O = ToObject(this);
  var len = ToLength(O.length);
  if (arguments.length === 0)
    ThrowTypeError(JSMSG_MISSING_FUN_ARG, 0, "Array.prototype.forEach");
  if (!IsCallable(callbackfn))
    ThrowTypeError(JSMSG_NOT_FUNCTION, DecompileArg(0, callbackfn));
  var T = arguments.length > 1 ? arguments[1] : void 0;

  for (var k = 0; k < len; k++) {
    if (k in O) {
    callContentFunction(callbackfn, T, O[k], k, O);
   }
  }
  return void 0;
}

```

同理对于 map，map 创建了新数组，而 forEach 可以改变自身数组
遇到空缺的时候 map()虽然会跳过，但保留空缺；forEach()遍历时跳过空缺，不保留空缺。
map()按照原始数组元素顺序依次处理元素；forEach()遍历数组的每个元素，将元素传给回调函数。
所以说 map 的执行效率还要慢于 forEach

## 7. 如何转换一个类数组对象，大致原理是怎么样的
类数组对象是一个具有长度的对象。
要将一个类数组对象转换为一个真正的数组，必须具备以下条件：
（1）该类数组对象必须具有 length 属性，用于指定数组的长度。如果没有 length 属性，那么转换后的数组是一个空数组。
（2）该类数组对象的属性名必须为数值型或字符串型的数字
Array.from

```javascript
if (!Array.from) {
  Array.from = (function() {
    var toStr = Object.prototype.toString;
    var isCallable = function(fn) {
      return typeof fn === "function" || toStr.call(fn) === "[object Function]";
    };
    var toInteger = function(value) {
      var number = Number(value);
      if (isNaN(number)) {
        return 0;
      }
      if (number === 0 || !isFinite(number)) {
        return number;
      }
      return (number > 0 ? 1 : -1) * Math.floor(Math.abs(number));
    };
    var maxSafeInteger = Math.pow(2, 53) - 1;
    var toLength = function(value) {
      var len = toInteger(value);
      return Math.min(Math.max(len, 0), maxSafeInteger);
    };

    // The length property of the from method is 1.
    return function from(arrayLike /*, mapFn, thisArg */) {
      // 1. Let C be the this value.
      var C = this;

      // 2. Let items be ToObject(arrayLike).
      var items = Object(arrayLike);

      // 3. ReturnIfAbrupt(items).
      if (arrayLike == null) {
        throw new TypeError(
          "Array.from requires an array-like object - not null or undefined"
        );
      }

      // 4. If mapfn is undefined, then let mapping be false.
      var mapFn = arguments.length > 1 ? arguments[1] : void undefined;
      var T;
      if (typeof mapFn !== "undefined") {
        // 5. else
        // 5. a If IsCallable(mapfn) is false, throw a TypeError exception.
        if (!isCallable(mapFn)) {
          throw new TypeError(
            "Array.from: when provided, the second argument must be a function"
          );
        }

        // 5. b. If thisArg was supplied, let T be thisArg; else let T be undefined.
        if (arguments.length > 2) {
          T = arguments[2];
        }
      }

      // 10. Let lenValue be Get(items, "length").
      // 11. Let len be ToLength(lenValue).
      var len = toLength(items.length);

      // 13. If IsConstructor(C) is true, then
      // 13. a. Let A be the result of calling the [[Construct]] internal method
      // of C with an argument list containing the single item len.
      // 14. a. Else, Let A be ArrayCreate(len).
      var A = isCallable(C) ? Object(new C(len)) : new Array(len);

      // 16. Let k be 0.
      var k = 0;
      // 17. Repeat, while k < len… (also steps a - h)
      var kValue;
      while (k < len) {
        kValue = items[k];
        if (mapFn) {
          A[k] =
            typeof T === "undefined"
              ? mapFn(kValue, k)
              : mapFn.call(T, kValue, k);
        } else {
          A[k] = kValue;
        }
        k += 1;
      }
      // 18. Let putStatus be Put(A, "length", len, true).
      A.length = len;
      // 20. Return A.
      return A;
    };
  })();
}
```

## 8. 如何获取精度更高的时间
- 浏览器使用 performance.now() 可以获取到 performance.timing.navigationStart 到当前时间之间的微秒数
- Node.js 使用 process.hrtime 返回一个数组，其中第一个元素的时间以秒为单位，第二个元素为剩余的纳秒
