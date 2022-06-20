```js
let s = "Hello world!";
s.startsWith("Hello"); // true
s.endsWith("!"); // true
s.includes("o"); // true

let s = "Hello world!";
s.startsWith("world", 6); // true
s.endsWith("Hello", 5); // true
s.includes("Hello", 6); // false

"hello world".indexOf("o"); // 4
"JavaScript".indexOf("script"); // -1
"hello world".indexOf("o", 6); // 7

"hello world".lastIndexOf("o"); // 7
"hello world".lastIndexOf("o", 6); // 4

"cat, bat, sat, fat".search("at"); // 1
// replace方法用于替换匹配的子字符串，一般情况下只替换第一个匹配（除非使用带有g修饰符的正则表达式）。
"aaa".replace("a", "b"); // "baa"

// 2 is in the string
if ("123".includes("2")) {
  console.log("2 is in the string");
}

// 2 is not in the string
if (!"456".includes("2")) {
  console.log("2 is not in the string");
}

// Has a number
if ("iphone 8".match(/\d/g)) {
  console.log("Has a number");
}

// Doesn't have a number
if (!"iphone x".match(/\d/g)) {
  console.log("Doesn't have a number");
}
```
