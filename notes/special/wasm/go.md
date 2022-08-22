## 构建

```go
// main.go
package main
import "fmt"

func main() {
	fmt.Println("Hello, WebAssembly!")
}
```

```sh
GOOS=js GOARCH=wasm go build -o main.wasm .
```

## 使用

```sh
# 拷贝必要的js
cp "$(go env GOROOT)/misc/wasm/wasm_exec.js" .

# 安装web工具
go get -u github.com/shurcooL/goexec

# 启动web服务
goexec 'http.ListenAndServe(`:8080`, http.FileServer(http.Dir(`.`)))'
```

```html
<!-- index.html -->
<html>
  <head>
    <meta charset="utf-8" />
    <script src="wasm_exec.js"></script>
    <script>
      const go = new Go();
      WebAssembly.instantiateStreaming(
        fetch("main.wasm"),
        go.importObject
      ).then((result) => {
        go.run(result.instance);
      });
    </script>
  </head>
  <body></body>
</html>
```

## 更多例子

### 注册函数(Register Functions)

```go
// main.go
package main

import "syscall/js"

func fib(i int) int {
	if i == 0 || i == 1 {
		return i
	}
	return fib(i-1) + fib(i-2)
}

func fibFunc(this js.Value, args []js.Value) interface{} {
	return js.ValueOf(fib(args[0].Int()))
}

func main() {
	done := make(chan int)
	js.Global().Set("fibFunc", js.FuncOf(fibFunc))
	<-done
}
```

```html
<!-- index.html -->
<html>
  <head>
    <meta charset="utf-8" />
    <script src="wasm_exec.js"></script>
    <script>
      const go = new Go();
      WebAssembly.instantiateStreaming(
        fetch("main.wasm"),
        go.importObject
      ).then((result) => {
        go.run(result.instance);
      });
    </script>
  </head>
  <body>
    <input id="num" type="number" />
    <button id="btn" onclick="ans.innerHTML=fibFunc(num.value * 1)">
      Click
    </button>
    <p id="ans">1</p>
  </body>
</html>
```

### 操作 DOM

```go
// main.go
package main

import (
	"strconv"
	"syscall/js"
)

func fib(i int) int {
	if i == 0 || i == 1 {
		return i
	}
	return fib(i-1) + fib(i-2)
}

var (
	document = js.Global().Get("document")
	numEle   = document.Call("getElementById", "num")
	ansEle   = document.Call("getElementById", "ans")
	btnEle   = js.Global().Get("btn")
)

func fibFunc(this js.Value, args []js.Value) interface{} {
	v := numEle.Get("value")
	if num, err := strconv.Atoi(v.String()); err == nil {
		ansEle.Set("innerHTML", js.ValueOf(fib(num)))
	}
	return nil
}

func main() {
	done := make(chan int)
	btnEle.Call("addEventListener", "click", js.FuncOf(fibFunc))
	<-done
}
```

```html
<!-- index.html -->
<html>
  <head>
    <meta charset="utf-8" />
    <script src="wasm_exec.js"></script>
    <script>
      const go = new Go();
      WebAssembly.instantiateStreaming(
        fetch("main.wasm"),
        go.importObject
      ).then((result) => {
        go.run(result.instance);
      });
    </script>
  </head>
  <body>
    <input id="num" type="number" />
    <button id="btn">Click</button>
    <p id="ans">1</p>
  </body>
</html>
```

### 回调函数(Callback Functions)

```go
// main.go
package main

import (
	"syscall/js"
	"time"
)

func fib(i int) int {
	if i == 0 || i == 1 {
		return i
	}
	return fib(i-1) + fib(i-2)
}

func fibFunc(this js.Value, args []js.Value) interface{} {
	callback := args[len(args)-1]

    // 异步执行
	go func() {
		time.Sleep(3 * time.Second)
		v := fib(args[0].Int())
		callback.Invoke(v) // 执行完成，调用回调函数
	}()

	js.Global().Get("ans").Set("innerHTML", "Waiting 3s...")
	return nil
}

func main() {
	done := make(chan int)
	js.Global().Set("fibFunc", js.FuncOf(fibFunc))
	<-done
}
```

```html
<!-- index.html -->
<html>
  <head>
    <meta charset="utf-8" />
    <script src="wasm_exec.js"></script>
    <script>
      const go = new Go();
      WebAssembly.instantiateStreaming(
        fetch("main.wasm"),
        go.importObject
      ).then((result) => {
        go.run(result.instance);
      });
    </script>
  </head>
  <body>
    <input id="num" type="number" />
    <button id="btn" onclick="fibFunc(num.value * 1, (v)=> ans.innerHTML=v)">
      Click
    </button>
    <p id="ans"></p>
  </body>
</html>
```

### Performance - JavaScript vs Go

```go
package main

import "syscall/js"

func fib(i int) int {
	if i == 0 || i == 1 {
		return i
	}
	return fib(i-1) + fib(i-2)
}

func fibFunc(this js.Value, args []js.Value) interface{} {
	return js.ValueOf(fib(args[0].Int()))
}

func main() {
	done := make(chan int)
	js.Global().Set("fibFunc", js.FuncOf(fibFunc))
	<-done
}
```

```html
<html>
  <head>
    <meta charset="utf-8" />
    <script src="./wasm_exec.js"></script>
    <script type="module">
      function fibonacciInJs(n) {
        if (n <= 1) return n;
        return fibonacciInJs(n - 1) + fibonacciInJs(n - 2);
      }

      async function run() {
        const go = new Go();
        const result = await WebAssembly.instantiateStreaming(
          fetch("main.wasm"),
          go.importObject
        );
        go.run(result.instance);

        const num = 20;

        console.time("Fibonnaci in go");
        const fibGo = fibFunc(num);
        console.timeEnd("Fibonnaci in go");

        console.time("Fibonnaci in JS");
        const fibJS = fibonacciInJs(num);
        console.timeEnd("Fibonnaci in JS");

        document.body.textContent = `Fib ${num}: Go ${fibGo} - JS ${fibJS}`;
      }

      run();
    </script>
  </head>
  <body></body>
</html>
```

## 优化

```sh
# 优化前命令
GOOS=js GOARCH=wasm go build -o ./main.wasm ./main.go

# 利用 tinygo
tinygo build -o ./main.wasm -target wasm ./main.go
tinygo build -o ./main.wasm -target wasm -no-debug ./main.go
```
