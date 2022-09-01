模式由如下一些内容组合而成：

- 字面量
- 解构的数组、枚举、结构体或者元组
- 变量
- 通配符
- 占位符

## 可能会用到模式的位置

```rust
// match 分支
match VALUE {
    PATTERN => EXPRESSION,
    PATTERN => EXPRESSION,
    PATTERN => EXPRESSION,
}


// if let 条件表达式
let favorite_color: Option<&str> = None;
let is_tuesday = false;
let age: Result<u8, _> = "34".parse();
if let Some(color) = favorite_color {
    println!("Using your favorite color, {}, as the background", color);
} else if is_tuesday {
    println!("Tuesday is green day!");
} else if let Ok(age) = age {
    if age > 30 {
        println!("Using purple as the background color");
    } else {
        println!("Using orange as the background color");
    }
} else {
    println!("Using blue as the background color");
}


// while let 条件循环
let mut stack = Vec::new();
stack.push(1);
stack.push(2);
stack.push(3);
while let Some(top) = stack.pop() {
    println!("{}", top);
}


// for 循环
let v = vec!['a', 'b', 'c'];
for (index, value) in v.iter().enumerate() {
    println!("{} is at index {}", value, index);
}


// let 语句
let x = 5;
let (x, y, z) = (1, 2, 3);


// 函数参数
fn foo(x: i32) {
    // 代码
}

// 函数参数
fn print_coordinates(&(x, y): &(i32, i32)) {
    println!("Current location: ({}, {})", x, y);
}
fn main() {
    let point = (3, 5);
    print_coordinates(&point);
}
```

## 模式语法

```rust
// 匹配字面量
let x = 1;
match x {
    1 => println!("one"),
    2 => println!("two"),
    3 => println!("three"),
    _ => println!("anything"),
}


// 匹配命名变量
fn main() {
    let x = Some(5);
    let y = 10;
    match x {
        Some(50) => println!("Got 50"),
        Some(y) => println!("Matched, y = {:?}", y),
        _ => println!("Default case, x = {:?}", x),
    }
    println!("at the end: x = {:?}, y = {:?}", x, y);
}


// 多个模式
let x = 1;
match x {
    1 | 2 => println!("one or two"),
    3 => println!("three"),
    _ => println!("anything"),
}


// 通过 ..= 匹配值的范围
let x = 5;
match x {
    1..=5 => println!("one through five"),
    _ => println!("something else"),
}


// 解构并分解值
struct Point {
    x: i32,
    y: i32,
}
let p = Point { x: 0, y: 7 };
let Point { x: a, y: b } = p;
assert_eq!(0, a);
assert_eq!(7, b);

//  使用结构体字段简写来解构结构体字段
struct Point {
    x: i32,
    y: i32,
}
let p = Point { x: 0, y: 7 };
let Point { x, y } = p;
assert_eq!(0, x);
assert_eq!(7, y);

// 解构和匹配模式中的字面量
let p = Point { x: 0, y: 7 };
match p {
    Point { x, y: 0 } => println!("On the x axis at {}", x),
    Point { x: 0, y } => println!("On the y axis at {}", y),
    Point { x, y } => println!("On neither axis: ({}, {})", x, y),
}


// 解构枚举
enum Message {
    Quit,
    Move { x: i32, y: i32 },
    Write(String),
    ChangeColor(i32, i32, i32),
}
let msg = Message::ChangeColor(0, 160, 255);
match msg {
    Message::Quit => {
        println!("The Quit variant has no data to destructure.")
    }
    Message::Move { x, y } => {
        println!(
            "Move in the x direction {} and in the y direction {}",
            x,
            y
        );
    }
    Message::Write(text) => println!("Text message: {}", text),
    Message::ChangeColor(r, g, b) => {
        println!(
            "Change the color to red {}, green {}, and blue {}",
            r,
            g,
            b
        )
    }
}


// 解构嵌套的结构体和枚举
enum Color {
   Rgb(i32, i32, i32),
   Hsv(i32, i32, i32),
}
enum Message {
    Quit,
    Move { x: i32, y: i32 },
    Write(String),
    ChangeColor(Color),
}
fn main() {
    let msg = Message::ChangeColor(Color::Hsv(0, 160, 255));
    match msg {
        Message::ChangeColor(Color::Rgb(r, g, b)) => {
            println!(
                "Change the color to red {}, green {}, and blue {}",
                r,
                g,
                b
            )
        }
        Message::ChangeColor(Color::Hsv(h, s, v)) => {
            println!(
                "Change the color to hue {}, saturation {}, and value {}",
                h,
                s,
                v
            )
        }
        _ => ()
    }
}


// 解构结构体和元组
let ((feet, inches), Point {x, y}) = ((3, 10), Point { x: 3, y: -10 });


// 使用 _ 忽略整个值
fn foo(_: i32, y: i32) {
    println!("This code only uses the y parameter: {}", y);
}
foo(3, 4);


// 使用嵌套的 _ 忽略部分值
let mut setting_value = Some(5);
let new_setting_value = Some(10);
match (setting_value, new_setting_value) {
    (Some(_), Some(_)) => {
        println!("Can't overwrite an existing customized value");
    }
    _ => {
        setting_value = new_setting_value;
    }
}
println!("setting is {:?}", setting_value);

// 忽略元组的多个部分
let numbers = (2, 4, 8, 16, 32);
match numbers {
    (first, _, third, _, fifth) => {
        println!("Some numbers: {}, {}, {}", first, third, fifth)
    },
}


// 只使用 _ 和使用以下划线开头的名称有些微妙的不同：
// 比如 _x 仍会将值绑定到变量，
let s = Some(String::from("Hello!"));
if let Some(_s) = s {
    println!("found a string");
}
println!("{:?}", s); // 错误

// 而 _ 则完全不会绑定。
let s = Some(String::from("Hello!"));
if let Some(_) = s {
    println!("found a string");
}
println!("{:?}", s);


// 用 .. 忽略剩余值
struct Point {
    x: i32,
    y: i32,
    z: i32,
}
let origin = Point { x: 0, y: 0, z: 0 };
match origin {
    Point { x, .. } => println!("x is {}", x),
}

// 只匹配元组中的第一个和最后一个值并忽略掉所有其它值
let numbers = (2, 4, 8, 16, 32);
match numbers {
    (first, .., last) => {
        println!("Some numbers: {}, {}", first, last);
    },
}


// 匹配守卫提供的额外条件
// 匹配守卫（match guard）是一个指定于 match 分支模式之后的额外 if 条件
let num = Some(4);
match num {
    Some(x) if x < 5 => println!("less than five: {}", x),
    Some(x) => println!("{}", x),
    None => (),
}

// 使用匹配守卫来测试与外部变量的相等性
let x = Some(5);
let y = 10;
match x {
    Some(50) => println!("Got 50"),
    Some(n) if n == y => println!("Matched, n = {}", n),
    _ => println!("Default case, x = {:?}", x),
}
println!("at the end: x = {:?}, y = {}", x, y);

// 结合多个模式与匹配守卫
let x = 4;
let y = false;
match x {
    4 | 5 | 6 if y => println!("yes"),
    _ => println!("no"),
}


// @ 绑定
// at 运算符（@）允许我们在创建一个存放值的变量的同时测试其值是否匹配模式。
enum Message {
    Hello { id: i32 },
}
let msg = Message::Hello { id: 5 };
match msg {
    // 测试 Message::Hello 的 id 字段是否位于 3..=7 范围内，
    // 同时也希望能将其值绑定到 id_variable 变量中
    Message::Hello { id: id_variable @ 3..=7 } => {
        println!("Found an id in range: {}", id_variable)
    },
    // 这个模式的代码并不知情也不能使用 id 字段中的值，
    // 因为没有将 id 值保存进一个变量。
    Message::Hello { id: 10..=12 } => {
        println!("Found an id in another range")
    },
    Message::Hello { id } => {
        println!("Found some other id: {}", id)
    },
}
```
