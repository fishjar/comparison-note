## 三元操作符

- `condition ? expr1 : expr2`
  - 如果 condition 是 true，执行 expr1 (并返回执行的结果)；
  - 否则执行 expr2 并返回其结果。
- `expr1 ?? expr2`
  - 如果 expr1 是 non-null，返回其值；
  - 否则执行 expr2 并返回其结果。

## 级联操作符

级联操作符 (..) 可以在同一个对象上 连续调用多个函数以及访问成员变量。

```dart
querySelector('#button') // Get an object.
  ..text = 'Confirm'   // Use its members.
  ..classes.add('important')
  ..onClick.listen((e) => window.alert('Confirmed!'));
// 上面的代码和下面的代码功能一样：
var button = querySelector('#button');
button.text = 'Confirm';
button.classes.add('important');
button.onClick.listen((e) => window.alert('Confirmed!'));
```

## 条件成员访问

`?.` 和 `.` 类似，但是左边的操作对象不能为 null，
例如 `foo?.bar` 如果 foo 为 null 则返回 null，否则返回 bar 成员
