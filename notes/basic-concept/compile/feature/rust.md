## 项目可以定义 feature

- 在 Cargo.toml 中定义的 feature 会被 Cargo 通过命令行参数 --cfg 传给 rustc，
  - 最终由后者完成编译：rustc --cfg ...
- 例如 ICO 图片格式包含 BMP 和 PNG 格式，
  - 因此当 ico 被启用后，它还得确保启用 bmp 和 png
  - 可以理解为： bmp 和 png 是开启 ico 的先决条件
- 默认情况下，所有的 feature 都会被自动禁用，可以通过 default 来启用它们

```toml
[features]
default = ["ico", "webp"]
bmp = []
png = []
ico = ["bmp", "png"]
webp = []
```

```rust
// 只有在 webp feature 被定义后，以下的 webp 模块才能被引入进来
#[cfg(feature = "webp")]
pub mod webp;
```

## 可选依赖

- 当依赖被标记为 "可选 optional" 时，意味着它默认不会被编译。
- 这种可选依赖的写法会自动定义一个与依赖同名的 feature，也就是 gif feature，
  - 这样一来，当我们启用 gif feature 时，该依赖库也会被自动引入并启用：
  - 例如通过 --feature gif 的方式启用 feature 。

```toml
[dependencies]
gif = { version = "0.11.1", optional = true }
```

- 还可以通过显式定义 feature 的方式来启用这些可选依赖库，
  - avif feature 一旦被启用，那这两个依赖库也将自动被引入

```toml
[dependencies]
ravif = { version = "0.6.3", optional = true }
rgb = { version = "0.8.25", optional = true }

[features]
avif = ["ravif", "rgb"]
```

## 依赖库自身的 feature

```toml
[dependencies]
serde = { version = "1.0.118", features = ["derive"] }
```

以上配置为 `serde` 依赖开启了 `derive` feature，还可以通过 `default-features = false` 来禁用依赖库的 `default` feature :

```toml
# 这里我们禁用了 flate2 的 default feature，但又手动为它启用了 zlib feature。
[dependencies]
flate2 = { version = "1.0.3", default-features = false, features = ["zlib"] }
```

### 间接开启依赖库的 feature :

```toml
[dependencies]
jpeg-decoder = { version = "0.1.20", default-features = false }

[features]
# 我们定义了一个 parallel feature，同时为其启用了 jpeg-decoder 依赖的 rayon feature
# Enables parallel processing support by enabling the "rayon" feature of jpeg-decoder.
parallel = ["jpeg-decoder/rayon"]
```

## 通过命令行参数启用 feature

- `--features FEATURES`: 启用给出的 feature 列表，可以使用逗号或空格进行分隔，
  - 若你是在终端中使用，还需要加上双引号，例如 `--features "foo bar"`。
  - 若在工作空间中构建多个 `package`，可以使用 `package-name/feature-name` 为特定的成员启用 features
- `--all-features`: 启用命令行上所选择的所有包的所有 features
- `--no-default-features`: 对选择的包禁用 default feature

## 检视已解析的 features

```sh
cargo tree -e features
test_cargo v0.1.0 (/Users/sunfei/development/rust/demos/test_cargo)
└── uuid feature "default"
    ├── uuid v0.8.2
    └── uuid feature "std"
        └── uuid v0.8.2

# cargo tree -f "{p} {f}" 命令会提供一个更加紧凑的视图：
cargo tree -f "{p} {f}"
test_cargo v0.1.0 (/Users/sunfei/development/rust/demos/test_cargo)
└── uuid v0.8.2 default,std
```
