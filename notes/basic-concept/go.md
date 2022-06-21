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

- 如果需要把数字转字符串，使用 `strconv.Itoa()` 会比 `fmt.Sprintf()` 要快一倍左右
- 尽可能地避免把 `String` 转成`[]Byte` 。这个转换会导致性能下降。
- 如果在 for-loop 里对某个 slice 使用 `append()`请先把 slice 的容量很扩充到位，这样可以避免内存重新分享以及系统- 自动按 2 的 N 次方幂进行扩展但又用不到，从而浪费内存。
- 使用 `StringBuffer` 或是 `StringBuild` 来拼接字符串，会比使用 `+` 或 `+=` 性能高三到四个数量级。
- 尽可能的使用并发的 go routine，然后使用 sync.WaitGroup 来同步分片操作
- 避免在热代码中进行内存分配，这样会导致 gc 很忙。尽可能的使用 sync.Pool 来重用对象。
- 使用 l`ock-free` 的操作，避免使用 `mutex`，尽可能使用 `sync/Atomic` 包。 （关于无锁编程的相关话题，可参看《无锁- 队列实现》或《无锁 Hashmap 实现》）
- 使用 `I/O` 缓冲，I/O 是个非常非常慢的操作，使用 `bufio.NewWrite()` 和 `bufio.NewReader()` 可以带来更高的性- 能。
- 对于在 for-loop 里的固定的正则表达式，一定要使用 `regexp.Compile()` 编译正则表达式。性能会得升两个数量级。
- 如果你需要更高性能的协议，你要考虑使用 protobuf 或 msgp 而不是 JSON，因为 JSON 的序列化和反序列化里使用了反- 射。
- 你在使用 map 的时候，使用整型的 key 会比字符串的要快，因为整型比较比字符串比较要快。
