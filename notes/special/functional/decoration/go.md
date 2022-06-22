## 简单示例

```go
package main

import "fmt"

// 函数的入参和出参都是一个函数
func decorator(f func(s string)) func(s string) {
    return func(s string) {
        fmt.Println("Started")
        f(s)
        fmt.Println("Done")
    }
}

func Hello(s string) {
    fmt.Println(s)
}

func main() {
    // decorator(Hello)("Hello, World!")
    hello := decorator(Hello)
    hello("Hello")
}
```

## 计算运行时间的例子

```go
package main

import (
  "fmt"
  "reflect"
  "runtime"
  "time"
)

// 定义入参出参函数
type SumFunc func(int64, int64) int64

// 利用反射获取函数名称
func getFunctionName(i interface{}) string {
  return runtime.FuncForPC(reflect.ValueOf(i).Pointer()).Name()
}

// 修饰器函数，入参出参都是一个函数
func timedSumFunc(f SumFunc) SumFunc {
  return func(start, end int64) int64 {

    // defer函数的入参计算好后，等待后面执行完才执行defer内部
    defer func(t time.Time) {
      fmt.Printf("--- Time Elapsed (%s): %v ---\n",
          getFunctionName(f), time.Since(t))
    }(time.Now())

    return f(start, end)
  }
}

// 耗时计算1,里面细节不重要
func Sum1(start, end int64) int64 {
  var sum int64
  sum = 0
  if start > end {
    start, end = end, start
  }
  for i := start; i <= end; i++ {
    sum += i
  }
  return sum
}

// 耗时计算2,里面细节不重要
func Sum2(start, end int64) int64 {
  if start > end {
    start, end = end, start
  }
  return (end - start + 1) * (end + start) / 2
}

func main() {
  sum1 := timedSumFunc(Sum1)
  sum2 := timedSumFunc(Sum2)
  fmt.Printf("%d, %d\n", sum1(-10000, 10000000), sum2(-10000, 10000000))
}
```

```sh
$ go run time.sum.go
--- Time Elapsed (main.Sum1): 3.557469ms ---
--- Time Elapsed (main.Sum2): 291ns ---
49999954995000, 49999954995000
```

## HTTP 相关的一个示例

修饰函数可以套娃，多层嵌套

```go
package main

import (
    "fmt"
    "log"
    "net/http"
    "strings"
)

func WithServerHeader(h http.HandlerFunc) http.HandlerFunc {
    return func(w http.ResponseWriter, r *http.Request) {
        log.Println("--->WithServerHeader()")
        w.Header().Set("Server", "HelloServer v0.0.1")
        h(w, r)
    }
}

func WithAuthCookie(h http.HandlerFunc) http.HandlerFunc {
    return func(w http.ResponseWriter, r *http.Request) {
        log.Println("--->WithAuthCookie()")
        cookie := &http.Cookie{Name: "Auth", Value: "Pass", Path: "/"}
        http.SetCookie(w, cookie)
        h(w, r)
    }
}

func WithBasicAuth(h http.HandlerFunc) http.HandlerFunc {
    return func(w http.ResponseWriter, r *http.Request) {
        log.Println("--->WithBasicAuth()")
        cookie, err := r.Cookie("Auth")
        if err != nil || cookie.Value != "Pass" {
            w.WriteHeader(http.StatusForbidden)
            return
        }
        h(w, r)
    }
}

func WithDebugLog(h http.HandlerFunc) http.HandlerFunc {
    return func(w http.ResponseWriter, r *http.Request) {
        log.Println("--->WithDebugLog")
        r.ParseForm()
        log.Println(r.Form)
        log.Println("path", r.URL.Path)
        log.Println("scheme", r.URL.Scheme)
        log.Println(r.Form["url_long"])
        for k, v := range r.Form {
            log.Println("key:", k)
            log.Println("val:", strings.Join(v, ""))
        }
        h(w, r)
    }
}

// 这个函数是修饰函数的参数，也是最里层实际执行的函数
// 定义和http.HandlerFunc是一样的
func hello(w http.ResponseWriter, r *http.Request) {
    log.Printf("Recieved Request %s from %s\n", r.URL.Path, r.RemoteAddr)
    fmt.Fprintf(w, "Hello, World! "+r.URL.Path)
}

func main() {
    http.HandleFunc("/v1/hello", WithServerHeader(WithAuthCookie(hello)))
    http.HandleFunc("/v2/hello", WithServerHeader(WithBasicAuth(hello)))
    http.HandleFunc("/v3/hello", WithServerHeader(WithBasicAuth(WithDebugLog(hello))))
    err := http.ListenAndServe(":8080", nil)
    if err != nil {
        log.Fatal("ListenAndServe: ", err)
    }
}
```

## 多个修饰器的 Pipeline

```go
// 修饰函数的定义
type HttpHandlerDecorator func(http.HandlerFunc) http.HandlerFunc

func Handler(h http.HandlerFunc, decors ...HttpHandlerDecorator) http.HandlerFunc {
    for i := range decors {
        // 逆序执行修饰器函数
        d := decors[len(decors)-1-i] // iterate in reverse
        h = d(h)
    }
    return h
}

http.HandleFunc("/v4/hello", Handler(hello,
    WithServerHeader, WithBasicAuth, WithDebugLog))
```

## 泛型的修饰器

```go
func Decorator(decoPtr, fn interface{}) (err error) {
    var decoratedFunc, targetFunc reflect.Value

    decoratedFunc = reflect.ValueOf(decoPtr).Elem()
    targetFunc = reflect.ValueOf(fn)

    v := reflect.MakeFunc(targetFunc.Type(),
            func(in []reflect.Value) (out []reflect.Value) {
                fmt.Println("before")
                out = targetFunc.Call(in)
                fmt.Println("after")
                return
            })

    decoratedFunc.Set(v)
    return
}
func foo(a, b, c int) int {
    fmt.Printf("%d, %d, %d \n", a, b, c)
    return a + b + c
}
func bar(a, b string) string {
    fmt.Printf("%s, %s \n", a, b)
    return a + b
}

type MyFoo func(int, int, int) int
var myfoo MyFoo
Decorator(&myfoo, foo)
myfoo(1, 2, 3)

// or
mybar := bar
Decorator(&mybar, bar)
mybar("hello,", "world!")
```
