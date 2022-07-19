```c++
#if 0
  const double pi = 3.1415; // 不会执行
#endif
```

```c++
#define FOO 1

#if FOO
  printf("defined\n");
#else
  printf("not defined\n");
#endif


#if HAPPY_FACTOR == 0
  printf("I'm not happy!\n");
#elif HAPPY_FACTOR == 1
  printf("I'm just regular\n");
#else
  printf("I'm extra happy!\n");
#endif
```

```c++
#define DEBUG 1
#if DEBUG
printf("value of i : %d\n", i);
printf("value of j : %d\n", j);
#endif
```

```sh
# -D参数指定宏DEBUG为1，相当于在代码中指定#define DEBUG 1
gcc -DDEBUG=1 foo.c
```

```c++
// 使用#ifdef...#endif检查这个宏是否定义过
#ifdef EXTRA_HAPPY
  printf("I'm extra happy!\n");
#else
  printf("I'm just regular\n");
#endif

// 条件加载
#ifdef MAVIS
  #include "foo.h"
  #define STABLES 1
#else
  #include "bar.h"
  #define STABLES 2
#endif


#ifdef FOO
// 等同于
#if defined FOO


#if defined IBMPC
  #include "ibmpc.h"
#elif defined MAC
  #include "mac.h"
#else
  #include "general.h"
#endif


#ifndef MYHEADER_H
  #define MYHEADER_H
  #include "myheader.h"
#endif
```