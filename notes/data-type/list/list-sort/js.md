```js
// sort方法对数组成员进行排序，默认是按照字典顺序排序
// 排序后，原数组将被改变。
['d', 'c', 'b', 'a'].sort()
// ['a', 'b', 'c', 'd']
[11, 101].sort()
// [101, 11]

[10111, 1101, 111].sort(function (a, b) {
  return a - b;
})
// [111, 1101, 10111]

[
  { name: "张三", age: 30 },
  { name: "李四", age: 24 },
  { name: "王五", age: 28  }
].sort(function (o1, o2) {
  return o1.age - o2.age;
})
// [
//   { name: "李四", age: 24 },
//   { name: "王五", age: 28  },
//   { name: "张三", age: 30 }
// ]


const someList = [1, 2, 3, 4]
someList.reverse()
```