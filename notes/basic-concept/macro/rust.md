从根本上来说，宏是一种为写其他代码而写代码的方式，即所谓的 元编程（metaprogramming）

声明（Declarative）宏

- 使用 `macro_rules!` 的 声明（Declarative）宏，
  - 其核心概念是，声明宏允许我们编写一些类似 Rust match 表达式的代码。

过程宏（procedural macros）

- 过程宏接收 Rust 代码作为输入，在这些代码上进行操作，然后产生另一些代码作为输出，而非像声明式宏那样匹配对应模式然后以另一部分代码替换当前代码。

  - 自定义 `#[derive]` 宏在结构体和枚举上指定通过 derive 属性添加的代码
  - 类属性（Attribute-like）宏定义可用于任意项的自定义属性
  - 类函数宏看起来像函数不过作用于作为参数传递的 token

函数与宏的区别

- 一个函数标签必须声明函数参数个数和类型。
  - 相比之下，宏能够接受不同数量的参数：用一个参数调用 `println!("hello")` 或用两个参数调用 `println!("hello {}", name)` 。
- 宏可以在编译器翻译代码前展开，例如，宏可以在一个给定类型上实现 trait 。
  - 而函数则不行，因为函数是在运行时被调用
- 在一个文件里调用宏 之前 必须定义它，或将其引入作用域，
  - 而函数则可以在任何地方定义和调用。

## 声明（Declarative）宏

```rust
// vec! 宏定义的简化版本
// #[macro_export] 标注说明，只要将定义了宏的 crate 引入作用域，宏就应当是可用的。
// 如果没有该标注，这个宏就不能被引入作用域。
#[macro_export]
macro_rules! vec {
    // 此处有一个单边模式 ( $( $x:expr ),* )
    // 一对括号()包含了整个模式
    // $() 捕获了符合括号内模式的值以用于替换后的代码。
    // $x:expr 匹配 Rust 的任意表达式，并将该表达式记作 $x
    // 紧随逗号之后的 * 说明该模式匹配零个或更多个 * 之前的任何模式
    // vec![1, 2, 3]; 调用宏时，$x 模式与三个表达式 1、2 和 3 进行了三次匹配
    // 对于每个（在 => 前面）匹配模式中的 $() 的部分，
    // 生成零个或更多个（在 => 后面）位于 $()* 内的 temp_vec.push() ，
    // 生成的个数取决于该模式被匹配的次数。
    ( $( $x:expr ), * ) => {
        {
            let mut temp_vec = Vec::new();
            $(
                temp_vec.push($x); // $x 由每个与之相匹配的表达式所替换。
            )*
            temp_vec
        }
    };
}
let v: Vec<u32> = vec![1, 2, 3];

// 调用该宏时，替换该宏调用所生成的代码会是下面这样：
let mut temp_vec = Vec::new();
temp_vec.push(1);
temp_vec.push(2);
temp_vec.push(3);
temp_vec
```

### 指示符

全部指示符：

- `block`
- `expr` 用于表达式
- `ident` 用于变量名或函数名
- `item`
- `pat` (模式 pattern)
- `path`
- `stmt` (语句 statement)
- `tt` (标记树 token tree)
- `ty` (类型 type)

```rust
macro_rules! create_function {
    // 此宏接受一个 `ident` 指示符表示的参数，并创建一个名为 `$func_name` 的函数。
    // `ident` 指示符用于变量名或函数名
    ($func_name:ident) => (
        fn $func_name() {
            // `stringify!` 宏把 `ident` 转换成字符串。
            println!("You called {:?}()",
                     stringify!($func_name))
        }
    )
}

// 借助上述宏来创建名为 `foo` 和 `bar` 的函数。
create_function!(foo);
create_function!(bar);

macro_rules! print_result {
    // 此宏接受一个 `expr` 类型的表达式，并将它作为字符串，连同其结果一起
    // 打印出来。
    // `expr` 指示符表示表达式。
    ($expression:expr) => (
        // `stringify!` 把表达式*原样*转换成一个字符串。
        println!("{:?} = {:?}",
                 stringify!($expression),
                 $expression)
    )
}

fn main() {
    foo();
    bar();

    print_result!(1u32 + 1);

    // 回想一下，代码块也是表达式！
    print_result!({
        let x = 1u32;

        x * x + 2 * x - 1
    });
}
```

### 重载

```rust
// 根据你调用它的方式，`test!` 将以不同的方式来比较 `$left` 和 `$right`。
macro_rules! test {
    // 参数不需要使用逗号隔开。
    // 参数可以任意组合！
    ($left:expr; and $right:expr) => (
        println!("{:?} and {:?} is {:?}",
                 stringify!($left),
                 stringify!($right),
                 $left && $right)
    );
    // ^ 每个分支都必须以分号结束。
    ($left:expr; or $right:expr) => (
        println!("{:?} or {:?} is {:?}",
                 stringify!($left),
                 stringify!($right),
                 $left || $right)
    );
}

fn main() {
    test!(1i32 + 1 == 2i32; and 2i32 * 2 == 4i32);
    test!(true; or false);
}
```

### 重复

宏在参数列表中可以使用 `+` 来表示一个参数可能出现一次或多次，使用 `*` 来表示该 参数可能出现零次或多次。

```rust
// `min!` 将求出任意数量的参数的最小值。
macro_rules! find_min {
    // 基本情形：
    ($x:expr) => ($x);
    // `$x` 后面跟着至少一个 `$y,`
    ($x:expr, $($y:expr),+) => (
        // 对 `$x` 后面的 `$y` 们调用 `find_min!`
        std::cmp::min($x, find_min!($($y),+))
    )
}

fn main() {
    println!("{}", find_min!(1u32));
    println!("{}", find_min!(1u32 + 2 , 2u32));
    println!("{}", find_min!(5u32, 2u32 * 3, 4u32));
}
```

### DRY (不写重复代码)

```rust
use std::ops::{Add, Mul, Sub};

macro_rules! assert_equal_len {
    // `tt`（token tree，标记树）指示符表示运算符和标记。
    ($a:ident, $b: ident, $func:ident, $op:tt) => (
        assert!($a.len() == $b.len(),
                "{:?}: dimension mismatch: {:?} {:?} {:?}",
                stringify!($func),
                ($a.len(),),
                stringify!($op),
                ($b.len(),));
    )
}

macro_rules! op {
    ($func:ident, $bound:ident, $op:tt, $method:ident) => (
        fn $func<T: $bound<T, Output=T> + Copy>(xs: &mut Vec<T>, ys: &Vec<T>) {
            assert_equal_len!(xs, ys, $func, $op);

            for (x, y) in xs.iter_mut().zip(ys.iter()) {
                *x = $bound::$method(*x, *y);
                // *x = x.$method(*y);
            }
        }
    )
}

// 实现 `add_assign`、`mul_assign` 和 `sub_assign` 等函数。
op!(add_assign, Add, +=, add);
op!(mul_assign, Mul, *=, mul);
op!(sub_assign, Sub, -=, sub);

mod test {
    use std::iter;
    macro_rules! test {
        ($func: ident, $x:expr, $y:expr, $z:expr) => {
            #[test]
            fn $func() {
                for size in 0usize..10 {
                    let mut x: Vec<_> = iter::repeat($x).take(size).collect();
                    let y: Vec<_> = iter::repeat($y).take(size).collect();
                    let z: Vec<_> = iter::repeat($z).take(size).collect();

                    super::$func(&mut x, &y);

                    assert_eq!(x, z);
                }
            }
        }
    }

    // 测试 `add_assign`、`mul_assign` 和 `sub_assign`
    test!(add_assign, 1u32, 2u32, 3u32);
    test!(mul_assign, 2u32, 3u32, 6u32);
    test!(sub_assign, 3u32, 2u32, 1u32);
}
```

### DSL（领域专用语言）

```rust
macro_rules! calculate {
    (eval $e:expr) => {{
        {
            let val: usize = $e; // 强制类型为整型
            println!("{} = {}", stringify!{$e}, val);
        }
    }};
}

fn main() {
    calculate! {
        eval 1 + 2 // 看到了吧，`eval` 可并不是 Rust 的关键字！
    }

    calculate! {
        eval (1 + 2) * (3 / 4)
    }
}
```

### 可变参数接口

```rust
macro_rules! calculate {
    // 单个 `eval` 的模式
    (eval $e:expr) => {{
        {
            let val: usize = $e; // Force types to be integers
            println!("{} = {}", stringify!{$e}, val);
        }
    }};

    // 递归地拆解多重的 `eval`
    (eval $e:expr, $(eval $es:expr),+) => {{
        calculate! { eval $e }
        calculate! { $(eval $es),+ }
    }};
}

fn main() {
    calculate! { // 妈妈快看，可变参数的 `calculate!`！
        eval 1 + 2,
        eval 3 + 4,
        eval (2 * 3) + 1
    }
}
```

## 过程宏（procedural macros）

- 创建过程宏时，其定义必须驻留在它们自己的具有特殊 crate 类型的 crate 中。
- 可以在同一个 crate 中拥有多种过程宏。

```rust
// src/lib.rs
use proc_macro;
// some_attribute 是一个使用特定宏的占位符。
#[some_attribute]
pub fn some_name(input: TokenStream) -> TokenStream {
}
```

### 自定义 derive 宏

#### 未使用宏的代码

```rust
// src/lib.rs
pub trait HelloMacro {
    fn hello_macro();
}
```

```rust
// src/main.rs
use hello_macro::HelloMacro;
struct Pancakes;
impl HelloMacro for Pancakes {
    fn hello_macro() {
        println!("Hello, Macro! My name is Pancakes!");
    }
}
fn main() {
    Pancakes::hello_macro();
}
```

#### 使用宏

```sh
# 目录结构
├── hello_macro
│   ├── Cargo.lock
│   ├── Cargo.toml
│   ├── hello_macro_derive
│   │   ├── Cargo.toml
│   │   └── src
│   │       └── lib.rs
│   └── src
│       └── lib.rs
├── pancakes
│   ├── Cargo.lock
│   ├── Cargo.toml
│   └── src
│       └── main.rs
```

```rust
// hello_macro/src/lib.rs
pub trait HelloMacro {
    fn hello_macro();
}
```

```toml
# hello_macro/hello_macro_derive/Cargo.toml
[lib]
proc-macro = true

[dependencies]
syn = "1.0"
quote = "1.0"
```

```rust
// hello_macro/hello_macro_derive/src/lib.rs
extern crate proc_macro;

use crate::proc_macro::TokenStream;
use quote::quote; // quote 则将 syn 解析的数据结构转换回 Rust 代码。
use syn; // syn crate 将字符串中的 Rust 代码解析成为一个可以操作的数据结构。

// hello_macro_derive 函数负责解析 TokenStream，
// impl_hello_macro 函数则负责转换语法树：
// 当用户在一个类型上指定 #[derive(HelloMacro)] 时，
// hello_macro_derive 函数将会被调用。
#[proc_macro_derive(HelloMacro)]
pub fn hello_macro_derive(input: TokenStream) -> TokenStream {
    // 将 Rust 代码解析为语法树以便进行操作
    let ast = syn::parse(input).unwrap();

    // 构建 trait 实现
    impl_hello_macro(&ast)
}

// 使用解析过的 Rust 代码实现 HelloMacro trait
fn impl_hello_macro(ast: &syn::DeriveInput) -> TokenStream {
    let name = &ast.ident;
    // quote! 宏让我们可以编写希望返回的 Rust 代码。
    let gen = quote! {
        // 模板机制：写 #name ，然后 quote! 会以名为 name 的变量值来替换它。
        impl HelloMacro for #name {
            fn hello_macro() {
                // stringify! 为 Rust 内置宏。
                // 其接收一个 Rust 表达式，如 1 + 2 ， 然后在编译时将表达式转换为一个字符串常量
                println!("Hello, Macro! My name is {}", stringify!(#name));
            }
        }
    };
    // quote! 宏执行的直接结果并不是编译器所期望的并需要转换为 TokenStream。
    // 为此需要调用 into 方法
    gen.into()
}
```

```toml
# pancakes/Cargo.toml
[dependencies]
hello_macro = { path = "../hello_macro" }
hello_macro_derive = { path = "../hello_macro/hello_macro_derive" }
```

```rust
// pancakes/src/main.rs
use hello_macro::HelloMacro;
use hello_macro_derive::HelloMacro;

#[derive(HelloMacro)]
struct Pancakes;

fn main() {
    Pancakes::hello_macro();
}
```

```rust
// 语法树 DeriveInput 结构体
DeriveInput {
    // --snip--
    ident: Ident {
        ident: "Pancakes",
        span: #0 bytes(95..103)
    },
    data: Struct(
        DataStruct {
            struct_token: Struct,
            fields: Unit,
            semi_token: Some(
                Semi
            )
        }
    )
}
```

### 类属性宏

- 类属性宏与自定义派生宏相似，不同于为 derive 属性生成代码，它们允许你创建新的属性。
- derive 只能用于结构体和枚举；属性还可以用于其它的项，比如函数。

```rust
// 使用例子
#[route(GET, "/")]
fn index() {}

// 宏定义的函数签名看起来像这样：
// 两个 TokenStream 类型的参数；
// 第一个用于属性内容本身，也就是 GET, "/" 部分。
// 第二个是属性所标记的项：在本例中，是 fn index() {} 和剩下的函数体。
#[proc_macro_attribute]
pub fn route(attr: TokenStream, item: TokenStream) -> TokenStream {}
```

### 类函数宏

- 类函数宏定义看起来像函数调用的宏。
- 类似于 `macro_rules!`，它们比函数更灵活；例如，可以接受未知数量的参数。

```rust
// 一个类函数宏例子
let sql = sql!(SELECT * FROM posts WHERE id=1);

// sql! 宏应该被定义为如此：
#[proc_macro]
pub fn sql(input: TokenStream) -> TokenStream {}
```
