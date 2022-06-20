```go
ages := make(map[string]int)
ages["alice"] = 31
ages["charlie"] = 34
// 或
ages := map[string]int{
    "alice":   31,
    "charlie": 34,
}

// 删除元素
delete(ages, "alice") // remove element ages["alice"]

// 不能对map的元素进行取址操作
// 原因是map可能随着元素数量的增长而重新分配更大的内存空间，从而可能导致之前的地址无效
_ = &ages["bob"] // compile error: cannot take address of map element

// 向一个nil值的map存入元素将导致一个panic异常
ages["carol"] = 21 // panic: assignment to entry in nil map

age, ok := ages["bob"]
if !ok { /* "bob" is not a key in this map; age == 0. */ }

if age, ok := ages["bob"]; !ok { /* ... */ }
```

遍历 map

```go
// 迭代顺序是不确定
for name, age := range ages {
    fmt.Printf("%s\t%d\n", name, age)
}

// 排序遍历
import "sort"

var names []string
// names := make([]string, 0, len(ages))
for name := range ages {
    names = append(names, name)
}
sort.Strings(names)
for _, name := range names {
    fmt.Printf("%s\t%d\n", name, ages[name])
}
```

映射将键映射到值。
映射的零值为 nil 。nil 映射既没有键，也不能添加键。
`make` 函数会返回给定类型的映射，并将其初始化备用。

map 类型可以写为 map[K]V，其中 K 和 V 分别对应 key 和 value。
其中 K 对应的 key 必须是支持==比较运算符的数据类型，
所以 map 可以通过测试 key 是否相等来判断是否已经存在。
对于 V 对应的 value 数据类型则没有任何的限制。

内置的`make`函数可以创建一个 map：
也可以用`map`字面值的语法创建 map，同时还可以指定一些最初的`key/value`：

```go
ages := map[string]int{
  "alice":   31,
  "charlie": 34,
}
// 这相当于
ages := make(map[string]int)
ages["alice"] = 31
ages["charlie"] = 34


// 声明一个key是字符串，值为int的字典,这种方式的声明需要在使用之前使用make初始化
var numbers map[string]int
// 另一种map的声明方式
numbers := make(map[string]int)
numbers["one"] = 1  //赋值
numbers["ten"] = 10 //赋值
numbers["three"] = 3


package main
import "fmt"
type Vertex struct {
  Lat, Long float64
}
var m map[string]Vertex
func main() {
  m = make(map[string]Vertex)
  m["Bell Labs"] = Vertex{
    40.68433, -74.39967,
  }
  fmt.Println(m["Bell Labs"])
}
// {40.68433 -74.39967}


// 映射的文法与结构体相似，不过必须有键名。
package main
import "fmt"
type Vertex struct {
  Lat, Long float64
}
var m = map[string]Vertex{
  "Bell Labs": Vertex{
    40.68433, -74.39967,
  },
  "Google": Vertex{
    37.42202, -122.08408,
  },
}
func main() {
  fmt.Println(m)
}


// 若顶级类型只是一个类型名，你可以在文法的元素中省略它。
package main
import "fmt"
type Vertex struct {
  Lat, Long float64
}
var m = map[string]Vertex{
  "Bell Labs": {40.68433, -74.39967},
  "Google":    {37.42202, -122.08408},
}
func main() {
  fmt.Println(m)
}


// 修改映射
package main

import "fmt"

func main() {
  m := make(map[string]int)

  m["Answer"] = 42 // 在映射 m 中插入或修改元素：
  fmt.Println("The value:", m["Answer"]) // 获取元素：

  m["Answer"] = 48
  fmt.Println("The value:", m["Answer"])

  delete(m, "Answer") // 删除元素：
  fmt.Println("The value:", m["Answer"])

  // 通过双赋值检测某个键是否存在：
  // 若 key 在 m 中，ok 为 true ；否则，ok 为 false。
  // 若 key 不在映射中，那么 elem 是该映射元素类型的零值。
  // 同样的，当从映射中读取某个不存在的键时，结果是映射的元素类型的零值。
  v, ok := m["Answer"]
  fmt.Println("The value:", v, "Present?", ok)
}
// The value: 42
// The value: 48
// The value: 0
// The value: 0 Present? false
```
