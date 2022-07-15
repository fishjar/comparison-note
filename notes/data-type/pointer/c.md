```c++
// 星号*可以放在变量名与类型关键字之间的任何地方
int* intPtr;
int   *intPtr;
int * intPtr;
int*  intPtr;

// 正确
int * foo, * bar;

// 错误
// foo是整数指针变量，而bar是整数变量，即*只对第一个变量生效
int* foo, bar;

// 表示变量foo是一个指针，指向的还是一个指针，第二个指针指向的则是一个整数。
int** foo;
```

## `*` 运算符

```c++
void increment(int* p) {
  *p = *p + 1; // *p就表示指针p所指向的那个值
}

int x = 1;
increment(&x);
printf("%d\n", x); // 2
```

## `&` 运算符

```c++
// x是一个整数变量，&x就是x的值所在的内存地址。
// printf()的%p是内存地址的占位符，可以打印出内存地址
int x = 1;
printf("x's address is %p\n", &x); // x's address is 0x7ffdca476054
```

## 指针变量的初始化

指针变量声明后，必须先让它指向一个分配好的地址，然后再进行读写，这叫做指针变量的初始化。

```c++
int* p;
*p = 1; // 错误
```

```c++
int* p;
int i;

p = &i;
*p = 13;
```

NULL 在 C 语言中是一个常量，表示地址为 0 的内存空间，这个地址是无法使用的，读写该地址会报错。

```c++
int* p = NULL;
```

## 指针的运算

### 指针与整数值的加减运算

`j + 1`表示指针向内存地址的高位移动一个单位，而一个单位的`short`类型占据两个字节的宽度，所以相当于向高位移动两个字节

```c++
short* j;
j = (short*)0x1234;
j = j + 1; // 0x1236
```

### 指针与指针的加法运算(非法)

### 指针与指针的减法

相同类型的指针允许进行减法运算，返回它们之间的距离，即相隔多少个数据单位。

```c++
short* j1;
short* j2;

j1 = (short*)0x1234;
j2 = (short*)0x1236;

ptrdiff_t dist = j2 - j1;
printf("%d\n", dist); // 1
```

## 函数指针

```c++
void print(int a) {
  printf("%d\n", a);
}
void (*print_ptr)(int) = &print;

(*print_ptr)(10);
// 等同于
print(10);
```

- C 语言还规定，函数名本身就是指向函数代码的指针，通过函数名就能获取函数地址。
  - 也就是说，`print` 和 `&print` 是一回事
- 因此，上面代码的 `print_ptr` 等同于 `print`

```c++
if (print == &print) // true

void (*print_ptr)(int) = &print;
// 或
void (*print_ptr)(int) = print;
if (print_ptr == print) // true

// 函数compute()的第一个参数也是一个函数
int compute(int (*myfunc)(int), int, int);
```

对于任意函数，都有五种调用函数的写法。

```c++
// 写法一
print(10)

// 写法二
(*print)(10)

// 写法三
(&print)(10)

// 写法四
(*print_ptr)(10)

// 写法五
print_ptr(10)
```
