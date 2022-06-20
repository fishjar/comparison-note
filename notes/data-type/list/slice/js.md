```js
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
a; // ["a", "b", "c", "d"]

const someList = ["a", "b", "c"];
someList.splice(1, 1);
// a
// c
someList.forEach((element) => {
  console.log(element);
});
```
