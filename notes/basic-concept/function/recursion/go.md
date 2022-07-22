```go
package main

import "fmt"

func fact(n int) int {
    if n == 0 {
        return 1
    }
    return n * fact(n-1)
}

func main() {
    fmt.Println(fact(7))

    // 闭包也可以是递归的，但这要求在定义闭包之前用类型化的 `var` 显式声明闭包。
    var fib func(n int) int
    fib = func(n int) int {
        if n < 2 {
            return n
        }
        return fib(n-1) + fib(n-2)
    }
    fmt.Println(fib(7))
}
```
