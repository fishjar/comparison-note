## Union 结构

```c++
union quantity {
  short count;
  float weight;
  float volume;
};

// 写法一
union quantity q;
q.count = 4;

// 写法二
union quantity q = {.count=4};

// 写法三
// 不指定属性名，就会赋值给第一个属性
union quantity q = {4};

printf("count is %i\n", q.count); // count is 4
printf("weight is %f\n", q.weight); // 未定义行为

q.weight = 0.5;
printf("weight is %f\n", q.weight); // weight is 0.5
```
