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

pub use crate::front_of_house::hosting; // 引入并导出

pub fn eat_at_restaurant() {
    hosting::add_to_waitlist();
    hosting::add_to_waitlist();
    hosting::add_to_waitlist();
}
fn main() {}
```