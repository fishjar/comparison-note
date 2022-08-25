## 所有权

Rust 的核心功能（之一）是 所有权（ownership）。

- Rust 中的每一个值都有一个被称为其 所有者（owner）的变量。
- 值在任一时刻有且只有一个所有者。
- 当所有者（变量）离开作用域，这个值将被丢弃。

## 内存与分配

```rust
    {
        let s = String::from("hello"); // 从此处起，s 开始有效
        // 使用 s
    }                                  // 此作用域已结束，
                                       // s 不再有效
```

变量离开作用域，Rust 为我们调用一个特殊的函数。
这个函数叫做 `drop`。Rust 在结尾的 `}` 处自动调用 `drop`。

```rust
// 整数是有已知固定大小的简单值，所以这两个 5 被放入了栈中。
// 这里没有深浅拷贝的区别
let x = 5;
let y = x;
println!("x = {}, y = {}", x, y);

// 将 s1 赋值给 s2，String 的数据被复制了，
// 这意味着我们从栈上拷贝了它的指针、长度和容量。
// 我们并没有复制指针指向的堆上数据。
let s1 = String::from("hello");
let s2 = s1;

// 使用 clone 方法
let s1 = String::from("hello");
let s2 = s1.clone();
println!("s1 = {}, s2 = {}", s1, s2);
```

## 克隆

- 如果一个类型实现了 `Copy trait`，那么一个旧的变量在将其赋值给其他变量后仍然可用。
- Rust 不允许自身或其任何部分实现了 `Drop trait` 的类型使用 `Copy trait`。

如下是一些 Copy 的类型：

- 所有整数类型，比如 u32。
- 布尔类型，bool，它的值是 true 和 false。
- 所有浮点数类型，比如 f64。
- 字符类型，char。
- 元组，当且仅当其包含的类型也都实现 Copy 的时候。比如，(i32, i32) 实现了 Copy，但 (i32, String) 就没有。

## 引用与借用

- 在任意给定时间，要么 只能有一个可变引用，要么 只能有多个不可变引用。
- 引用必须总是有效的。

与使用 `&` 引用相反的操作是 解引用（dereferencing），它使用解引用运算符，`*`。

```rust
fn main() {
    let s1 = String::from("hello");
    let len = calculate_length(&s1);
    println!("The length of '{}' is {}.", s1, len);
}

fn calculate_length(s: &String) -> usize { // s 是对 String 的引用
    s.len()
}
```

```rust
fn main() {
    let mut s = String::from("hello"); // 可变引用
    change(&mut s);
}

fn change(some_string: &mut String) {
    some_string.push_str(", world");
}
```

不能在同一时间多次将 s 作为可变变量借用。

```rust
let mut s = String::from("hello");
let r1 = &mut s;
let r2 = &mut s; // 错误
println!("{}, {}", r1, r2);
```

可以使用大括号来创建一个新的作用域，以允许拥有多个可变引用，只是不能 同时 拥有

```rust
let mut s = String::from("hello");
{
    let r1 = &mut s;
} // r1 在这里离开了作用域，所以我们完全可以创建一个新的引用
let r2 = &mut s;
```

我们 也 不能在拥有不可变引用的同时拥有可变引用。

```rust
let mut s = String::from("hello");
let r1 = &s; // 没问题
let r2 = &s; // 没问题
let r3 = &mut s; // 大问题
println!("{}, {}, and {}", r1, r2, r3);
```

```rust
let mut s = String::from("hello");

let r1 = &s; // 没问题
let r2 = &s; // 没问题
println!("{} and {}", r1, r2);
// 此位置之后 r1 和 r2 不再使用

let r3 = &mut s; // 没问题
println!("{}", r3);
```

## 悬垂引用（Dangling References）

```rust
fn main() {
    let reference_to_nothing = dangle();
}

fn dangle() -> &String { // dangle 返回一个字符串的引用
    let s = String::from("hello"); // s 是一个新字符串
    &s // 返回字符串 s 的引用
} // 这里 s 离开作用域并被丢弃。其内存被释放。
  // 危险！
```
