ES5 比较两个值是否相等，只有两个运算符：相等运算符（==）和严格相等运算符（===）。
它们都有缺点，前者会自动转换数据类型，后者的 NaN 不等于自身，以及+0 等于-0。

```js
Object.is("foo", "foo");
// true
Object.is({}, {});
// false
```