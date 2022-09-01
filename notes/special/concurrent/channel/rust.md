编程中的通道有两部分组成，一个发送者（transmitter）和一个接收者（receiver）。

```rust
use std::thread;
// mpsc 是 多个生产者，单个消费者（multiple producer, single consumer）的缩写。
use std::sync::mpsc;

fn main() {
    let (tx, rx) = mpsc::channel();

    thread::spawn(move || {
        let val = String::from("hi");
        // send 方法返回一个 Result<T, E> 类型
        tx.send(val).unwrap();

        // 发送 val 后，所有权转移不能再使用
        // println!("val is {}", val);
    });

    // 通道的接收端有两个有用的方法：recv 和 try_recv。
    // recv 会在一个 Result<T, E> 中返回它。
    // try_recv 不会阻塞，相反它立刻返回一个 Result<T, E>
    // Ok 值包含可用的信息，而 Err 值代表此时没有任何消息。
    // 如果线程在等待消息过程中还有其他工作时使用 try_recv 很有用：
    // 可以编写一个循环来频繁调用 try_recv，在有可用消息时进行处理，
    // 其余时候则处理一会其他工作直到再次检查。
    let received = rx.recv().unwrap();
    println!("Got: {}", received);
}
```

```rust
use std::thread;
use std::sync::mpsc;
use std::time::Duration;

fn main() {
    let (tx, rx) = mpsc::channel();

    thread::spawn(move || {
        let vals = vec![
            String::from("hi"),
            String::from("from"),
            String::from("the"),
            String::from("thread"),
        ];

        for val in vals {
            tx.send(val).unwrap();
            thread::sleep(Duration::from_secs(1));
        }
    });

    // 当通道被关闭时，迭代器也将结束。
    for received in rx {
        println!("Got: {}", received);
    }
}
```

```rust
// 通过克隆发送者来创建多个生产者
let (tx, rx) = mpsc::channel();

let tx1 = tx.clone();
thread::spawn(move || {
    let vals = vec![
        String::from("hi"),
        String::from("from"),
        String::from("the"),
        String::from("thread"),
    ];

    for val in vals {
        tx1.send(val).unwrap();
        thread::sleep(Duration::from_secs(1));
    }
});

thread::spawn(move || {
    let vals = vec![
        String::from("more"),
        String::from("messages"),
        String::from("for"),
        String::from("you"),
    ];

    for val in vals {
        tx.send(val).unwrap();
        thread::sleep(Duration::from_secs(1));
    }
});

for received in rx {
    println!("Got: {}", received);
}
```
