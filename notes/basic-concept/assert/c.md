`assert.h`头文件定义了宏`assert()`

```c++
#define NDEBUG
#include <assert.h>

assert(PI > 3);

z = x * x - y * y;
assert(z >= 0);
// 上面的assert()语句类似于下面的代码
if (z < 0) {
  puts("z less than 0");
  abort();
}

// 如果当前计算机的int类型不等于4个字节，就会编译报错
static_assert(sizeof(int) == 4, "64-bit code generation is not supported.");
```
