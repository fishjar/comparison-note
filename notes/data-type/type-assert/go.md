```go
// reflect.Type 接口是满足 fmt.Stringer 接口的
t := reflect.TypeOf(3)  // a reflect.Type
fmt.Println(t.String()) // "int"
fmt.Println(t)          // "int"
fmt.Printf("%T\n", 3)   // "int"

// 表达接口类型的 reflect.Type
var w io.Writer = os.Stdout
fmt.Println(reflect.TypeOf(w)) // "*os.File"


// fmt.Printf 提供了一个缩写 %T 参数，
// 内部使用 reflect.TypeOf 来输出
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

使用 `reflect.Type` 来打印任意值的类型和枚举它的方法：

```go
// Print prints the method set of the value x.
func Print(x interface{}) {
    v := reflect.ValueOf(x)
    t := v.Type()
    fmt.Printf("type %s\n", t)

    for i := 0; i < v.NumMethod(); i++ {
        methType := v.Method(i).Type()
        fmt.Printf("func (%s) %s%s\n", t, t.Method(i).Name,
            strings.TrimPrefix(methType.String(), "func"))
    }
}
```

## 类型断言

类型断言书写形式如下：

```go
x.(T)
```

`x` 必须是接口（类型的）值，注意不是接口名。

换一个角度说，`x`必须是被接口类型隐式转换过，其原类型（底层类型）可能是接口类型，也可能不是接口类型，甚至也可能是`nil`。
当然，前提是原类型（底层类型）实现了该接口，才能被赋值（转换）。

```go
var x = 1 // 这里的x不是接口类型的值，不能做类型断言操作
type I interface{} // 这里的I是接口名，因此I不能做类型断言操作
var x interface{} // 这里的x是值为nil的接口值，可以做类型断言，但是一定会断言失败
var x interface{} = "hello" // 这里的x可以做类型断言操作
```

如果对 x（接口类型）进行了非`nil`赋值操作（隐式转换），那这个接口值就获得了`动态类型`（底层类型）和`动态值`（底层值）。

但不管赋值（转换）多少次，在某个时刻，它的`动态类型`和`动态值`都是唯一（最后那次赋值）的。

对`x`做类型断言，也会有赋值（隐式转换）效果。

```go
var x interface{} // 相当于给x接口值赋初始值nil，此时没有动态类型和动态值

var x interface{} = "hello" // x的动态类型为string，动态值为hello，相当于下面三行代码的简写

type I interface{}
var s string = "hello"
var x I = s // 这里有个隐式类型转换，相当于 var x = I(s)
```

`T` 必须是数据类型名（因为接口也是一种数据类型，因此包含接口名），注意不能是一个具体的值。

```go
var i interface{}
x.(i) // 这里的i非法

// 以下都可以
x.(int)
x.(string)
type I interface{}
x.(I)
```

关于类型断言的真假判断

- 当 T 是普通数据类型名（非接口名），判断 x 的动态类型是否等于 T
- 当 T 是接口名，判断 x 的动态类型是否实现了 T 接口，即判断 x 的动态类型是否定义了 T 接口规定的方法
- 同时，由以上可以推断，当 x 为 nil，断言一定失败。因为 nil 不等于任何数据类型，也没有实现任何接口

```go
package main
import "fmt"

type I interface {
	m(string)
}
type II interface {
	I
	n(string)
}
type III interface {
	II
	o()
}

type T string

func (t T) m(s string) {
	fmt.Println("m", s)
	// fmt.Printf("%T\n", t)
}

func (t T) n(s string) {
	fmt.Println("n", s)
	// fmt.Printf("%T\n", t)
}

func main() {
	var x I = T("hello")

  	if x, ok := x.(T); ok { // 这里判断x的动态类型是否为T
		// 此时x为一个普通T类型的值，不是接口值
		x.m("1")
		x.n("2")
	}

	if x, ok := x.(I); ok { // 这里判断x的动态类型(T)是否实现了I接口
		// 此时x为I类型的接口值，相当于一个拷贝
		x.m("3")
		// x.n("4") // I接口没有n方法
	}

	if x, ok := x.(II); ok { // 这里判断x的动态类型(T)是否实现了II接口
		// 此时x转换为II类型的接口值
		x.m("5")
		x.n("6")
	}

  	if x, ok := x.(III); ok { // 这里判断x的动态类型(T)是否实现了III接口
		x.m("7")
		x.n("8")
	}

	var xx II = T("hello")

	if x, ok := xx.(T); ok {
		// 此时x为一个T类型的普通值，
		x.m("9")
		x.n("a")
	}

	if x, ok := xx.(I); ok {
		// x为一个I接口类型的值，相当于xx做了I类型转换
		x.m("b")
		// x.n("c") // I接口没有n方法
	}

	if x, ok := xx.(II); ok {
		// x为一个II类型的值，，相当于xx的一个拷贝
		x.m("d")
		x.n("e")
	}
}
// m 1
// n 2
// m 3
// m 5
// n 6
// m 9
// n a
// m b
// m d
// n e
```

关于类型断言的值（实质：对`x动态值`做`T类型`转换后的值）

- 只有一个变量接收断言结果时
  - 当断言失败时，会抛出 panic
  - 当断言成功时，返回一个 T 类型的值
    - 当 T 为普通类型名，则返回一个 T 类型的普通值
    - 当 T 为接口名，则返回一个 T 类型的接口值。
- 有两个变量接收断言结果时，不管成功失败都不会抛出 panic
  - 当断言失败时，第一个变量为 T 类型的零值，第二个变量为 false
  - 当断言成功时，第一个变量为 T 类型的转换值（同一个变量成功时的返回值），第二个变量为 true

```go
package main

import "fmt"

type I interface {
	M()
}

type T string

func (t T) M() {
	fmt.Println(t)
}

func main() {
	var i I = T("hello")
	if x, ok := i.(I); ok {
		// 此时，x为一个I接口值，可以继续做类型断言
		x.M()
		if y, ok := x.(T); ok {
			// 此时，y为一个T类型值，不能再做类型断言
			y.M()
		}
	}
}
```

特例：当 T 为保留关键字`type`时，可以用在`switch`语句中，用来做类型判断

```go
switch i := x.(type) { // 这里的赋值语句有点奇怪，语句本身还可以产生一个结果值，这个结果值是x的动态类型
case nil:
	printString("x is nil")                // type of i is type of x (interface{})
case int:
	printInt(i)                            // type of i is int
case float64:
	printFloat64(i)                        // type of i is float64
case func(int) float64:
	printFunction(i)                       // type of i is func(int) float64
case bool, string:
	printString("type is bool or string")  // type of i is type of x (interface{})
default:
	printString("don't know the type")     // type of i is type of x (interface{})
}
```
