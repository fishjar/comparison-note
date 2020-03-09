```go
fmt.Println(reflect.TypeOf(x).String())

// 可以通过%T参数打印类型信息
const noDelay time.Duration = 0
const timeout = 5 * time.Minute
fmt.Printf("%T %[1]v\n", noDelay)     // "time.Duration 0"
fmt.Printf("%T %[1]v\n", timeout)     // "time.Duration 5m0s"
fmt.Printf("%T %[1]v\n", time.Minute) // "time.Duration 1m0s"

fmt.Printf("%T\n", 0)      // "int"
fmt.Printf("%T\n", 0.0)    // "float64"
fmt.Printf("%T\n", 0i)     // "complex128"
fmt.Printf("%T\n", '\000') // "int32" (rune)


var t interface{}
t = functionOfSomeType()
switch t := t.(type) {
  default:
    fmt.Printf("unexpected type %T", t)       // %T 输出 t 是什么类型
  case bool:
    fmt.Printf("boolean %t\n", t)             // t 是 bool 类型
  case int:
    fmt.Printf("integer %d\n", t)             // t 是 int 类型
  case *bool:
    fmt.Printf("pointer to boolean %t\n", *t) // t 是 *bool 类型
  case *int:
    fmt.Printf("pointer to integer %d\n", *t) // t 是 *int 类型
}
```

```go
package main
import (
  "fmt"
  "strconv"
)
type Element interface{}
type List [] Element
type Person struct {
    name string
    age int
}
//定义了String方法，实现了fmt.Stringer
func (p Person) String() string {
  return "(name: " + p.name + " - age: "+strconv.Itoa(p.age)+ " years)"
}
func main() {
  list := make(List, 3)
  list[0] = 1 // an int
  list[1] = "Hello" // a string
  list[2] = Person{"Dennis", 70}
  // for index, element := range list {
  //   if value, ok := element.(int); ok {
  //     fmt.Printf("list[%d] is an int and its value is %d\n", index, value)
  //   } else if value, ok := element.(string); ok {
  //     fmt.Printf("list[%d] is a string and its value is %s\n", index, value)
  //   } else if value, ok := element.(Person); ok {
  //     fmt.Printf("list[%d] is a Person and its value is %s\n", index, value)
  //   } else {
  //     fmt.Printf("list[%d] is of a different type\n", index)
  //   }
  // }
  for index, element := range list{
    switch value := element.(type) {
      case int:
        fmt.Printf("list[%d] is an int and its value is %d\n", index, value)
      case string:
        fmt.Printf("list[%d] is a string and its value is %s\n", index, value)
      case Person:
        fmt.Printf("list[%d] is a Person and its value is %s\n", index, value)
      default:
        fmt.Println("list[%d] is of a different type", index)
    }
  }
}
```
