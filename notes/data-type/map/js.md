JavaScript 的对象（Object），本质上是键值对的集合（Hash 结构），但是传统上只能用字符串当作键。
WeakMap 结构与 Map 结构类似，也是用于生成键值对的集合。

- WeakMap 只接受对象作为键名（null 除外），不接受其他类型的值作为键名。
- WeakMap 的键名所指向的对象，不计入垃圾回收机制。

Map 结构原生提供三个遍历器生成函数和一个遍历方法。

- `keys()`：返回键名的遍历器。
- `values()`：返回键值的遍历器。
- `entries()`：返回所有成员的遍历器。
- `forEach()`：遍历 Map 的所有成员。

```js
let { keys, values, entries } = Object;
let obj = { a: 1, b: 2, c: 3 };
for (let key of keys(obj)) {
  console.log(key); // 'a', 'b', 'c'
}
for (let value of values(obj)) {
  console.log(value); // 1, 2, 3
}
for (let [key, value] of entries(obj)) {
  console.log([key, value]); // ['a', 1], ['b', 2], ['c', 3]
}

const m = new Map();
const o = { p: "Hello World" };
m.set(o, "content");
m.get(o); // "content"
m.has(o); // true
m.delete(o); // true
m.has(o); // false

const map = new Map([
  ["name", "张三"],
  ["title", "Author"],
]);
map.size; // 2
map.has("name"); // true
map.get("name"); // "张三"
map.has("title"); // true
map.get("title"); // "Author"

const map = new Map();
map.set("foo", true);
map.set("bar", false);
map.size; // 2

const m = new Map();
m.set(undefined, "nah");
m.has(undefined); // true
m.delete(undefined);
m.has(undefined); // false

let map = new Map();
map.set("foo", true);
map.set("bar", false);
map.size; // 2
map.clear();
map.size; // 0

const map = new Map([
  ["F", "no"],
  ["T", "yes"],
]);

for (let key of map.keys()) {
  console.log(key);
}
// "F"
// "T"

for (let value of map.values()) {
  console.log(value);
}
// "no"
// "yes"

for (let item of map.entries()) {
  console.log(item[0], item[1]);
}
// "F" "no"
// "T" "yes"

// 或者
for (let [key, value] of map.entries()) {
  console.log(key, value);
}
// "F" "no"
// "T" "yes"

// 等同于使用map.entries()
for (let [key, value] of map) {
  console.log(key, value);
}
// "F" "no"
// "T" "yes"

const someVariable = 2;
const someDict = { [someVariable + 1]: "three" };
// three
console.log(someDict[3]);
```

## 从 map 中删除 key 和 value

```js
const m = new Map();
m.set(undefined, "nah");
m.has(undefined); // true
m.delete(undefined);
m.has(undefined); // false

var obj = Object.defineProperties(
  {},
  {
    p1: { value: 1, configurable: true },
    p2: { value: 2, configurable: false },
  }
);
delete obj.p1; // true
delete obj.p2; // false
obj.p1; // undefined
obj.p2; // 2
```

## Maps(字典)遍历，获取 map 的所有 key 和 value

```js
// for...in循环
// 它遍历的是对象所有可遍历（enumerable）的属性，会跳过不可遍历的属性。
// 它不仅遍历对象自身的属性，还遍历继承的属性。
var obj = { a: 1, b: 2, c: 3 };
for (var i in obj) {
  console.log("键名：", i);
  console.log("键值：", obj[i]);
}

// 获取 map 中键值对的数目
Object.keys(obj).length;
Object.values(obj);
Object.entries(obj);

var engines = new Set(["Gecko", "Trident", "Webkit", "Webkit"]);
for (var e of engines) {
  console.log(e);
}

var es6 = new Map();
es6.set("edition", 6);
es6.set("committee", "TC39");
es6.set("standard", "ECMA-262");
for (var [name, value] of es6) {
  console.log(name + ": " + value);
}

const someList = [6, 3, 5];
// 0 6
// 1 3
// 2 5
someList.forEach((element, index) => {
  console.log(`${index} ${element}`);
});

const list1 = [1, 3, 5];
const list2 = [2, 4, 6];
// [[1, 2], [3, 4], [5, 6]]
const zippedList = list1.map((x, y) => {
  return [x, list2[y]];
});
zippedList.forEach((element) => {
  console.log(`${element[0]} ${element[1]}`);
});
```

```js
// in运算符的一个问题是，它不能识别哪些属性是对象自身的，哪些属性是继承的。
var obj = { p: 1 };
"p" in obj; // true
"toString" in obj; // true

const m = new Map();
m.set("edition", 6);
m.set(262, "standard");
m.set(undefined, "nah");
m.has("edition"); // true
m.has("years"); // false
m.has(262); // true
m.has(undefined); // true
```
