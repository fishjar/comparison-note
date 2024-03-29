```sh
cargo new hello_world
cargo build
cargo run

cargo update            # 更新所有依赖
cargo update -p regex   # 只更新 “regex”

cargo test
```

## 多引用方式混合

```toml
[dependencies]
# 本地使用时，通过 path 引入,
# 发布到 `crates.io` 时，通过 `crates.io` 的方式引入：  version = "1.0"
bitflags = { path = "my-bitflags", version = "1.0" }

# 本地使用时，通过 git 仓库引入
# 当发布时，通过 `crates.io` 引入： version = "1.0"
smallvec = { git = "https://github.com/servo/rust-smallvec", version = "1.0" }

# N.B. 若 version 无法匹配，Cargo 将无法编译
```

## 根据平台引入依赖

```toml
[target.'cfg(windows)'.dependencies]
winhttp = "0.4.0"

[target.'cfg(unix)'.dependencies]
openssl = "1.0.1"

[target.'cfg(target_arch = "x86")'.dependencies]
native = { path = "native/i686" }

[target.'cfg(target_arch = "x86_64")'.dependencies]
native = { path = "native/x86_64" }
```

## 选择 features

```toml
[dependencies.awesome]
version = "1.3.5"
default-features = false # 不要包含默认的 features，而是通过下面的方式来指定
features = ["secure-password", "civet"]
```

## 在 Cargo.toml 中重命名依赖

```toml
[package]
name = "mypackage"
version = "0.0.1"

[dependencies]
foo = "0.1"
bar = { git = "https://github.com/example/project", package = "foo" }
baz = { version = "0.1", registry = "custom", package = "foo" }
```

## 依赖覆盖

```toml
[package]
name = "my-library"
version = "0.1.0"

[dependencies]
uuid = "0.8.2"

[patch.crates-io]
uuid = { path = "../uuid" }
```

```sh
# 指定版本进行更新
cargo update -p uuid --precise 0.8.3
```

## 自定义构建

```toml
[profile.dev]
# opt-level 设置控制 Rust 会对代码进行何种程度的优化。
# 这个配置的值从 0 到 3。
opt-level = 0

[profile.release]
opt-level = 3
```

## 发布 create

`crates.io` 上注册账号并获取一个 API token。

```sh
# 登录
cargo login abcdefghijklmnopqrstuvwxyz012345

# 修改 Cargo.toml 配置

# 发布
cargo publish

# 更新
# 修改 version 后
cargo publish

# 撤回版本
cargo yank --vers 1.0.1
# 撤销撤回操作
cargo yank --vers 1.0.1 --undo
```

```toml
[package]
name = "guessing_game"
version = "0.1.0"
authors = ["Your Name <you@example.com>"]
edition = "2018"
description = "A fun game where you guess what number the computer has chosen."
license = "MIT OR Apache-2.0"

[dependencies]
```
