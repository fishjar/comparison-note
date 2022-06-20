类型 [n]T 表示拥有 n 个 T 类型的值的数组。
数组的长度是其类型的一部分，因此数组不能改变大小。

表达式: `var a [10]int`，
会将变量 a 声明为拥有 10 个整数的数组。

```go
package main
import "fmt"
func main() {
  var a [2]string
  a[0] = "Hello"
  a[1] = "World"
  fmt.Println(a[0], a[1])
  fmt.Println(a)
  primes := [6]int{2, 3, 5, 7, 11}
  fmt.Println(primes)
}
// Hello World
// [Hello World]
// [2 3 5 7 11 0]


// 如果在数组的长度位置出现的是“...”省略号，
// 则表示数组的长度是根据初始化值的个数来计算。
q := [...]int{1, 2, 3}
fmt.Printf("%T\n", q) // "[3]int"

// 数组的长度是数组类型的一个组成部分，
// 因此[3]int和[4]int是两种不同的数组类型。
q := [3]int{1, 2, 3}
q = [4]int{1, 2, 3, 4} // 编译错误: 不能赋值 [4]int 给 [3]int


// 指定一个索引和对应值列表的方式初始化
type Currency int
const (
  USD Currency = iota // 美元
  EUR                 // 欧元
  GBP                 // 英镑
  RMB                 // 人民币
)
symbol := [...]string{USD: "$", EUR: "€", GBP: "￡", RMB: "￥"}
fmt.Println(RMB, symbol[RMB]) // "3 ￥"

// 定义了一个含有100个元素的数组r，最后一个元素被初始化为-1，其它元素都是用0初始化。
r := [...]int{99: -1}


// 如果一个数组的元素类型是可以相互比较的，那么数组类型也是可以相互比较的，
// 只有当两个数组的所有元素都是相等的时候数组才是相等的。
a := [2]int{1, 2}
b := [...]int{1, 2}
c := [2]int{1, 3}
fmt.Println(a == b, a == c, b == c) // "true false false"
d := [3]int{1, 2}
fmt.Println(a == d) // compile error: cannot compare [2]int == [3]int

// 消息摘要有256bit大小，因此对应[32]byte数组类型。
import "crypto/sha256"
func main() {
    c1 := sha256.Sum256([]byte("x"))
    c2 := sha256.Sum256([]byte("X"))
    fmt.Printf("%x\n%x\n%t\n%T\n", c1, c2, c1 == c2, c1)
    // Output:
    // 2d711642b726b04401627ca9fbac32f5c8530fb1903cc4db02258717921a4881
    // 4b68ab3847feda7d6c62c1fbcbeebfa35eab7351ed5e78f4ddadea5df64b8015
    // false
    // [32]uint8
}


// 下面的函数用于给[32]byte类型的数组清零：
func zero(ptr *[32]byte) {
  for i := range ptr {
    ptr[i] = 0
  }
}
// 其实数组字面值[32]byte{}就可以生成一个32字节的数组。
// 将上面的zero函数写的更简洁一点：
func zero(ptr *[32]byte) {
  *ptr = [32]byte{}
}
```

js

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

