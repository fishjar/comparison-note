## 错误包装

`Wrap` 和 `WrapWithCode` 则是错误二次包装函数，用于将底层的错误包装为新的错误，但是保留的原始的底层错误信息。

```go
import (
    "github.com/chai2010/errors"
)

func loadConfig() error {
    _, err := ioutil.ReadFile("/path/to/file")
    if err != nil {
        return errors.Wrap(err, "read failed")
    }

    // ...
}

func setup() error {
    err := loadConfig()
    if err != nil {
        return errors.Wrap(err, "invalid config")
    }

    // ...
}

func main() {
    if err := setup(); err != nil {
        log.Fatal(err)
    }

    // ...
}
```

遍历原始错误经历了哪些包装流程：

```go
    for i, e := range err.(errors.Error).Wraped() {
        fmt.Printf("wrapped(%d): %v\n", i, e)
    }
```

获取每个包装错误的函数调用堆栈信息：

```go
    for i, x := range err.(errors.Error).Caller() {
        fmt.Printf("caller:%d: %s\n", i, x.FuncName)
    }
```

用 errors.ToJson(err) 编码为 JSON 字符串：

```go
// 以 JSON 字符串方式发送错误
func sendError(ch chan<- string, err error) {
    ch <- errors.ToJson(err)
}

// 接收 JSON 字符串格式的错误
func recvError(ch <-chan string) error {
    p, err := errors.FromJson(<-ch)
    if err != nil {
        log.Fatal(err)
    }
    return p
}
```

给错误绑定一个对应的 http 状态码：

```go
err := errors.NewWithCode(404, "http error code")

fmt.Println(err)
fmt.Println(err.(errors.Error).Code())
```
