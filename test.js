
Function.prototype._bind = function () {
  let func = this, arg = arguments[0], args = Array.prototype.slice.call(arguments, 1)
  if (typeof arg !== 'function') {
    throw new TypeError('Function.prototype.bind - ' +
      'what is trying to be bound is not callable');
  }
  return function () {
    args = [...args, ...Array.prototype.slice.call(arguments)]
    console.log(args)
    return func.apply(arg, args)
  }
}
function get() {
  return 1
}
function addArguments(arg1, arg2) {
  return arg1 + arg2
}


let i = addArguments.bind(null, 37, 35)
// console.log(i(), addArguments._bind(get, 1)())

function Animal() {
  let i = 2;
  this.getName = function () {
    console.log(i)
  }
  this.setName = function (name) {
    i = name
  }
}
function Cat() {
  Animal.apply(this)
  // let o = new Animal()
  this.getName = function () {
    // console.log(o.getName())
  }
}
Animal.getUltimateAnswer = function () {
  return 42;
}

let ani = new Animal()
let o = new Cat()
console.log(Cat)
o.getName()


function Counter() {
  var start = Date.now()
  this.num = 0;
  this.timer1 = setInterval(function () {
    this.num++;
    var gap = Date.now() - start;
    console.log('1', this.num, gap)
  }, 996)
  JSON.parse("{desc: 'adsda'}")
  this.timer2 = setTimeout(() => {
    this.num++;
    var gap = Date.now() - start;
    console.log('2', this.num, gap)
  }, 0);
}

1, 996
1, 1024