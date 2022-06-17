Dart 有两种类型的包： 应用 包 和 库 包。

最简单的库包的 目录结构：
通常情况下都把实现代码放到 `lib/src` 目录中。
位于 `lib/src` 下面的代码被认为是私有的；
其他包不应该直接导入 `src/...` 里面的代码。

要分享 lib/src 下的 API，你可以在 lib 目录下 创建一个文件，
在这个文件中导入 lib/src 中的代码。

```sh
root ------lib-----file.dart
        |--pubspec.yaml
```

- 库不仅仅提供 API， 还是一个私有单元：
  以下划线 (\_) 开头的标识符只有在库 内部可见。
  每个 Dart app 都是一个库， 即使没有使用 library 命令也是一个库
- import 必须参数为库 的 URI。
  对于内置的库，URI 使用特殊的 dart: scheme。
  对于其他的库，你可以使用文件系统路径或者 package: scheme。
  package: scheme 指定的库通过包管理器来提供， 例如 pub 工具。

```dart
import 'dart:html';
import 'dart:io';
import 'package:mylib/mylib.dart';
import 'package:utils/utils.dart';

// Specifying a library prefix（指定库前缀）
import 'package:lib1/lib1.dart';
import 'package:lib2/lib2.dart' as lib2;
// ...
Element element1 = new Element();           // Uses Element from lib1.
lib2.Element element2 = new lib2.Element(); // Uses Element from lib2.

// Importing only part of a library（导入库的一部分）
// Import only foo.
import 'package:lib1/lib1.dart' show foo;
// Import all names EXCEPT foo.
import 'package:lib2/lib2.dart' hide foo;

// Lazily loading a library（延迟载入库）
// 可以多次调用 loadLibrary() 函数。 但是该库只是载入一次
import 'package:deferred/hello.dart' deferred as hello;
greet() async {
  await hello.loadLibrary();
  hello.printGreeting();
}


import 'french.dart';
export 'french.dart' show hello;

// 引入某个库的多个对象
import 'package:flutter/material.dart' show StatefulWidget, StatelessWidget;
```
