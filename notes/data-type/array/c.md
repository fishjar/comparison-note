```c++
int scores[100];

int a[5] = {22, 37, 3490, 18, 95};


int a[5] = {1, 2, 3, 4, 5};
a = {22, 37, 3490, 18, 95}; // 报错


int a[5] = {22, 37, 3490};
// 等同于
int a[5] = {22, 37, 3490, 0, 0};


// 将整个数组的每一个成员都设置为零
int a[100] = {0};


// 数组初始化时，可以指定为哪些位置的成员赋值。
int a[15] = {[2] = 29, [9] = 7, [14] = 48};

// 0号、5号、6号、10号、11号被赋值。
int a[15] = {1, [5] = 10, 11, [10] = 20, 21}


int a[] = {22, 37, 3490};
// 等同于
int a[3] = {22, 37, 3490};
```

## 数组长度

```c++
int a[] = {22, 37, 3490}; // 省略方括号里面的数组成员数量
int arrLen = sizeof(a); // 12
sizeof(a) / sizeof(a[0])


int x[12];
printf("%zu\n", sizeof(x));     // 48
printf("%zu\n", sizeof(int));  // 4
printf("%zu\n", sizeof(x) / sizeof(int)); // 12
```

## 多维数组

```c++
int board[10][10];

int a[2][5] = {
  {0, 1, 2, 3, 4},
  {5, 6, 7, 8, 9}
};

int a[2][2] = {[0][0] = 1, [1][1] = 2};  // 其他位置就自动设为0

// 不管数组有多少维度，在内存里面都是线性存储，a[0][0]的后面是a[0][1]，a[0][1]的后面是a[1][0]
// 下面的语句与上面的赋值语句是完全等同的
int a[2][2] = {1, 0, 0, 2};
```

## 变长数组

```c++
int n = x + y;
int arr[n];


int i = 10;
int a1[i];
int a2[i + 5];
int a3[i + k];


int m = 4;
int n = 5;
int c[m][n];
```

## 数组的地址

```c++
int a[5] = {11, 22, 33, 44, 55};
int* p;
p = &a[0];
printf("%d\n", *p);  // Prints "11"


// 数组名就是指向第一个成员（array[0]）的指针
int a[5] = {11, 22, 33, 44, 55};
int* p = &a[0];
// 等同于
int* p = a;


// 传入一个整数数组，与传入一个整数指针是同一回事
// 写法一
int sum(int arr[], int len);
// 写法二
int sum(int* arr, int len);


int sum(int* arr, int len) {
  int i;
  int total = 0;
  for (i = 0; i < len; i++) {
    total += arr[i];
  }
  return total;
}


int a[4][2];
// 取出 a[0][0] 的值
*(a[0]);
// 等同于
**a // 第一次取出的是a[0]，第二次取出的是a[0][0]


int ints[100];
ints = NULL; // 报错


int a[5] = {1, 2, 3, 4, 5};
// 写法一
int b[5] = a; // 报错
// 写法二
int b[5];
b = a; // 报错
```

## 数组指针的加减法

```c++
// 数组名可以进行加法和减法运算，等同于在数组成员之间前后移动
int a[5] = {11, 22, 33, 44, 55};
for (int i = 0; i < 5; i++) {
  printf("%d\n", *(a + i));
}

// 下面的等式总是成立
a[b] == *(a + b)
// 如果指针变量p指向数组的一个成员，那么p++就相当于指向下一个成员
// 不能直接对a进行自增，即a++的写法是错的
int a[] = {11, 22, 33, 44, 55, 999};
int* p = a;
while (*p != 999) {
  printf("%d\n", *p);
  p++;
}
```

```c++
int sum(int* start, int* end) {
  int total = 0;
  // 遍历数组也可以通过数组起始地址和结束地址的比较来实现
  while (start < end) {
    total += *start;
    start++;
  }
  return total;
}
int arr[5] = {20, 10, 5, 39, 4};
printf("%i\n", sum(arr, arr + 5));


int arr[5] = {20, 10, 5, 39, 88};
int* p = arr;
while (*p != 88)
  p++;
printf("%i\n", p - arr); // 4


int arr[4][2];
// 指针指向 arr[1]
arr + 1;
// 指针指向 arr[0][1]
arr[0] + 1


int* p = &a[5];
int* q = &a[1];
printf("%d\n", p - q); // 4
printf("%d\n", q - p); // -4
```

## 数组的复制

```c++
// a和b指向同一个数组
int* a;
int b[3] = {1, 2, 3};
a = b;


// 使用循环
for (i = 0; i < N; i++)
  a[i] = b[i];


// 使用memcpy()函数（定义在头文件string.h），直接把数组所在的那一段内存，再复制一份。
memcpy(a, b, sizeof(b));
```

## 作为函数的参数

```c++
int sum_array(int a[], int n) {
  // ...
}
int a[] = {3, 5, 7, 3};
int sum = sum_array(a, 4);


// 除了第一维的长度可以当作参数传入函数，其他维的长度需要写入函数的定义
int sum_array(int a[][4], int n) {
  // ...
}
int a[2][4] = {
  {1, 2, 3, 4},
  {8, 9, 10, 11}
};
int sum = sum_array(a, 2);


// 变长数组作为函数参数时，变量n顺序一定要在变长数组前
int sum_array(int n, int a[n]) {
  // ...
}
int a[] = {3, 5, 7, 3};
int sum = sum_array(4, a);


// 变长数组的原型中，可以使用*代替变量名，也可以省略变量名。
int sum_array(int, int [*]);
int sum_array(int, int []);


// 变长数组作为函数参数有一个好处，就是多维数组的参数声明，可以把后面的维度省掉了。
// 原来的写法
int sum_array(int a[][4], int n);
// 变长数组的写法
int sum_array(int n, int m, int a[n][m]);


// 数组字面量作为参数
// 数组变量作为参数
int a[] = {2, 3, 4, 5};
int sum = sum_array(a, 4);
// 数组字面量作为参数
int sum = sum_array((int []){2, 3, 4, 5}, 4);
```
