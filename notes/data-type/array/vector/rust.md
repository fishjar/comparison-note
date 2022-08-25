- 集合指向的数据是储存在堆上的，这意味着数据的数量不必在编译时就已知，并且还可以随着程序的运行增长或缩小。
- vector 只能储存相同类型的值。

## `Vec<T>`

```rust
// 定义
let v: Vec<i32> = Vec::new();
// or
let v = vec![1, 2, 3];

// 更新 vector
let mut v = Vec::new();
v.push(5);
v.push(6);
v.push(7);
v.push(8);

// 读取 vector 的元素
let v = vec![1, 2, 3, 4, 5];
let third: &i32 = &v[2]; // 索引语法
println!("The third element is {}", third);
match v.get(2) { // get 方法
    Some(third) => println!("The third element is {}", third),
    None => println!("There is no third element."),
}

// 引用规则
let mut v = vec![1, 2, 3, 4, 5];
let first = &v[0];
v.push(6); // 错误
println!("The first element is: {}", first);

// 遍历
let v = vec![100, 32, 57];
for i in &v {
    println!("{}", i);
}

// 遍历
let mut v = vec![100, 32, 57];
for i in &mut v {
    *i += 50;
}

// 使用枚举来储存多种类型
enum SpreadsheetCell {
    Int(i32),
    Float(f64),
    Text(String),
}
let row = vec![
    SpreadsheetCell::Int(3),
    SpreadsheetCell::Text(String::from("blue")),
    SpreadsheetCell::Float(10.12),
];
```
