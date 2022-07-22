一个结构体（struct）就是一组字段（field）。

```go
package main
import "fmt"
type Vertex struct {
  X int
  Y int
}
func main() {
  fmt.Println(Vertex{1, 2})
  fmt.Println(Vertex{X:1, Y:2})
}

// 结构体字段使用点号来访问。
package main
import "fmt"
type Vertex struct {
  X int
  Y int
}
func main() {
  v := Vertex{1, 2}
  v.X = 4
  fmt.Println(v.X)
}


// 如果我们有一个指向结构体的指针 p，
// 那么可以通过 (*p).X 来访问其字段 X。
//不过这么写太啰嗦了，所以语言也允许我们使用隐式间接引用，
//直接写 p.X 就可以。
package main
import "fmt"
type Vertex struct {
  X int
  Y int
}
func main() {
  v := Vertex{1, 2}
  p := &v
  // var p int = &v
  fmt.Println(p)
  fmt.Println(*p)
  p.X = 3
  // (*p).X = 3
  fmt.Println(v)
}
// &{1 2}
// {1 2}
// {3 2}


// 仅列出部分字段。（字段名的顺序无关。）
package main
import "fmt"
type Vertex struct {
  X, Y int
}
var (
  v1 = Vertex{1, 2}  // 创建一个 Vertex 类型的结构体
  v2 = Vertex{X: 1}  // Y:0 被隐式地赋予
  v3 = Vertex{}      // X:0 Y:0
  p  = &Vertex{1, 2} // 创建一个 *Vertex 类型的结构体（指针）
)
func main() {
  fmt.Println(v1, p, v2, v3)
}
// {1 2} &{1 2} {1 0} {0 0}


// struct的匿名字段
package main
import "fmt"
type Human struct {
  name string
  age int
  weight int
}

type Student struct {
  Human  // 匿名字段，那么默认Student就包含了Human的所有字段
  speciality string
}

func main() {
  // 我们初始化一个学生
  mark := Student{Human{"Mark", 25, 120}, "Computer Science"}

  // 我们访问相应的字段
  fmt.Println("His name is ", mark.name)
  fmt.Println("His age is ", mark.age)
  fmt.Println("His weight is ", mark.weight)
  fmt.Println("His speciality is ", mark.speciality)
  // 修改对应的备注信息
  mark.speciality = "AI"
  fmt.Println("Mark changed his speciality")
  fmt.Println("His speciality is ", mark.speciality)
  // 修改他的年龄信息
  fmt.Println("Mark become old")
  mark.age = 46
  fmt.Println("His age is", mark.age)
  // 修改他的体重信息
  fmt.Println("Mark is not an athlet anymore")
  mark.weight += 60
  fmt.Println("His weight is", mark.weight)
}


package main
import "fmt"
type Skills []string
type Human struct {
  name string
  age int
  weight int
}
type Student struct {
  Human  // 匿名字段，struct
  Skills // 匿名字段，自定义的类型string slice
  int    // 内置类型作为匿名字段
  speciality string
}
func main() {
  // 初始化学生Jane
  jane := Student{Human:Human{"Jane", 35, 100}, speciality:"Biology"}
  // 现在我们来访问相应的字段
  fmt.Println("Her name is ", jane.name)
  fmt.Println("Her age is ", jane.age)
  fmt.Println("Her weight is ", jane.weight)
  fmt.Println("Her speciality is ", jane.speciality)
  // 我们来修改他的skill技能字段
  jane.Skills = []string{"anatomy"}
  fmt.Println("Her skills are ", jane.Skills)
  fmt.Println("She acquired two new ones ")
  jane.Skills = append(jane.Skills, "physics", "golang")
  fmt.Println("Her skills now are ", jane.Skills)
  // 修改匿名内置类型字段
  jane.int = 3
  fmt.Println("Her preferred number is", jane.int)
}
```

```go
type Employee struct {
    ID        int
    Name      string
    Address   string
    DoB       time.Time
    Position  string
    Salary    int
    ManagerID int
}
var dilbert Employee

var employeeOfTheMonth *Employee = &dilbert
employeeOfTheMonth.Position += " (proactive team player)" // 相当于下一行
(*employeeOfTheMonth).Position += " (proactive team player)"

// 如果要在函数内部修改结构体成员的话，用指针传入是必须的
func AwardAnnualRaise(e *Employee) {
    e.Salary = e.Salary * 105 / 100
}

pp := &Point{1, 2} // 等价于下面两行
pp := new(Point)
*pp = Point{1, 2}
```

一个命名为 S 的结构体类型将不能再包含 S 类型的成员：
因为一个聚合的值不能包含它自身。
（该限制同样适应于数组。）
但是 S 类型的结构体可以包含\*S 指针类型的成员，
这可以让我们创建递归的数据结构，比如链表和树结构等。

```go
type tree struct {
    value       int
    left, right *tree
}
```

如果结构体的全部成员都是可以比较的，那么结构体也是可以比较的。
因此和其他可比较的类型一样，可以用于 map 的 key 类型

```go
type Point struct{ X, Y int }

p := Point{1, 2}
q := Point{2, 1}
fmt.Println(p.X == q.X && p.Y == q.Y) // "false"
fmt.Println(p == q)                   // "false"
```

Go 语言有一个特性让我们只声明一个成员对应的数据类型而不指名成员的名字；
这类成员就叫匿名成员。
匿名成员的数据类型必须是命名的类型或指向一个命名的类型的指针。

```go
type Point struct {
    X, Y int
}
type Circle struct {
    Center Point
    Radius int
}
type Wheel struct {
    Circle Circle
    Spokes int
}
var w Wheel
w.Circle.Center.X = 8
w.Circle.Center.Y = 8
w.Circle.Radius = 5
w.Spokes = 20

// 下面的代码中，Circle和Wheel各自都有一个匿名成员。
// 我们可以说Point类型被嵌入到了Circle结构体，
// 同时Circle类型被嵌入到了Wheel结构体。
type Circle struct {
    Point
    Radius int
}
type Wheel struct {
    Circle
    Spokes int
}

// 匿名成员Circle和Point都有自己的名字——就是命名的类型名字
// 但是这些名字在点操作符中是可选的。
var w Wheel
w.X = 8            // equivalent to w.Circle.Point.X = 8
w.Y = 8            // equivalent to w.Circle.Point.Y = 8
w.Radius = 5       // equivalent to w.Circle.Radius = 5
w.Spokes = 20

// 不幸的是，结构体字面值并没有简短表示匿名成员的语法，
// 因此下面的语句都不能编译通过：
w = Wheel{8, 8, 5, 20}                       // compile error: unknown fields
w = Wheel{X: 8, Y: 8, Radius: 5, Spokes: 20} // compile error: unknown fields

// 结构体字面值必须遵循形状类型声明时的结构，所以我们只能用下面的两种语法
w = Wheel{Circle{Point{8, 8}, 5}, 20}
w = Wheel{
    Circle: Circle{
        Point:  Point{X: 8, Y: 8},
        Radius: 5,
    },
    Spokes: 20, // NOTE: trailing comma necessary here (and at Radius)
}
fmt.Printf("%#v\n", w)
// Output:
// Wheel{Circle:Circle{Point:Point{X:8, Y:8}, Radius:5}, Spokes:20}
w.X = 42
fmt.Printf("%#v\n", w)
// Output:
// Wheel{Circle:Circle{Point:Point{X:42, Y:8}, Radius:5}, Spokes:20}
```

一个 struct 类型也可能会有多个匿名字段。

种类型的值便会拥有 Point 和 RGBA 类型的所有方法，
以及直接定义在 ColoredPoint 中的方法。
当编译器解析一个选择器到方法时，比如 p.ScaleBy，
它会首先去找直接定义在这个类型里的 ScaleBy 方法，
然后找被 ColoredPoint 的内嵌字段们引入的方法，
然后去找 Point 和 RGBA 的内嵌字段引入的方法，然后一直递归向下找。
如果选择器有二义性的话编译器会报错，比如你在同一级里有两个同名的方法。

```go
type ColoredPoint struct {
    Point
    color.RGBA
}
```

一个小 trick

```go
var (
    mu sync.Mutex // guards mapping
    mapping = make(map[string]string)
)

func Lookup(key string) string {
    mu.Lock()
    v := mapping[key]
    mu.Unlock()
    return v
}
```

改进后

```go
// 给新的变量起了一个更具表达性的名字：cache
// 因为sync.Mutex字段也被嵌入到了这个struct里，
// 其Lock和Unlock方法也就都被引入到了这个匿名结构中了
var cache = struct {
    sync.Mutex
    mapping map[string]string
}{
    mapping: make(map[string]string),
}


func Lookup(key string) string {
    cache.Lock()
    v := cache.mapping[key]
    cache.Unlock()
    return v
}
```

将一个 Go 语言中类似 movies 的结构体 slice 转为 JSON 的过程叫编组（marshaling）。
编组通过调用 json.Marshal 函数完成

```go
// Color成员的Tag还带了一个额外的omitempty选项，
// 表示当Go语言结构体成员为空或零值时不生成JSON对象（这里false为零值）。
type Movie struct {
    Title  string
    Year   int  `json:"released"`
    Color  bool `json:"color,omitempty"`
    Actors []string
}
var movies = []Movie{
    {Title: "Casablanca", Year: 1942, Color: false,
        Actors: []string{"Humphrey Bogart", "Ingrid Bergman"}},
    {Title: "Cool Hand Luke", Year: 1967, Color: true,
        Actors: []string{"Paul Newman"}},
    {Title: "Bullitt", Year: 1968, Color: true,
        Actors: []string{"Steve McQueen", "Jacqueline Bisset"}},
    // ...
}
data, err := json.Marshal(movies)
if err != nil {
    log.Fatalf("JSON marshaling failed: %s", err)
}
fmt.Printf("%s\n", data)

```

```json
[{"Title":"Casablanca","released":1942,"Actors":["Humphrey Bogart","Ingr
id Bergman"]},{"Title":"Cool Hand Luke","released":1967,"color":true,"Ac
tors":["Paul Newman"]},{"Title":"Bullitt","released":1968,"color":true,"
Actors":["Steve McQueen","Jacqueline Bisset"]}]
```

```go
// json.MarshalIndent函数将产生整齐缩进的输出
data, err := json.MarshalIndent(movies, "", "    ")
if err != nil {
    log.Fatalf("JSON marshaling failed: %s", err)
}
fmt.Printf("%s\n", data)
```

```json
[
  {
    "Title": "Casablanca",
    "released": 1942,
    "Actors": ["Humphrey Bogart", "Ingrid Bergman"]
  },
  {
    "Title": "Cool Hand Luke",
    "released": 1967,
    "color": true,
    "Actors": ["Paul Newman"]
  },
  {
    "Title": "Bullitt",
    "released": 1968,
    "color": true,
    "Actors": ["Steve McQueen", "Jacqueline Bisset"]
  }
]
```

编码的逆操作是解码，对应将 JSON 数据解码为 Go 语言的数据结构，
Go 语言中一般叫 unmarshaling，通过 json.Unmarshal 函数完成。

```go
var titles []struct{ Title string }
if err := json.Unmarshal(data, &titles); err != nil {
    log.Fatalf("JSON unmarshaling failed: %s", err)
}
fmt.Println(titles) // "[{Casablanca} {Cool Hand Luke} {Bullitt}]"
```

## 结构体嵌入

```go
package main
import "fmt"

type base struct {
    num int
}
func (b base) describe() string {
    return fmt.Sprintf("base with num=%v", b.num)
}

type container struct {
    base
    str string
}

func main() {
    co := container{
        base: base{
            num: 1,
        },
        str: "some name",
    }

    fmt.Printf("co={num: %v, str: %v}\n", co.num, co.str)
    fmt.Println("also num:", co.base.num)
    fmt.Println("describe:", co.describe())

    // 因为嵌入了 base ，在这里我们看到 container 也实现了 describer 接口
    type describer interface {
        describe() string
    }
    var d describer = co
    fmt.Println("describer:", d.describe())
}
```
