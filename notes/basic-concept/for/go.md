Go 只有一种循环结构：for 循环。
初始化语句通常为一句短变量声明，该变量声明仅在 for 语句的作用域中可见。

- 初始化语句：在第一次迭代前执行
- 条件表达式：在每次迭代前求值
- 后置语句：在每次迭代的结尾执行

和 C、Java、JavaScript 之类的语言不同，
Go 的 for 语句后面的三个构成部分外没有小括号， 大括号 { } 则是必须的。

```go
// 如同C的for循环
for init; condition; post { }

// 如同C的while循环
for condition { }

// 如同C的for(;;)循环
for { }


package main
import "fmt"
func main() {
  sum := 1
  for i := 0; i < 10; i++ {
    sum *= 2
  }
  fmt.Println(sum) // 1024
}


// 初始化语句和后置语句是可选的。
// 相当于while循环
package main
import "fmt"
func main() {
  sum := 1
  for ; sum < 1000; {
    sum += sum
  }
  fmt.Println(sum) // 1024
}

// for 是 Go 中的 “while”
package main
import "fmt"
func main() {
  sum := 1
  for sum < 1000 {
    sum += sum
  }
  fmt.Println(sum)
}

// 无限循环
// 如果省略循环条件，该循环就不会结束
package main
func main() {
  for {
    // ...
  }
}


// 用牛顿法实现平方根函数
package main
import (
  "fmt"
)
func Sqrt(x float64) float64 {
  z := 1.8
  for n:=0; n<10; n++ {
    fmt.Println(z)
    z -= (z*z - x) / (2*z)
  }
  return z
}
func main() {
  fmt.Println(Sqrt(2))
}
// 1.8
// 1.4555555555555555
// 1.4148006785411367
// 1.4142136841942816
// 1.4142135623731005
// 1.414213562373095
// 1.4142135623730951
// 1.414213562373095
// 1.4142135623730951
// 1.414213562373095
// 1.4142135623730951


// range 子句能够帮你轻松实现循环
for key, value := range oldMap {
  newMap[key] = value
}

// 解析UTF-8， 将每个独立的Unicode码点分离出来
for pos, char := range "日本\x80語" { // \x80 是个非法的UTF-8编码
  fmt.Printf("字符 %#U 始于字节位置 %d\n", char, pos)
}

// 反转 a
for i, j := 0, len(a)-1; i < j; i, j = i+1, j-1 {
  a[i], a[j] = a[j], a[i]
}
```
