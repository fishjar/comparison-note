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
