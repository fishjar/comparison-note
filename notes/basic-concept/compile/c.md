`#include`最常见的用途，就是用来加载包含函数原型的头文件（后缀名为`.h`）

```c++
// 形式一
#include <foo.h> // 加载系统提供的文件

// 形式二
#include "foo.h" // 加载用户提供的文件
#include "/usr/local/lib/foo.h"
```

```sh
# GCC 编译器的-I参数，也可以用来指定include命令中用户文件的加载路径。
gcc -Iinclude/ -o code code.c
```
