```go
package main
import "fmt"
var c, python, java bool
func main() {
  var i int
  fmt.Println(i, c, python, java)
}


// 变量声明可以包含初始值，每个变量对应一个。
// 如果初始化值已存在，则可以省略类型；变量会从初始值中获得类型。
package main
import "fmt"
var i, j int = 1,0
func main() {
  var c, python, java = true, false, "no!" // 自动获得类型
  fmt.Println(i, j, c, python, java) // 1 0 true false no!
}


// 在函数中，简洁赋值语句 := 可在类型明确的地方代替 var 声明。
// 函数外的每个语句都必须以关键字开始（var, func 等等），
// 因此 := 结构不能在函数外使用。
package main
import "fmt"
func main() {
  var i, j int = 1, 2
  k := 3
  c, python, java := true, false, "no!"
  fmt.Println(i, j, k, c, python, java) // 1 2 3 true false no!
}

// 简短变量声明语句中必须至少要声明一个新的变量
// 下面的代码将不能编译通过
// 解决的方法是第二个简短变量声明语句改用普通的多重赋值语句。
f, err := os.Open(infile)
// ...
f, err := os.Create(outfile) // compile error: no new variables


// 另一个创建变量的方法是调用用内建的new函数。
// 表达式new(T)将创建一个T类型的匿名变量，初始化为T类型的零值，
// 然后返回变量地址，返回的指针类型为*T
p := new(int)   // p, *int 类型, 指向匿名的 int 变量
fmt.Println(*p) // "0"
*p = 2          // 设置 int 匿名变量的值为 2
fmt.Println(*p) // "2"

p := new(int)
q := new(int)
fmt.Println(p == q) // "false"

// 下面的两个newInt函数有着相同的行为：
func newInt() *int {
  return new(int)
}
func newInt() *int {
  var dummy int
  return &dummy
}


f, err = os.Open("foo.txt") // function call returns two values
v, ok = m[key]             // map lookup
v, ok = x.(T)              // type assertion
v, ok = <-ch               // channel receive
_, err = io.Copy(dst, src) // 丢弃字节数
_, ok = x.(T)              // 只检测类型，忽略具体值
```

## 默认值

没有明确初始值的变量声明会被赋予它们的 零值:

- 数值类型为 0，
- 布尔类型为 false，
- 字符串为 ""（空字符串）。
- 指针零值为 nil
- 切片的零值是 nil

```go
package main
import "fmt"
func main() {
  var i int
  var f float64
  var b bool
  var s string
  fmt.Printf("%v %v %v %q\n", i, f, b, s) // 0 0 false ""
}

int     0
int8    0
int32   0
int64   0
uint    0x0
rune    0 //rune的实际类型是 int32
byte    0x0 // byte的实际类型是 uint8
float32 0 //长度为 4 byte
float64 0 //长度为 8 byte
bool    false
string  ""
```
