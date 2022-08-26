## trait

`trait` 类似于其他语言中常被称为 接口（`interfaces`）的功能，虽然有一些不同。

孤儿规则（`orphan rule`）：

实现 `trait` 时需要注意的一个限制是，只有当 `trait` 或者要实现 `trait` 的类型位于 `crate` 的本地作用域时，才能为该类型实现 `trait`。

- 例如，可以为 `aggregator crate` 的自定义类型 `Tweet` 实现如标准库中的 `Display trait`，这是因为 `Tweet` 类型位于 `aggregator crate` 本地的作用域中。
- 类似地，也可以在 `aggregator crate` 中为`Vec<T>` 实现 `Summary`，这是因为 `Summary trait` 位于 `aggregator crate` 本地作用域中。
- 不能在 `aggregator crate` 中为 `Vec<T>` 实现 `Display trait`。这是因为 `Display` 和 `Vec<T>` 都定义于标准库中，它们并不位于 `aggregator crate` 本地作用域中。

```rust
// 定义 trait
// 如果这个 lib.rs 是对应 aggregator crate 的，
// 别人想要利用我们 crate 的功能为其自己的库作用域中的结构体实现 Summary trait。
// 首先他们需要将 trait 引入作用域。
// 这可以通过指定 use aggregator::Summary; 实现
// Summary 还必须是公有 trait 使得其他 crate 可以实现它
pub trait Summary {
    fn summarize(&self) -> String;
}

// 为类型实现 trait
pub struct NewsArticle {
    pub headline: String,
    pub location: String,
    pub author: String,
    pub content: String,
}
impl Summary for NewsArticle {
    fn summarize(&self) -> String {
        format!("{}, by {} ({})", self.headline, self.author, self.location)
    }
}

// 为类型实现 trait
pub struct Tweet {
    pub username: String,
    pub content: String,
    pub reply: bool,
    pub retweet: bool,
}
impl Summary for Tweet {
    fn summarize(&self) -> String {
        format!("{}: {}", self.username, self.content)
    }
}

// 调用 trait 方法
let tweet = Tweet {
    username: String::from("horse_ebooks"),
    content: String::from("of course, as you probably already know, people"),
    reply: false,
    retweet: false,
};
println!("1 new tweet: {}", tweet.summarize());
```

## 默认实现

```rust
// Summary trait 的定义，带有一个 summarize 方法的默认实现
pub trait Summary {
    fn summarize(&self) -> String {
        String::from("(Read more...)")
    }
}
impl Summary for NewsArticle {}
```

```rust
pub trait Summary {
    fn summarize_author(&self) -> String;
    fn summarize(&self) -> String {
        format!("(Read more from {}...)", self.summarize_author())
    }
}
impl Summary for Tweet {
    // 重载默认实现
    fn summarize_author(&self) -> String {
        format!("@{}", self.username)
    }
}
```

## trait 作为参数

```rust
pub fn notify(item: impl Summary) {
    println!("Breaking news! {}", item.summarize());
}

// Trait Bound 语法
pub fn notify<T: Summary>(item: T) {
    println!("Breaking news! {}", item.summarize());
}

// 只要求实现了Summary
pub fn notify(item1: impl Summary, item2: impl Summary) {}
// 强制都是相同的具体类型，并且都实现了Summary
pub fn notify<T: Summary>(item1: T, item2: T) {}

// 通过 + 指定多个 trait bound
pub fn notify(item: impl Summary + Display) {}
pub fn notify<T: Summary + Display>(item: T) {}

// 通过 where 简化 trait bound
fn some_function<T: Display + Clone, U: Clone + Debug>(t: T, u: U) -> i32 {}
fn some_function<T, U>(t: T, u: U) -> i32
    where T: Display + Clone,
          U: Clone + Debug
{}
```

## 返回实现了 trait 的类型

```rust
// 这只适用于返回单一类型的情况。
fn returns_summarizable() -> impl Summary {
    Tweet {
        username: String::from("horse_ebooks"),
        content: String::from("of course, as you probably already know, people"),
        reply: false,
        retweet: false,
    }
}
```

## 使用 trait bound 有条件地实现方法

```rust
use std::fmt::Display;
struct Pair<T> {
    x: T,
    y: T,
}
// 类型 Pair<T> 总是实现了 new 方法
impl<T> Pair<T> {
    fn new(x: T, y: T) -> Self {
        Self {
            x,
            y,
        }
    }
}
// 不过只有那些为 T 类型实现了 PartialOrd trait （来允许比较） 和 Display trait （来启用打印）
// 的 Pair<T> 才会实现 cmp_display 方法：
// 满足特定 trait bound 的类型实现 trait 被称为 blanket implementations
impl<T: Display + PartialOrd> Pair<T> {
    fn cmp_display(&self) {
        if self.x >= self.y {
            println!("The largest member is x = {}", self.x);
        } else {
            println!("The largest member is y = {}", self.y);
        }
    }
}
```