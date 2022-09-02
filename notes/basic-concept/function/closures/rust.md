Rust 的 闭包（closures）是可以保存进变量或作为参数传递给其他函数的匿名函数。

```rust
fn  add_one_v1   (x: u32) -> u32 { x + 1 }
let add_one_v2 = |x: u32| -> u32 { x + 1 };
let add_one_v3 = |x|             { x + 1 };
let add_one_v4 = |x|               x + 1  ;
```

## 使用带有泛型和 Fn trait 的闭包

```rust
use std::thread;
use std::time::Duration;

struct Cacher<T>
    where T: Fn(u32) -> u32
{
    calculation: T,
    value: Option<u32>,
}

impl<T> Cacher<T>
    where T: Fn(u32) -> u32
{
    fn new(calculation: T) -> Cacher<T> {
        Cacher {
            calculation,
            value: None,
        }
    }

    fn value(&mut self, arg: u32) -> u32 {
        match self.value {
            Some(v) => v,
            None => {
                let v = (self.calculation)(arg);
                self.value = Some(v);
                v
            },
        }
    }
}

fn generate_workout(intensity: u32, random_number: u32) {
    let mut expensive_result = Cacher::new(|num| {
        println!("calculating slowly...");
        thread::sleep(Duration::from_secs(2));
        num
    });

    if intensity < 25 {
        println!(
            "Today, do {} pushups!",
            expensive_result.value(intensity)
        );
        println!(
            "Next, do {} situps!",
            expensive_result.value(intensity)
        );
    } else {
        if random_number == 3 {
            println!("Take a break today! Remember to stay hydrated!");
        } else {
            println!(
                "Today, run for {} minutes!",
                expensive_result.value(intensity)
            );
        }
    }
}
```

## 闭包会捕获其环境

```rust
fn main() {
    let x = 4;
    let equal_to_x = |z| z == x;
    let y = 4;
    assert!(equal_to_x(y));
}

// 函数则会错误
fn main() {
    let x = 4;
    fn equal_to_x(z: i32) -> bool { z == x } // 这里x不能使用
    let y = 4;
    assert!(equal_to_x(y));
}
```

## 函数指针

- `fn` 被称为 函数指针（function pointer）
- 函数指针实现了所有三个闭包 trait（`Fn`、`FnMut` 和 `FnOnce`）
  - 所以总是可以在调用期望闭包的函数时传递函数指针作为参数
  - 这样它就能接受函数或闭包作为参数

```rust
fn add_one(x: i32) -> i32 {
    x + 1
}
// 使用 fn 类型接受函数指针作为参数
fn do_twice(f: fn(i32) -> i32, arg: i32) -> i32 {
    f(arg) + f(arg)
}
fn main() {
    let answer = do_twice(add_one, 5);
    println!("The answer is: {}", answer);
}

// 使用闭包
let list_of_numbers = vec![1, 2, 3];
let list_of_strings: Vec<String> = list_of_numbers
    .iter()
    .map(|i| i.to_string())
    .collect();

// 可以将函数作为 map 的参数来代替闭包
let list_of_numbers = vec![1, 2, 3];
let list_of_strings: Vec<String> = list_of_numbers
    .iter()
    .map(ToString::to_string) // 完全限定语法，因为存在多个叫做 to_string 的函数
    .collect();
```

```rust
// 这里创建了 Status::Value 实例，
// 它通过 map 用范围的每一个 u32 值调用 Status::Value 的初始化函数
enum Status {
    Value(u32),
    Stop,
}
let list_of_statuses: Vec<Status> =
    (0u32..20)
    .map(Status::Value) // 这些项使用 () 作为初始化语法，这看起来就像函数调用
    .collect();
```

## 返回闭包

```rust
// 错误
// Rust 并不知道需要多少空间来储存闭包
fn returns_closure() -> Fn(i32) -> i32 {
    |x| x + 1
}

// 修正
fn returns_closure() -> Box<dyn Fn(i32) -> i32> {
    Box::new(|x| x + 1)
}
```
