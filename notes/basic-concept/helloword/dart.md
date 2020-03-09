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
