```c++
struct fraction {
  int numerator;
  int denominator;
};
struct fraction f1;
f1.numerator = 22;
f1.denominator = 7;


struct car {
  char* name;
  float price;
  int speed;
};
struct car saturn = {"Saturn SL/2", 16000.99, 175};
// or
struct car saturn = {.speed=172, .name="Saturn SL/2"};
// 修改属性值
saturn.speed = 168;


// struct 的数据类型声明语句与变量的声明语句合并
struct book {
  char title[500];
  char author[100];
  float value;
} b1;
// 省略类型名
struct {
  char title[500];
  char author[100];
  float value;
} b1;
// 声明变量的同时，对变量赋值
struct {
  char title[500];
  char author[100];
  float value;
} b1 = {"Harry Potter", "J. K. Rowling", 10.0},
  b2 = {"Cancer Ward", "Aleksandr Solzhenitsyn", 7.85};


// typedef命令可以为 struct 结构指定一个别名
typedef struct cell_phone {
  int cell_no;
  float minutes_of_charge;
} phone;
phone p = {5551234, 5};


// 指针变量也可以指向struct结构
struct book {
  char title[500];
  char author[100];
  float value;
}* b1;
// 或者写成两个语句
struct book {
  char title[500];
  char author[100];
  float value;
};
struct book* b1;


// struct 结构也可以作为数组成员
struct fraction {
  int numerator;
  int denominator;
};
struct fraction numbers[1000];
numbers[0].numerator = 22;
numbers[0].denominator = 7;
```

`struct foo`有三个属性，在 64 位计算机上占用的存储空间分别是：

- `int a`占 4 个字节，
- 指针`char* b`占 8 个字节，
- `char c`占 1 个字节。

它们加起来，一共是 13 个字节（4 + 8 + 1）。
但是实际上，`struct foo`会占用 24 个字节

```c++
struct foo {
  int a;
  char* b;
  char c;
};
printf("%d\n", sizeof(struct foo)); // 24

// 真实的结构
struct foo {
  int a;        // 4
  char pad1[4]; // 填充4字节
  char *b;      // 8
  char c;       // 1
  char pad2[7]; // 填充7字节
};
printf("%d\n", sizeof(struct foo)); // 24

// 存储空间递增的顺序，定义每个属性
struct foo {
  char c;
  int a;
  char* b;
};
printf("%d\n", sizeof(struct foo)); // 16
```

## struct 的复制

```c++
struct cat { char name[30]; short age; } a, b;

strcpy(a.name, "Hula");
a.age = 3;

b = a;
b.name[0] = 'M';

printf("%s\n", a.name); // Hula
printf("%s\n", b.name); // Mula
```

## struct 指针

```c++
#include <stdio.h>

struct turtle {
  char* name;
  char* species;
  int age;
};

void happy(struct turtle t) {
  t.age = t.age + 1;
}

int main() {
  struct turtle myTurtle = {"MyTurtle", "sea turtle", 99};
  happy(myTurtle);
  printf("Age is %i\n", myTurtle.age); // 输出 99
  return 0;
}
```

```c++
#include <stdio.h>

struct turtle {
  char* name;
  char* species;
  int age;
};

void happy(struct turtle* t) {
  (*t).age = (*t).age + 1;
}
// 或者使用箭头运算符
// ptr == &myStruct
// myStruct.prop == (*ptr).prop == ptr->prop
void happy(struct turtle* t) {
  t->age = t->age + 1;
}

int main() {
  struct turtle myTurtle = {"MyTurtle", "sea turtle", 99};
  happy(&myTurtle);
  printf("Age is %i\n", myTurtle.age); // 输出 99
  return 0;
}
```

## struct 的嵌套

```c++
struct species {
  char* name;
  int kinds;
};
struct fish {
  char* name;
  int age;
  struct species breed;
};

// 赋值
// 写法一
struct fish shark = {"shark", 9, {"Selachimorpha", 500}};

// 写法二
struct species myBreed = {"Selachimorpha", 500};
struct fish shark = {"shark", 9, myBreed};

// 写法三
struct fish shark = {
  .name="shark",
  .age=9,
  .breed={"Selachimorpha", 500}
};

// 写法四
struct fish shark = {
  .name="shark",
  .age=9,
  .breed.name="Selachimorpha",
  .breed.kinds=500
};

printf("Shark's species is %s", shark.breed.name);



struct name {
  char first[50];
  char last[50];
};
struct student {
  struct name name;
  short age;
  char sex;
} student1;

strcpy(student1.name.first, "Harry");
strcpy(student1.name.last, "Potter");
// or
struct name myname = {"Harry", "Potter"};
student1.name = myname;
```

### 链表结构

```c++
struct node {
  int data;
  struct node* next;
};

struct node* head;

// 生成一个三个节点的列表 (11)->(22)->(33)
head = malloc(sizeof(struct node));

head->data = 11;
head->next = malloc(sizeof(struct node));

head->next->data = 22;
head->next->next = malloc(sizeof(struct node));

head->next->next->data = 33;
head->next->next->next = NULL;

// 遍历这个列表
for (struct node *cur = head; cur != NULL; cur = cur->next) {
  printf("%d\n", cur->data);
}
```

## 位字段

```c++
struct {
  unsigned int ab:1;
  unsigned int cd:1;
  unsigned int ef:1;
  unsigned int gh:1;
} synth;

synth.ab = 0;
synth.cd = 1;
```

## 弹性数组成员

弹性成员的数组，必须是 `struct` 结构的最后一个属性。
另外，除了弹性数组成员，`struct` 结构必须至少还有一个其他属性。

```c++
struct vstring {
  int len;
  char chars[];
};
struct vstring* str = malloc(sizeof(struct vstring) + n * sizeof(char));
str->len = n;
```
