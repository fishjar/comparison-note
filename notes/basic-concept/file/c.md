```c++
#include <stdio.h>
int main(void) {
  FILE* fp;
  char c;

  fp = fopen("hello.txt", "r");
  if (fp == NULL) {
    return -1;
  }

  c = fgetc(fp);
  printf("%c\n", c);

  fclose(fp);
  return 0;
}
```

## 标准流

- `stdin`（标准输入）：默认来源为键盘，文件指针编号为`0`。
- `stdout`（标准输出）：默认目的地为显示器，文件指针编号为`1`。
- `stderr`（标准错误）：默认目的地为显示器，文件指针编号为`2`。

```sh
demo < in.dat
demo > out.dat
demo >> out.dat
demo > out.dat 2> err.txt # 标准错误的重定向符号是2>

demo < in.dat > out.dat
demo > out.dat < in.dat
random | sum # 将一个程序的标准输出stdout，指向另一个程序的标准输入stdin
```

## EOF

头文件`stdio.h`为这个特殊值定义了一个宏`EOF`（end of file 的缩写）

不像字符串结尾真的存储了\0 这个值，EOF 并不存储在文件结尾，文件中并不存在这个值，完全是文件操作函数发现到达了文件结尾，而返回这个值
