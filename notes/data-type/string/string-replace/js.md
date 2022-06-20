```js
// replace方法用于替换匹配的子字符串，一般情况下只替换第一个匹配（除非使用带有g修饰符的正则表达式）。
"aaa".replace("a", "b"); // "baa"

const someString = "a b c d e";
// Only changes the first space
// a,b c d e
// console.log(someString.replace(' ', ','))

// Use / /g instead of ' ' to change every space
console.log(someString.replace(/ /g, ","));
```
