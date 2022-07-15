```js
var a = ["a", "b", "c"];
a.indexOf("b"); // 1
a.indexOf("y"); // -1

// 2 is in the list
if ([1, 2, 3].includes(2)) {
  console.log("2 is in the list");
}

// 2 is not in the list
if (![4, 5, 6].includes(2)) {
  console.log("2 is not in the list");
}

const someList = ["a", "b", "c", "d", "e"];
// 2
console.log(someList.indexOf("c"));

const originalList = [1, 2, 3];
const newList = [...originalList];
originalList[2] = 4;
```
