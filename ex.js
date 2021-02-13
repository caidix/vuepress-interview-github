function Bar() {
  this.bar = 42
}
Bar.prototype.print = function() {
  console.log(this.bar,123)
}
const bar = new Bar()
const barPrint = new bar.print() // it's ok
class Foo {
  constructor() {
    this.foo = 42
  }
  print() {
    console.log(this.foo)
  }
}
const foo = new Foo()
const fooPrint = new foo.print() // TypeError: foo.print is not a constructor
