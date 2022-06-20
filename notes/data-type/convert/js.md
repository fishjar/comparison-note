```js
parseInt("v8", 32); // 1000

const string1 = "1";
const number1 = parseInt(string1);
console.log(number1 + 2); // 3
```

```js
// 小数点截取
(10).toFixed(2); // "10.00"
(10.005).toFixed(2); // "10.01"

// 2
console.log(Math.ceil(1.5));
// 1
console.log(Math.floor(1.5));
// 2
console.log(Math.round(1.5));
```

```js
// 10进制转为32进制
(1000).toString(32); // 'v8'
// 32进制转为10进制
parseInt("v8", 32); // 1000
```
