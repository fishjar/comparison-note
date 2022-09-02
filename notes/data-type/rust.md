标量（scalar）类型表示单个值。
Rust 有 4 个基本的标量类型：整型、浮点型、布尔型和字符。

```rust
let guess: u32 = "42".parse().expect("Not a number!");

let x = 2.0; // f64
let y: f32 = 3.0; // f32

// addition
let sum = 5 + 10;

// subtraction
let difference = 95.5 - 4.3;

// multiplication
let product = 4 * 30;

// division
let quotient = 56.7 / 32.2;
let floored = 2 / 3; // Results in 0

// remainder
let remainder = 43 % 5;

let t = true;
let f: bool = false; // with explicit type annotation

let c = 'z';
let z = 'ℤ';
let heart_eyed_cat = '😻';
```

复合类型（compound type）可以将多个值组合成一个类型。
Rust 有两种基本的复合类型：元组（tuple）和数组（array）。

## 类型别名用来创建类型同义词

类型别名的主要用途是减少重复。

```rust
// Kilometers 是 i32 的 同义词（synonym）
let x: i32 = 5;
let y: Kilometers = 5;
println!("x + y = {}", x + y);

// 引入类型别名 Thunk 来减少重复
type Thunk = Box<dyn Fn() + Send + 'static>;
let f: Thunk = Box::new(|| println!("hi"));
fn takes_long_type(f: Thunk) {
    // --snip--
}
fn returns_long_type() -> Thunk {
    // --snip--
}
```

## 从不返回的 never type

- `!` 在函数从不返回的时候充当返回值。
- 从不返回的函数被称为 发散函数（diverging functions）

```rust
fn bar() -> ! {
    // --snip--
}

let guess: u32 = match guess.trim().parse() {
    Ok(num) => num,
    Err(_) => continue, // continue 的值是 !
};

impl<T> Option<T> {
    pub fn unwrap(self) -> T {
        match self {
            Some(val) => val,
            // panic! 是 ! 类型
            None => panic!("called `Option::unwrap()` on a `None` value"),
        }
    }
}

// 此表达式的值是 !
loop {
    print!("and ever ");
}
```

也就是说，对于如下泛型函数定义：

```rust
fn generic<T>(t: T) {
    // --snip--
}
// 实际上被当作如下处理：
fn generic<T: Sized>(t: T) {
    // --snip--
}
```
