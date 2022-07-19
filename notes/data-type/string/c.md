所有字符串的最后一个字符，都是`\0`

```c++
// 声明了一个10个成员的字符数组，可以当作字符串。
// 由于必须留一个位置给\0，所以最多只能容纳9个字符的字符串。
char localString[10];

// C 语言提供了一种简写法，双引号之中的字符，会被自动视为字符数组。
// 不用自己添加结尾字符\0，C 语言会自动添加
{'H', 'e', 'l', 'l', 'o', '\0'}
// 等价于
"Hello"


char greeting[50] = "Hello, ""how are you ""today!";
// 等同于
char greeting[50] = "Hello, how are you today!";
// 等同于
char greeting[50] = "Hello, "
  "how are you "
  "today!";

// 使用占位符%s输出字符串。
printf("%s\n", "hello world")
```

## 字符串变量的声明

```c++
// 写法一
char s[14] = "Hello, world!";
char s[] = "Hello, world!"; // 省略字符数组的长度

// 写法二
char* s = "Hello, world!";
const char* s = "Hello, world!";
```

- 指针指向的字符串，在 C 语言内部被当作常量，不能修改字符串本身。

```c++
char* s = "Hello, world!";
s[0] = 'z'; // 错误

char s[] = "Hello, world!";
s[0] = 'z';
```

- 指针变量可以指向其它字符串。
- 但是，字符数组变量不能指向另一个字符串。
- 编译器一旦为数组变量分配地址后，这个地址就绑定这个数组变量了，这种绑定关系是不变的。
- 想要重新赋值，必须使用 C 语言原生提供的`strcpy()`函数，通过字符串拷贝完成赋值。

```c++
char* s = "hello";
s = "world";

char s[] = "hello";
s = "world"; // 报错

char s[10];
s = "abc"; // 错误

char s[10];
strcpy(s, "abc");
```

## 相关函数

### `strlen()`

```c++
// strlen()函数返回字符串的字节长度，不包括末尾的空字符\0。该函数的原型如下。
// string.h
size_t strlen(const char* s);


// 返回的是size_t类型的无符号整数，除非是极长的字符串，一般情况下当作int类型处理即可。
char* str = "hello";
int len = strlen(str); // 5
```

```c++
#include <stdio.h>
#include <string.h>
int main(void) {
  char* s = "Hello, world!";
  printf("The string is %zd characters long.\n", strlen(s));
}
```

```c++
char s[50] = "hello";
printf("%d\n", strlen(s));  // 5
printf("%d\n", sizeof(s));  // 50
```

```c++
// 自己计算字符串长度。
int my_strlen(char *s) {
  int count = 0;
  while (s[count] != '\0')
    count++;
  return count;
}
```

### `strcpy()`

```c++
char str1[10];
char str2[10];
str1 = "abc"; // 报错
str2 = str1;  // 报错


// 结果是两个指针变量s1和s2指向同一字符串，而不是将字符串s1的内容复制给s2
char* s1;
char* s2;
s1 = "abc";
s2 = s1;
```

```c++
// string.h
// 必须要保证第一个参数的长度不小于第二个参数，
// 否则虽然不会报错，但会溢出第一个字符串变量的边界，发生难以预料的结果。
// 第二个参数的const说明符，表示这个函数不会修改第二个字符串。
strcpy(char dest[], const char source[])
```

```c++
#include <stdio.h>
#include <string.h>

int main(void) {
  char s[] = "Hello, world!";
  char t[100];

  strcpy(t, s);

  t[0] = 'z';
  printf("%s\n", s);  // "Hello, world!"
  printf("%s\n", t);  // "zello, world!"
}
```

`strcpy()`的返回值是一个字符串指针（即`char*`），指向第一个参数。

```c++
char* s1 = "beast";
char s2[40] = "Be the best that you can be.";
char* ps;

// 从s2的第7个位置开始拷贝字符串beast，前面的位置不变
// s2后面的内容都被截去了，因为会连beast结尾的空字符一起拷贝
ps = strcpy(s2 + 7, s1);

puts(s2); // Be the beast
puts(ps); // beast
```

```c++
// 连续为多个字符数组赋值。
strcpy(str1, strcpy(str2, "abcd"));
```

```c++
// 自己实现字符串的拷贝
char* strcpy(char* dest, const char* source) {
  char* ptr = dest;
  // 依次将source的每个字符赋值给dest，然后移向下一个位置，直到遇到\0
  // *dest++这个表达式等同于*(dest++)，即先返回dest这个地址，再进行自增运算移向下一个位置，
  // 而*dest可以对当前位置赋值。
  while (*dest++ = *source++);
  return ptr;
}

int main(void) {
  char str[25];
  strcpy(str, "hello world");
  printf("%s\n", str);
  return 0;
}
```

### `strncpy()`

```c++
strncpy(str1, str2, sizeof(str1) - 1);
str1[sizeof(str1) - 1] = '\0'; // strncpy()不会自己添加\0
```

### `strcat()`

```c++
// string.h
// 函数会改变第一个字符串，但是第二个字符串不变
char* strcat(char* s1, const char* s2);
```

```c++
char s1[12] = "hello";
char s2[6] = "world";

strcat(s1, s2);
puts(s1); // "helloworld"
```

### `strncat()`

```c++
char* strncat(
  const char* dest,
  const char* src,
  size_t n
);
```

```c++
// strncat()总是会在拼接结果的结尾，自动添加空字符\0
// 通常会写成下面这样
strncat(
  str1,
  str2,
  sizeof(str1) - strlen(str1) - 1
);
```

### `strcmp()`

`strcmp()`只用来比较字符串，不用来比较字符。
因为字符就是小整数，直接用相等运算符（`==`）就能比较。

```c++
// s1 = Happy New Year
// s2 = Happy New Year
// s3 = Happy Holidays

strcmp(s1, s2) // 0
strcmp(s1, s3) // 大于 0
strcmp(s3, s1) // 小于 0
```

### `strncmp()`

```c++
char s1[12] = "hello world";
char s2[12] = "hello C";

if (strncmp(s1, s2, 5) == 0) {
  printf("They all have hello.\n");
}
```

### `sprintf()`，`snprintf()`

用于将数据写入字符串，而不是输出到显示器。

```c++
int sprintf(char* s, const char* format, ...);
int snprintf(char*s, size_t n, const char* format, ...);
```

```c++
char first[6] = "hello";
char last[6] = "world";
char s[40];

sprintf(s, "%s %s", first, last);
printf("%s\n", s); // hello world
```

```c++
// 表示写入字符串的最大长度不超过12（包括尾部的空字符）
snprintf(s, 12, "%s %s", "hello", "world");
```

## 字符串数组

```c++
char weekdays[7][10] = {
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday"
};

// 因为第一维的长度，编译器可以自动计算，所以可以省略。
char weekdays[][10] = {
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday"
};

// 把数组的第二维，从字符数组改成字符指针
// 其实是一个一维数组，成员就是7个字符指针，每个指针指向一个字符串（字符数组）
char* weekdays[] = {
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday"
};

// 遍历字符串数组
for (int i = 0; i < 7; i++) {
  printf("%s\n", weekdays[i]);
}
```
