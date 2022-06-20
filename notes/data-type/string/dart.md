Dart 字符串是 UTF-16 编码的字符序列。
可以使用单引号或者双引号来创建字符串：

```dart
var s1 = 'Single quotes work well for string literals.';
var s2 = "Double quotes work just as well.";
var s3 = 'It\'s easy to escape the string delimiter.';
var s4 = "It's even easier to use the other delimiter.";
```

使用三个单引号或者双引号也可以 创建多行字符串对象：

```dart
var s1 = '''
You can create
multi-line strings like this one.
''';

var s2 = """This is also a
multi-line string.""";
```

```dart
var s = r"In a raw string, even \n isn't special.";
```
