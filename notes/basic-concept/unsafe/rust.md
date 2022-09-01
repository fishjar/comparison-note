不安全的超能力

- 解引用裸指针
- 调用不安全的函数或方法
- 访问或修改可变静态变量
- 实现不安全 trait
- 访问 union 的字段

unsafe 不意味着块中的代码就一定是危险的或者必然导致内存安全问题：
其意图在于作为开发者你将会确保 unsafe 块中的代码以有效的方式访问内存。

## 解引用裸指针（raw pointers）

- 裸指针一个主要的应用场景便是调用 `C` 代码接口，
- 另一个场景是构建借用检查器无法理解的安全抽象。

- 裸指针是不可变或可变的，分别写作 `*const T` 和 `*mut T`。
  这里的星号不是解引用运算符；它是类型名称的一部分。
- 创建一个指针不会造成任何危险；只有当访问其指向的值时才有可能遇到无效的值。

```rust
// 创建指向任意内存地址的裸指针
let address = 0x012345usize;
let r = address as *const i32;

// 同时指向相同内存位置 num 的裸指针 *const i32 和 *mut i32
// 如果尝试同时创建 num 的不可变和可变引用，将无法通过编译
let mut num = 5;
let r1 = &num as *const i32;
let r2 = &mut num as *mut i32;
unsafe {
    // 对裸指针使用解引用运算符 *
    println!("r1 is: {}", *r1);
    println!("r2 is: {}", *r2);
}
```

## 调用不安全函数或方法

```rust
unsafe fn dangerous() {}
unsafe {
    dangerous();
}
```

```rust
use std::slice;
let address = 0x01234usize;
let r = address as *mut i32;
let slice: &[i32] = unsafe {
    slice::from_raw_parts_mut(r, 10000)
};
```

## 使用 extern 函数调用外部代码

```rust
extern "C" {
    fn abs(input: i32) -> i32;
}
fn main() {
    unsafe {
        println!("Absolute value of -3 according to C: {}", abs(-3));
    }
}
```

## 从其它语言调用 Rust 函数

```rust
// 增加 #[no_mangle] 标注来告诉 Rust 编译器不要 mangle 此函数的名称。
// 一旦其编译为动态库并从 C 语言中链接，call_from_c 函数就能够在 C 代码中访问：
// extern 的使用无需 unsafe。
#[no_mangle]
pub extern "C" fn call_from_c() {
    println!("Just called a Rust function from C!");
}
```

## 访问或修改可变静态变量

全局变量在 Rust 中被称为 静态（static）变量，静态变量类似于常量。
如果有两个线程访问相同的可变全局变量，则可能会造成数据竞争。

```rust
static HELLO_WORLD: &str = "Hello, world!";
fn main() {
    println!("name is: {}", HELLO_WORLD);
}
```

常量与不可变静态变量可能看起来很类似，不过一个微妙的区别是

- 静态变量中的值有一个固定的内存地址。
  使用这个值总是会访问相同的地址。
- 另一方面，常量则允许在任何被用到的时候复制其数据。

常量与静态变量的另一个区别在于

- 静态变量可以是可变的。
- 访问不可变静态变量是安全的。
- 访问和修改可变静态变量都是 不安全 的。

```rust
// 读取或修改一个可变静态变量是不安全的
static mut COUNTER: u32 = 0;
fn add_to_count(inc: u32) {
    unsafe {
        COUNTER += inc;
    }
}
fn main() {
    add_to_count(3);
    unsafe {
        println!("COUNTER: {}", COUNTER);
    }
}
```

## 实现不安全 trait

当 trait 中至少有一个方法中包含编译器无法验证的不变式（invariant）时 trait 是不安全的。可以在 trait 之前增加 unsafe 关键字将 trait 声明为 unsafe，同时 trait 的实现也必须标记为 unsafe，

```rust
unsafe trait Foo {
    // methods go here
}
unsafe impl Foo for i32 {
    // method implementations go here
}
```
