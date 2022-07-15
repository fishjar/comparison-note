每个数组的大小都是固定的。
而切片则为数组元素提供动态大小的、灵活的视角。
在实践中，切片比数组更常用。
类型 `[]T` 表示一个元素类型为 T 的切片。

`a[low : high]`
它会选择一个半开区间，包括第一个元素，但排除最后一个元素。

![切片与数组示意图](images/slice.png)

```go
// 以下表达式创建了一个切片，
// 它包含 a 中下标从 1 到 3 的元素：
package main
import "fmt"
func main() {
  primes := [6]int{2, 3, 5, 7, 11, 13}
  fmt.Println(primes)
  var s []int = primes[1:4]
  fmt.Println(s)
}
// [2 3 5 7 11 13]
// [3 5 7]


// 切片就像数组的引用
// - 切片并不存储任何数据，它只是描述了底层数组中的一段。
// - 更改切片的元素会修改其底层数组中对应的元素。
// - 与它共享底层数组的切片都会观测到这些修改。
package main
import "fmt"
func main() {
  names := [4]string{
    "John",
    "Paul",
    "George",
    "Ringo",
  }
  fmt.Println(names)
  a := names[0:2]
  b := names[1:3]
  fmt.Println(a, b)
  b[0] = "XXX"
  fmt.Println(a, b)
  fmt.Println(names)
}
// [John Paul George Ringo]
// [John Paul] [Paul George]
// [John XXX] [XXX George]
// [John XXX George Ringo]


// 这是一个数组文法：
[3]bool{true, true, false}

// 切片文法类似于没有长度的数组文法。
// 下面这样则会创建一个和上面相同的数组，
// 然后构建一个引用了它的切片：
[]bool{true, true, false}


package main
import "fmt"
func main() {
  q := []int{2, 3, 5, 7, 11, 13}
  fmt.Println(q)
  r := []bool{true, false, true, true, false, true}
  fmt.Println(r)
  s := []struct {
    i int
    b bool
  }{
    {2, true},
    {3, false},
    {5, true},
    {7, true},
    {11, false},
    {13, true},
  }
  fmt.Println(s)
}
// [2 3 5 7 11 13]
// [true false true true false true]
// [{2 true} {3 false} {5 true} {7 true} {11 false} {13 true}]


// 在进行切片时，你可以利用它的默认行为来忽略上下界。
// 切片下界的默认值为 0，上界则是该切片的长度。
var a [10]int
// 以下切片是等价的：
a[0:10]
a[:10]
a[0:]
a[:]

package main
import "fmt"
func main() {
  s := []int{2, 3, 5, 7, 11, 13}
  s = s[1:4]
  fmt.Println(s)
  s = s[:2]
  fmt.Println(s)
  s = s[1:]
  fmt.Println(s)
}
// [3 5 7]
// [3 5]
// [5]


// 切片拥有 长度 和 容量。
// 切片的长度就是它所包含的元素个数。
// 切片的容量是从它的第一个元素开始数，到其底层数组元素末尾的个数。
// 切片 s 的长度和容量可通过表达式 len(s) 和 cap(s) 来获取。
// 你可以通过重新切片来扩展一个切片，给它提供足够的容量。
package main

import "fmt"

func main() {
  s := []int{2, 3, 5, 7, 11, 13}
  printSlice(s)

  // 截取切片使其长度为 0
  s = s[:0]
  printSlice(s)

  // 拓展其长度
  s = s[:4]
  printSlice(s)

  // 舍弃前两个值
  s = s[2:]
  printSlice(s)

  s = s[0:4]
  printSlice(s)

  s = s[0:6]
  printSlice(s)
}
func printSlice(s []int) {
  fmt.Printf("len=%d cap=%d %v\n", len(s), cap(s), s)
}
// len=6 cap=6 [2 3 5 7 11 13]
// len=0 cap=6 []
// len=4 cap=6 [2 3 5 7]
// len=2 cap=4 [5 7]
// len=4 cap=4 [5 7 11 13]
// panic: runtime error: slice bounds out of range


// 切片的零值是 nil。
// nil 切片的长度和容量为 0 且没有底层数组。
package main
import "fmt"
func main() {
  var s []int
  fmt.Println(s, len(s), cap(s))
  if s == nil {
    fmt.Println("nil!")
  }
}
// [] 0 0
// nil!


// 切片可以用内建函数 make 来创建，这也是你创建动态数组的方式。
// make 函数会分配一个元素为零值的数组并返回一个引用了它的切片：
// 要指定它的容量，需向 make 传入第三个参数：
package main
import "fmt"
func main() {
  a := make([]int, 5)
  printSlice("a", a)

  b := make([]int, 0, 5)
  printSlice("b", b)

  c := b[:2]
  printSlice("c", c)

  d := c[2:5]
  printSlice("d", d)
}
func printSlice(s string, x []int) {
  fmt.Printf("%s len=%d cap=%d %v\n",
    s, len(x), cap(x), x)
}
// a len=5 cap=5 [0 0 0 0 0]
// b len=0 cap=5 []
// c len=2 cap=5 [0 0]
// d len=3 cap=3 [0 0 0]


// 切片可包含任何类型，甚至包括其它的切片。
package main
import (
  "fmt"
  "strings"
)
func main() {
  // 创建一个井字板（经典游戏）
  board := [][]string{
    []string{"_", "_", "_"},
    []string{"_", "_", "_"},
    []string{"_", "_", "_"},
  }
  // 两个玩家轮流打上 X 和 O
  board[0][0] = "X"
  board[2][2] = "O"
  board[1][2] = "X"
  board[1][0] = "O"
  board[0][2] = "X"
  for i := 0; i < len(board); i++ {
    fmt.Printf("%s\n", strings.Join(board[i], " "))
  }
}
// X _ X
// O _ X
// _ _ O


// 为切片追加新的元素是种常用的操作，为此 Go 提供了内建的 append 函数。
// append 的结果是一个包含原切片所有元素加上新添加元素的切片。
// 当 s 的底层数组太小，不足以容纳所有给定的值时，它就会分配一个更大的数组。
// 返回的切片会指向这个新分配的数组。
package main
import "fmt"
func main() {
  var s []int
  printSlice(s)
  // 添加一个空切片
  s = append(s, 0)
  printSlice(s)
  // 这个切片会按需增长
  s = append(s, 1)
  printSlice(s)
  // 可以一次性添加多个元素
  s = append(s, 2, 3, 4)
  printSlice(s)
}
func printSlice(s []int) {
  fmt.Printf("len=%d cap=%d %v\n", len(s), cap(s), s)
}
// len=0 cap=0 []
// len=1 cap=2 [0]
// len=2 cap=2 [0 1]
// len=5 cap=8 [0 1 2 3 4]


// 实现 Pic。
// 它应当返回一个长度为 dy 的切片，
// 其中每个元素是一个长度为 dx，元素类型为 uint8 的切片。
// 当你运行此程序时，它会将每个整数解释为灰度值（好吧，其实是蓝度值）并显示它所对应的图像。
package main
import "golang.org/x/tour/pic"
//import "fmt"
func Pic(dx, dy int) [][]uint8 {
  //fmt.Println(dx, dy)
  qie := make([][]uint8, dy)
  // fmt.Println(qie)
  for i := 0; i < dy; i++ {
    qie[i] = make([]uint8, dx)
    for j := 0; j < dx; j++ {
      qie[i][j] = uint8(i-j)
    }
  }
  return qie
}
func main() {
  pic.Show(Pic)
}


// 将一个切片追加到另一个切片中
x := []int{1,2,3}
y := []int{4,5,6}
x = append(x, y...)
fmt.Println(x)


// 字符串切片拼接
strings.Join(os.Args[1:], " ")
// 字符串切片
strings.Split(string(data), "\n")
```

翻转切片

```go
// 复制一个slice只是对底层的数组创建了一个新的slice别名
// 向函数传递slice将允许在函数内部修改底层数组
func reverse(s []int) {
    for i, j := 0, len(s)-1; i < j; i, j = i+1, j-1 {
        s[i], s[j] = s[j], s[i]
    }
}

a := [...]int{0, 1, 2, 3, 4, 5}
reverse(a[:])
fmt.Println(a) // "[5 4 3 2 1 0]"

// 一种将slice元素循环向左旋转n个元素的方法是三次调用reverse反转函数
// 第一次是反转开头的n个元素，然后是反转剩下的元素，最后是反转整个slice的元素。
// 如果是向右循环旋转，则将第三个函数调用移到第一个调用位置就可以了。
s := []int{0, 1, 2, 3, 4, 5}
reverse(s[:2])
reverse(s[2:])
reverse(s)
fmt.Println(s) // "[2 3 4 5 0 1]"
```

过滤空字符串

```go
func nonempty(strings []string) []string {
    i := 0
    for _, s := range strings {
        if s != "" {
            strings[i] = s
            i++
        }
    }
    return strings[:i]
}

data := []string{"one", "", "three"}
fmt.Printf("%q\n", nonempty(data)) // `["one" "three"]`
fmt.Printf("%q\n", data)           // `["one" "three" "three"]`

func nonempty2(strings []string) []string {
    out := strings[:0] // zero-length slice of original
    for _, s := range strings {
        if s != "" {
            out = append(out, s)
        }
    }
    return out
}
```

模拟栈（stack）

```go
stack = append(stack, v) // push v
top := stack[len(stack)-1] // top of stack
stack = stack[:len(stack)-1] // pop
```

删除 slice 中间的某个元素并保存原有的元素顺序

```go
func remove(slice []int, i int) []int {
    copy(slice[i:], slice[i+1:])
    return slice[:len(slice)-1]
}
func main() {
    s := []int{5, 6, 7, 8, 9}
    fmt.Println(remove(s, 2)) // "[5 6 8 9]"
}
```

如果删除元素后不用保持原来顺序

```go
func remove(slice []int, i int) []int {
    slice[i] = slice[len(slice)-1]
    return slice[:len(slice)-1]
}
func main() {
    s := []int{5, 6, 7, 8, 9}
    fmt.Println(remove(s, 2)) // "[5 6 9 8]
}
```
