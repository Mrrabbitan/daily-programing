//1 closure
let x = 5;
function setFn() {
  let x  =  0;
  return function() { x = x + 1; return x;};
}
const f1 = setFn();
const f2 = setFn();

f1(); // 1
f2(); // 1
f1(); // 2
f2(); // 2

const f3 = setFn();
const obj = {x: 10};

f3.call(obj);//1




//2 closure and this
// this 的指向并不是在创建的时候就可以确定的，是在调用的时候确定的
//2-1this 永远指向最后调用它的那个对象
var a = 3;
var obj = { 
  a: 5,
  fn: function() {
    this.a = 10;
  }
}

//情况1
var fn2 = obj.fn;
fn2();
console.log(a); // 10
console.log(obj.a); // 5

//情况2
obj.fn();
console.log(a); // 3
console.log(obj.a); // 10

//2-2
function func() {
  console.log(this.a);
}
var a = 2;
var o = { a: 3, func: func };
var p = { a: 4 };
o.func(); //>> 3
(p.func = o.func)(); //>> 2



//原型链
Function.prototype.a = () => console.log(1)
Object.prototype.b = () => console.log(2)

function A(name) {
    this.name = name    
}
const a = new A()


Function.__proto__ === Function.prototype // true 
Object.__proto__ === Function.prototype // true
Object.prototype.__proto__ === null // true
Function.prototype.__proto__ === Object.prototype // true
Object.prototype === Object.__proto__ // false

function F () {}
F.prototype.age = 20
let f = new F()
f.__proto__ === F.prototype // true
f.__proto__.__proto__ === Object.prototype //true
f.__proto__.proto__.__proto__ === null // true

Object instanceof Object // true
Object instanceof Function // true
Function instanceof Function // true
Function instanceof Object // true

const o = {}
o instanceof Object //true
o instanceof Function // false

function F () {}
F instanceof Object //true
F instanceof Function //true

a.a() //error
a.b() //2