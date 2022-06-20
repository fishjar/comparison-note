```js
"a|b|c".split("|"); // ["a", "b", "c"]
"a||c".split("|"); // ['a', '', 'c']

// slice方法用于从原字符串取出子字符串并返回，不改变原字符串。
// 它的第一个参数是子字符串的开始位置，第二个参数是子字符串的结束位置（不含该位置）。

// substring方法跟slice方法很相像
// 不建议使用substring方法，应该优先使用slice
"JavaScript".slice(0, 4); // "Java"
"JavaScript".slice(-6); // "Script"
"JavaScript".slice(0, -6); // "Java"
"JavaScript".slice(-2, -1); // "p"

// substr方法的第一个参数是子字符串的开始位置（从0开始计算），第二个参数是子字符串的长度。
// 如果省略第二个参数，则表示子字符串一直到原字符串的结束。
// 如果第一个参数是负数，表示倒数计算的字符位置。
// 如果第二个参数是负数，将被自动转为0，因此会返回空字符串。
"JavaScript".substr(4, 6); // "Script"
"JavaScript".substr(-6); // "Script"
"JavaScript".substr(4, -1); // ""

const someString = "0123456";
// 234
console.log(someString.substring(2, 5));

const someString = "a,b,c";
const someStringSplit = someString.split(",");
// a
console.log(someStringSplit[0]);
// b
console.log(someStringSplit[1]);
// c
console.log(someStringSplit[2]);
```

```js
"  hello world  ".trim();
// "hello world"

const s = "  abc  ";
s.trim(); // "abc"
s.trimStart(); // "abc  "
s.trimEnd(); // "  abc"
```
