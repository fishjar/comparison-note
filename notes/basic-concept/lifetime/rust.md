Rust 中的每一个引用都有其 生命周期（lifetime），也就是引用保持有效的作用域。

## 悬垂引用

```rust
{
    let r;
    {
        let x = 5;
        r = &x;
    }
    println!("r: {}", r);
}
```

```rust
// 错误
// 因为 Rust 并不知道将要返回的引用是指向 x 或 y。
fn longest(x: &str, y: &str) -> &str {
    if x.len() > y.len() {
        x
    } else {
        y
    }
}
fn main() {
    // string1 直到外部作用域结束都是有效的
    let string1 = String::from("long string is long");
    {
        // string2 则在内部作用域中是有效的
        let string2 = String::from("xyz");
        let result = longest(string1.as_str(), string2.as_str());
        println!("The longest string is {}", result);
    }
}
```

## 生命周期标注语法

- 生命周期标注并不改变任何引用的生命周期的长短。
- 生命周期参数名称必须以撇号（`'`）开头，其名称通常全是小写，类似于泛型其名称非常短。

```rust
&i32        // 引用
&'a i32     // 带有显式生命周期的引用
&'a mut i32 // 带有显式生命周期的可变引用
```

```rust
// 函数定义指定了签名中所有的引用必须有相同的生命周期 'a
// 我们并没有改变任何传入值或返回值的生命周期，
// 而是指出任何不满足这个约束条件的值都将被借用检查器拒绝。
// longest 函数并不需要知道 x 和 y 具体会存在多久，
// 而只需要知道有某个可以被 'a 替代的作用域将会满足这个签名。
// 被 'a 所替代的具体生命周期是 x 的作用域与 y 的作用域相重叠的那一部分。
// 换一种说法就是泛型生命周期 'a 的具体生命周期等同于 x 和 y 的生命周期中较小的那一个。
// 所以返回的引用值就能保证在 x 和 y 中较短的那个生命周期结束之前保持有效。
fn longest<'a>(x: &'a str, y: &'a str) -> &'a str {
    if x.len() > y.len() {
        x
    } else {
        y
    }
}
```

```rust
// 错误
// longest 函数返回的引用的生命周期应该与传入参数的生命周期中较短那个保持一致。
// 因此，借用检查器不允许示例中的代码，因为它可能会存在无效的引用。
fn main() {
    let string1 = String::from("long string is long");
    let result;
    {
        let string2 = String::from("xyz");
        result = longest(string1.as_str(), string2.as_str());
    }
    // result 有可能引用 string2， 但string2已经离开作用域
    println!("The longest string is {}", result);
}
```

```rust
// 为参数 x 和返回值指定了生命周期参数 'a，不过没有为参数 y 指定，
// 因为 y 的生命周期与参数 x 和返回值的生命周期没有任何关系。
fn longest<'a>(x: &'a str, y: &str) -> &'a str {
    x
}
```

## 结构体定义中的生命周期标注

```rust
// 定义包含引用的结构体，需要为结构体定义中的每一个引用添加生命周期标注。
struct ImportantExcerpt<'a> {
    part: &'a str,
}
fn main() {
    let novel = String::from("Call me Ishmael. Some years ago...");
    let first_sentence = novel.split('.')
        .next()
        .expect("Could not find a '.'");
    let i = ImportantExcerpt { part: first_sentence };
}
```

## 生命周期省略（Lifetime Elision）

编译器采用三条规则来判断引用何时不需要明确的标注。
第一条规则适用于输入生命周期，后两条规则适用于输出生命周期。
如果编译器检查完这三条规则后仍然存在没有计算出生命周期的引用，编译器将会停止并生成错误。
这些规则适用于 fn 定义，以及 impl 块。

- 第一条规则是每一个是引用的参数都有它自己的生命周期参数。
- 第二条规则是如果只有一个输入生命周期参数，那么它被赋予所有输出生命周期参数
- 第三条规则是如果方法有多个输入生命周期参数并且其中一个参数是`&self` 或 `&mut self`，说明是个对象的方法(method), 那么所有输出生命周期参数被赋予 `self` 的生命周期。

```rust
fn first_word(s: &str) -> &str {
    let bytes = s.as_bytes();
    for (i, &item) in bytes.iter().enumerate() {
        if item == b' ' {
            return &s[0..i];
        }
    }
    &s[..]
}
// 完整函数签名如下
fn first_word<'a>(s: &'a str) -> &'a str {}
```

```rust
fn first_word(s: &str) -> &str {}
fn first_word<'a>(s: &'a str) -> &str {} // 第一条规则
fn first_word<'a>(s: &'a str) -> &'a str {} // 第二条规则

fn longest(x: &str, y: &str) -> &str {}
fn longest<'a, 'b>(x: &'a str, y: &'b str) -> &str {} // 第一条规则
```

## 方法定义中的生命周期标注

```rust
// impl 和类型名称之后的生命周期参数是必要的
impl<'a> ImportantExcerpt<'a> {
    // 依据第一条规则，可以省略 self 引用的生命周期
    fn level(&self) -> i32 {
        3
    }
}
```

```rust
impl<'a> ImportantExcerpt<'a> {
    // 第一条生命周期省略规则并给予 &self 和 announcement 他们各自的生命周期。
    // 因为其中一个参数是 &self，返回值类型被赋予了 &self 的生命周期
    fn announce_and_return_part(&self, announcement: &str) -> &str {
        println!("Attention please: {}", announcement);
        self.part
    }
}
```

## 静态生命周期

`'static`，其生命周期能够存活于整个程序期间。

```rust
let s: &'static str = "I have a static lifetime.";
```

## 结合泛型类型参数、trait bounds 和生命周期

```rust
use std::fmt::Display;
fn longest_with_an_announcement<'a, T>(x: &'a str, y: &'a str, ann: T) -> &'a str
    where T: Display
{
    println!("Announcement! {}", ann);
    if x.len() > y.len() {
        x
    } else {
        y
    }
}
```