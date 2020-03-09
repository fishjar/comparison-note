```dart
// as 类型转换
// is 如果对象是指定的类型返回 True
// is! 如果对象是指定的类型返回 False

if (emp is Person) { // Type check
  emp.firstName = 'Bob';
}
// 使用 as 操作符可以简化上面的代码：
(emp as Person).firstName = 'Bob';

// 可以使用 Object 的 runtimeType 属性来判断实例 的类型，
// 该属性 返回一个 Type 对象。
var msg = 'false';
print('The type of a is ${msg.runtimeType}');

// 其他方式
import 'dart:mirrors';
getTypeName(dynamic obj) {
  return reflect(obj).type.reflectedType.toString();
}
```
