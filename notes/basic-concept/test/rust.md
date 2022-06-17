## 测试函数（测试用例）

```rust
pub fn greeting(name: &str) -> String {
    format!("Hello {}!", name)
}

pub struct Guess {
    value: i32,
}

impl Guess {
    pub fn new(value: i32) -> Guess {
        if value < 1 || value > 100 {
            panic!("Guess value must be between 1 and 100, got {}.", value);
        }

        Guess { value }
    }
}

#[cfg(test)]
mod tests {
    use super::*;

    // 基本测试
    #[test]
    fn it_works() {
        assert_eq!(2 + 2, 4);
    }

    // 测试失败
    #[test]
    fn another() {
        panic!("Make this test fail");
    }

    // 自定义错误信息
    #[test]
    fn greeting_contains_name() {
        let result = greeting("Sunface");
        let target = "孙飞";
        assert!(
            result.contains(target),
            "你的问候中并没有包含目标姓名 {} ，你的问候是 {}",
            target,
            result
        );
    }

    // 测试panic
    #[test]
    #[should_panic]
    fn greater_than_100() {
        Guess::new(200);
    }

    // 使用 Result<T, E>
    #[test]
    fn it_works() -> Result<(), String> {
        if 2 + 2 == 4 {
            Ok(())
        } else {
            Err(String::from("two plus two does not equal four"))
        }
    }

    // 忽略测试
    #[test]
    #[ignore]
    fn expensive_test() {
        // 这里的代码需要几十秒甚至几分钟才能完成
    }
}
```

```sh
cargo test

# 使用 -- 分割命令行参数
# 第一种是提供给 cargo test 命令本身的，这些参数在 -- 之前指定
# 第二种是提供给编译后的可执行文件的，在 -- 之后指定
cargo test --help
cargo test -- --help

# 显示测试函数中的 println!
cargo test -- --show-output

# 运行单个测试
cargo test one_hundred

# 通过名称来过滤测试（名称中带add）
cargo test add

# 运行被忽略的测试函数
cargo test -- --ignored
# 运行名称中带 run 且被忽略的测试函数
cargo test run -- --ignored
```

## 单元测试、集成测试

- 单元测试是跟正常的逻辑代码在同一个文件，因此必须对其进行特殊的标注，以便 Rust 可以识别。
- 集成测试被放入单独的目录文件中
  - 不需要创建测试模块及标注 `#[cfg(test)]`
  - 只能调用通过 pub 定义的 API
  - 一个标准的 Rust 项目，在它的根目录下会有一个 `tests` 目录
  - 在集成测试的 tests 目录下，每一个文件都是一个独立的包

Rust 只支持对 lib 类型的包进行集成测试，对于二进制包例如 `src/main.rs` 是无能为力的。
原因在于，我们无法在其它包中使用 use 引入二进制包，而只有 lib 类型的包才能被引入，例如 `src/lib.rs`

集成测试示例：

```rust
// tests/integration_test.rs
use adder;

#[test]
fn it_adds_two() {
    assert_eq!(4, adder::add_two(2));
}
```

单元测试的共享模块路径

`tests/common/mod.rs`

## 测试才引入的包

`Cargo.toml`

```toml
# standard crate data is left out
[dev-dependencies]
pretty_assertions = "1"
```

```rust
pub fn add(a: i32, b: i32) -> i32 {
    a + b
}

#[cfg(test)]
mod tests {
    use super::*;
    use pretty_assertions::assert_eq; // 该包仅能用于测试

    #[test]
    fn test_add() {
        assert_eq!(add(2, 3), 5);
    }
}
```

## 断言

- 所有模式下运行
  - `assert!`
  - `assert_eq!`
  - `assert_ne!`
- Debug 模式下运行
  - `debug_assert!`
  - `debug_assert_eq!`
  - `debug_assert_ne!`

## benckmark 基准测试

性能测试包含了两种：压力测试和基准测试

- 前者是针对接口 API，模拟大量用户去访问接口然后生成接口级别的性能数据；
- 而后者是针对代码，可以用来测试某一段代码的运行速度，例如一个排序算法。

官方提供的测试工具，目前最大的问题就是只能在非 stable 下使用，
原因是需要在代码中引入 test 特性: `#![feature(test)]`

需要先将当前仓库中的 Rust 版本从 stable 切换为 nightly:

- 安装 nightly 版本：\$ `rustup install nightly`
- 使用以下命令确认版本已经安装成功 `rustup toolchain list`
- 进入 adder 项目(之前为了学习测试专门创建的项目)的根目录，然后运行 `rustup override set nightly`，将该项目使用的 rust 设置为 nightly
  - 使用 `rustup override set stable` 切换回 stable 版本

```rust
// src/lib.rs
#![feature(test)]

extern crate test;

pub fn add_two(a: i32) -> i32 {
    a + 2
}

#[cfg(test)]
mod tests {
    use super::*;
    use test::Bencher;

    #[test]
    fn it_works() {
        assert_eq!(4, add_two(2));
    }

    #[bench]
    fn bench_add_two(b: &mut Bencher) {
        b.iter(|| add_two(2));
    }
}
```

```rust
#![feature(test)]

extern crate test;

fn fibonacci_u64(number: u64) -> u64 {
    let mut last: u64 = 1;
    let mut current: u64 = 0;
    let mut buffer: u64;
    let mut position: u64 = 1;

    return loop {
        if position == number {
            break current;
        }

        buffer = last;
        last = current;
        current = buffer + current;
        position += 1;
    };
}
#[cfg(test)]
mod tests {
    use super::*;
    use test::Bencher;

    #[test]
    fn it_works() {
       assert_eq!(fibonacci_u64(1), 0);
       assert_eq!(fibonacci_u64(2), 1);
       assert_eq!(fibonacci_u64(12), 89);
       assert_eq!(fibonacci_u64(30), 514229);
    }

    #[bench]
    fn bench_u64(b: &mut Bencher) {
        b.iter(|| {
            for i in 100..200 {
                // LLVM认为fibonacci_u64函数调用的结果没有使用，
                // 同时也认为该函数没有任何副作用(造成其它的影响，例如修改外部变量、访问网络等),
                // 因此它有理由把这个函数调用优化掉！
                // fibonacci_u64(i);
                test::black_box(fibonacci_u64(test::black_box(i)));
            }
        });
    }
}
```

```sh
cargo bench
```
