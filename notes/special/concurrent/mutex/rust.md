互斥器（mutex）是 mutual exclusion 的缩写，也就是说，任意时刻，其只允许一个线程访问某些数据。

```rust
use std::sync::Mutex;
fn main() {
    // Mutex<i32> 并不是一个 i32，所以 必须 获取锁才能使用这个 i32 值。
    // Mutex<T> 是一个智能指针。
    // Mutex<T> 提供了内部可变性，就像 Cell 系列类型那样。
    let m = Mutex::new(5);
    {
        // lock 调用 返回 一个叫做 MutexGuard 的智能指针。
        // 这个智能指针实现了 Deref 来指向其内部数据；
        // 其也提供了一个 Drop 实现当 MutexGuard 离开作用域时自动释放锁，
        let mut num = m.lock().unwrap();
        *num = 6;
    }
    println!("m = {:?}", m);
}
```

## 原子引用计数 `Arc<T>`

- 使用 `RefCell<T>` 可以改变 `Rc<T>` 中的内容那样，
- 同样的可以使用 `Mutex<T>` 来改变 `Arc<T>` 中的内容。

```rust
use std::sync::{Mutex, Arc};
use std::thread;

fn main() {
    let counter = Arc::new(Mutex::new(0));
    let mut handles = vec![];

    for _ in 0..10 {
        let counter = Arc::clone(&counter);
        let handle = thread::spawn(move || {
            let mut num = counter.lock().unwrap();

            *num += 1;
        });
        handles.push(handle);
    }

    for handle in handles {
        handle.join().unwrap();
    }

    println!("Result: {}", *counter.lock().unwrap());
}
```
