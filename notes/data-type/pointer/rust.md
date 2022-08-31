- 指针 （`pointer`）是一个包含内存地址的变量的通用概念。
  - 这个地址引用，或 “指向”（points at）一些其他数据。
- 智能指针（`smart pointers`）是一类数据结构，它们的表现类似指针，但是也拥有额外的元数据和功能。
  - Rust 标准库中不同的智能指针提供了多于引用的额外功能。
  - 一个例子便是 引用计数 （reference counting）智能指针类型，其允许数据有多个所有者。
    - 引用计数智能指针记录总共有多少个所有者，并当没有任何所有者时负责清理数据。
  - `String` 和 `Vec<T>` 这些类型都属于智能指针因为它们拥有一些数据并允许你修改它们
  - 智能指针通常使用结构体实现。
  - 智能指针区别于常规结构体的显著特性在于其实现了 `Deref` 和 `Drop trait`。
    - `Deref trait` 允许智能指针结构体实例表现的像引用一样
    - `Drop trait` 允许我们自定义当智能指针离开作用域时运行的代码
  - 常用智能指针
    - `Box<T>`，用于在堆上分配值
    - `Rc<T>`，一个引用计数类型，其数据可以有多个所有者
    - `Ref<T>` 和 `RefMut<T>`，通过 `RefCell<T>` 访问
- 普通引用和智能指针的一个额外的区别是引用是一类只借用数据的指针；
  - 相反，在大部分情况下，智能指针 拥有 它们指向的数据。

## 使用 `Box<T>` 指向堆上的数据

box 允许你将一个值放在堆上而不是栈上。
留在栈上的则是指向堆数据的指针。

- 当有一个在编译时未知大小的类型，而又想要在需要确切大小的上下文中使用这个类型值的时候
- 当有大量数据并希望在确保数据不被拷贝的情况下转移所有权的时候
- 当希望拥有一个值并只关心它的类型是否实现了特定 trait 而不是其具体类型的时候

```rust
fn main() {
    let x = 5;
    let y = Box::new(x);

    assert_eq!(5, x);
    assert_eq!(5, *y); // 像引用一样使用 Box<T>
}
```

```rust
// 没有使用智能指针，编译错误
// 编译器无法知道 List 占用内存大小
enum List {
    Cons(i32, List),
    Nil,
}
use crate::List::{Cons, Nil};
fn main() {
    let list = Cons(1, Cons(2, Cons(3, Nil)));
}
```

```rust
// 使用智能指针
enum List {
    Cons(i32, Box<List>),
    Nil,
}
use crate::List::{Cons, Nil};
fn main() {
    let list = Cons(1,
        Box::new(Cons(2,
            Box::new(Cons(3,
                Box::new(Nil))))));
}
```

## 自定义智能指针

```rust
use std::ops::Deref;

struct MyBox<T>(T); // 元组结构体
impl<T> MyBox<T> {
    fn new(x: T) -> MyBox<T> {
        MyBox(x)
    }
}
// 实现 Deref trait 的 deref 方法
impl<T> Deref for MyBox<T> {
    // 语法定义了用于此 trait 的关联类型。
    type Target = T;
    // 输入 *y 时，Rust 事实上在底层运行了如下代码
    // *(y.deref())
    // * 解引用的操作，且只会发生一次，不会对 * 操作符无限递归替换
    fn deref(&self) -> &T {
        &self.0
    }
}
// 参数可以是 &i32 或 &MyBox<i32>
fn use_deref(n: &i32) -> &i32 {
    n
}

// 参数可以是 &str 或 &String 或 &MyBox<String>
fn hello(name: &str) {
    println!("Hello, {}!", name);
}

fn main() {
    let x = 5;
    let y = MyBox::new(x);
    assert_eq!(5, x);

    assert_eq!(5, *use_deref(&x));
    // 参数需要 &i32 类型，传入 &MyBox<i32> 会强制转换
    assert_eq!(5, *use_deref(&y));

    let m = &String::from("Rust");
    hello(&m);

    // 如果 Rust 没有解引用强制转换
    let m = MyBox::new(String::from("Rust"));
    hello(&(*m)[..]);

    // 当所涉及到的类型定义了 `Deref trait`，
    // Rust 会分析这些类型并使用任意多次 `Deref::deref` 调用以获得匹配参数的类型。
    // 这里进行了两次转换
    // &MyBox<String> -> &String
    // &String -> &str
    let m = MyBox::new(String::from("Rust"));
    hello(&m);
}
```

## 函数和方法的隐式解引用强制转换（deref coercions）

- 解引用强制转换（deref coercions）是 Rust 在函数或方法传参上的一种便利。
- 解引用强制转换只能工作在实现了 `Deref trait` 的类型上。
- 解引用强制转换将一种类型（A）隐式转换为另外一种类型（B）的引用，
  因为 A 类型实现了 Deref trait，
  并且其关联类型是 B 类型。
- 比如，解引用强制转换可以将 `&String` 转换为 `&str`，
  因为类型 `String` 实现了 `Deref trait` 并且其关联类型是 `str`。
- 当所涉及到的类型定义了 `Deref trait`，Rust 会分析这些类型并使用任意多次 `Deref::deref` 调用以获得匹配参数的类型。

Rust 在发现类型和 trait 实现满足三种情况时会进行解引用强制转换：

- 当 `T: Deref<Target=U>` 时从 `&T` 到 `&U`。
- 当 `T: DerefMut<Target=U>` 时从 `&mut T` 到 `&mut U`。
- 当 `T: Deref<Target=U>` 时从 `&mut T` 到 `&U`。

```rust
#[stable(feature = "rust1", since = "1.0.0")]
impl ops::Deref for String {
    type Target = str; // 关联类型是 `str`
    #[inline]
    fn deref(&self) -> &str {
        unsafe { str::from_utf8_unchecked(&self.vec) }
    }
}
```

## 使用 Drop Trait 运行清理代码

```rust
struct CustomSmartPointer {
    data: String,
}

impl Drop for CustomSmartPointer {
    fn drop(&mut self) {
        println!("Dropping CustomSmartPointer with data `{}`!", self.data);
    }
}

fn main() {
    let c = CustomSmartPointer { data: String::from("my stuff") };
    let d = CustomSmartPointer { data: String::from("other stuff") };
    println!("CustomSmartPointers created.");
}
```

```rust
fn main() {
    let c = CustomSmartPointer { data: String::from("some data") };
    println!("CustomSmartPointer created.");
    // 通过 std::mem::drop 提早丢弃值
    drop(c);
    println!("CustomSmartPointer dropped before the end of main.");
}
```

## `Rc<T>` 引用计数智能指针

- Rust 有一个叫做 `Rc<T>` 的类型。其名称为 引用计数（reference counting）的缩写。
- `Rc<T>` 只能用于单线程场景

- 修改 `List` 的定义为使用 `Rc<T>` 代替 `Box<T>`
- 每次调用 `Rc::clone`，`Rc<List>` 中数据的引用计数都会增加，直到有零个引用之前其数据都不会被清理。
- 也可以调用 `a.clone()` 而不是 `Rc::clone(&a)`
- `Rc::clone` 的实现并不像大部分类型的 clone 实现那样对所有数据进行深拷贝。
  `Rc::clone` 只会增加引用计数，这并不会花费多少时间。

```rust
enum List {
    Cons(i32, Rc<List>),
    Nil,
}
use crate::List::{Cons, Nil};
use std::rc::Rc
fn main() {
    let a = Rc::new(Cons(5, Rc::new(Cons(10, Rc::new(Nil)))));
    // 调用 Rc::clone 函数并传递 a 中 Rc<List> 的引用作为参数。
    let b = Cons(3, Rc::clone(&a));
    let c = Cons(4, Rc::clone(&a));
}
```

```rust
// 打印出引用计数
// count after creating a = 1
// count after creating b = 2
// count after creating c = 3
// count after c goes out of scope = 2
fn main() {
    let a = Rc::new(Cons(5, Rc::new(Cons(10, Rc::new(Nil)))));
    println!("count after creating a = {}", Rc::strong_count(&a));
    let b = Cons(3, Rc::clone(&a));
    println!("count after creating b = {}", Rc::strong_count(&a));
    {
        let c = Cons(4, Rc::clone(&a));
        println!("count after creating c = {}", Rc::strong_count(&a));
    }
    println!("count after c goes out of scope = {}", Rc::strong_count(&a));
}
```

## `RefCell<T>` 和内部可变性模式

- `RefCell<T>` 记录当前有多少个活动的 `Ref<T>` 和 `RefMut<T>` 智能指针。
- 每次调用 `borrow`，`RefCell<T>` 将活动的不可变借用计数加一。
- 当 `Ref<T>` 值离开作用域时，不可变借用计数减一。
- `RefCell<T>` 在任何时候只允许有多个不可变借用或一个可变借用。

```rust
pub trait Messenger {
    fn send(&self, msg: &str);
}
pub struct LimitTracker<'a, T: Messenger> {
    messenger: &'a T,
    value: usize,
    max: usize,
}
impl<'a, T> LimitTracker<'a, T>
    where T: Messenger {
    pub fn new(messenger: &T, max: usize) -> LimitTracker<T> {
        LimitTracker {
            messenger,
            value: 0,
            max,
        }
    }
    pub fn set_value(&mut self, value: usize) {
        self.value = value;

        let percentage_of_max = self.value as f64 / self.max as f64;

        if percentage_of_max >= 1.0 {
            self.messenger.send("Error: You are over your quota!");
        } else if percentage_of_max >= 0.9 {
             self.messenger.send("Urgent warning: You've used up over 90% of your quota!");
        } else if percentage_of_max >= 0.75 {
            self.messenger.send("Warning: You've used up over 75% of your quota!");
        }
    }
}

#[cfg(test)]
mod tests {
    use super::*;
    use std::cell::RefCell;
    struct MockMessenger {
        sent_messages: RefCell<Vec<String>>,
    }
    impl MockMessenger {
        fn new() -> MockMessenger {
            MockMessenger { sent_messages: RefCell::new(vec![]) }
        }
    }
    impl Messenger for MockMessenger {
        fn send(&self, message: &str) {
            // borrow_mut 方法返回 RefMut<T> 类型的智能指针
            self.sent_messages.borrow_mut().push(String::from(message));
        }
    }
    #[test]
    fn it_sends_an_over_75_percent_warning_message() {
        let mock_messenger = MockMessenger::new();
        let mut limit_tracker = LimitTracker::new(&mock_messenger, 100);
        limit_tracker.set_value(80);
        // borrow 方法返回 Ref<T> 类型的智能指针
        assert_eq!(mock_messenger.sent_messages.borrow().len(), 1);
    }
}
```

## 结合 `Rc<T>` 和 `RefCell<T>` 来拥有多个可变数据所有者

```rust
#[derive(Debug)]
enum List {
    Cons(Rc<RefCell<i32>>, Rc<List>),
    Nil,
}

use crate::List::{Cons, Nil};
use std::rc::Rc;
use std::cell::RefCell;

fn main() {
    let value = Rc::new(RefCell::new(5));
    let a = Rc::new(Cons(Rc::clone(&value), Rc::new(Nil)));
    let b = Cons(Rc::new(RefCell::new(6)), Rc::clone(&a));
    let c = Cons(Rc::new(RefCell::new(10)), Rc::clone(&a));
    // borrow_mut 方法返回 RefMut<T> 智能指针，可以对其使用解引用运算符并修改其内部值。
    *value.borrow_mut() += 10;
    println!("a after = {:?}", a);
    println!("b after = {:?}", b);
    println!("c after = {:?}", c);
}
// a after = Cons(RefCell { value: 15 }, Nil)
// b after = Cons(RefCell { value: 6 }, Cons(RefCell { value: 15 }, Nil))
// c after = Cons(RefCell { value: 10 }, Cons(RefCell { value: 15 }, Nil))
```

## 引用循环与内存泄漏

```rust
use crate::List::{Cons, Nil};
use std::rc::Rc;
use std::cell::RefCell;
#[derive(Debug)]
enum List {
    Cons(i32, RefCell<Rc<List>>),
    Nil,
}

impl List {
    fn tail(&self) -> Option<&RefCell<Rc<List>>> {
        match self {
            Cons(_, item) => Some(item),
            Nil => None,
        }
    }
}

fn main() {
    let a = Rc::new(Cons(5, RefCell::new(Rc::new(Nil))));

    println!("a initial rc count = {}", Rc::strong_count(&a));
    println!("a next item = {:?}", a.tail());

    let b = Rc::new(Cons(10, RefCell::new(Rc::clone(&a))));

    println!("a rc count after b creation = {}", Rc::strong_count(&a));
    println!("b initial rc count = {}", Rc::strong_count(&b));
    println!("b next item = {:?}", b.tail());

    if let Some(link) = a.tail() {
        // 创建引用循环
        *link.borrow_mut() = Rc::clone(&b);
    }

    println!("b rc count after changing a = {}", Rc::strong_count(&b));
    println!("a rc count after changing a = {}", Rc::strong_count(&a));

    // Uncomment the next line to see that we have a cycle;
    // it will overflow the stack
    // println!("a next item = {:?}", a.tail());
}
```

## 避免引用循环：将 `Rc<T>` 变为 `Weak<T>`

```rust
use std::rc::{Rc, Weak};
use std::cell::RefCell;

#[derive(Debug)]
struct Node {
    value: i32,
    parent: RefCell<Weak<Node>>,
    children: RefCell<Vec<Rc<Node>>>,
}

fn main() {
    // leaf 开始时没有父节点，所以我们新建了一个空的 Weak 引用实例。
    let leaf = Rc::new(Node {
        value: 3,
        parent: RefCell::new(Weak::new()),
        children: RefCell::new(vec![]),
    });

    println!(
        "leaf strong = {}, weak = {}",
        Rc::strong_count(&leaf),
        Rc::weak_count(&leaf),
    );

    {
        let branch = Rc::new(Node {
            value: 5,
            parent: RefCell::new(Weak::new()),
            children: RefCell::new(vec![Rc::clone(&leaf)]),
        });

        // 修改 leaf 使其拥有指向父节点的 Weak<Node> 引用。
        // 使用了 Rc::downgrade 函数创建了一个指向 branch 的 Weak<Node> 引用。
        *leaf.parent.borrow_mut() = Rc::downgrade(&branch);

        println!(
            "branch strong = {}, weak = {}",
            Rc::strong_count(&branch),
            Rc::weak_count(&branch),
        );

        println!(
            "leaf strong = {}, weak = {}",
            Rc::strong_count(&leaf),
            Rc::weak_count(&leaf),
        );
    }

    println!("leaf parent = {:?}", leaf.parent.borrow().upgrade());
    println!(
        "leaf strong = {}, weak = {}",
        Rc::strong_count(&leaf),
        Rc::weak_count(&leaf),
    );
}
```
