程序编译阶段就确定下来的值，而程序在运行时无法改变该值。
目前常量声明的值必须是一个数字值、字符串或者一个固定的 boolean 值。

- 常量的声明与变量类似，只不过是使用 const 关键字。
- 常量可以是字符、字符串、布尔值或数值。
- 常量不能用 := 语法声明。
- 它们在编译时创建
- 定义它们的表达式必须也是可被编译器求值的常量表达式

```go
package main
import "fmt"
const Pi = 3.14
func main() {
  const World = "世界"
  fmt.Println("Hello", World)
  fmt.Println("Happy", Pi, "Day")
  const Truth = true
  fmt.Println("Go rules?", Truth)
}


// 数值常量是高精度的 值。
package main
import "fmt"
const (
  // 将 1 左移 100 位来创建一个非常大的数字
  // 即这个数的二进制是 1 后面跟着 100 个 0
  Big = 1 << 100
  // 再往右移 99 位，即 Small = 1 << 1，或者说 Small = 2
  Small = Big >> 99
)
func needInt(x int) int { return x*10 + 1 }
func needFloat(x float64) float64 {
  return x * 0.1
}
func main() {
  fmt.Println(needInt(Small))
  fmt.Println(needFloat(Small))
  fmt.Println(needFloat(Big))
}


const (
  a = 1
  b
  c = 2
  d
)
fmt.Println(a, b, c, d) // "1 1 2 2"


// iota将会被置为0，然后在每一个有常量声明的行加1
// 周日将对应0，周一为1，如此等等
type Weekday int
const (
  Sunday Weekday = iota
  Monday
  Tuesday
  Wednesday
  Thursday
  Friday
  Saturday
)

// 随着iota的递增，每个常量对应表达式1 << iota，
// 是连续的2的幂，分别对应一个bit位置。
type Flags uint
const (
  FlagUp Flags = 1 << iota // is up
  FlagBroadcast            // supports broadcast access capability
  FlagLoopback             // is a loopback interface
  FlagPointToPoint         // belongs to a point-to-point link
  FlagMulticast            // supports multicast access capability
)


// 无类型常量
var x float32 = math.Pi
var y float64 = math.Pi
var z complex128 = math.Pi
```
