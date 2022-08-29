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
