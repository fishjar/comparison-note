```c++
#include <stdio.h>

int main(int argc, char* argv[]) {
    // 参数数量判断
    if (argc != 3) {
        printf("usage: mult x y\n");
        return 1;
    }

    // 遍历参数
    for (int i = 0; i < argc; i++) {
    printf("arg %d: %s\n", i, argv[i]);
    }

    // 参数的遍历也可以写成下面这样
    for (char** p = argv; *p != NULL; p++) {
    printf("arg: %s\n", *p);
    }

    // 读取环境变量
    char* val = getenv("HOME");
    if (val == NULL) {
    printf("Cannot find the HOME environment variable\n");
    return 1;
    }
    printf("Value: %s\n", val);

    return 0;
}
```

```c++
// 字符串指针可以看成是字符数组，所以下面三种写法是等价的
// 写法一
int main(int argc, char* argv[])
// 写法二
int main(int argc, char** argv)
// 写法三
int main(int argc, char argv[][])
```

```sh
./foo hello world
echo $?
```
