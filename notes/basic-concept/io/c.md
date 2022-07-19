## `printf()`

## `scanf()`

`scanf()`的返回值是一个整数，表示成功读取的变量个数。
如果没有读取任何项，或者匹配失败，则返回 0。
如果读取到文件结尾，则返回常量 `EOF`。

```c++
// stdio.h
scanf("%d", &i);
```

```c++
scanf("%d%d%f%f", &i, &j, &x, &y);


int x;
float y;
// 用户输入 "    -13.45e12# 0"
scanf("%d", &x); // -13
scanf("%f", &y); // .45e12
```

## `sscanf()`

`sscanf()`从字符串里面，而不是从用户输入获取数据

```c++
// stdio.h
int sscanf(const char* s, const char* format, ...);
```

```c++
// fgets()先从标准输入获取了一行数据，存入字符数组str。
// 然后，sscanf()再从字符串str里面提取两个整数，放入变量i和j
fgets(str, sizeof(str), stdin);
sscanf(str, "%d%d", &i, &j);
```

## `getchar()`, `putchar()`, `puts()`, `gets()`

- `getchar()`函数返回用户从键盘输入的一个字符
- `putchar()`函数将它的参数字符输出到屏幕
- `puts()`函数用于将参数字符串显示在屏幕（`stdout`）上，并且自动在字符串末尾添加换行符
- `gets()`函数以前用于从 `stdin` 读取整行输入，现在已经被废除了
  - 该函数读取用户的一行输入，不会跳过起始处的空白字符，直到遇到换行符为止

```c++
char ch;
ch = getchar();
// 等同于
scanf("%c", &ch);


putchar(ch);
// 等同于
printf("%c", ch);


puts("Here are some messages:");
puts("Hello World");


char words[81];
puts("Enter a string, please");
gets(words);
```
