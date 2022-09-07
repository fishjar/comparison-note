Cargo 推荐的目录结构

- `Cargo.toml` 和 `Cargo.lock` 保存在 `package` 根目录下
- 源代码放在 `src` 目录下
- 默认的 `lib` 包根是 `src/lib.rs`
- 默认的二进制包根是 `src/main.rs`
- 其它二进制包根放在 `src/bin/` 目录下
  - 为了使得 cargo 编译或运行这个二进制可执行文件而不是默认或其他二进制可执行文件，
  - 我们只需给 cargo 增加一个参数 `--bin my_other_bin`
- 基准测试 `benchmark` 放在 `benches` 目录下
- 示例代码放在 `examples` 目录下
- 集成测试代码放在 `tests` 目录下

```
.
├── Cargo.lock
├── Cargo.toml
├── src/
│   ├── lib.rs
│   ├── main.rs
│   └── bin/
│       ├── named-executable.rs
│       ├── another-executable.rs
│       └── multi-file-executable/
│           ├── main.rs
│           └── some_module.rs
├── benches/
│   ├── large-input.rs
│   └── multi-file-bench/
│       ├── main.rs
│       └── bench_module.rs
├── examples/
│   ├── simple.rs
│   └── multi-file-example/
│       ├── main.rs
│       └── ex_module.rs
└── tests/
    ├── some-integration-tests.rs
    └── multi-file-test/
        ├── main.rs
        └── test_module.rs
```

## mod

### 单文件内

```rust
fn function() {
    println!("called `function()`");
}
mod cool {
    pub fn function() {
        println!("called `cool::function()`");
    }
}
mod my {
    fn function() {
        println!("called `my::function()`");
    }
    mod cool {
        pub fn function() {
            println!("called `my::cool::function()`");
        }
    }
    pub fn indirect_call() {
        // 让我们从这个作用域中访问所有名为 `function` 的函数！
        print!("called `my::indirect_call()`, that\n> ");
        // `self` 关键字表示当前的模块作用域——在这个例子是 `my`。
        // 调用 `self::function()` 和直接调用 `function()` 都得到相同的结果，
        // 因为他们表示相同的函数。
        self::function();
        function();
        // 我们也可以使用 `self` 来访问 `my` 内部的另一个模块：
        self::cool::function();
        // `super` 关键字表示父作用域（在 `my` 模块外面）。
        super::function();
        // 这将在 *crate* 作用域内绑定 `cool::function` 。
        // 在这个例子中，crate 作用域是最外面的作用域。
        {
            use crate::cool::function as root_function;
            root_function();
        }
    }
}

fn main() {
    my::indirect_call();
}
```

### 文件分层

```sh
.
|-- my
|   |-- inaccessible.rs
|   |-- mod.rs
|   `-- nested.rs
`-- split.rs
```

```rust
// split.rs
// 此声明将会查找名为 `my.rs` 或 `my/mod.rs` 的文件，并将该文件的内容放到
// 此作用域中一个名为 `my` 的模块里面。
mod my;
fn function() {
    println!("called `function()`");
}
fn main() {
    my::function();
    function();
    my::indirect_access();
    my::nested::function();
}
```

```rust
// my/mod.rs
// 类似地，`mod inaccessible` 和 `mod nested` 将找到 `nested.rs` 和
// `inaccessible.rs` 文件，并在它们放到各自的模块中。
mod inaccessible;
pub mod nested;
pub fn function() {
    println!("called `my::function()`");
}
fn private_function() {
    println!("called `my::private_function()`");
}
pub fn indirect_access() {
    print!("called `my::indirect_access()`, that\n> ");
    private_function();
}
```

```rust
// my/nested.rs
pub fn function() {
    println!("called `my::nested::function()`");
}
#[allow(dead_code)]
fn private_function() {
    println!("called `my::nested::private_function()`");
}
```

```rust
// my/inaccessible.rs
#[allow(dead_code)]
pub fn public_function() {
    println!("called `my::inaccessible::public_function()`");
}
```
