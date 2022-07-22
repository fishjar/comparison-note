switch 是编写一连串 if - else 语句的简便方法。
它运行第一个值等于条件表达式的 case 语句。

Go 只运行选定的 case，而非之后所有的 case。
Go 自动提供了在这些语言中每个 case 后面所需的 break 语句。
除非以 fallthrough 语句结束，否则分支会自动终止。
Go 的另一点重要的不同在于 switch 的 case 无需为常量，且取值不必为整数。

```go
package main
import (
  "fmt"
  "runtime"
)
func main() {
  fmt.Print("Go runs on ")
  switch os := runtime.GOOS; os {
    case "darwin":
      fmt.Println("OS X.")
    case "linux":
      fmt.Println("Linux.")
    default:
      // freebsd, openbsd,
      // plan9, windows...
      fmt.Printf("%s.\n", os)
  }
}
// Go runs on Linux.


// switch 的 case 语句从上到下顺次执行，直到匹配成功时停止。
package main
import (
  "fmt"
  "time"
)
func main() {
  fmt.Println("When's Saturday?")
  fmt.Println(time.Now())
  fmt.Println(time.Saturday)
  today := time.Now().Weekday()
  switch time.Saturday {
    case today + 0:
      fmt.Println("Today.")
    case today + 1:
      fmt.Println("Tomorrow.")
    case today + 2:
      fmt.Println("In two days.")
    default:
      fmt.Println("Too far away.")
  }
}
// When's Saturday?
// 2009-11-10 23:00:00 +0000 UTC m=+0.000000001
// Saturday
// Too far away.


// 没有条件的 switch 同 switch true 一样。
// 这种形式能将一长串 if-then-else 写得更加清晰。
package main
import (
  "fmt"
  "time"
)
func main() {
  t := time.Now()
  fmt.Println(t)
  switch {
    case t.Hour() < 12:
      fmt.Println("Good morning!")
    case t.Hour() < 17:
      fmt.Println("Good afternoon.")
    default:
      fmt.Println("Good evening.")
  }
}

func unhex(c byte) byte {
  switch {
  case '0' <= c && c <= '9':
    return c - '0'
  case 'a' <= c && c <= 'f':
    return c - 'a' + 10
  case 'A' <= c && c <= 'F':
    return c - 'A' + 10
  }
  return 0
}

// switch 并不会自动下溯，但 case 可通过逗号分隔来列举相同的处理条件。
func shouldEscape(c byte) bool {
  switch c {
  case ' ', '?', '&', '=', '#', '+', '%':
    return true
  }
  return false
}
```

类型开关 (type switch) 比较类型而非值。可以用来发现一个接口值的类型。

```go
whatAmI := func(i interface{}) {
  switch t := i.(type) {
  case bool:
    fmt.Println("I'm a bool")
  case int:
    fmt.Println("I'm an int")
  default:
    fmt.Printf("Don't know type %T\n", t)
  }
}
whatAmI(true)
whatAmI(1)
whatAmI("hey")
// I'm a bool
// I'm an int
// Don't know type string
```
