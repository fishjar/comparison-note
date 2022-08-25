类型 [n]T 表示拥有 n 个 T 类型的值的数组。
数组的长度是其类型的一部分，因此数组不能改变大小。

表达式: `var a [10]int`，
会将变量 a 声明为拥有 10 个整数的数组。

```go
package main
import "fmt"
func main() {
  var a [2]string
  a[0] = "Hello"
  a[1] = "World"
  fmt.Println(a[0], a[1])
  fmt.Println(a)
  primes := [6]int{2, 3, 5, 7, 11}
  fmt.Println(primes)
}
// Hello World
// [Hello World]
// [2 3 5 7 11 0]


// 如果在数组的长度位置出现的是“...”省略号，
// 则表示数组的长度是根据初始化值的个数来计算。
q := [...]int{1, 2, 3}
fmt.Printf("%T\n", q) // "[3]int"

// 数组的长度是数组类型的一个组成部分，
// 因此[3]int和[4]int是两种不同的数组类型。
q := [3]int{1, 2, 3}
q = [4]int{1, 2, 3, 4} // 编译错误: 不能赋值 [4]int 给 [3]int


// 指定一个索引和对应值列表的方式初始化
type Currency int
const (
  USD Currency = iota // 美元
  EUR                 // 欧元
  GBP                 // 英镑
  RMB                 // 人民币
)
symbol := [...]string{USD: "$", EUR: "€", GBP: "￡", RMB: "￥"}
fmt.Println(RMB, symbol[RMB]) // "3 ￥"

// 定义了一个含有100个元素的数组r，最后一个元素被初始化为-1，其它元素都是用0初始化。
r := [...]int{99: -1}


// 如果一个数组的元素类型是可以相互比较的，那么数组类型也是可以相互比较的，
// 只有当两个数组的所有元素都是相等的时候数组才是相等的。
a := [2]int{1, 2}
b := [...]int{1, 2}
c := [2]int{1, 3}
fmt.Println(a == b, a == c, b == c) // "true false false"
d := [3]int{1, 2}
fmt.Println(a == d) // compile error: cannot compare [2]int == [3]int

// 消息摘要有256bit大小，因此对应[32]byte数组类型。
import "crypto/sha256"
func main() {
    c1 := sha256.Sum256([]byte("x"))
    c2 := sha256.Sum256([]byte("X"))
    fmt.Printf("%x\n%x\n%t\n%T\n", c1, c2, c1 == c2, c1)
    // Output:
    // 2d711642b726b04401627ca9fbac32f5c8530fb1903cc4db02258717921a4881
    // 4b68ab3847feda7d6c62c1fbcbeebfa35eab7351ed5e78f4ddadea5df64b8015
    // false
    // [32]uint8
}


// 下面的函数用于给[32]byte类型的数组清零：
func zero(ptr *[32]byte) {
  for i := range ptr {
    ptr[i] = 0
  }
}
// 其实数组字面值[32]byte{}就可以生成一个32字节的数组。
// 将上面的zero函数写的更简洁一点：
func zero(ptr *[32]byte) {
  *ptr = [32]byte{}
}
```
