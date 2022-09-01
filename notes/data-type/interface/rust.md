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

## 关联类型在 trait 定义中指定占位符类型

关联类型（associated types）是一个将类型占位符与 trait 相关联的方式，这样 trait 的方法签名中就可以使用这些占位符类型。

```rust
// Iterator trait 的定义中带有关联类型 Item
// 这里没有泛型参数 T
// 我们只能选择一次 Item 会是什么类型
pub trait Iterator {
    type Item;
    fn next(&mut self) -> Option<Self::Item>;
}
impl Iterator for Counter {
    // 这里指定 trait 定义里面的 Item 的类型
    type Item = u32;
    fn next(&mut self) -> Option<Self::Item> {}
}

// 一个使用泛型的 Iterator trait 假想定义
pub trait Iterator<T> {
    fn next(&mut self) -> Option<T>;
}
```

## 默认泛型类型参数和运算符重载

```rust
// 实现 Add trait 重载 Point 实例的 + 运算符
use std::ops::Add;
#[derive(Debug, PartialEq)]
struct Point {
    x: i32,
    y: i32,
}
// 使用默认 RHS 参数
impl Add for Point {
    // Add trait 有一个叫做 Output 的关联类型，它用来决定 add 方法的返回值类型。
    type Output = Point;
    fn add(self, other: Point) -> Point {
        Point {
            x: self.x + other.x,
            y: self.y + other.y,
        }
    }
}
fn main() {
    assert_eq!(Point { x: 1, y: 0 } + Point { x: 2, y: 3 },
               Point { x: 3, y: 3 });
}
```

```rust
// Add trait 的定义
trait Add<RHS=Self> {
    type Output;
    fn add(self, rhs: RHS) -> Self::Output;
}
```

```rust
// 在 Millimeters 上实现 Add，以便能够将 Millimeters 与 Meters 相加
use std::ops::Add;
struct Millimeters(u32);
struct Meters(u32);
// 自定义 RHS 参数
impl Add<Meters> for Millimeters {
    type Output = Millimeters;
    fn add(self, other: Meters) -> Millimeters {
        Millimeters(self.0 + (other.0 * 1000))
    }
}
```

## 完全限定语法与消歧义：调用相同名称的方法

```rust
trait Pilot {
    fn fly(&self);
}
trait Wizard {
    fn fly(&self);
}

struct Human;
impl Pilot for Human {
    fn fly(&self) {
        println!("This is your captain speaking.");
    }
}
impl Wizard for Human {
    fn fly(&self) {
        println!("Up!");
    }
}

impl Human {
    fn fly(&self) {
        println!("*waving arms furiously*");
    }
}
fn main() {
    let person = Human;
    Pilot::fly(&person);
    Wizard::fly(&person);
    person.fly();
}
// This is your captain speaking.
// Up!
// *waving arms furiously*
```

```rust
trait Animal {
    fn baby_name() -> String;
}
struct Dog;
impl Dog {
    fn baby_name() -> String {
        String::from("Spot")
    }
}
impl Animal for Dog {
    fn baby_name() -> String {
        String::from("puppy")
    }
}
fn main() {
    println!("A baby dog is called a {}", Dog::baby_name());
    println!("A baby dog is called a {}", <Dog as Animal>::baby_name());
}
// A baby dog is called a Spot
// A baby dog is called a puppy
```

## 父 trait 用于在另一个 trait 中使用某 trait 的功能

```rust
use std::fmt;
// 实现 OutlinePrint trait，它要求来自 Display 的功能
// 因为指定了 OutlinePrint 需要 Display trait，
// 则可以在 outline_print 中使用 to_string， 其会为任何实现 Display 的类型自动实现。
trait OutlinePrint: fmt::Display {
    fn outline_print(&self) {
        let output = self.to_string();
        let len = output.len();
        println!("{}", "*".repeat(len + 4));
        println!("*{}*", " ".repeat(len + 2));
        println!("* {} *", output);
        println!("*{}*", " ".repeat(len + 2));
        println!("{}", "*".repeat(len + 4));
    }
}

// 如果尝试在一个没有实现 Display 的类型上实现 OutlinePrint 会发生什么，
// 比如 Point 结构体：
// 这样会得到一个错误说 Display 是必须的而未被实现：
struct Point {
    x: i32,
    y: i32,
}
impl OutlinePrint for Point {}

// 一旦在 Point 上实现 Display 并满足 OutlinePrint 要求的限制，
// 比如这样：将能成功编译
use std::fmt;
impl fmt::Display for Point {
    fn fmt(&self, f: &mut fmt::Formatter) -> fmt::Result {
        write!(f, "({}, {})", self.x, self.y)
    }
}
```

## newtype 模式用以在外部类型上实现外部 trait

如果想要在 `Vec<T>` 上实现 `Display`，而孤儿规则阻止我们直接这么做，
因为 `Display trait` 和 `Vec<T>` 都定义于我们的 `crate` 之外。
可以创建一个包含 `Vec<T>` 实例的 `Wrapper` 结构体，
接着可以如列表 19-31 那样在 `Wrapper` 上实现 `Display` 并使用 `Vec<T>` 的值：

```rust
use std::fmt;
struct Wrapper(Vec<String>);
impl fmt::Display for Wrapper {
    fn fmt(&self, f: &mut fmt::Formatter) -> fmt::Result {
        write!(f, "[{}]", self.0.join(", "))
    }
}

fn main() {
    let w = Wrapper(vec![String::from("hello"), String::from("world")]);
    println!("w = {}", w);
}
```
