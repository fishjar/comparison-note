- 每个 Go 程序都是由包构成的。
- 程序从 `main` 包开始运行。
- 按照约定，包名与导入路径的最后一个元素一致。
  例如，"math/rand" 包中的源码均以 `package rand` 语句开始。
- 传指针比较轻量级 (8bytes),只是传内存地址，我们可以用指针传递体积大的结构体。
  如果用参数值传递的话, 在每次 copy 上面就会花费相对较多的系统开销（内存和时间）。
  所以当你要传递大的结构体的时候，用指针是一个明智的选择。
- Go 语言中 channel，slice，map 这三种类型的实现机制类似指针，
  所以可以直接传递，而不用取地址后传递指针。
  （注：若函数需改变 slice 的长度，则仍需要取地址传递指针）

```go
// helloword.2.go
package main
import (
  "fmt"
  "time"
)
func main() {
  fmt.Println("Welcome to the playground!")
  fmt.Println("The time is", time.Now())
}
```

一个变量就是一个可寻址的内存空间，里面存储了一个值，
并且存储的值可以通过内存地址来更新。

可以通过调用 reflect.ValueOf(&x).Elem()，
来获取任意变量 x 对应的可取地址的 Value。

```go
x := 2                   // value   type    variable?
a := reflect.ValueOf(2)  // 2       int     no
b := reflect.ValueOf(x)  // 2       int     no
c := reflect.ValueOf(&x) // &x      *int    no
d := c.Elem()            // 2       int     yes (x)

// 调用reflect.Value的CanAddr方法来判断其是否可以被取地址
fmt.Println(a.CanAddr()) // "false"
fmt.Println(b.CanAddr()) // "false"
fmt.Println(c.CanAddr()) // "false"
fmt.Println(d.CanAddr()) // "true"

// 另一个相关的方法CanSet是用于检查对应的reflect.Value是否是可取地址并可被修改的：
fmt.Println(fd.CanAddr(), fd.CanSet()) // "true false"
```
