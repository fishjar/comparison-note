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

## 更多例子

```sh
wasm-pack build --target web --debug

# npm install --global http-server
# http-server
npx serve .
```

### Execute Rust code from JavaScript

```rust
use wasm_bindgen::prelude::*;

#[wasm_bindgen]
pub fn helloworld() -> String {
    String::from("Hello world from Rust!")
}
```

```html
<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8" />
    <title>"Hello world" in Rust + Webassembly</title>
    <script type="module">
      import init, { helloworld } from "./pkg/helloworld.js";

      async function run() {
        await init();
        document.body.textContent = helloworld();
      }

      run();
    </script>
  </head>

  <body></body>
</html>
```

### Execute JavaScript code from Rust

```rust
// use the function console.log inside Rust
use wasm_bindgen::prelude::*;

#[wasm_bindgen]
extern "C" {
    #[wasm_bindgen(js_namespace = console)]
    fn log(s: &str);
}

#[wasm_bindgen]
pub fn example() {
    log("Log from rust");
}
```

```js
import init, { example } from "./pkg/helloworld.js";

async function run() {
  await init();
  example(); // This will log "Log from rust" to the console
}

run();
```

### Performance - JavaScript vs Rust

```rust
use wasm_bindgen::prelude::*;

#[wasm_bindgen]
pub fn fibonacci(n: u32) -> u32 {
    match n {
        0 | 1 => n,
        _ => fibonacci(n - 1) + fibonacci(n - 2),
    }
}
```

```js
import init, { fibonacci } from "./pkg/helloworld.js";

function fibonacciInJs(n) {
  if (n <= 1) return n;
  return fibonacciInJs(n - 1) + fibonacciInJs(n - 2);
}

async function run() {
  await init();
  const num = 20;

  console.time("Fibonnaci in rust");
  const fibRust = fibonacci(num);
  console.timeEnd("Fibonnaci in rust");

  console.time("Fibonnaci in JS");
  const fibJS = fibonacciInJs(num);
  console.timeEnd("Fibonnaci in JS");

  document.body.textContent = `Fib ${num}: Rust ${fibRust} - JS ${fibJS}`;
}

run();
```

### Publishing to NPM

```sh
# They work the same way as with npm pack and npm publish
wasm-pack pack myproject/pkg
wasm-pack publish
```

### run

```rust
use wasm_bindgen::prelude::*;

// Called by our JS entry point to run the example
#[wasm_bindgen(start)]
pub fn run() -> Result<(), JsValue> {
    // Use `web_sys`'s global `window` function to get a handle on the global
    // window object.
    let window = web_sys::window().expect("no global `window` exists");
    let document = window.document().expect("should have a document on window");
    let body = document.body().expect("document should have a body");

    // Manufacture the element we're gonna append
    let val = document.create_element("p")?;
    val.set_text_content(Some("Hello from Rust!"));

    body.append_child(&val)?;

    Ok(())
}
```

```toml
[lib]
crate-type = ["cdylib"]

[dependencies]
wasm-bindgen = "0.2"

[dependencies.web-sys]
version = "0.3.4"
features = [
  'Document',
  'Element',
  'HtmlElement',
  'Node',
  'Window',
]
```

```html
<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8" />
    <title>"Hello world" in Rust + Webassembly</title>
    <script type="module">
      import init from "./pkg/helloworld.js";

      async function run() {
        await init();
      }

      run();
    </script>
  </head>

  <body></body>
</html>
```
