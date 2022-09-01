- 并发编程（Concurrent programming），代表程序的不同部分相互独立的执行，
- 并行编程（parallel programming）代表程序不同部分于同时执行，

运行时 代表二进制文件中包含的由语言自身提供的代码，任何非汇编语言都会有一定数量的运行时代码。
通常人们说一个语言 “没有运行时”，一般意味着 “小运行时”。
更小的运行时拥有更少的功能不过其优势在于更小的二进制输出，这使其易于在更多上下文中与其他语言相结合。

## 使用 spawn 创建新线程

```rust
use std::thread;
use std::time::Duration;

fn main() {
    // 当主线程结束时，新线程也会结束，而不管其是否执行完毕
    thread::spawn(|| {
        for i in 1..10 {
            println!("hi number {} from the spawned thread!", i);
            // thread::sleep 调用强制线程停止执行一小段时间，这会允许其他不同的线程运行。
            thread::sleep(Duration::from_millis(1));
        }
    });

    for i in 1..5 {
        println!("hi number {} from the main thread!", i);
        thread::sleep(Duration::from_millis(1));
    }
}
```

## 使用 join 等待所有线程结束

```rust
use std::thread;
use std::time::Duration;

fn main() {
    let handle = thread::spawn(|| {
        for i in 1..10 {
            println!("hi number {} from the spawned thread!", i);
            thread::sleep(Duration::from_millis(1));
        }
    });

    for i in 1..5 {
        println!("hi number {} from the main thread!", i);
        thread::sleep(Duration::from_millis(1));
    }

    // 通过调用 handle 的 join 会阻塞当前线程直到 handle 所代表的线程结束。
    handle.join().unwrap();
}
```

## 线程与 move 闭包

```rust
use std::thread;

fn main() {
    let v = vec![1, 2, 3];

    // 增加 move 关键字，强制闭包获取其使用的值的所有权
    // move 关键字覆盖了 Rust 默认保守的借用，但它不允许我们违反所有权规则
    let handle = thread::spawn(move || {
        println!("Here's a vector: {:?}", v);
    });

    handle.join().unwrap();
}
```
