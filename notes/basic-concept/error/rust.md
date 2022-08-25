- 可恢复错误 `Result<T, E>`
- 不可恢复(遇到错误时停止程序执行)错误 `panic!`

## 对应 panic 时的栈展开或终止

```toml
# Cargo.toml
[profile.release]
panic = 'abort'
```

## 使用 panic! 的 backtrace

```sh
RUST_BACKTRACE=1 cargo run
```

## Result 枚举

```rust
enum Result<T, E> {
    Ok(T),
    Err(E),
}
```

## 匹配不同的错误

```rust
use std::fs::File;
use std::io::ErrorKind;

fn main() {
    let f = File::open("hello.txt");
    let f = match f {
        Ok(file) => file,
        Err(error) => match error.kind() {
            ErrorKind::NotFound => match File::create("hello.txt") {
                Ok(fc) => fc,
                Err(e) => panic!("Problem creating the file: {:?}", e),
            },
            other_error => panic!("Problem opening the file: {:?}", other_error),
        },
    };
}
```

```rust
// 更老练的 Rustacean 可能会这么写
use std::fs::File;
use std::io::ErrorKind;

fn main() {
    let f = File::open("hello.txt").unwrap_or_else(|error| {
        if error.kind() == ErrorKind::NotFound {
            File::create("hello.txt").unwrap_or_else(|error| {
                panic!("Problem creating the file: {:?}", error);
            })
        } else {
            panic!("Problem opening the file: {:?}", error);
        }
    });
}
```

## 失败时 panic 的简写：unwrap 和 expect

```rust
use std::fs::File;

fn main() {
    let f = File::open("hello.txt").unwrap();
    let f = File::open("hello.txt").expect("Failed to open hello.txt");
}
```

## 传播错误

```rust
use std::io;
use std::io::Read;
use std::fs::File;

fn read_username_from_file() -> Result<String, io::Error> {
    let f = File::open("hello.txt");
    let mut f = match f {
        Ok(file) => file,
        Err(e) => return Err(e), // 错误直接返回
    };

    let mut s = String::new();
    match f.read_to_string(&mut s) {
        Ok(_) => Ok(s),
        Err(e) => Err(e),
    }
}

// 简写
fn read_username_from_file() -> Result<String, io::Error> {
    let mut f = File::open("hello.txt")?;
    let mut s = String::new();
    f.read_to_string(&mut s)?;
    Ok(s)
}

// 链式方法调用
fn read_username_from_file() -> Result<String, io::Error> {
    let mut s = String::new();
    File::open("hello.txt")?.read_to_string(&mut s)?;
    Ok(s)
}

// 使用 fs::read_to_string
fn read_username_from_file() -> Result<String, io::Error> {
    fs::read_to_string("hello.txt")
}
```

```rust
use std::fs::File;
fn main() {
    // 只能在返回 Result 或者其它实现了 std::ops::Try 的类型的函数中使用 ? 运算符。
    let f = File::open("hello.txt")?; // 错误
}
```

```rust
use std::error::Error;
use std::fs::File;
// main 函数是特殊的，其必须返回什么类型是有限制的。
// main 函数的一个有效的返回值是 ()，
// 同时出于方便，另一个有效的返回值是 Result<T, E>
fn main() -> Result<(), Box<dyn Error>> {
    let f = File::open("hello.txt")?;
    Ok(())
}
```
