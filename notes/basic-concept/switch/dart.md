Dart 中的 Switch 语句使用 == 比较 integer、string、或者编译时常量。
比较的对象必须都是同一个类的实例（并且不是 其子类）

每个非空的 case 语句都必须有一个 break 语句。
另外还可以通过 continue、 throw 或 者 return 来结束非空 case 语句。
当没有 case 语句匹配的时候，可以使用 default 语句来匹配这种默认情况。

```dart
var command = 'OPEN';
switch (command) {
  case 'CLOSED':
    executeClosed();
    break;
  case 'PENDING':
    executePending();
    break;
  case 'APPROVED':
    executeApproved();
    break;
  case 'DENIED':
    executeDenied();
    break;
  case 'OPEN':
    executeOpen();
    break;
  default:
    executeUnknown();
}

// 在 Dart 中的空 case 语句中可以不要 break 语句：
var command = 'CLOSED';
switch (command) {
  case 'CLOSED': // Empty case falls through.
  case 'NOW_CLOSED':
    // Runs for both CLOSED and NOW_CLOSED.
    executeNowClosed();
    break;
}

//  使用 continue 语句跳转到对应的标签（label）处继续执行
var command = 'CLOSED';
switch (command) {
  case 'CLOSED':
    executeClosed();
    continue nowClosed;
    // Continues executing at the nowClosed label.
nowClosed:
  case 'NOW_CLOSED':
    // Runs for both CLOSED and NOW_CLOSED.
    executeNowClosed();
    break;
}
```
