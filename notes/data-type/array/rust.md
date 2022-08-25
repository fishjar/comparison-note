- 与元组不同，数组的每个元素必须具有相同的类型。
- 数组具有固定长度。

```rust
let months = ["January", "February", "March", "April", "May", "June", "July",
              "August", "September", "October", "November", "December"];
let a: [i32; 5] = [1, 2, 3, 4, 5];

// 变量名为 a 的数组将包含 5 个元素，这些元素的值初始化为 3。
let a = [3; 5];
let a = [3, 3, 3, 3, 3];
```
