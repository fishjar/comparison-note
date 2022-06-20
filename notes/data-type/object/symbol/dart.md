mirror 系统使用 Symbol 类对象 来表达定义的 Dart 标识符名字。
Symbols 在混淆后的代码也可以 使用。

如果在写代码的时候，已经知道 symbol 的名字了，则可以使用 #符号名字 的方式直接使用。
直接使用的 symbol 对象是编译时常量，多次定义引用的是同一个对象。
如果名字不知道，则可以通过 Symbol 构造函数来 创建

```dart
import 'dart:mirrors';

// If the symbol name is known at compile time.
const className = #MyClass;

// If the symbol name is dynamically determined.
var userInput = askUserForNameOfFunction();
var functionName = new Symbol(userInput);

// 要获取原来的 symbol 名字，使用 MirrorSystem.getName() 函数。
import 'dart:mirrors';
const className = #MyClass;
assert('MyClass' == MirrorSystem.getName(className));
```
