```dart
// 使用 break 来终止循环：
while (true) {
  if (shutDownRequested()) break;
  processIncomingRequests();
}
// 使用 continue 来开始下一次循环：
for (int i = 0; i < candidates.length; i++) {
  var candidate = candidates[i];
  if (candidate.yearsExperience < 5) {
    continue;
  }
  candidate.interview();
}
// 上面的代码在实现 Iterable 接口对象上可以使用下面的写法：
candidates.where((c) => c.yearsExperience >= 5)
          .forEach((c) => c.interview());
```
