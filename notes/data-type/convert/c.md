## 类型的显示转换

```c++
// 将变量ch转成无符号的字符类型
(unsigned char) ch;

// (long int)将10显式转为long int类型。
// 这里的显示转换其实是不必要的，因为赋值运算符会自动将右边的值，转为左边变量的类型。
long int y = (long int) 10 + 12;
```