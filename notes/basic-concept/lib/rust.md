- 包（Packages）： Cargo 的一个功能，它允许你构建、测试和分享 crate。
  - 包（package） 是提供一系列功能的一个或者多个 crate。
  - 一个包会包含有一个 Cargo.toml 文件，阐述如何去构建这些 crate。
    - 一个包中至多 只能 包含一个库 crate(library crate)；
    - 包中可以包含任意多个二进制 crate(binary crate)；
    - 包中至少包含一个 crate，无论是库的还是二进制的。
- Crates ：一个模块的树形结构，它形成了库或二进制项目。
  - Cargo 遵循的一个约定：
    - `src/main.rs` 就是一个与包同名的二进制 crate 的 crate 根。
    - `src/lib.rs`，则包带有与其同名的库 crate，且 `src/lib.rs` 是 crate 根
    - 如果一个包同时含有 `src/main.rs` 和 `src/lib.rs`，则它有两个 crate：一个库和一个二进制项，且名字都与包相同。
    - 通过将文件放在 `src/bin` 目录下，一个包可以拥有多个二进制 crate：每个 `src/bin` 下的文件都会被编译成一个独立的二进制 crate。
- 模块（Modules）和 use： 允许你控制作用域和路径的私有性。
  - 模块 让我们可以将一个 crate 中的代码进行分组，以提高可读性与重用性。
  - 模块还可以控制项的 私有性，即项是可以被外部代码使用的（public）
- 路径（path）：一个命名例如结构体、函数或模块等项的方式

```sh
# 创建一个新的名为 restaurant 的库
cargo new --lib restaurant
```

```sh
# 模块树
crate
 └── front_of_house
     ├── hosting
     │   ├── add_to_waitlist
     │   └── seat_at_table
     └── serving
         ├── take_order
         ├── serve_order
         └── take_payment
```

```rust
// src/lib.rs
#![allow(unused)]
fn main() {
    mod front_of_house {
        mod hosting { // 模块嵌套
            fn add_to_waitlist() {}

            fn seat_at_table() {}
        }

        mod serving {
            fn take_order() {}

            fn server_order() {}

            fn take_payment() {}
        }
    }
}
```

## crate

- crate（中文有 “包，包装箱” 之意）是 Rust 的编译单元。
  - 当调用 `rustc some_file.rs` 时，`some_file.rs` 被当作 crate 文件。
  - 如果 `some_file.rs` 里面含有 `mod` 声明，那么模块文件的内容将在编译之前被插入 crate 文件的相应声明处。
  - 换句话说，模块不会单独被编译，只有 crate 才会被编译。
  - crate 可以编译成二进制可执行文件（binary）或库文件（library）。

## 库（library）

- 默认情况 下，rustc 将从 crate 产生二进制可执行文件。
- 这种行为可以通过 rustc 的选项 `--crate-type` 重载。

```sh
# 编译一个库
rustc --crate-type=lib rary.rs # 生成 library.rlib
# library.rlib 是已编译好的库的路径，这里假设它在同一目录下：

# 链接一个已编译好的库，并编译成可执行文件
rustc executable.rs --extern rary=library.rlib --edition=2018 && ./executable
```

```rust
// rary.rs
pub fn public_function() {
    println!("called rary's `public_function()`");
}
fn private_function() {
    println!("called rary's `private_function()`");
}
pub fn indirect_access() {
    print!("called rary's `indirect_access()`, that\n> ");

    private_function();
}
```

```rust
// executable.rs
// extern crate rary; // 在 Rust 2015 版或更早版本需要这个导入语句
fn main() {
    rary::public_function();
    // 报错！ `private_function` 是私有的
    //rary::private_function();
    rary::indirect_access();
}
```

## 模块路径的两种形式

- 绝对路径（absolute path）从 crate 根部开始，以 crate 名或者字面量 crate 开头。
- 相对路径（relative path）从当前模块开始，以 self、super 或当前模块的标识符开头。

```rust
mod front_of_house {
    pub mod hosting {
        pub fn add_to_waitlist() {}
    }
}

pub fn eat_at_restaurant() {
    // Absolute path
    crate::front_of_house::hosting::add_to_waitlist();

    // Relative path
    front_of_house::hosting::add_to_waitlist();
}
```

### 使用 super 起始的相对路径

```rust
fn serve_order() {}
mod back_of_house {
    fn fix_incorrect_order() {
        cook_order();
        super::serve_order();
    }
    fn cook_order() {}
}
```

## 创建公有的结构体和枚举

```rust
mod back_of_house {
    // 如果我们在一个结构体定义的前面使用了 pub ，
    // 这个结构体会变成公有的，但是这个结构体的字段仍然是私有的。
    pub struct Breakfast {
        pub toast: String,
        seasonal_fruit: String,
    }

    impl Breakfast {
        // 想当于静态方法
        pub fn summer(toast: &str) -> Breakfast {
            Breakfast {
                toast: String::from(toast),
                seasonal_fruit: String::from("peaches"),
            }
        }
    }
}

pub fn eat_at_restaurant() {
    // Order a breakfast in the summer with Rye toast
    let mut meal = back_of_house::Breakfast::summer("Rye");
    // Change our mind about what bread we'd like
    meal.toast = String::from("Wheat"); // 公有字段
    println!("I'd like {} toast please", meal.toast);

    // The next line won't compile if we uncomment it; we're not allowed
    // to see or modify the seasonal fruit that comes with the meal
    // meal.seasonal_fruit = String::from("blueberries"); // 私有字段
}
```

```rust
mod back_of_house {
    // 如果我们将枚举设为公有，则它的所有成员都将变为公有。
    pub enum Appetizer {
        Soup,
        Salad,
    }
}

pub fn eat_at_restaurant() {
    let order1 = back_of_house::Appetizer::Soup;
    let order2 = back_of_house::Appetizer::Salad;
}
```

## 使用 use 关键字将名称引入作用域

```rust
mod front_of_house {
    pub mod hosting {
        pub fn add_to_waitlist() {}
    }
}

use crate::front_of_house::hosting::add_to_waitlist;

pub fn eat_at_restaurant() {
    add_to_waitlist();
    add_to_waitlist();
    add_to_waitlist();
}
fn main() {}
```

```rust
#![allow(unused)]
fn main() {
    use std::fmt::Result;
    use std::io::Result as IoResult;

    fn function1() -> Result {
        // --snip--
        Ok(())
    }

    fn function2() -> IoResult<()> {
        // --snip--
        Ok(())
    }
}
```

```rust
mod front_of_house {
    pub mod hosting {
        pub fn add_to_waitlist() {}
    }
}

// 使用 pub use 重导出名称
pub use crate::front_of_house::hosting; // 引入并导出

pub fn eat_at_restaurant() {
    hosting::add_to_waitlist();
    hosting::add_to_waitlist();
    hosting::add_to_waitlist();
}
fn main() {}
```

## 使用 as 关键字提供新的名称

```rust
use std::fmt::Result;
use std::io::Result as IoResult;

fn function1() -> Result {
    // --snip--
}

fn function2() -> IoResult<()> {
    // --snip--
}
```

## 使用外部包

```toml
[dependencies]
rand = "0.8.3"
```

```rust
use rand::Rng;
fn main() {
    let secret_number = rand::thread_rng().gen_range(1..101);
}
```

```rust
use std::cmp::Ordering;
use std::io;

// 与上面写法相同
use std::{cmp::Ordering, io};


use std::io;
use std::io::Write;

// 与上面写法相同
use std::io::{self, Write};

// 将一个路径下 所有 公有项引入作用域
use std::collections::*;
```

## 将模块分割进不同文件

```rust
// src/lib.rs

// 在 mod front_of_house 后使用分号，而不是代码块，
// 这将告诉 Rust 在另一个与模块同名的文件中加载模块的内容。
mod front_of_house;

pub use crate::front_of_house::hosting;

pub fn eat_at_restaurant() {
    hosting::add_to_waitlist();
    hosting::add_to_waitlist();
    hosting::add_to_waitlist();
}
```

```rust
// src/front_of_house.rs

// pub mod hosting {
//     pub fn add_to_waitlist() {}
// }

// 继续重构，将 hosting 模块也提取到其自己的文件中
pub mod hosting;
```

```rust
// src/front_of_house/hosting.rs
pub fn add_to_waitlist() {}
```

## 使用 pub use 导出合适的公有 API

```rust
// src/lib.rs
//! # Art
//!
//! A library for modeling artistic concepts.

pub mod kinds {
    /// The primary colors according to the RYB color model.
    pub enum PrimaryColor {
        Red,
        Yellow,
        Blue,
    }

    /// The secondary colors according to the RYB color model.
    pub enum SecondaryColor {
        Orange,
        Green,
        Purple,
    }
}

pub mod utils {
    use crate::kinds::*;

    /// Combines two primary colors in equal amounts to create
    /// a secondary color.
    pub fn mix(c1: PrimaryColor, c2: PrimaryColor) -> SecondaryColor {
        // --snip--
    }
}
```

```rust
// src/main.rs
use art::kinds::PrimaryColor; // 全路径
use art::utils::mix;

fn main() {
    let red = PrimaryColor::Red;
    let yellow = PrimaryColor::Yellow;
    mix(red, yellow);
}
```

使用 pub use 语句导出

```rust
// src/lib.rs
//! # Art
//!
//! A library for modeling artistic concepts.

pub use self::kinds::PrimaryColor;
pub use self::kinds::SecondaryColor;
pub use self::utils::mix;

pub mod kinds {
    // --snip--
}

pub mod utils {
    // --snip--
}
```

```rust
// src/main.rs
use art::PrimaryColor; // 导出后路径变短
use art::mix;

fn main() {
    // --snip--
}
```

## 工作空间

### 创建工作空间

```sh
mkdir add
cd add
cargo new adder
cargo new add-one --lib

# 构建整个工作空间
cargo build
```

- 这个 `Cargo.toml` 文件配置了整个工作空间。
- 它不会包含 `[package]` 或其他我们在 `Cargo.toml` 中见过的元信息。
- 相反，它以 `[workspace]` 部分作为开始，并通过指定 `adder` 的路径来为工作空间增加成员
- 工作空间只在根目录有一个`Cargo.lock`，而不是在每一个 `crate` 目录都有 `Cargo.lock`。
  - 这确保了所有的 `crate` 都使用完全相同版本的依赖。
- `adder` 并没有自己的 `target` 目录
- 即使进入 `adder` 目录运行 `cargo build`，构建结果也位于 `add/target` 而不是 `add/adder/target`
- 如果你选择向 `crates.io` 发布工作空间中的 `crate`，每一个工作空间中的 `crate` 需要单独发布。
  - 必须进入每一个 crate 的目录并运行 `cargo publish` 来发布工作空间中的每一个 crate。

```toml
# Cargo.toml
[workspace]
members = [
    "adder",
    "add-one",
]
```

```sh
├── Cargo.lock
├── Cargo.toml
├── add-one
│   ├── Cargo.toml
│   └── src
│       └── lib.rs
├── adder
│   ├── Cargo.toml
│   └── src
│       └── main.rs
└── target
```

### 调用工作空间的 create

```rust
// add-one/src/lib.rs
pub fn add_one(x: i32) -> i32 {
    x + 1
}
```

```toml
# adder/Cargo.toml
[dependencies]
add-one = { path = "../add-one" }
```

```rust
// adder/src/main.rs
use add_one;
fn main() {
    let num = 10;
    println!("Hello, world! {} plus one is {}!", num, add_one::add_one(num));
}
```

### 依赖外部 crate

```toml
# add-one/Cargo.toml
[dependencies]
rand = "0.5.5"
```

## 使用 cargo install 从 Crates.io 安装二进制文件

`cargo install` 的二进制文件都安装到 Rust 安装根目录的 `bin` 文件夹中。
如果你使用 `rustup.rs` 安装的 Rust 且没有自定义任何配置，这将是`$HOME/.cargo/bin`

```sh
cargo install ripgrep
```
