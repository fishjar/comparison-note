```js
Reflect.ownKeys("".__proto__);
Reflect.ownKeys(String.prototype);

// Object.getOwnPropertyNames方法返回一个数组，
// 成员是参数对象本身的所有属性的键名，不包含继承的属性键名。
Object.getOwnPropertyNames(Date);
```
