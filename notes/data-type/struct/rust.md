结构体（structure，缩写成 struct）有 3 种类型

- 元组结构体（tuple struct），事实上就是具名元组而已。
- 经典的 C 语言风格结构体（C struct）。
- 单元结构体（unit struct），不带字段，在泛型中很有用。

```rust
#[derive(Debug)]
struct User {
    active: bool,
    username: String,
    email: String,
    sign_in_count: u64,
}

fn build_user(email: String, username: String) -> User {
    User {
        email,
        username,
        active: true,
        sign_in_count: 1,
    }
}

fn main() {
    let mut user1 = build_user(
        String::from("someone@example.com"),
        String::from("someusername123"),
    );
    user1.email = String::from("anotheremail@example.com");
    println!("{:?}", user1);

    // 在这个例子中，我们在创建 user2 后不能再使用 user1，
    // 因为 user1 的 username 字段中的 String 被移到 user2 中。
    // 如果我们给 user2 的 email 和 username 都赋予新的 String 值，
    // 从而只使用 user1 的 active 和 sign_in_count 值，
    // 那么 user1 在创建 user2 后仍然有效。
    let user2 = User {
        email: String::from("another@example.com"),
        ..user1
    };
    println!("{:#?}", user2);
}
```

```sh
User { active: true, username: "someusername123", email: "anotheremail@example.com", sign_in_count: 1 }
User {
    active: true,
    username: "someusername123",
    email: "another@example.com",
    sign_in_count: 1,
}
```

```rust
#[derive(Debug)]
struct Rectangle {
    width: u32,
    height: u32,
}

impl Rectangle {
    // 方法
    fn area(&self) -> u32 {
        self.width * self.height
    }
    // 带参数的方法
    fn can_hold(&self, other: &Rectangle) -> bool {
        self.width > other.width && self.height > other.height
    }
    // 关联函数（associated function）
    fn square(size: u32) -> Rectangle {
        Rectangle {
            width: size,
            height: size,
        }
    }
}

fn main() {
    let rect1 = Rectangle {
        width: 30,
        height: 50,
    };

    println!(
        "The area of the rectangle is {} square pixels.",
        rect1.area()
    );
}
```

## 打印结构体

```rust
// 在结构体定义之前加上外部属性 #[derive(Debug)]
#[derive(Debug)]
struct Rectangle {
    width: u32,
    height: u32,
}

fn main() {
    let rect1 = Rectangle {
        width: 30,
        height: 50,
    };

    println!("rect1 is {:?}", rect1);
}
```

```rust
// 使用 dbg! 宏
#[derive(Debug)]
struct Rectangle {
    width: u32,
    height: u32,
}

fn main() {
    let scale = 2;
    let rect1 = Rectangle {
        width: dbg!(30 * scale),
        height: 50,
    };

    dbg!(&rect1);
}
```

## 元组结构体（tuple struct）

```rust
// black 和 origin 值的类型不同，因为它们是不同的元组结构体的实例。
struct Color(i32, i32, i32);
struct Point(i32, i32, i32);

fn main() {
    let black = Color(0, 0, 0);
    let origin = Point(0, 0, 0);
}
```

## 类单元结构体（unit-like structs）

类单元结构体常常在你想要在某个类型上实现 `trait` 但不需要在类型中存储数据的时候发挥作用。

```rust
struct AlwaysEqual;

fn main() {
    let subject = AlwaysEqual;
}
```
