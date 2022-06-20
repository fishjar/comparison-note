```dart
// 不要 显式的把变量初始化为 null
int _nextId;
assert(_nextId == null);

// 没有明确类型
var name = 'Bob';
Object name = 'Bob';
dynamic name = 'Bob';

// 可以选择加上具体 类型
// 对于局部变量，这里准守 代码风格推荐 部分的建议，
// 使用 var 而不是具体的类型来定义局部变量。
String name2 = 'Bob';

// 定义集合
var points = [];
var addresses = {};
// 如果有必要还可以提供泛型类型
var points = <Point>[];
var addresses = <String, Address>{};
```

### 私有变量

```dart
// 变量名以"_"开头意味着对它的 lib 是私有的
var _name = 'Bob';
```
