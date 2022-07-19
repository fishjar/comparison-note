```c++
enum colors {RED, GREEN, BLUE};

printf("%d\n", RED); // 0
printf("%d\n", GREEN);  // 1
printf("%d\n", BLUE);  // 2

enum colors color;
color = BLUE;
printf("%i\n", color); // 2

// typedef 命令可以为 Enum 类型起别名
typedef enum {
  SHEEP,
  WHEAT,
  WOOD,
  BRICK,
  ORE
} RESOURCE;
RESOURCE r;

// 声明 Enum 类型时，在同一行里面为变量赋值
enum {
  SHEEP,
  WHEAT,
  WOOD,
  BRICK,
  ORE
} r = BRICK, s = WOOD;


enum { ONE, TWO };
printf("%d %d", ONE, TWO);  // 0 1

enum { ONE = 1, TWO = 2 };
printf("%d %d", ONE, TWO);  // 1 2

enum { X = 2, Y = 18, Z = -2 };

enum {
  A,    // 0
  B,    // 1
  C = 4,  // 4
  D,    // 5
  E,    // 6
  F = 3,   // 3
  G,    // 4
  H     // 5
};
```
