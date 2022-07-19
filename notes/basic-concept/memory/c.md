C 语言的内存管理，分成两部分。

- 一部分是系统管理的 (”栈“（stack）)
- 另一部分是用户手动管理的 (”堆“（heap）)

## `void` 指针

```c++
int x = 10;
void* p = &x; // 整数指针转为 void 指针
int* q = p; // void 指针转为整数指针

char a = 'X';
void* p = &a;
printf("%c\n", *p); // 报错
```

## `malloc()`

```c++
// stdlib.h
void* malloc(size_t size)
```

```c++
int* p = malloc(sizeof(int));
int* p = (int*) malloc(sizeof(int));
int* p = (int*) malloc(sizeof(*p));

*p = 12;
printf("%d\n", *p); // 12
```

`malloc()`分配内存有可能分配失败，这时返回常量 `NULL`。
`Null` 的值为 0，是一个无法读写的内存地址，可以理解成一个不指向任何地方的指针

```c++
int* p = malloc(sizeof(int));

if (p == NULL) {
  // 内存分配失败
}

// or
if (!p) {
  //...
}
```

```c++
// p是一个整数指针，指向一段可以放置10个整数的内存
int* p = (int*) malloc(sizeof(int) * 10);
for (int i = 0; i < 10; i++)
  p[i] = i * 5;

// 字符串初始化可以使用strcpy()函数
char* p = malloc(4);
strcpy(p, "abc");
// or
p = "abc";
```

```c++
// malloc()可以根据变量n的不同，动态为数组分配不同的大小
int* p = (int*) malloc(n * sizeof(int));
```

## `free()`

`free()`用于释放`malloc()`函数分配的内存

```c++
// stdlib.h
void free(void* block)
```

```c++
int* p = (int*) malloc(sizeof(int));
*p = 12;
free(p);
```

## `calloc()`

- `calloc()`接受两个参数，第一个参数是某种数据类型的值的数量，第二个是该数据类型的单位字节长度。
- `calloc()`的返回值也是一个 `void` 指针。分配失败时，返回 `NULL`
- `calloc()`会将所分配的内存全部初始化为 0。
  - `malloc()`不会对内存进行初始化，如果想要初始化为 0，还要额外调用 `memset()`函数
- `calloc()`分配的内存块，也要使用`free()`释放

```c++
// stdlib.h
void* calloc(size_t n, size_t size);
```

```c++
int* p = calloc(10, sizeof(int));

// 等同于
int* p = malloc(sizeof(int) * 10);
memset(p, 0, sizeof(int) * 10);
```

### `realloc()`

- `realloc()`可能返回一个全新的地址，也可能返回跟原来一样的地址。
- `realloc()`不会对内存块进行初始化
- `block`：已经分配好的内存块指针（由`malloc()`或`calloc()`或`realloc()`产生）。
- `size`：该内存块的新大小，单位为字节。

```c++
// stdlib.h
void* realloc(void* block, size_t size)
```

```c++
int* b;

b = malloc(sizeof(int) * 10);
b = realloc(b, sizeof(int) * 2000);
```

```c++
// realloc()的第一个参数可以是 NULL，这时就相当于新建一个指针。
// 如果realloc()的第二个参数是0，就会释放掉内存块。
char* p = realloc(NULL, 3490);
// 等同于
char* p = malloc(3490);
```

## `restrict` 说明符

使用 `restrict` 说明符，告诉编译器，该块内存区域只有当前指针一种访问方式

```c++
int* restrict p;
p = malloc(sizeof(int));

int* q = p;
*q = 0; // 未定义行为
```

## `memcpy()`

- `dest` 是目标地址，`source` 是源地址
- `dest` 和 `source` 都是 `void` 指针，表示这里不限制指针类型
- 两者都有 `restrict` 关键字，表示这两个内存块不应该有互相重叠的区域
- `memcpy()`的返回值是第一个参数，即目标地址的指针
- `memcpy()`可以取代`strcpy()`进行字符串拷贝

```c++
// string.h
void* memcpy(
  void* restrict dest,
  void* restrict source,
  size_t n
);
```

```c++
// 字符串s所在的内存，被拷贝到字符数组t所在的内存
#include <stdio.h>
#include <string.h>
int main(void) {
  char s[] = "Goats!";
  char t[100];
  memcpy(t, s, sizeof(s));  // 拷贝7个字节，包括终止符
  printf("%s\n", t);  // "Goats!"
  return 0;
}
```

```c++
char* s = "hello world";
size_t len = strlen(s) + 1;
char *c = malloc(len);
if (c) {
  // strcpy() 的写法
  strcpy(c, s);
  // memcpy() 的写法
  memcpy(c, s, len);
}
```

```c++
// 自定义一个复制内存的函数
void* my_memcpy(void* dest, void* src, int byte_count) {
  char* s = src;
  char* d = dest;
  while (byte_count--) {
    // *d++ = *s++ 语句相当于先执行 *d = *s（源字节的值复制给目标字节），
    // 然后各自移动到下一个字节。
    *d++ = *s++;
  }
  return dest;
}
```

## `memmove()`

`memmove()`函数用于将一段内存数据复制到另一段内存。
它跟 `memcpy()`的主要区别是，它允许目标区域与源区域有重叠。
如果发生重叠，源区域的内容会被更改；如果没有重叠，它与 `memcpy()`行为相同。

```c++
// string.h
void* memmove(
  void* dest,
  void* source,
  size_t n
);
```

```c++
// 从数组成员a[1]开始的99个成员，都向前移动一个位置
int a[100];
memmove(&a[0], &a[1], 99 * sizeof(int));

// 从字符串x的5号位置开始的10个字节，就是“Sweet Home”，memmove()将其前移到0号位置
char x[] = "Home Sweet Home";
// 输出 Sweet Home Home
printf("%s\n", (char *) memmove(x, &x[5], 10));
```

## `memcmp()`

```c++
// string.h
int memcmp(
  const void* s1,
  const void* s2,
  size_t n
);
```

```c++
char* s1 = "abc";
char* s2 = "acd";
int r = memcmp(s1, s2, 3); // 小于 0
```

```c++
char s1[] = {'b', 'i', 'g', '\0', 'c', 'a', 'r'};
char s2[] = {'b', 'i', 'g', '\0', 'c', 'a', 't'};

if (memcmp(s1, s2, 3) == 0) // true
if (memcmp(s1, s2, 4) == 0) // true
if (memcmp(s1, s2, 7) == 0) // false
```
