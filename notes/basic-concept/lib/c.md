## 引用自定义库

```c++
// File foo.c

#include <stdio.h>
#include "bar.h"

int main(void) {
  printf("%d\n", add(2, 3));  // 5!
}
```

```c++
// File bar.h
#ifndef BAR_H
  #define BAR_H
  int add(int, int);
#endif
```

```c++
// File bar.c
#include "bar.h"

int add(int a, int b) {
  return a + b;
}
```

```sh
gcc -o foo foo.c bar.c
```

## 分步编译

```sh
gcc -c foo.c # 生成 foo.o
gcc -c bar.c # 生成 bar.o
gcc -o foo foo.o bar.o # 链接，合并生成一个可执行文件
```

## make

```makefile
foo: foo.o bar.o
  gcc -o foo foo.o bar.o

foo.o: bar.h foo.c
  gcc -c foo.c

bar.o: bar.h bar.c
  gcc -c bar.c
```

```sh
make foo.o
make bar.o
make foo
make # 默认执行第一条编译规则
```
