```dart
var message = new StringBuffer("Dart is fun");
for (var i = 0; i < 5; i++) {
  message.write('!');
}

// art for 循环中的闭包会捕获循环的 index 索引值
var callbacks = [];
for (var i = 0; i < 2; i++) {
  callbacks.add(() => print(i));
}
callbacks.forEach((c) => c());

// 如果不需要当前遍历的索引
candidates.forEach((candidate) => candidate.interview());

// List 和 Set 等实现了 Iterable 接口的类还支持 for-in 形式的 遍历：
var collection = [0, 1, 2];
for (var x in collection) {
  print(x);
}
```
