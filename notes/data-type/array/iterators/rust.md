迭代器（iterator）负责遍历序列中的每一项和决定序列何时结束的逻辑。当使用迭代器时，我们无需重新实现这些逻辑。

在 Rust 中，迭代器是 惰性的（lazy），这意味着在调用方法使用迭代器之前它都不会有效果。

```rust
let v1 = vec![1, 2, 3];
let v1_iter = v1.iter(); // 创建迭代器
for val in v1_iter {
    println!("Got: {}", val);
}
```

迭代器都实现了一个叫做 Iterator 的定义于标准库的 trait

```rust
pub trait Iterator {
    type Item; // 定义了 trait 的 关联类型（associated type）
    fn next(&mut self) -> Option<Self::Item>;
    // 此处省略了方法的默认实现
}
```

- `iter` 方法生成一个不可变引用的迭代器。
- 如果我们需要一个获取所有权并返回拥有所有权的迭代器，则可以调用 `into_iter` 而不是 iter。
- 类似的，如果我们希望迭代可变引用，则可以调用 `iter_mut` 而不是 iter

```rust
fn iterator_demonstration() {
    let v1 = vec![1, 2, 3];
    // 注意 v1_iter 需要是可变的
    // 使用 for 循环时无需使 v1_iter 可变
    // 因为 for 循环会获取 v1_iter 的所有权并在后台使 v1_iter 可变。
    let mut v1_iter = v1.iter();
    // 调用迭代器的 next 方法
    assert_eq!(v1_iter.next(), Some(&1));
    assert_eq!(v1_iter.next(), Some(&2));
    assert_eq!(v1_iter.next(), Some(&3));
    assert_eq!(v1_iter.next(), None);
}
```

## 消费迭代器

```rust
fn iterator_sum() {
    let v1 = vec![1, 2, 3];
    let v1_iter = v1.iter();
    // next 方法的方法被称为 消费适配器（consuming adaptors）
    // sum 方法也是
    let total: i32 = v1_iter.sum();
    assert_eq!(total, 6);
}
```

## 产生其他迭代器

Iterator trait 中定义了另一类方法，被称为 迭代器适配器（iterator adaptors）

```rust
let v1: Vec<i32> = vec![1, 2, 3];
// 调用 map 方法创建一个新迭代器，
// 接着调用 collect 方法消费新迭代器并创建一个 vector
let v2: Vec<_> = v1.iter().map(|x| x + 1).collect();
assert_eq!(v2, vec![2, 3, 4]);
```

## 使用闭包

```rust
#[derive(PartialEq, Debug)]
struct Shoe {
    size: u32,
    style: String,
}

fn shoes_in_my_size(shoes: Vec<Shoe>, shoe_size: u32) -> Vec<Shoe> {
    shoes.into_iter()
        .filter(|s| s.size == shoe_size)
        .collect()
}

#[test]
fn filters_by_size() {
    let shoes = vec![
        Shoe { size: 10, style: String::from("sneaker") },
        Shoe { size: 13, style: String::from("sandal") },
        Shoe { size: 10, style: String::from("boot") },
    ];
    let in_my_size = shoes_in_my_size(shoes, 10);
    assert_eq!(
        in_my_size,
        vec![
            Shoe { size: 10, style: String::from("sneaker") },
            Shoe { size: 10, style: String::from("boot") },
        ]
    );
}
```

## 自定义迭代器

```rust
struct Counter {
    count: u32,
}

impl Counter {
    fn new() -> Counter {
        Counter { count: 0 }
    }
}

impl Iterator for Counter {
    type Item = u32;

    fn next(&mut self) -> Option<Self::Item> {
        self.count += 1;

        if self.count < 6 {
            Some(self.count)
        } else {
            None
        }
    }
}

#[test]
fn calling_next_directly() {
    let mut counter = Counter::new();

    assert_eq!(counter.next(), Some(1));
    assert_eq!(counter.next(), Some(2));
    assert_eq!(counter.next(), Some(3));
    assert_eq!(counter.next(), Some(4));
    assert_eq!(counter.next(), Some(5));
    assert_eq!(counter.next(), None);
}

#[test]
fn using_other_iterator_trait_methods() {
    let sum: u32 = Counter::new()
        .zip(Counter::new().skip(1))
        .map(|(a, b)| a * b)
        .filter(|x| x % 3 == 0)
        .sum();
    assert_eq!(18, sum);
}
```
