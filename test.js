Function.prototype._bind = function() {
  let func = this,
    arg = arguments[0],
    args = Array.prototype.slice.call(arguments, 1);
  if (typeof arg !== "function") {
    throw new TypeError(
      "Function.prototype.bind - " +
        "what is trying to be bound is not callable"
    );
  }
  return function() {
    args = [...args, ...Array.prototype.slice.call(arguments)];
    console.log(args);
    return func.apply(arg, args);
  };
};
function get() {
  return 1;
}
function addArguments(arg1, arg2) {
  return arg1 + arg2;
}

let i = addArguments.bind(null, 37, 35);
// console.log(i(), addArguments._bind(get, 1)())

function Animal() {
  let i = 2;
  this.getName = function() {
    console.log(i);
  };
  this.setName = function(name) {
    i = name;
  };
}
function Cat() {
  Animal.apply(this);
  // let o = new Animal()
  this.getName = function() {
    // console.log(o.getName())
  };
}
Animal.getUltimateAnswer = function() {
  return 42;
};

let ani = new Animal();
let o = new Cat();
console.log(Cat);
o.getName();

function Counter() {
  var start = Date.now();
  this.num = 0;
  this.timer1 = setInterval(function() {
    this.num++;
    var gap = Date.now() - start;
    console.log("1", this.num, gap);
  }, 996);
  JSON.parse("{desc: 'adsda'}");
  this.timer2 = setTimeout(() => {
    this.num++;
    var gap = Date.now() - start;
    console.log("2", this.num, gap);
  }, 0);
}
// let j = [1, 2, 3, 4, 5, 3, 23, 1, 321, 312, 31, 1, 421, 3, 41, 323, 4, 31, 413, 13, 1321, 3, 2312, 12, 31, 313, 1312, 30]

// const chunk = function (arr, index) {
//   let newArr = [];
//   if (arr.length < index) return arr;
//   for (let i = 0, j = -1; i < arr.length; i++) {
//     if (i % index === 0) {
//       newArr.push([]);
//       j++;
//     }
//     newArr[parseInt(i / index)].push(arr[i])
//   }
//   return newArr;
// }
const chunk2 = (arr, index) =>
  [...Array(Math.ceil(arr.length / index))].map((item, i) =>
    arr.slice(i * index, (i + 1) * index)
  );
// console.log(chunk(j, 53))

function resolvePromise(promise2, x, resolve, reject) {
  // 循环引用报错
  if (x === promise2)
    return reject(new TypeError("Chaining cycle detected for promise"));
  // 防止多次调用
  let called;
  // x不为null且x是对象或者函数
  if (x != null && (typeof x === "object" || typeof x === "function")) {
    try {
      // 声明then = x 的then方法
      let then = x.then;
      // 如果then是一个函数，就默认为promise
      if (typeof then === "function") {
        // 让then执行，第一个参数为this 后面是成功和失败的回调
        then.call(
          x,
          (y) => {
            if (called) return;
            called = true;
            resolvePromise(promise2, y, resolve, reject);
          },
          (err) => {
            if (called) return;
            called = true;
            reject(err);
          }
        );
      } else {
        resolve(x);
      }
    } catch (error) {
      if (called) return;
      called = true;
      reject(error);
    }
  } else {
    resolve(x);
  }
}

class Promise1 {
  constructor(executor) {
    this.state = "pending";
    this.value = undefined;
    this.reason = undefined;
    this.onResolvedCallbacks = [];
    this.onRejectedCallbacks = [];
    let resolve = (value) => {
      if (this.state === "pending") {
        this.state = "fulfilled";
        this.value = value;
        // 一旦resolve执行，调用成功数组的函数
        this.onResolvedCallbacks.forEach((fn) => fn());
      }
    };
    let reject = (reason) => {
      if (this.state === "pending") {
        this.state = "rejected";
        this.reason = reason;
        // 一旦reject执行，调用失败的函数
        this.onRejectedCallbacks.forEach((fn) => fn());
      }
    };
    try {
      executor(resolve, reject);
    } catch (error) {
      reject(error);
    }
  }
  then(onFulfilled, onRejected) {
    onFulfilled =
      typeof onFulfilled === "function" ? onFulfilled : (value) => value;
    onRejected =
      typeof onRejected === "function"
        ? onRejected
        : (err) => {
            throw err;
          };
    const promise2 = new Promise1((resolve, reject) => {
      if (this.state === "fulfilled") {
        setTimeout(() => {
          try {
            let x = onFulfilled(this.value);
            resolvePromise(promise2, x, resolve, reject);
          } catch (error) {
            reject(error);
          }
        }, 0);
      }
      if (this.state === "rejected") {
        setTimeout(() => {
          try {
            let x = onRejected(this.reason);
            resolvePromise(promise2, x, resolve, reject);
          } catch (error) {
            reject(error);
          }
        }, 0);
      }
      if (this.state === "pending") {
        this.onResolvedCallbacks.push(() => {
          setTimeout(() => {
            try {
              let x = onFulfilled(this.value);
              resolvePromise(promise2, x, resolve, reject);
            } catch (error) {
              reject(error);
            }
          }, 0);
        });
        this.onRejectedCallbacks.push(() => {
          setTimeout(() => {
            try {
              let x = onRejected(this.reason);
              resolvePromise(promise2, x, resolve, reject);
            } catch (error) {
              reject(error);
            }
          }, 0);
        });
      }
    });
    return promise2;
  }
  catch(fn) {
    return this.then(null, fn);
  }
}

Promise1.resolve = function(val) {
  return new Promise1((resolve, reject) => {
    resolve(val);
  });
};

Promise1.reject = function(val) {
  return new Promise1((resolve, reject) => {
    reject(val);
  });
};

Promise1.race = function(promises) {
  return new Promise1((resolve, reject) => {
    for (let i = 0; i < promises.length; i++) {
      promises[i].then(resolve, reject);
    }
  });
};

// 引用一个未声明的变量
function Bar() {
  this.bar = 42;
}
Bar.answer = function() {
  return 42;
};
Bar.prototype.print = function() {
  console.log(this.bar);
};
const barKeys = Object.keys(Bar);
// ['answer']const barProtoKeys = Object.keys(Bar.prototype);
// ['print']class Foo { constructor() { this.foo = 42; }static answer() { return 42; }print() { console.log(this.foo); }}const fooKeys = Object.keys(Foo);
// []const fooProtoKeys = Object.keys(Foo.prototype);
// []
