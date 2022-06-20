## defer

defer 语句会将函数推迟到外层函数返回之后执行。
推迟调用的函数其参数会立即求值，
但直到外层函数返回前该函数都不会被调用。

推迟的函数调用会被压入一个栈中。
当外层函数返回时，被推迟的函数会按照后进先出的顺序调用。

defer 语句经常被用于处理成对的操作，
如打开、关闭、连接、断开连接、加锁、释放锁。通过 defer 机制

```go
package main
import "fmt"
func main() {
  defer fmt.Println("world")
  fmt.Println("hello")
}
// hello
// world


// defer 栈
package main
import "fmt"
func main() {
  fmt.Println("counting")
  for i := 0; i < 10; i++ {
    defer fmt.Println(i)
  }
  fmt.Println("done")
}
// counting
// done
// 9
// 8
// 7
// 6
// 5
// 4
// 3
// 2
// 1
// 0


// Contents 将文件的内容作为字符串返回。
func Contents(filename string) (string, error) {
  f, err := os.Open(filename)
  if err != nil {
    return "", err
  }
  defer f.Close()  // f.Close 会在我们结束后运行。

  var result []byte
  buf := make([]byte, 100)
  for {
    n, err := f.Read(buf[0:])
    result = append(result, buf[0:n]...) // append 将在后面讨论。
    if err != nil {
      if err == io.EOF {
        break
      }
      return "", err  // 我们在这里返回后，f 就会被关闭。
    }
  }
  return string(result), nil // 我们在这里返回后，f 就会被关闭。
}


// 对匿名函数采用defer机制，可以使其观察函数的返回值。
func double(x int) (result int) {
  defer func() { fmt.Printf("double(%d) = %d\n", x,result) }()
  return x + x
}
_ = double(4)
// Output:
// "double(4) = 8"


// 被延迟执行的匿名函数甚至可以修改函数返回给调用者的返回值：
func triple(x int) (result int) {
  defer func() { result += x }()
  return double(x)
}
fmt.Println(triple(4)) // "12"
```
