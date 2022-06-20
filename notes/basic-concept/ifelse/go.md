Go 的 if 语句与 for 循环类似，表达式外无需小括号 ( ) ，而大括号 { } 则是必须的。

```go
package main
import (
  "fmt"
  "math"
)
func sqrt(x float64) string {
  if x < 0 {
    return sqrt(-x) + "i"
  }
  return fmt.Sprint(math.Sqrt(x))
}
func main() {
  fmt.Println(sqrt(2), sqrt(-4)) // 1.4142135623730951 2i
}


// 同 for 一样， if 语句可以在条件表达式前执行一个简单的语句。
// 该语句声明的变量作用域仅在 if 之内。
package main
import (
  "fmt"
  "math"
)
func pow(x, n, lim float64) float64 {
  if v := math.Pow(x, n); v < lim {
    return v
  }
  return lim
}
func main() {
  fmt.Println(
    pow(3, 2, 10),
    pow(3, 3, 20),
  )
}


// 在 if 的简短语句中声明的变量同样可以在任何对应的 else 块中使用。
package main
import (
  "fmt"
  "math"
)
func pow(x, n, lim float64) float64 {
  if v := math.Pow(x, n); v < lim {
    return v
  } else {
    fmt.Printf("%g >= %g\n", v, lim)
  }
  // 这里开始就不能使用 v 了
  return lim
}
func main() {
  fmt.Println(
    pow(3, 2, 10),
    pow(3, 3, 20),
  )
}

// 多个条件的时候
if integer == 3 {
  fmt.Println("The integer is equal to 3")
} else if integer < 3 {
  fmt.Println("The integer is less than 3")
} else {
  fmt.Println("The integer is greater than 3")
}
```
