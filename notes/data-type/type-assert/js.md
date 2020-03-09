```js
typeof undefined; // undefined
typeof []; // object
typeof "123"; // string
typeof null; // object

// instanceof运算符返回一个布尔值，表示对象是否为某个构造函数的实例。
const s = new String("123");
s instanceof String; // true
s instanceof Object; // true

v instanceof Vehicle;
// 等同于
Vehicle.prototype.isPrototypeOf(v);

Object.prototype.toString.call(2); // "[object Number]"
Object.prototype.toString.call(""); // "[object String]"
Object.prototype.toString.call(true); // "[object Boolean]"
Object.prototype.toString.call(undefined); // "[object Undefined]"
Object.prototype.toString.call(null); // "[object Null]"
Object.prototype.toString.call(Math); // "[object Math]"
Object.prototype.toString.call({}); // "[object Object]"
Object.prototype.toString.call([]); // "[object Array]"

var type = function(o) {
  var s = Object.prototype.toString.call(o);
  return s.match(/\[object (.*?)\]/)[1].toLowerCase();
};
type({}); // "object"
type([]); // "array"
type(5); // "number"
type(null); // "null"
type(); // "undefined"
type(/abcd/); // "regex"
type(new Date()); // "date"

[
  "Null",
  "Undefined",
  "Object",
  "Array",
  "String",
  "Number",
  "Boolean",
  "Function",
  "RegExp",
].forEach(function(t) {
  type["is" + t] = function(o) {
    return type(o) === t.toLowerCase();
  };
});
type.isObject({}); // true
type.isNumber(NaN); // true
type.isRegExp(/abc/); // true

function type(obj) {
  return Reflect.apply(Object.prototype.toString, obj, [])
    .replace(/^\[object\s(\w+)\]$/, "$1")
    .toLowerCase();
}
type(new String("123")); // string
```
