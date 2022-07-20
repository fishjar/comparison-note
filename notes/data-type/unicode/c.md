## 字符的表示方法

- `\123`：以八进制值表示一个字符，斜杠后面需要三个数字。
- `\x4D`：以十六进制表示一个字符，`\x`后面是十六进制整数。
- `\u2620`：以 Unicode 码点表示一个字符（不适用于 ASCII 字符），码点以十六进制表示，`\u`后面需要 4 个字符。
- `\U0001243F`：以 Unicode 码点表示一个字符（不适用于 ASCII 字符），码点以十六进制表示，`\U`后面需要 8 个字符。

```c++
// 输出“ABC”
printf("ABC\n");
printf("\101\102\103\n");
printf("\x41\x42\x43\n");

// 输出“• Bullet 1”
printf("\u2022 Bullet 1\n");
printf("\U00002022 Bullet 1\n");
```

## 多字节字符

```c++
char* s = "\u6625\u5929";
printf("%s\n", s); // 春天

char* s = "春天"; // 如果当前系统是 UTF-8 编码
printf("%s\n", s);

char* s = u8"春天";
printf("%s\n", s);
```

## 宽字符

所谓“宽字符”，就是每个字符占用的字节数是固定的，要么是 2 个字节，要么是 4 个字节。

```c++
setlocale(LC_ALL, "");

wchar_t c = L'牛'；
printf("%lc\n", c);

wchar_t* s = L"春天";
printf("%ls\n", s);
```
