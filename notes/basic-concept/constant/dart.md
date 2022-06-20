- dart 的`final`类似于 js 中的 const，只能定义一次，但可运行时才确定值，
  如果是复杂对象，内存地址不变，但是对象的成员是可变的。
- dart 的`const`比 final 限制更严格，在编译时需有确定值，运行时不可变，
  不但内存地址不变，对象的成员也都不可变。

```dart
// 一个 final 变量只能赋值一次
final name = 'Bob';
final String name = 'Bob';
// 一个 const 变量是编译时常量
const bar = 1000000;
var varList = const [];
```
