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

```rust
fn main() {
    // 迭代器可以被收集到 vector 中
    let collected_iterator: Vec<i32> = (0..10).collect();
    println!("Collected (0..10) into: {:?}", collected_iterator);

    // `vec!` 宏可用来初始化一个 vector
    let mut xs = vec![1i32, 2, 3];
    println!("Initial vector: {:?}", xs);

    // 在 vector 的尾部插入一个新的元素
    println!("Push 4 into the vector");
    xs.push(4);
    println!("Vector: {:?}", xs);

    // 报错！不可变 vector 不可增长
    collected_iterator.push(0);
    // 改正 ^ 将此行注释掉

    // `len` 方法获得一个 vector 的当前大小
    println!("Vector size: {}", xs.len());

    // 下标使用中括号表示（从 0 开始）
    println!("Second element: {}", xs[1]);

    // `pop` 移除 vector 的最后一个元素并将它返回
    println!("Pop last element: {:?}", xs.pop());

    // 超出下标范围将抛出一个 panic
    println!("Fourth element: {}", xs[3]);
    // 改正 ^ 注释掉此行

    // 迭代一个 `Vector` 很容易
    println!("Contents of xs:");
    for x in xs.iter() {
        println!("> {}", x);
    }

    // 可以在迭代 `Vector` 的同时，使用独立变量（`i`）来记录迭代次数
    for (i, x) in xs.iter().enumerate() {
        println!("In position {} we have value {}", i, x);
    }

    // 多亏了 `iter_mut`，可变的 `Vector` 在迭代的同时，其中每个值都能被修改
    for x in xs.iter_mut() {
        *x *= 3;
    }
    println!("Updated vector: {:?}", xs);
}
```
