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
