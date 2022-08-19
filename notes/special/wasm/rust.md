参考： https://developer.mozilla.org/zh-CN/docs/WebAssembly/Rust_to_wasm

## 环境

### 安装 rust

### wasm-pack

```sh
cargo install wasm-pack
```

### 安装 npm

## 构建

```sh
# 创建一个lib项目
cargo new --lib hello-wasm

# 修改对应文件

# 构建包
# --target bundler - for bundlers like Webpack, Parcel, or Rollup.
# --target web - for the web as ECMAScript module.
# --target no-modules - for the web without ECMAScript module.
# --target nodejs - for Node.js
# wasm-pack build --scope mynpmusername
wasm-pack build --target bundler

# 发布包（可选）
cd pkg
npm publish --access=public
```

```rust
// src/lib.rs
extern crate wasm_bindgen;
use wasm_bindgen::prelude::*;

#[wasm_bindgen]
extern {
    pub fn alert(s: &str);
}

#[wasm_bindgen]
pub fn greet(name: &str) {
    alert(&format!("Hello, {}!", name));
}
```

```toml
# Cargo.toml
[package]
name = "hello-wasm"
version = "0.1.0"
authors = ["Your Name <you@example.com>"]
description = "A sample project with wasm-pack"
license = "MIT/Apache-2.0"
repository = "https://github.com/yourgithubusername/hello-wasm"

[lib]
crate-type = ["cdylib"]

[dependencies]
wasm-bindgen = "0.2"
```

## 使用构建生成的 wasm

### 新建 site 项目

```json
// package.json
{
  "scripts": {
    "serve": "webpack-dev-server"
  },
  //   "dependencies": {
  //     "@mynpmusername/hello-wasm": "^0.1.0"
  //   },
  "devDependencies": {
    "webpack": "^4.25.1",
    "webpack-cli": "^3.1.2",
    "webpack-dev-server": "^3.1.10"
  }
}
```

```js
// webpack.config.js
const path = require("path");
module.exports = {
  entry: "./index.js",
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "index.js",
  },
  mode: "development",
};
```

```html
<!-- index.html -->
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8" />
    <title>hello-wasm example</title>
  </head>
  <body>
    <script src="./index.js"></script>
  </body>
</html>
```

```js
// index.js
const js = import("../pkg/hello_wasm.js");
js.then((js) => {
  js.greet("WebAssembly");
});
```

### 测试

```sh
npm install
npm run serve
```
