```js
let l = [1, 2, 3];

var arr = [1, 2, 3];
typeof arr; // "object"
Array.isArray(arr); // true

var arr = [1, 2, 3];
arr.valueOf(); // [1, 2, 3]

var arr = [1, 2, 3];
arr.toString(); // "1,2,3"
var arr = [1, 2, 3, [4, 5, 6]];
arr.toString(); // "1,2,3,4,5,6"

var arr = [];
arr.push(1, 2);
arr.push(3);
arr.pop();
arr; // [1, 2]

var a = ["a", "b", "c"];
a.shift(); // 'a'
a; // ['b', 'c']

var a = ["a", "b", "c"];
a.unshift("x"); // 4
a; // ['x', 'a', 'b', 'c']

var a = [1, 2, 3, 4];
a.join(" "); // '1 2 3 4'
a.join(" | "); // "1 | 2 | 3 | 4"
a.join() // "1,2,3,4"

  ["hello"].concat(["world"])
  [
    // ["hello", "world"]
    "hello"
  ].concat(["world"], ["!"])
  [
    // ["hello", "world", "!"]
    (1, 2, 3)
  ].concat(4, 5, 6);
// [1, 2, 3, 4, 5, 6]

var a = ["a", "b", "c"];
a.reverse(); // ["c", "b", "a"]
a; // ["c", "b", "a"]

// arr.slice(start, end);
var a = ["a", "b", "c"];
a.slice(0); // ["a", "b", "c"]
a.slice(1); // ["b", "c"]
a.slice(1, 2); // ["b"]
a.slice(2, 6); // ["c"]
a.slice(); // ["a", "b", "c"]

var a = ["a", "b", "c"];
a.slice(-2); // ["b", "c"]
a.slice(-2, -1); // ["b"]

var a = ["a", "b", "c"];
a.slice(4); // []
a.slice(2, 1); // []

// arr.splice(start, count, addElement1, addElement2, ...);
var a = ["a", "b", "c", "d", "e", "f"];
a.splice(4, 2); // ["e", "f"]
a[ // ["a", "b", "c", "d"]
  // sort方法对数组成员进行排序，默认是按照字典顺序排序
  // 排序后，原数组将被改变。
  ("d", "c", "b", "a")
]
  .sort()
  [
    // ['a', 'b', 'c', 'd']
    (11, 101)
  ].sort()
  [
    // [101, 11]

    (10111, 1101, 111)
  ].sort(function(a, b) {
    return a - b;
  })
  [
    // [111, 1101, 10111]

    ({ name: "张三", age: 30 },
    { name: "李四", age: 24 },
    { name: "王五", age: 28 })
  ].sort(function(o1, o2) {
    return o1.age - o2.age;
  });
// [
//   { name: "李四", age: 24 },
//   { name: "王五", age: 28  },
//   { name: "张三", age: 30 }
// ]

var a = ["a", "b", "c"];
a.indexOf("b"); // 1
a.indexOf("y"); // -1

var users = [
  { name: "tom", email: "tom@example.com" },
  { name: "peter", email: "peter@example.com" },
];
users
  .map(function(user) {
    return user.email;
  })
  .filter(function(email) {
    return /^t/.test(email);
  })
  .forEach(function(email) {
    console.log(email);
  });
// "tom@example.com"

const someList = ["a", "b", "c"];
// a,b,c
console.log(someList.join(","));

const someList = [6, 3, 5];
console.log(someList.length);
// 6
// 3
// 5
someList.forEach((element) => {
  console.log(element);
});

// 2 is in the list
if ([1, 2, 3].includes(2)) {
  console.log("2 is in the list");
}

// 2 is not in the list
if (![4, 5, 6].includes(2)) {
  console.log("2 is not in the list");
}

const someList = [1, 2, 3, 4];
someList.reverse();

// 4
// 3
// 2
// 1
someList.forEach((element) => {
  console.log(element);
});

const someList = [1];
someList.push(...[2, 3]);
// 1
// 2
// 3
someList.forEach((element) => {
  console.log(element);
});

const originalList = [1];
const newList = originalList.concat([2, 3]);
originalList[0] = 5;
// 1
// 2
// 3
newList.forEach((element) => {
  console.log(element);
});

const someList = [4, 5];
someList.unshift(3);
// 3
// 4
// 5
someList.forEach((element) => {
  console.log(element);
});

const someList = ["a", "b", "c"];
someList.splice(1, 1);
// a
// c
someList.forEach((element) => {
  console.log(element);
});

const someList = [1, 2, 3, 4];
// 4
console.log(someList.pop());
// 1
console.log(someList.shift());
// 2
// 3
someList.forEach((element) => {
  console.log(element);
});

const someList = ["a", "b", "c", "d", "e"];
// 2
console.log(someList.indexOf("c"));

const originalList = [1, 2, 3];
const newList = [...originalList];
originalList[2] = 4;

// 1
// 2
// 3
newList.forEach((element) => {
  console.log(element);
});

const someList = [1, 2, 3];
const reducer = (accumulator, currentValue) => accumulator + currentValue;
// 6
console.log(someList.reduce(reducer));
```

```js
const originalList = [1, 2, 3];
// You can also do this:
// const newList = originalList.map(x => { return x * 2 })
const newList = originalList.map((x) => x * 2);
// 2
// 4
// 6
newList.forEach((element) => {
  console.log(element);
});

const firstList = [1, 3];
const secondList = [3, 4];
// const conbinedList = firstList.map(x => {
//   return secondList.map(y => {
//     return x + y
//   })
// })
const conbinedList = firstList.map((x) => secondList.map((y) => x + y));
// 4
console.log(conbinedList[0][0]);
// 5
console.log(conbinedList[0][1]);
// 6
console.log(conbinedList[1][0]);
// 7
console.log(conbinedList[1][1]);

const originalList = [1, 2, 3, 4, 5, 6];
const newList = originalList.filter((x) => x % 2 == 0);
// 2
// 4
// 6
newList.forEach((element) => {
  console.log(element);
});
```

## 列表高阶函数

```js
var numbers = [1, 2, 3];
numbers.map(function (n) {
  return n + 1;
});
// [2, 3, 4]

function log(element, index, array) {
  console.log('[' + index + '] = ' + element);
}
[2, 5, 9].forEach(log);
// [0] = 2
// [1] = 5
// [2] = 9

var out = [];
[1, 2, 3].forEach(function(elem) {
  this.push(elem * elem);
}, out);
out // [1, 4, 9]

[1, 2, 3, 4, 5].filter(function (elem) {
  return (elem > 3);
})
// [4, 5]

var arr = [0, 1, 'a', false];
arr.filter(Boolean)
// [1, "a"]

var arr = [1, 2, 3, 4, 5];
arr.some(function (elem, index, arr) {
  return elem >= 3;
});
// true

var arr = [1, 2, 3, 4, 5];
arr.every(function (elem, index, arr) {
  return elem >= 3;
});
// false

// 注意，对于空数组，some方法返回false，every方法返回true，回调函数都不会执行。
function isEven(x) { return x % 2 === 0 }
[].some(isEven) // false
[].every(isEven) // true

[1, 2, 3, 4, 5].reduce(function (a, b) {
  console.log(a, b);
  return a + b;
})
// 1 2
// 3 3
// 6 4
// 10 5
//最后结果：15

function subtract(prev, cur) {
  return prev - cur;
}
[3, 2, 1].reduce(subtract) // 0
[3, 2, 1].reduceRight(subtract) // -4
```
