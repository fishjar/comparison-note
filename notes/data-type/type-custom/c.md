## typedef 命令

typedef 命令用来为某个类型起别名

```c++
typedef type name;


typedef unsigned char BYTE;
BYTE c = 'z';

typedef int antelope, bagel, mushroom;

typedef int* intptr;
int a = 10;
intptr x = &a;

typedef int five_ints[5];
five_ints x = {11, 22, 33, 44, 55};

// 为函数起别名
// 类型别名fp是一个指针，代表函数signed char (*)(void)
typedef signed char (*fp)(void);
```

```c++
typedef char* STRING;
STRING name;


struct treenode {
  // ...
};
typedef struct treenode* Tree;


typedef struct animal {
  char* name;
  int leg_count, speed;
} animal;
// or
typedef struct {
  char *name;
  int leg_count, speed;
} animal;
```
