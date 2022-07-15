- 如果函数没有返回值，可以省略 return 语句，或者写成 return;
- C 语言标准规定，函数只能声明在源码文件的顶层，不能声明在其他函数内部。
- 函数可以调用自身，这就叫做递归（recursion）。
- 函数不要返回内部变量的指针。

```c++
int plus_one(int n) {
  return n + 1;
}
```

```c++
unsigned long Fibonacci(unsigned n) {
  if (n > 2)
    return Fibonacci(n - 1) + Fibonacci(n - 2);
  else
    return 1;
}
```

```c++
void Swap(int* x, int* y) {
  int temp;
  temp = *x;
  *x = *y;
  *y = temp;
}

int a = 1;
int b = 2;
Swap(&a, &b);
```

## 函数原型

```c++
// 代码头部先给出了函数原型，所以可以正确编译
int twice(int);

int main(int num) {
  return twice(num);
}

int twice(int num) {
  return 2 * num;
}
```

## `exit()`

- 在 `main()`函数里面，`exit()`等价于使用 `return` 语句。
- 其他函数使用 `exit()`，就是终止整个程序的运行，没有其他作用。

```c++
// 程序运行成功
// 等同于 exit(0);
exit(EXIT_SUCCESS);

// 程序异常中止
// 等同于 exit(1);
exit(EXIT_FAILURE);
```

C 语言还提供了一个`atexit()`函数，用来登记`exit()`执行时额外执行的函数，用来做一些退出程序时的收尾工作。

```c++
// int atexit(void (*func)(void));
void print(void) {
  printf("something wrong!\n");
}

atexit(print);
exit(EXIT_FAILURE);
```

## 函数说明符

### `extern` 说明符

当前文件里面，需要给出外部函数的原型，并用 `extern` 说明该函数的定义来自其他文件。

```c++
// 函数foo()定义在其他文件，extern告诉编译器当前文件不包含该函数的定义
extern int foo(int arg1, char arg2);

int main(void) {
  int a = foo(2, 3);
  // ...
  return 0;
}
```

### `static` 说明符

- `static` 用于函数内部声明变量时，表示该变量只需要初始化一次，不需要在每次调用时都进行初始化。
- `static` 修饰的变量初始化时，只能赋值为常量，不能赋值为变量
- 在块作用域中，`static` 声明的变量有默认值 0

```c++
#include <stdio.h>

void counter(void) {
  static int count = 1;  // 只初始化一次
  printf("%d\n", count);
  count++;
}

int main(void) {
  counter();  // 1
  counter();  // 2
  counter();  // 3
  counter();  // 4
}
```

`static` 关键字表示该函数只能在当前文件里使用，如果没有这个关键字，其他文件也可以使用这个函数（通过声明函数原型）。

```c++
static int Twice(int num) {
  int result = num * 2;
  return(result);
}
```

`static` 也可以用在参数里面，修饰参数数组。
只是用来告诉编译器，该数组长度至少为 3，某些情况下可以加快程序运行速度。

```c++
int sum_array(int a[static 3], int n) {
  // ...
}
```

### `const` 说明符

在指针参数前面加上 `const` 说明符，告诉编译器，函数内部不能修改该参数所指向的值。

```c++
void f(const int* p) {
  *p = 0; // 该行报错
}
```

但是上面这种写法，只限制修改 p 所指向的值，而 p 本身的地址是可以修改的。

```c++
void f(const int* p) {
  int x = 13;
  p = &x; // 允许修改
}
```

如果想同时限制修改 `p` 和 `*p`，需要使用两个 `const`

```c++
void f(const int* const p) {
  // ...
}
```

## 可变参数

```c++
int printf(const char* format, ...);
```

头文件 `stdarg.h` 定义了一些宏，可以操作可变参数。

- （1）`va_list`：一个数据类型，用来定义一个可变参数对象。它必须在操作可变参数时，首先使用。
- （2）`va_start`：一个函数，用来初始化可变参数对象。它接受两个参数，第一个参数是可变参数对象，第二个参数是原始函数里面，可变参数之前的那个参数，用来为可变参数定位。
- （3）`va_arg`：一个函数，用来取出当前那个可变参数，每次调用后，内部指针就会指向下一个可变参数。它接受两个参数，第一个是可变参数对象，第二个是当前可变参数的类型。
- （4）`va_end`：一个函数，用来清理可变参数对象。

```c++
double average(int i, ...) {
  double total = 0;
  va_list ap;
  va_start(ap, i);
  for (int j = 1; j <= i; ++j) {
    total += va_arg(ap, double);
  }
  va_end(ap);
  return total / i;
}
```
