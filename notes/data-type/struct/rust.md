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
