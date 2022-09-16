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

## 派生

下面是可以自动派生的 trait：

- 比较 trait: `Eq`, `PartialEq`, `Ord`, `PartialOrd`
- `Clone`, 用来从 `&T` 创建副本 `T`。
- `Copy`，使类型具有 “复制语义”（copy semantics）而非 “移动语义”（move semantics）。
- `Hash`，从 `&T` 计算哈希值（hash）。
- `Default`, 创建数据类型的一个空实例。
- `Debug`，使用 `{:?}` formatter 来格式化一个值。

## 使用 dyn 返回 trait

```rust
struct Sheep {}
struct Cow {}

trait Animal {
    // 实例方法签名
    fn noise(&self) -> &'static str;
}

// 实现 `Sheep` 的 `Animal` trait。
impl Animal for Sheep {
    fn noise(&self) -> &'static str {
        "baaaaah!"
    }
}

// 实现 `Cow` 的 `Animal` trait。
impl Animal for Cow {
    fn noise(&self) -> &'static str {
        "moooooo!"
    }
}

// 返回一些实现 Animal 的结构体，但是在编译时我们不知道哪个结构体。
fn random_animal(random_number: f64) -> Box<dyn Animal> {
    if random_number < 0.5 {
        Box::new(Sheep {})
    } else {
        Box::new(Cow {})
    }
}

fn main() {
    let random_number = 0.234;
    let animal = random_animal(random_number);
    println!("You've randomly chosen an animal, and it says {}", animal.noise());
}
```

## 运算符重载

```rust
use std::ops;

struct Foo;
struct Bar;

#[derive(Debug)]
struct FooBar;

#[derive(Debug)]
struct BarFoo;

// `std::ops::Add` trait 用来指明 `+` 的功能，这里我们实现 `Add<Bar>`，它是用于
// 把对象和 `Bar` 类型的右操作数（RHS）加起来的 `trait`。
// 下面的代码块实现了 `Foo + Bar = FooBar` 这样的运算。
impl ops::Add<Bar> for Foo {
    type Output = FooBar;

    fn add(self, _rhs: Bar) -> FooBar {
        println!("> Foo.add(Bar) was called");

        FooBar
    }
}

// 通过颠倒类型，我们实现了不服从交换律的加法。
// 这里我们实现 `Add<Foo>`，它是用于把对象和 `Foo` 类型的右操作数加起来的 trait。
// 下面的代码块实现了 `Bar + Foo = BarFoo` 这样的运算。
impl ops::Add<Foo> for Bar {
    type Output = BarFoo;

    fn add(self, _rhs: Foo) -> BarFoo {
        println!("> Bar.add(Foo) was called");

        BarFoo
    }
}

fn main() {
    println!("Foo + Bar = {:?}", Foo + Bar);
    println!("Bar + Foo = {:?}", Bar + Foo);
}
```

## Drop

```rust
struct Droppable {
    name: &'static str,
}

// 这个简单的 `drop` 实现添加了打印到控制台的功能。
impl Drop for Droppable {
    fn drop(&mut self) {
        println!("> Dropping {}", self.name);
    }
}

fn main() {
    let _a = Droppable { name: "a" };

    // 代码块 A
    {
        let _b = Droppable { name: "b" };

        // 代码块 B
        {
            let _c = Droppable { name: "c" };
            let _d = Droppable { name: "d" };

            println!("Exiting block B");
        }
        println!("Just exited block B");

        println!("Exiting block A");
    }
    println!("Just exited block A");

    // 变量可以手动使用 `drop` 函数来销毁。
    drop(_a);
    // 试一试 ^ 将此行注释掉。

    println!("end of the main function");

    // `_a` *不会*在这里再次销毁，因为它已经被（手动）销毁。
}
```

## Iterator

```rust
struct Fibonacci {
    curr: u32,
    next: u32,
}

// 为 `Fibonacci`（斐波那契）实现 `Iterator`。
// `Iterator` trait 只需定义一个能返回 `next`（下一个）元素的方法。
impl Iterator for Fibonacci {
    type Item = u32;

    // 我们在这里使用 `.curr` 和 `.next` 来定义数列（sequence）。
    // 返回类型为 `Option<T>`：
    //     * 当 `Iterator` 结束时，返回 `None`。
    //     * 其他情况，返回被 `Some` 包裹（wrap）的下一个值。
    fn next(&mut self) -> Option<u32> {
        let new_next = self.curr + self.next;

        self.curr = self.next;
        self.next = new_next;

        // 既然斐波那契数列不存在终点，那么 `Iterator` 将不可能
        // 返回 `None`，而总是返回 `Some`。
        Some(self.curr)
    }
}

// 返回一个斐波那契数列生成器
fn fibonacci() -> Fibonacci {
    Fibonacci { curr: 1, next: 1 }
}

fn main() {
    // `0..3` 是一个 `Iterator`，会产生：0、1 和 2。
    let mut sequence = 0..3;

    println!("Four consecutive `next` calls on 0..3");
    println!("> {:?}", sequence.next());
    println!("> {:?}", sequence.next());
    println!("> {:?}", sequence.next());
    println!("> {:?}", sequence.next());

    // `for` 遍历 `Iterator` 直到返回 `None`，
    // 并且每个 `Some` 值都被解包（unwrap），然后绑定给一个变量（这里是 `i`）。
    println!("Iterate through 0..3 using `for`");
    for i in 0..3 {
        println!("> {}", i);
    }

    // `take(n)` 方法提取 `Iterator` 的前 `n` 项。
    println!("The first four terms of the Fibonacci sequence are: ");
    for i in fibonacci().take(4) {
        println!("> {}", i);
    }

    // `skip(n)` 方法移除前 `n` 项，从而缩短了 `Iterator` 。
    println!("The next four terms of the Fibonacci sequence are: ");
    for i in fibonacci().skip(4).take(4) {
        println!("> {}", i);
    }

    let array = [1u32, 3, 3, 7];

    // `iter` 方法对数组/slice 产生一个 `Iterator`。
    println!("Iterate the following array {:?}", &array);
    for i in array.iter() {
        println!("> {}", i);
    }
}
```

## impl Trait

如果函数返回实现了 `MyTrait` 的类型，可以将其返回类型编写为 `-> impl MyTrait`。
这可以大大简化你的类型签名！

```rust
use std::iter;
use std::vec::IntoIter;

// 该函数组合了两个 `Vec <i32>` 并在其上返回一个迭代器。
// 看看它的返回类型多么复杂！
fn combine_vecs_explicit_return_type(
    v: Vec<i32>,
    u: Vec<i32>,
) -> iter::Cycle<iter::Chain<IntoIter<i32>, IntoIter<i32>>> {
    v.into_iter().chain(u.into_iter()).cycle()
}

// 这是完全相同的函数，但其返回类型使用 `impl Trait`。
// 看看它多么简单！
fn combine_vecs(
    v: Vec<i32>,
    u: Vec<i32>,
) -> impl Iterator<Item=i32> {
    v.into_iter().chain(u.into_iter()).cycle()
}

fn main() {
    let v1 = vec![1, 2, 3];
    let v2 = vec![4, 5];
    let mut v3 = combine_vecs(v1, v2);
    assert_eq!(Some(1), v3.next());
    assert_eq!(Some(2), v3.next());
    assert_eq!(Some(3), v3.next());
    assert_eq!(Some(4), v3.next());
    assert_eq!(Some(5), v3.next());
    println!("all done");
}
```

```rust
// 返回一个将输入和 `y` 相加的函数
fn make_adder_function(y: i32) -> impl Fn(i32) -> i32 {
    let closure = move |x: i32| { x + y };
    closure
}

fn main() {
    let plus_one = make_adder_function(1);
    assert_eq!(plus_one(2), 3);
}
```

```rust
fn double_positives<'a>(numbers: &'a Vec<i32>) -> impl Iterator<Item = i32> + 'a {
    numbers
        .iter()
        .filter(|x| x > &&0)
        .map(|x| x * 2)
}
```

## Clone

```rust
// 不含资源的单元结构体
#[derive(Debug, Clone, Copy)]
struct Nil;

// 一个包含资源的结构体，它实现了 `Clone` trait
#[derive(Clone, Debug)]
struct Pair(Box<i32>, Box<i32>);

fn main() {
    // 实例化 `Nil`
    let nil = Nil;
    // 复制 `Nil`，没有资源用于移动（move）
    let copied_nil = nil;

    // 两个 `Nil` 都可以独立使用
    println!("original: {:?}", nil);
    println!("copy: {:?}", copied_nil);

    // 实例化 `Pair`
    let pair = Pair(Box::new(1), Box::new(2));
    println!("original: {:?}", pair);

    // 将 `pair` 绑定到 `moved_pair`，移动（move）了资源
    let moved_pair = pair;
    println!("copy: {:?}", moved_pair);

    // 报错！`pair` 已失去了它的资源。
    //println!("original: {:?}", pair);
    // 试一试 ^ 取消此行注释。

    // 将 `moved_pair`（包括其资源）克隆到 `cloned_pair`。
    let cloned_pair = moved_pair.clone();
    // 使用 std::mem::drop 来销毁原始的 pair。
    drop(moved_pair);

    // 报错！`moved_pair` 已被销毁。
    //println!("copy: {:?}", moved_pair);
    // 试一试 ^ 将此行注释掉。

    // 由 .clone() 得来的结果仍然可用！
    println!("clone: {:?}", cloned_pair);
}
```

## 父 trait

```rust
trait Person {
    fn name(&self) -> String;
}

// Person 是 Student 的父 trait。
// 实现 Student 需要你也 impl 了 Person。
trait Student: Person {
    fn university(&self) -> String;
}

trait Programmer {
    fn fav_language(&self) -> String;
}

// CompSciStudent (computer science student，计算机科学的学生) 是 Programmer 和 Student 两者的子类。
// 实现 CompSciStudent 需要你同时 impl 了两个父 trait。
trait CompSciStudent: Programmer + Student {
    fn git_username(&self) -> String;
}

fn comp_sci_student_greeting(student: &dyn CompSciStudent) -> String {
    format!(
        "My name is {} and I attend {}. My favorite language is {}. My Git username is {}",
        student.name(),
        student.university(),
        student.fav_language(),
        student.git_username()
    )
}

fn main() {}
```

## 消除重叠 trait

```rust
trait UsernameWidget {
    // 从这个 widget 中获取选定的用户名
    fn get(&self) -> String;
}

trait AgeWidget {
    // 从这个 widget 中获取选定的年龄
    fn get(&self) -> u8;
}

// 同时具有 UsernameWidget 和 AgeWidget 的表单
struct Form {
    username: String,
    age: u8,
}

impl UsernameWidget for Form {
    fn get(&self) -> String {
        self.username.clone()
    }
}

impl AgeWidget for Form {
    fn get(&self) -> u8 {
        self.age
    }
}

fn main() {
    let form = Form{
        username: "rustacean".to_owned(),
        age: 28,
    };

    // 如果取消注释此行，则会收到一条错误消息，提示 “multiple `get` found”（找到了多个`get`）。
    // 因为毕竟有多个名为 `get` 的方法。
    // println!("{}", form.get());

    let username = <Form as UsernameWidget>::get(&form);
    assert_eq!("rustacean".to_owned(), username);
    let age = <Form as AgeWidget>::get(&form);
    assert_eq!(28, age);
}
```
