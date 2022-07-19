```c++
printf("Hello World\n");
printf("%5d\n", 123); // 输出为 "  123"
printf("%-5d\n", 123); // 输出为 "123  "
printf("%12f\n", 123.45); // 输出 "  123.450000"
printf("%+d\n", 12); // 输出 +12
printf("%+d\n", -12); // 输出 -12
printf("Number is %.2f\n", 0.5); // 输出 Number is 0.50
printf("%6.2f\n", 0.5); // 输出为 "  0.50"

printf("%*.*f\n", 6, 2, 0.5);
// 等同于
printf("%6.2f\n", 0.5);

// 输出 hello
printf("%.5s\n", "hello world");
```

- `%a`：浮点数。
- `%A`：浮点数。
- `%c`：字符。
- `%d`：十进制整数。
- `%e`：使用科学计数法的浮点数，指数部分的`e`为小写。
- `%E`：使用科学计数法的浮点数，指数部分的`E`为大写。
- `%i`：整数，基本等同于`%d`。
- `%f`：小数（包含`float`类型和`double`类型）。
- `%g`：6 个有效数字的浮点数。整数部分一旦超过 6 位，就会自动转为科学计数法，指数部分的`e`为小写。
- `%G`：等同于`%g`，唯一的区别是指数部分的`E`为大写。
- `%hd`：十进制 short int 类型。
- `%ho`：八进制 short int 类型。
- `%hx`：十六进制 short int 类型。
- `%hu`：unsigned short int 类型。
- `%ld`：十进制 long int 类型。
- `%lo`：八进制 long int 类型。
- `%lx`：十六进制 long int 类型。
- `%lu`：unsigned long int 类型。
- `%lld`：十进制 long long int 类型。
- `%llo`：八进制 long long int 类型。
- `%llx`：十六进制 long long int 类型。
- `%llu`：unsigned long long int 类型。
- `%Le`：科学计数法表示的 long double 类型浮点数。
- `%Lf`：long double 类型浮点数。
- `%n`：已输出的字符串数量。该占位符本身不输出，只将值存储在指定变量之中。
- `%o`：八进制整数。
- `%p`：指针。
- `%s`：字符串。
- `%u`：无符号整数（unsigned int）。
- `%x`：十六进制整数。
- `%zd`：`size_t`类型。
- `%%`：输出一个百分号。
