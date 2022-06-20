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
