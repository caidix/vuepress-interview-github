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

javascript 的数据类型一共有八种
Number, String, Object, Null, Boolean, Symbol, Undefined, bigInt,其中 Object 为复杂数据类型
typeof 检测 null 类型为 object。

## 3. js 的数据是如何存储的

在 js 的执行过程中，主要有三种类型内存空间。分别是代码空间、栈空间和堆空间。代码空间主要用于存储可执行代码。
栈空间用于存储执行上下文，当一段代码执行时，需要先编译，并创建执行上下文，然后按照顺序执行代码，当判断到 一个变量的值为引用类型时，js 引擎不会直接将该对象存放到环境变量里，而是将他分配到堆空间里面去，并为变量分配一个指向该堆空间的地址，当 js 需要访问该数据的时候，是通过栈中的引用地址来访问的。
那么为什么其他变量会把数据存在栈中，引用类型却要放在堆中？
因为 js 引擎需要用栈来维护程序执行期间的上下文的状态，如果栈空间大了的话，所有的数据都存放在栈里面，会影响到上下切换的效率进而影响到整个程序的执行效率。

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

forEach map for of 这类 ES6 的方法效率并没有 for while 传统语法更快，
传统的 for 循环为:

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

## 9. null 和 undefined 的区别

- null 表示一个无的对象，表示该处不应该有值，而 undefined 表示未定义。
- 转换为数字时的结果不同。Number(null)为 0， Number(undefined)为 NaN.

使用的场景上：
null:

- 作为函数的参数，表示该函数的参数不是对象。
- 作为对象原型链的终点。

undefined：

- 变量被声明初始化后但未进行赋值时的值为 undefined
- 调用函数时，应该提供的参数并没有被赋值时，参数为 undefined
- 对象没有赋值属性， 该属性的值为 undefined
- 函数没有返回值时，默认返回 undefined

## 10. document、window、html、body 的层级关系

window > document > html > body

- window 是 BOM 的核心对象，它一方面用来获取或设置浏览器的属性和行为，另一方面作为全局对象提供方法。
- document 对象是一个和文档相关的对象，拥有一些操作文档内容的功能。但是地位没有 window 高。
- html 元素对象和 document 元素对象是属于 html 文档的 dom 对象。

## 11. addEventListener 函数的第三个参数

第三个参数涉及到冒泡和捕获，true 为捕获，false 为冒泡。

## 12. 所有的时间都有冒泡吗？

并不是所有的事件都有冒泡的，例如

- onblur
- onfocus
- onmouseenter
- onmouseleave

## 13. typeof 为什么对 null 错误显示

这是 JS 的一个 BUG，在 JS 最初的版本中使用的是 32 位系统，为了性能考虑使用低位存储变量的类型信息，000 开头代表是对象然而 null 显示为全零，所以将他错误判断为 object

## 14. class 的原型

类的所有方法都定义在类的 prototype 属性上面。

```javascript
class cat{
  constructor(){}
  a(){}
  b(){}
}

等价于

function cat(){}
cat.prototype = {
  constructor() {}
  a(){}
  b(){}
}
```

当你使用 class 的时候，它会默认调用 constructor 这个函数，来接受一些参数，并构造出一个新的实例对象 this，并将他返回。如果你的 class 没有定义 constructor，也会隐式的生成一个 constructor 方法。

```javascript
class cat {
  constructor() {
    let moqiduo = true; // 在constructor中let的变量 只存在于constructor这个构造函数中
    this.name = "cd"; //在constructor中this的属性和方法都会被定义到实例上
  }
  a() {} // class中定义一个方法。会被添加到原型对象prototype上。
  b = 3;
  c = function() {}; // 用=来定义方法或属性，会被添加到实例上
}

let cc = new cat();
console.log(cc); // cat {name:cd, b:3, c:f}
```

class 的静态方法

```javascript
class Cat(){
  static name = "这是cat类"
}
Cat.type = function(){ return '加菲' }

```

class 与 function 又有一定的区别
类不存在变量提升的机制，若是在类定义之前使用 new xx() 就会报错，不能再类初始化之前使用。尽管类的本质也是一个函数。

若在 class 中存在两个相同的属性或者方法会怎么样呢？

```javascript
class Cat {
  constructor() {
    this.name = "cd";
  }
  name = "sbdyf";
  getName = function() {
    console.log(this.name);
  };
}
let i = new Cat();
i.getName();
//输出cd
```

可以看出 constructor 中定义的相同名称的属性和方法会覆盖在 class 里定义的

### 总结

- 当使用 class 时，会默认调用 constructor 函数来接受一些参数，并构造出一个新的实例对象（this）返回。
- 类的本质也是一个函数。
- 在 constructor 中定义的变量 只存在于 constructor 这个构造函数中。
- 在 constructor 中 this 定义的属性和方法都会被定义到实例上。
- 在 class 里使用 = 来定义的方法或属性都会被定义在实例上。
- 在 class 中书写的方法会被定义到该类的原型对象 prototype 上。
- 在 class 里使用 static 时可以定义静态方法、变量，是添加在类本身而不是实例对象。
- class 生成的实例对象，也会沿着原型链查找。

## 15. function 的原型

```javascript
function A() {
  let i = 0; // 在函数内用var定义的就是私有的
  this.j = 1; // 在函数内用this承接的就是公有
}
A.prototype.prototypeProp = "我是构造函数原型对象上的属性";
A.hello = "cd"; //静态属性
A.callme = function() {
  console.log("father");
}; // 静态方法，位于构造函数上，并不能在实例中打印出

let w = new A();
console.log(w.i, w.j); // undefind 1
console.log(w.hello, A.hello); // undefind cd
console.log(w.prototypeProp); // 定义在构造函数原型对象上的属性和方法虽然不能直接表现在实例对象上，但是实例对象却可以访问或者调用它们
```

### 遍历实例对象属性的三种方法:

- 使用 for...in...能获取到实例对象自身的属性和原型链上的属性
- 使用 Object.keys()和 Object.getOwnPropertyNames()只能获取实例对象自身的属性
- 可以通过.hasOwnProperty()方法传入属性名来判断一个属性是不是实例自身的属性

## 16. Promise 规范浅忆

### 状态

promise 有三个状态：分别是

- pending:可以切换到 fulfilled 或 rejected
- fulfilled：不可迁移状态，必须有个不可变的 value
- rejected：不可迁移状态，必须有个不可变的 reason

### 实现一个 promise

## 17. 深浅拷贝

### 浅拷贝

1. 简单的复制引用

```javascript
function shallowClone(copyObj) {
  var obj = {};
  for (let i in copyObj) {
    obj[i] = copyObj[i];
  }
  return obj;
}
```

2. Array.prototype.concat()

```javascript
const arr = [1, 2, 3, 4, [5, 6]];
const copy = arr.concat(); // 利用concat()创建arr的副本
```

3. Array.prototype.slice()
   slice 和 concat 方法不修改原数组，只会返回一个潜复制了数组元素中的元素的新数组。

```javascript
const arr = [1, 2, 3, 4, [5, 6]];
const copy = arr.concat(); // 利用slice()创建arr的副本
```

4. Object.assign()
   把任意多个的源对象自身的可枚举属性拷贝给目标对象，然后返回目标对象。它是对单层的深拷贝，对于对象内的对象是浅拷贝。

```javascript
i = Object.assign({}, j);
```

### 深拷贝

1. JSON.stringify/parse 方法
   JSON.stringify 是将一个 js 值转成一个 JSON 字符串。
   JSON.parse 是将一个 JSON 字符串专场一个 js 值或对象。
   使用该方法，若对象中存在 undefined、function、symbol 会在转换过程中被忽略。

```javascript
const cloneObj = JSON.parse(JSON.stringify({ haha: "xixi" }));
```

2. 递归的方法

```javascript
function deepClone(obj) {
    if(!obj || typeof obj !== 'object')return obj;
    let objClone = obj Array.isArray(obj) ? [] : {};
    // for...in 会把继承的属性一起遍历
    for (let key in obj) {
        // 判断是不是自有属性，而不是继承属性
        if (obj.hasOwnProperty(key)) {
            //判断ojb子元素是否为对象或数组，如果是，递归复制
            if (obj[key] && typeof obj[key] === "object") {
                objClone[key] = this.deepClone(obj[key]);
            } else {
                //如果不是，简单复制
                objClone[key] = obj[key];
            }
        }
    }
    return objClone;
}
```

## 18. 防抖 and 节流

### 防抖

```javascript
/**
 * @desc 函数防抖
 * @param func 函数
 * @param wait 延迟执行毫秒数
 * @param immediate true 表立即执行，false 表非立即执行
 */
function debounce(func, wait, immediate) {
  let timeout;
  return function() {
    let context = this;
    let args = arguments;
    if (timeout) clearTimeout(timeout);
    if (immediate) {
      if (!timeout) {
        func.apply(context, args);
      }
      timeout = setTimeout(() => {
        timeout = null;
      }, wait);
    } else {
      timeout = setTimeout(() => {
        func.apply(context, args);
      }, wait);
    }
  };
}
```

### 节流

对于节流，一般有两种方式可以实现，分别是时间戳版和定时器版。

- 时间戳版的函数触发是在时间段内开始的时候。
- 定时器版的函数触发是在时间段内结束的时候。

```javascript
/**
 * @desc 函数节流
 * @param func 函数
 * @param wait 延迟执行毫秒数
 * @param type 1 表时间戳版，2 表定时器版
 */
function throttle(func, wait, type) {
  if (type === 1) {
    let date = 0;
  }
  if (type === 2) {
    let timer = null;
  }
  return function() {
    let context = this;
    let args = arguments;
    if (type === 1) {
      let newDate = new Date();
      if (newDate - date > wait) {
        func.apply(context, args);
        date = newDate;
      }
    }
    if (type === 2) {
      if (!timeout) {
        timeout = setTimeout(() => {
          func.apply(context, args);
          timeout = null;
        }, wait);
      }
    }
  };
}
```

## 19. 如何阻止冒泡

```javascript
function stopBubble(e) {
  if (e && e.stopPropagation) {
    e.stopPropagation();
  } else {
    // IE取消的方式
    window.event.cancelBubble = true;
  }
}
```

## 20. 如何阻止默认时间

```javascript
function stopDefault(e) {
  if (e && e.preventDefault) e.preventDefault();
  else window.event.returnValue = false;
  return false;
}
```

## 21. js 的设计模式

### 1. 单例模式

概念：一个类只产生一个唯一的实例。因为在许多时候整个系统只需要拥有一个全局对象，这样有利于我们协调系统整体的行为。
应用场景：如商城系统中购车对象是单例的。

```js
function Person() {
  if (!Person.instance) {
    Person.instance = {};
  }
  return Person.instance;
}
p1 = Person();
p2 = Person();
p1 === p2;
```

### 2. 工厂模式（构造函数模式）

概念：由一个方法来决定到底要创建哪个类的实例

```js
const factory = {
  createProductA() {
    console.log("A");
  },
  createProductB() {
    console.log("B");
  },
  createProductC() {
    console.log("C");
  },
  create(type) {
    return new factory[type]();
  },
};
```

### 3. 策略模式

概念：每个问题都提前想好对应的解决方案（一种映射关系）

```js
// 封装的策略算法
const money = {
  S: (salary) => {
    return salary * 4;
  },
  A: (salary) => {
    return salary * 3;
  },
  B: (salary) => {
    return salary * 2;
  },
};

// 具体的计算方法
const calculateBonus = function(level, salary) {
  return money[level](salary);
};
```

### 4. 适配器方法

概念：比如后台传给我们一个对象格式，我们要的是数组，就走这个适配器做一个转换。

### 5. 观察者模式 - 发布订阅模式

概念：定义了一种一对多的关系，让多个观察者对象同时监听某一个发布者对象，这个发布者对象的状态发生改变时就会通知所有的观察者对象。

```
function Observer() {
  this.subs = [];
}
Observer.prototype.subscribe = (fn) => {
  this.subs.push(fn)
}
Observer.prototype.unsubscribe = (fn) => {
  this.subs = this.subs.filter(observer => observer !== fn)
}
Observer.prototype.notify = (msg) => {
  this.subs.forEach(fn => fn(msg))
}
```

## 22. 0.1 + 0.2 是否等于 0.3

ECMAScript 中的 Number 类型使用 IEEE754 标准来表示整数和浮点数值。所谓 IEEE754 标准，全称 IEEE 二进制浮点数算术标准，这个标准定义了表示浮点数的格式等内容。

在 IEEE754 中，规定了四种表示浮点数值的方式：单精确度（32 位）、双精确度（64 位）、延伸单精确度、与延伸双精确度。像 ECMAScript 采用的就是双精确度，也就是说，会用 64 位字节来储存一个浮点数。

```javascript
function add() {
  const args = [...argument];
  let maxLen = Math.max.apply(
    null,
    args.map((item) => {
      const str = item.split(".")[1];
      return str ? str.length : 0;
    })
  );
  return args.reduce((sum, cur) => sum + cur * 10 ** maxLen, 0) / 10 ** maxLen;
}
```

## 23. 手写 bind

```javascript
Function.prototype.bind2 = function(context) {
  if (typeof this !== "function") {
    throw new Error(
      "Function.prototype.bind - what is trying to be bound is not callable"
    );
  }
  var self = this;
  var args = Array.prototype.slice.call(arguments, 1);
  var fNOP = function() {};
  var fbound = function() {
    self.apply(
      this instanceof self ? this : context,
      args.concat(Array.prototype.slice.call(arguments))
    );
  };
  fNOP.prototype = this.prototype;
  fbound.prototype = new fNOP();
  return fbound;
};
```

## 24. DOM 操作-添加删除移动复制创建查找结点

- 创建新节点

```js
createDocumentFragment();
createElement();
createTextNode();
```

- 添加、移除、替换、插入

```js
appendChild(node)  // 注意 如果是已有的dom元素 会把之前的dom元素删除
removeChild(node)
replaceChild(new, old)
insertBefore(new, old)
```

- 查找

```js
getElementById();
getElementByName();
getElementByTagName();
getElementByClassName();
querySelector();
querySelectorAll();
```

- 属性操作

```js
getAttribute(key);
setAttribute(key, value);
hasAttribute(key);
removeAttribute(key);
```

## 25. js 延迟加载的方式有哪些？

js 的加载、解析和执行会阻塞页面的渲染过程，因此希望 js 脚本尽可能的延迟加载，提高页面渲染速度。

1. 将 js 脚本放在文档的底部，来使 js 脚本尽可能的在最后加载执行。
2. 给 js 脚本增加 defer 属性，这个属性会让脚本的加载与文档的解析同步解析，然后再文档解析完成后再执行这个脚本文件，这样的话就能使页面渲染不被阻塞，多个设置了 defer 属性的脚本按照规范来说应该是最后按顺序执行的，但是在一些浏览器中可能不是这样。
3. 给 js 脚本增加 async 属性，使脚本异步加载，不会阻塞页面的解析过程，但当脚本解析完成就会进行 js 脚本执行，如果这个时候文档没有解析完成，还是会造成阻塞。其执行顺序是不可预测的。
4. 动态创建 DOM 标签的方式，可以对文档的加载事件进行监听，当文档加载完成后再动态的创建 script 标签来引入 js 脚本。

## 26. js 的几种模块规范？

js 中现在比较成熟的有四种模块加载方案

- 第一种是 CommonJS 方案，它通过 require 来引入模块，通过 module.exports 来定义模块的输出接口。这种模块加载方案是服务器端的解决方案，它是以同步的形式来引入模块的，认为模块就是对象，因为服务器端的文件都在本地磁盘，所以读取非常迅速，所以采用同步的方式进行加载是没有问题的。commonjs 的这种加载称为“运行时加载”，因为只有运行时才能得到这个对象，导致完全没办法在编译时做“静态优化”，比如语法分析和类型检验，这是 CommonJS 的一大不足，只有等到该模块加载完成之后，后面的代码才有机会执行，哪怕后面并没有用到这个模块。如果是浏览器端，需要通过网络，如果网络出现异常，模块加载卡住，后面的代码就得不到运行，浏览器也会陷入假死状态，这种需要网络请求的情况，使用异步加载的方式更加合适。
- 第二种是 AMD 方案，采用异步的形式加载模块，模块的记载不影响后面的语句的执行，所有依赖这个模块的语句都定义在一个回调函数里，等到加载完成后再执行回调函数。require.js 实现了 AMD 规范。

```js
require([module], callback);
第一个参数[module]，是一个数组，里面的成员就是要加载的模块；第二个参数callback，则是加载成功之后的回调函数。
require(['fs'], function(fs) {
  // to do something
})
```

但是 AMD 有一个缺陷，在程序正真执行的过程中，有些模块的加载其实是没有必要的，即使加载了，在之后的回调中也没有被用到，这样在一定程度上造成了浪费。就有了 CMD 规范

- 第三种 CMD 方案。解决了 AMD 异步方案带来的问题(sea.js)。它的主要特点是允许你在使用模块的时候再去加载模块。
- 第四种是 Es6 的方案，使用 import 、 export、 export default 的形式来导入导出模块。

### AMD 和 CMD 的区别

第一点 AMD 推崇依赖前置，在定义模块的时候就要声明其依赖的模块。而 CMD 推崇就近依赖，只有在用到某个模块的时候再去 require
第二点对依赖模块的执行时机处理不同。AMD 在依赖模块加载完成后就直接执行依赖模块，依赖模块的执行顺序和我们书写的顺序不一定一致。而 CMD 在依赖模块加载完成后并不执行，只是下载而已，等到所有的依赖都加载好后，进入回调逻辑，遇到 require 语句时在执行对应的模块，与书写顺序保持一致。

```js
//amd
define(["./a", "./b"], (a, b) => {
  a.xxx();
  b.xxx();
});

// cmd
define((require, exports, module) => {
  let a = require("./a");
  a.xxx();
  let b = require("./b");
  b.xxx();
});
```

### es6 方案和 commonjs 的差别

commonjs 输出的是值的拷贝，es6 是值的引用，当需要时才回去被加载的模块里取值。
commonjs 模块是运行时加载，es6 模块是编译时输出接口。commonjs 模块就是对象，即在输入时是先加载整个模块，生成一个对象，然后再从这个对象上面读取方法，这种加载成为运行时加载，而 es6 模块不是对象，他的对外接口只是一种静态定义，在代码静态解析阶段就会生成。

## 27. 如何回答 js 事件循环

1. 首先 js 是单线程运行的，代码在运行时，会将不同函数的执行上下文按顺序加入栈中保证代码的有序执行。
2. 在执行同步代码的过程中，如果函数内有定义异步的事件，不会阻塞代码的执行，而是将异步的事件挂起，继续执行执行栈的其他任务。
3. 当同步时间执行完后，再将异步事件对应的回调加入到与当前执行栈不同的另一个任务队列中等待执行。
4. 任务队列里又分为宏任务和微任务，它们的执行阶段也不同，当同步任务完成后，js 引擎会判断微任务队列中是否有任务可以执行，有的话就压入栈中执行，执行完后再去执行宏任务。

## 28. [node_modules 困境](https://zhuanlan.zhihu.com/p/137535779)

###　术语：

- package：包含了 package.json, 使用 package.json 定义的一个 package，通常是对应一个 module，也可以不包含 module，比如 bin 里指明一个 shell 脚本,甚至是任意文件（将 registry 当做 http 服务器使用，或者利用 unpkg 当做 cdn 使用）,一个 package 可以是一个 tar 包，也可以是本地 file 协议，甚至 git 仓库地址

- module：能被 require 加载的就叫一个 module，如下都是 module，只有当 module 含有 package.json 的时候才能叫做 package, -　一个包含 package.json 且含有 main 字段的文件夹

- 一个含有 index.js 的文件夹
- 任意的 js 文件

我们来看一下问题

> 如果说在我们引入的插件中，A 插件依赖 C 的 2.0 版本， B 插件依赖 C 的 1.0 版本，该如何处理？如果是 C 插件本身不支持多版本共存，有的甚至会污染全局环境，那么就不可取了。

###　 npm 获取模块的方式解决
如何从 node_modules 加载 package
核心是递归向上查找 node_modules 里的 package，如果在 '/home/ry/projects/foo.js' 文件里调用了 require('bar.js')，则 Node.js 会按以下顺序查找：

- /home/ry/projects/node_modules/bar.js
- /home/ry/node_modules/bar.js
- /home/node_modules/bar.js
- /node_modules/bar.js
  该算法有两个核心

```
- 优先读取最近的 node_modules 的依赖
- 递归向上查找 node_modules 依赖
```

如果说我们 node-modules 下面的插件中的 package 也安装了 C 的各个版本，比如又有一个 D 插件也依赖 C1.0 的版本，就会造成 node_modules 里充满了各种重复版本的 C 插件。造成了极大的空间浪费，也导致 npm install 很慢，这既是臭名昭著的 node_modules hell

### require 的缓存机制
node 会对加载的模块进行缓存，第一次加载某个模块后会将结果缓存下来，后续的 require 调用都返回同一结果，然而 node 的 require 的缓存并非是基于 module 名，而是基于 resolve 的文件路径的，且是大小写敏感的，这意味着即使你代码里看起来加载的是同一模块的同一版本，如果解析出来的路径名不一致，那么会被视为不同的 module，如果同时对该 module 同时进行副作用操作，就会产生问题。
