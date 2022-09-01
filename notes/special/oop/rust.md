## 封装（encapsulation

```rust
pub struct AveragedCollection {
    list: Vec<i32>,
    average: f64,
}
impl AveragedCollection {
    pub fn add(&mut self, value: i32) {
        self.list.push(value);
        self.update_average();
    }

    pub fn remove(&mut self) -> Option<i32> {
        let result = self.list.pop();
        match result {
            Some(value) => {
                self.update_average();
                Some(value)
            },
            None => None,
        }
    }

    pub fn average(&self) -> f64 {
        self.average
    }

    fn update_average(&mut self) {
        let total: i32 = self.list.iter().sum();
        self.average = total as f64 / self.list.len() as f64;
    }
}
```

## 继承（Inheritance）

选择继承有两个主要的原因。

- 第一个是为了重用代码：一旦为一个类型实现了特定行为，继承可以对一个不同的类型重用这个实现。
  - 这类似于父类有一个方法的实现，而通过继承子类也拥有这个方法的实现。
  - 当实现 Summary trait 时也可以选择覆盖 summarize 的默认实现，这类似于子类覆盖从父类继承的方法实现。
- 第二个使用继承的原因与类型系统有关：表现为子类型可以用于父类型被使用的地方。
  - 这也被称为 多态（polymorphism），这意味着如果多种对象共享特定的属性，则可以相互替代使用。

## 定义通用行为的 trait

泛型类型参数一次只能替代一个具体类型，而 trait 对象则允许在运行时替代多种具体类型。

```rust
// 一种 Screen 结构体的替代实现，其 run 方法使用泛型和 trait bound
// 这限制了 Screen 实例必须拥有一个全是 Button 类型或者全是 TextField 类型的组件列表。
pub struct Screen<T: Draw> {
    pub components: Vec<T>,
}
impl<T> Screen<T>
    where T: Draw {
    pub fn run(&self) {
        for component in self.components.iter() {
            component.draw();
        }
    }
}
```

通过使用 `trait` 对象的方法，
一个 `Screen` 实例可以存放一个既能包含 `Box<Button>`，
也能包含 `Box<TextField>` 的 `Vec<T>`

```rust
// src/lib.rs
pub trait Draw {
    fn draw(&self);
}

pub struct Screen {
    // 这个 vector 的类型是 Box<dyn Draw>，
    // 此为一个 trait 对象：它是 Box 中任何实现了 Draw trait 的类型的替身。
    pub components: Vec<Box<dyn Draw>>,
}
impl Screen {
    pub fn run(&self) {
        for component in self.components.iter() {
            component.draw();
        }
    }
}

pub struct Button {
    pub width: u32,
    pub height: u32,
    pub label: String,
}
impl Draw for Button {
    fn draw(&self) {
        // 实际绘制按钮的代码
    }
}
```

```rust
// src/main.rs
use gui::Draw;
use gui::{Screen, Button};

// 使用者决定实现一个包含 width、height 和 options 字段的结构体 SelectBox
struct SelectBox {
    width: u32,
    height: u32,
    options: Vec<String>,
}
impl Draw for SelectBox {
    fn draw(&self) {
        // code to actually draw a select box
    }
}

fn main() {
    let screen = Screen {
        components: vec![
            Box::new(SelectBox {
                width: 75,
                height: 10,
                options: vec![
                    String::from("Yes"),
                    String::from("Maybe"),
                    String::from("No")
                ],
            }),
            Box::new(Button {
                width: 50,
                height: 10,
                label: String::from("OK"),
            }),
        ],
    };

    screen.run();
}
```

## Trait 对象要求对象安全

只有 对象安全（object safe）的 trait 才可以组成 trait 对象。

如果一个 trait 中所有的方法有如下属性时，则该 trait 是对象安全的：

- 返回值类型不为 Self
- 方法没有任何泛型类型参数

一个 trait 的方法不是对象安全的例子是标准库中的 Clone trait。

```rust
pub trait Clone {
    fn clone(&self) -> Self;
}

pub struct Screen {
    pub components: Vec<Box<dyn Clone>>, // 错误
}
```

## 设计模式

### 状态模式（state pattern）

```rust
// src/main.rs
use blog::Post;

fn main() {
    let mut post = Post::new();

    post.add_text("I ate a salad for lunch today");
    assert_eq!("", post.content()); // 断言草案博文的 content 方法返回空字符串

    post.request_review();
    assert_eq!("", post.content()); // 等待审核的阶段 content 应该仍然返回空字符串。

    post.approve();
    assert_eq!("I ate a salad for lunch today", post.content());
}
```

```rust
// src/lib.rs
pub struct Post {
    state: Option<Box<dyn State>>,
    content: String,
}

impl Post {
    pub fn new() -> Post {
        Post {
            state: Some(Box::new(Draft {})),
            content: String::new(),
        }
    }
    pub fn add_text(&mut self, text: &str) {
        self.content.push_str(text);
    }
    pub fn content(&self) -> &str {
        // 调用 Option 的 as_ref 方法是因为需要 Option 中值的引用而不是获取其所有权。
        self.state.as_ref().unwrap().content(self)
    }
    pub fn request_review(&mut self) {
        // 调用 take 方法将 state 字段中的 Some 值取出并留下一个 None，
        // 因为 Rust 不允许结构体实例中存在值为空的字段。
        if let Some(s) = self.state.take() {
            self.state = Some(s.request_review())
        }
    }
    pub fn approve(&mut self) {
        if let Some(s) = self.state.take() {
            self.state = Some(s.approve())
        }
    }
}

// State trait 定义了所有不同状态的博文所共享的行为
// 同时 Draft、PendingReview 和 Published 状态都会实现 State 状态。
// 增加新状态只涉及到增加一个新 struct 和为其实现 trait 的方法。
trait State {
    // 这里使用了 self: Box<Self>。
    // 这个语法意味着该方法只可在持有这个类型的 Box 上被调用
    // 这个语法获取了 Box<Self> 的所有权使老状态无效化，以便 Post 的状态值可转换为一个新状态。
    fn request_review(self: Box<Self>) -> Box<dyn State>;
    fn approve(self: Box<Self>) -> Box<dyn State>;
    fn content<'a>(&self, post: &'a Post) -> &'a str {
        ""
    }
}

struct Draft {}
impl State for Draft {
    fn request_review(self: Box<Self>) -> Box<dyn State> {
        Box::new(PendingReview {})
    }
    fn approve(self: Box<Self>) -> Box<dyn State> {
        self
    }
}

struct PendingReview {}
impl State for PendingReview {
    fn request_review(self: Box<Self>) -> Box<dyn State> {
        self
    }
    fn approve(self: Box<Self>) -> Box<dyn State> {
        Box::new(Published {})
    }
}

struct Published {}
impl State for Published {
    fn request_review(self: Box<Self>) -> Box<dyn State> {
        self
    }
    fn approve(self: Box<Self>) -> Box<dyn State> {
        self
    }
    fn content<'a>(&self, post: &'a Post) -> &'a str {
        &post.content
    }
}
```

另一个例子

```rust
// src/main.rs
use blog2::Post;
fn main() {
    let mut post = Post::new();
    post.add_text("I ate a salad for lunch today");
    let post = post.request_review();
    let post = post.approve();
    assert_eq!("I ate a salad for lunch today", post.content());
}
```

```rust
// src/lib.rs
pub struct Post {
    content: String,
}
impl Post {
    pub fn new() -> DraftPost {
        DraftPost {
            content: String::new(),
        }
    }
    pub fn content(&self) -> &str {
        &self.content
    }
}

pub struct DraftPost {
    content: String,
}
impl DraftPost {
    pub fn add_text(&mut self, text: &str) {
        self.content.push_str(text);
    }
    pub fn request_review(self) -> PendingReviewPost {
        PendingReviewPost {
            content: self.content,
        }
    }
}

pub struct PendingReviewPost {
    content: String,
}
impl PendingReviewPost {
    pub fn approve(self) -> Post {
        Post {
            content: self.content,
        }
    }
}
```
