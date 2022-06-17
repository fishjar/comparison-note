- 所有能够使用变量引用的都是对象， 每个对象都是一个类的实例。
  在 Dart 中 甚至连 数字、方法和 null 都是对象。
  所有的对象都继承于 Object 类。
- 没有指定类型的变量的类型为 dynamic
- Dart 支持顶级方法 (例如 main())
- Dart 还支持顶级变量，以及 在类中定义变量（静态变量和实例变量）。
  实例变量有时候被称之为域（Fields）或者属性（Properties）
- Dart 没有 public、 protected、 和 private 关键字。
  如果一个标识符以 (\_) 开头，则该标识符 在库内是私有的。

```dart
// helloword.dart
// 定义个方法。
printNumber(num aNumber) {
  print('The number is $aNumber.'); // 在控制台打印内容。
}

// 这是程序执行的入口。
// 每个应用都需要有个顶级的 main() 入口方法才能执行。
// main() 方法的返回值为 void 并且有个可选的 List<String> 参数。
main() {
  var number = 42; // 定义并初始化一个变量。
  printNumber(number); // 调用一个方法。
}
```

```sh
dart helloword.dart
```
