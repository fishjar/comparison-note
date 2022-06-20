```js
// Math.random()返回0到1之间的一个伪随机数，可能等于0，但是一定小于1。
Math.random(); // 0.7151307314634323

// 任意范围的随机数生成函数
function getRandomArbitrary(min, max) {
  return Math.random() * (max - min) + min;
}
getRandomArbitrary(1.5, 6.5);
// 2.4942810038223864

// 任意范围的随机整数生成函数
function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
getRandomInt(1, 6); // 5

// 返回随机字符的例子
function random_str(length) {
  var ALPHABET = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  ALPHABET += "abcdefghijklmnopqrstuvwxyz";
  ALPHABET += "0123456789-_";
  var str = "";
  for (var i = 0; i < length; ++i) {
    var rand = Math.floor(Math.random() * ALPHABET.length);
    str += ALPHABET.substring(rand, rand + 1);
  }
  return str;
}
random_str(6); // "NdQKOr"

// 返回随机字符另一个实现
const str = "abcdefghijklmnopqrstuvwxyz9876543210";
const l = 6;
// [...Array(l)].map(()=>str.charAt(Math.floor(Math.random() * str.length))).join('');
[...Array(l)].map(() => str[~~(Math.random() * str.length)]).join("");
```

## 生成随机字符串

```js
// 返回随机字符的例子
function random_str(length) {
  var ALPHABET = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  ALPHABET += "abcdefghijklmnopqrstuvwxyz";
  ALPHABET += "0123456789-_";
  var str = "";
  for (var i = 0; i < length; ++i) {
    var rand = Math.floor(Math.random() * ALPHABET.length);
    str += ALPHABET.substring(rand, rand + 1);
  }
  return str;
}
random_str(6); // "NdQKOr"

// 返回随机字符另一个实现
const str = "abcdefghijklmnopqrstuvwxyz9876543210";
const l = 6;
// [...Array(l)].map(()=>str.charAt(Math.floor(Math.random() * str.length))).join('');
[...Array(l)].map(() => str[~~(Math.random() * str.length)]).join("");
```
