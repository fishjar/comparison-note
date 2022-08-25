- 可恢复错误 `Result<T, E>`
- 不可恢复(遇到错误时停止程序执行)错误 `panic!`

## 对应 panic 时的栈展开或终止

```toml
# Cargo.toml
[profile.release]
panic = 'abort'
```

## 使用 panic! 的 backtrace

```sh
RUST_BACKTRACE=1 cargo run
```
