```rust
fn main() {
    let tup: (i32, f64, u8) = (500, 6.4, 1); // 赋值
}
```

```rust
fn main() {
    let tup = (500, 6.4, 1);
    let (x, y, z) = tup; // 解构赋值
    println!("The value of y is: {}", y);
}
```

```rust
fn main() {
    let x: (i32, f64, u8) = (500, 6.4, 1);
    let five_hundred = x.0; // 访问元组元素
    let six_point_four = x.1;
    let one = x.2;
}
```
