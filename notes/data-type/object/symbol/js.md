ES6 引入了一种新的原始数据类型 Symbol，表示独一无二的值。
它是 JavaScript 语言的第七种数据类型，
前六种是：undefined、null、布尔值（Boolean）、字符串（String）、数值（Number）、对象（Object）。

除了定义自己使用的 Symbol 值以外，ES6 还提供了 11 个内置的 Symbol 值，指向语言内部使用的方法。

```js
let s = Symbol();
typeof s;
// "symbol"

let s1 = Symbol("foo");
let s2 = Symbol("bar");
s1; // Symbol(foo)
s2; // Symbol(bar)
s1.toString(); // "Symbol(foo)"
s2.toString(); // "Symbol(bar)"

// 没有参数的情况
let s1 = Symbol();
let s2 = Symbol();
s1 === s2; // false

// 有参数的情况
let s1 = Symbol("foo");
let s2 = Symbol("foo");
s1 === s2; // false

const mySymbol = Symbol();
const a = {};
a.mySymbol = "Hello!";
a[mySymbol]; // undefined
a["mySymbol"]; // "Hello!"

let s1 = Symbol.for("foo");
let s2 = Symbol.for("foo");
s1 === s2; // true
```
