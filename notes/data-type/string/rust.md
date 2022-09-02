- 字节 byte（`u8`）
- 字符 character（`char`）
  - 含一个或多个字节
- 字形簇（字母）
- 字符串 string（`String`）
  - `String` 是 `string` 的一种类型
  - 类似还有 `OsString`, `OsStr`, `CString`, and `CStr`
- 字符串切片 string slice (`&str`)
  - string slice 是 `String` 中一部分值的引用
  - 通常是借用的形式 `&str`
  - `str` 是一个 `DST`；直到运行时我们都不知道字符串有多长。

## 创建 String

```rust
// 新建一个空的 String
let mut s = String::new();

// 使用 String::from 函数从字符串字面量创建 String
let mut s = String::from("hello");

// 使用 to_string 方法创建 String
// 这里data的类型是 &str 而不是 str
let data = "initial contents";
let s = data.to_string();

// 该方法也可直接用于字符串字面量：
let s = "initial contents".to_string();
```

## 更新 String

```rust
// 使用 push_str 方法向 String 附加字符串 slice
let mut s = String::from("foo");
s.push_str("bar");

// push_str 不会获取所有权
let mut s1 = String::from("foo");
let s2 = "bar";
s1.push_str(s2);
println!("s2 is {}", s2);

// 使用 push 将单个字符加入 String 值中
let mut s = String::from("lo");
s.push('l');

// 使用 + 运算符或 format! 宏拼接 String
let s1 = String::from("Hello, ");
let s2 = String::from("world!");
// 不需要 s2 的所有权，所以加上 &
// 并且 &String 类型被强转成 &str，即 &s2 被转成 &s2[..]
let s3 = s1 + &s2; // 注意 s1 被移动了，不能继续使用
// 因为 add 没有获取参数的所有权，所以 s2 在这个操作后仍然是有效的 String
```

`+` 的定义类似

```rust
let s3 = s1 + &s2;

fn add(self, s: &str) -> String {
```

- `&String` 可以被 强转（coerced）成 `&str`
- 可以发现签名中 `add` 获取了 `self` 的所有权，因为 `self` 没有 使用 `&`。
- 这意味着 `s1` 的所有权将被移动到 `add` 调用中，之后就不再有效。
- 实际上这个语句会获取 `s1` 的所有权，附加上从 `s2` 中拷贝的内容，并返回结果的所有权。

```rust
let s1 = String::from("tic");
let s2 = String::from("tac");
let s3 = String::from("toe");

let s = s1 + "-" + &s2 + "-" + &s3;
let s = format!("{}-{}-{}", s1, s2, s3); // 使用 format! 宏
```

```rust
fn first_word(s: &str) -> &str {
    let bytes = s.as_bytes();

    for (i, &item) in bytes.iter().enumerate() {
        if item == b' ' {
            return &s[0..i];
        }
    }

    &s[..]
}

fn main() {
    let my_string = String::from("hello world");

    // `first_word` 接受 `String` 的切片，无论是部分还是全部
    let word = first_word(&my_string[0..6]);
    let word = first_word(&my_string[..]);
    // `first_word` 也接受 `String` 的引用，
    // 这等同于 `String` 的全部切片
    let word = first_word(&my_string);

    let my_string_literal = "hello world";

    // `first_word` 接受字符串字面量的切片，无论是部分还是全部
    let word = first_word(&my_string_literal[0..6]);
    let word = first_word(&my_string_literal[..]);

    // 因为字符串字面值**就是**字符串 slice，
    // 这样写也可以，即不使用 slice 语法！
    let word = first_word(my_string_literal);
}
```

```rust
let s = "hello world"; // 这里 s 的类型是 &str，&str 是一个不可变引用
let word = first_word(&s[0..6]);  // 这里 word 的类型也是 &str

let a = [1, 2, 3, 4, 5];
let slice = &a[1..3]; // 这个 slice 的类型是 &[i32]
```

## 索引 String

Rust 的字符串不支持索引。

```rust
let s1 = String::from("hello");
let h = s1[0]; // 错误
```

```rust
let len = String::from("Hola").len();         // 4
let len = String::from("Здравствуйте").len(); // 24

let hello = "Здравствуйте";
let s = &hello[0..4]; // Зд
&hello[0..1] // panic
```

## 遍历 String 的方法

```rust
for c in "नमस्ते".chars() {
    println!("{}", c);
}

// 这些代码会打印出组成 String 的 18 个字节：
for b in "नमस्ते".bytes() {
    println!("{}", b);
}
```
