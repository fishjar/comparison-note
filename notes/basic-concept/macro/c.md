```c++
// 将源码里面的MAX，全部替换成100
#define MAX 100


#define HELLO "Hello, world"
// 相当于 printf("%s", "Hello, world");
printf("%s", HELLO);


// 多重替换
#define TWO 2
#define FOUR TWO*TWO


// 如果宏出现在字符串里面（即出现在双引号中），或者是其他标识符的一部分，就会失效，并不会发生替换
#define TWO 2
printf("TWO\n"); // 输出 TWO
const TWOs = 22;
printf("%d\n", TWOs); // 输出 22
```

## 带参数的宏

```c++
// 宏SQUARE可以接受一个参数X，替换成X*X
#define SQUARE(X) X*X
// 替换成 z = 2*2;
z = SQUARE(2);


// 输出19
// 3 + 4*3 + 4
printf("%d\n", SQUARE(3 + 4));


// 尽量多使用圆括号，避免意外
#define SQUARE(X) ((X) * (X))


// 一些例子
#define getchar() getc(stdin)
#define MAX(x, y) ((x)>(y)?(x):(y))
#define IS_EVEN(n) ((n)%2==0)

// 嵌套 (一元二次方程组求解的宏)
// 由于存在正负两个解，所以宏QUAD先替换成另外两个宏QUADP和QUADM，后者再各自替换成一个解
#define QUADP(a, b, c) ((-(b) + sqrt((b) * (b) - 4 * (a) * (c))) / (2 * (a)))
#define QUADM(a, b, c) ((-(b) - sqrt((b) * (b) - 4 * (a) * (c))) / (2 * (a)))
#define QUAD(a, b, c) QUADP(a, b, c), QUADM(a, b, c)
```

## `#`运算符，`##`运算符

```c++
// 希望替换后的值为字符串
#define STR(x) #x
// 等同于 printf("%s\n", "3.14159");
printf("%s\n", STR(3.14159));

#define XNAME(n) "x"#n
// 输出 x4
printf("%s\n", XNAME(4));


// 参数需要跟其他标识符连在一起，组成一个新的标识符
// 批量生成变量名和标识符
#define MK_ID(n) i##n
int MK_ID(1), MK_ID(2), MK_ID(3);
// 替换成
int i1, i2, i3;
```

## 不定参数的宏

```c++
#define X(a, b, ...) (10*(a) + 20*(b)), __VA_ARGS__
X(5, 4, 3.14, "Hi!", 12)
// 替换成
(10*(5) + 20*(4)), 3.14, "Hi!", 12
```

## `#undef`

有时候想重新定义一个宏，但不确定是否以前定义过，就可以先用`#undef` 取消

```c++
#define LIMIT 400
#undef LIMIT // 取消已经使用#define定义的宏
```

```sh
# 在命令行取消宏的定义，相当于#undef
gcc -ULIMIT foo.c
```

## 预定义宏

- `__DATE__`：编译日期，格式为“Mmm dd yyyy”的字符串（比如 Nov 23 2021）。
- `__TIME__`：编译时间，格式为“hh:mm:ss”。
- `__FILE__`：当前文件名。
- `__LINE__`：当前行号。
- `__func__`：当前正在执行的函数名。该预定义宏必须在函数作用域使用。
- `__STDC__`：如果被设为 1，表示当前编译器遵循 C 标准。
- `__STDC_HOSTED__`：如果被设为 1，表示当前编译器可以提供完整的标准库；否则被设为 0（嵌入式系统的标准库常常是不完整的）。
- `__STDC_VERSION__`：编译所使用的 C 语言版本，是一个格式为 yyyymmL 的长整数，C99 版本为“199901L”，C11 版本为“201112L”，C17 版本为“201710L”。

```c++
#include <stdio.h>

int main(void) {
  printf("This function: %s\n", __func__);
  printf("This file: %s\n", __FILE__);
  printf("This line: %d\n", __LINE__);
  printf("Compiled on: %s %s\n", __DATE__, __TIME__);
  printf("C Version: %ld\n", __STDC_VERSION__);
}

/* 输出如下

This function: main
This file: test.c
This line: 7
Compiled on: Mar 29 2021 19:19:37
C Version: 201710

*/
```

```c++
// 将下一行的行号重置为 300
#line 300


// `#error` 指令用于让预处理器抛出一个错误，终止编译。
#if __STDC_VERSION__ != 201112L
  #error Not C11
#endif


// 使用 C99 标准
#pragma c9x on
```
