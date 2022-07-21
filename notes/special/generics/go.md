## 泛型类型

```go
// 无泛型
type IntSlice []int
var a IntSlice = []int{1, 2, 3}

// 使用泛型
type Slice[T int|float32|float64 ] []T

// 这里传入了类型实参int，泛型类型Slice[T]被实例化为具体的类型 Slice[int]
var a Slice[int] = []int{1, 2, 3}
fmt.Printf("Type Name: %T",a)  //输出：Type Name: Slice[int]

// 传入类型实参float32, 将泛型类型Slice[T]实例化为具体的类型 Slice[string]
var b Slice[float32] = []float32{1.0, 2.0, 3.0}
fmt.Printf("Type Name: %T",b)  //输出：Type Name: Slice[float32]

// MyMap类型定义了两个类型形参 KEY 和 VALUE。分别为两个形参指定了不同的类型约束
// 这个泛型类型的名字叫： MyMap[KEY, VALUE]
type MyMap[KEY int | string, VALUE float32 | float64] map[KEY]VALUE

// 用类型实参 string 和 flaot64 替换了类型形参 KEY 、 VALUE，泛型类型被实例化为具体的类型：MyMap[string, float64]
var a MyMap[string, float64] = map[string]float64{
    "jack_score": 9.6,
    "bob_score":  8.4,
}

// 一个泛型类型的结构体。可用 int 或 sring 类型实例化
type MyStruct[T int | string] struct {
    Name string
    Data T
}

// 一个泛型接口(关于泛型接口在后半部分会详细讲解）
type IPrintData[T int | float32 | string] interface {
    Print(data T)
}

// 一个泛型通道，可用类型实参 int 或 string 实例化
type MyChan[T int | string] chan T

// 类型形参的互相套用
type WowStruct[T int | float32, S []T] struct {
    Data     S
    MaxValue T
    MinValue T
}

// 特殊的泛型类型
type Wow[T int | string] int
var a Wow[int] = 123     // 编译正确
var b Wow[string] = 123  // 编译正确
var c Wow[string] = "hello" // 编译错误，因为"hello"不能赋值给底层类型int
```

## 语法错误

```go
// 错误，类型形参不能单独使用
type CommonType[T int|string|float32] T

// 匿名结构体不支持泛型
testCase := struct[T int|string] {
        caseName string
        got      T
        want     T
    }[int]{
        caseName: "test OK",
        got:      100,
        want:     100,
    }
```

当类型约束的一些写法会被编译器误认为是表达式时会报错。如下：

```go
//✗ 错误。T *int会被编译器误认为是表达式 T乘以int，而不是int指针
type NewType[T *int] []T
// 上面代码再编译器眼中：它认为你要定义一个存放切片的数组，数组长度由 T 乘以 int 计算得到
type NewType [T * int][]T

//✗ 错误。和上面一样，这里不光*被会认为是乘号，| 还会被认为是按位或操作
type NewType2[T *int|*float64] []T

//✗ 错误
type NewType2 [T (int)] []T
```

为了避免这种误解，解决办法就是给类型约束包上 interface{} 或加上逗号消除歧义

```go
type NewType[T interface{*int}] []T
type NewType2[T interface{*int|*float64}] []T

// 如果类型约束中只有一个类型，可以添加个逗号消除歧义
type NewType3[T *int,] []T

//✗ 错误。如果类型约束不止一个类型，加逗号是不行的
type NewType4[T *int|*float32,] []T
```

## 泛型类型的套娃

```go
// 先定义个泛型类型 Slice[T]
type Slice[T int|string|float32|float64] []T

// ✗ 错误。泛型类型Slice[T]的类型约束中不包含uint, uint8
type UintSlice[T uint|uint8] Slice[T]

// ✓ 正确。基于泛型类型Slice[T]定义了新的泛型类型 FloatSlice[T] 。FloatSlice[T]只接受float32和float64两种类型
type FloatSlice[T float32|float64] Slice[T]

// ✓ 正确。基于泛型类型Slice[T]定义的新泛型类型 IntAndStringSlice[T]
type IntAndStringSlice[T int|string] Slice[T]
// ✓ 正确 基于IntAndStringSlice[T]套娃定义出的新泛型类型
type IntSlice[T int] IntAndStringSlice[T]

// 在map中套一个泛型类型Slice[T]
type WowMap[T int|string] map[string]Slice[T]
// 在map中套Slice[T]的另一种写法
type WowMap2[T Slice[int] | Slice[string]] map[string]T
```

## 类型约束的两种选择

```go
type WowStruct[T int|string] struct {
    Name string
    Data []T
}

type WowStruct2[T []int|[]string] struct {
    Name string
    Data T
}

type WowStruct3[T int | string] struct {
    Data     []T
    MaxValue T
    MinValue T
}
```

## 泛型 receiver

```go
type MySlice[T int | float32] []T

func (s MySlice[T]) Sum() T {
    var sum T
    for _, value := range s {
        sum += value
    }
    return sum
}

var s MySlice[int] = []int{1, 2, 3, 4}
fmt.Println(s.Sum()) // 输出：10

var s2 MySlice[float32] = []float32{1.0, 2.0, 3.0, 4.0}
fmt.Println(s2.Sum()) // 输出：10.0
```

### 基于泛型的队列

```go
// 这里类型约束使用了空接口，代表的意思是所有类型都可以用来实例化泛型类型 Queue[T]
type Queue[T interface{}] struct {
    elements []T
}

// 将数据放入队列尾部
func (q *Queue[T]) Put(value T) {
    q.elements = append(q.elements, value)
}

// 从队列头部取出并从头部删除对应数据
func (q *Queue[T]) Pop() (T, bool) {
    var value T
    if len(q.elements) == 0 {
        return value, true
    }

    value = q.elements[0]
    q.elements = q.elements[1:]
    return value, len(q.elements) == 0
}

// 队列大小
func (q Queue[T]) Size() int {
    return len(q.elements)
}

var q1 Queue[int]  // 可存放int类型数据的队列
q1.Put(1)
q1.Put(2)
q1.Put(3)
q1.Pop() // 1
q1.Pop() // 2
q1.Pop() // 3

var q2 Queue[string]  // 可存放string类型数据的队列
q2.Put("A")
q2.Put("B")
q2.Put("C")
q2.Pop() // "A"
q2.Pop() // "B"
q2.Pop() // "C"

var q3 Queue[struct{Name string}]
var q4 Queue[[]int] // 可存放[]int切片的队列
var q5 Queue[chan int] // 可存放int通道的队列
var q6 Queue[io.Reader] // 可存放接口的队列
// ......
```

## 泛型函数

```go
// 无泛型
func Add(a int, b int) int {
    return a + b
}

// 使用泛型
func Add[T int | float32 | float64](a T, b T) T {
    return a + b
}

Add[int](1,2) // 传入类型实参int，计算结果为 3
Add[float32](1.0, 2.0) // 传入类型实参float32, 计算结果为 3.0

Add[string]("hello", "world") // 错误。因为泛型函数Add的类型约束中并不包含string

Add(1, 2)  // 1，2是int类型，编译器自动推导出类型实参T是int
Add(1.0, 2.0) // 1.0, 2.0 是浮点，编译请自动推导出类型实参T是float32
```

## 不支持的泛型情况

### 匿名函数不支持泛型

```go
// 错误，匿名函数不能自己定义类型实参
fnGeneric := func[T int | float32](a, b T) T {
        return a + b
}

fmt.Println(fnGeneric(1, 2))
```

### Go 的方法并不支持泛型

```go
type A struct {
}

// 错误，不支持泛型方法
func (receiver A) Add[T int | float32 | float64](a T, b T) T {
    return a + b
}
```

通过 receiver 使用类型形参

```go
type A[T int | float32 | float64] struct {}

// 方法可以使用类型定义中的形参 T
func (receiver A[T]) Add(a T, b T) T {
    return a + b
}

// 用法：
var a A[int]
a.Add(1, 2)

var aa A[float32]
aa.Add(1.0, 2.0)
```

## 接口类型约束

```go
// 一个可以容纳所有int,uint以及浮点类型的泛型切片
type Slice[T int | int8 | int16 | int32 | int64 | uint | uint8 | uint16 | uint32 | uint64 | float32 | float64] []T

// 将类型约束单独拿出来定义到接口中
type IntUintFloat interface {
    int | int8 | int16 | int32 | int64 | uint | uint8 | uint16 | uint32 | uint64 | float32 | float64
}
type Slice[T IntUintFloat] []T

// 进行组合
type Int interface {
    int | int8 | int16 | int32 | int64
}
type Uint interface {
    uint | uint8 | uint16 | uint32
}
type Float interface {
    float32 | float64
}
type Slice[T Int | Uint | Float] []T  // 使用 '|' 将多个接口类型组合

// 直接组合其他接口
type SliceElement interface {
    Int | Uint | Float | string // 组合了三个接口类型并额外增加了一个 string 类型
}
type Slice[T SliceElement] []T
```

## 指定底层类型

```go
var s1 Slice[int] // 正确

type MyInt int
var s2 Slice[MyInt] // ✗ 错误。MyInt类型底层类型是int但并不是int类型，不符合 Slice[T] 的类型约束
```

在类型约束中使用类似 `~int` 这种写法的话，就代表着不光是 `int` ，
所有以 `int` 为底层类型的类型也都可用于实例化

```go
type Int interface {
    ~int | ~int8 | ~int16 | ~int32 | ~int64
}

type Uint interface {
    ~uint | ~uint8 | ~uint16 | ~uint32
}
type Float interface {
    ~float32 | ~float64
}

type Slice[T Int | Uint | Float] []T

var s Slice[int] // 正确

type MyInt int
var s2 Slice[MyInt]  // MyInt底层类型是int，所以可以用于实例化

type MyMyInt MyInt
var s3 Slice[MyMyInt]  // 正确。MyMyInt 虽然基于 MyInt ，但底层类型也是int，所以也能用于实例化

type MyFloat32 float32  // 正确
var s4 Slice[MyFloat32]
```

使用 `~` 时有一定的限制：

- `~`后面的类型不能为接口
- `~`后面的类型必须为基本类型

```go
type MyInt int

type _ interface {
    ~[]byte  // 正确
    ~MyInt   // 错误，~后的类型必须为基本类型
    ~error   // 错误，~后的类型不能为接口
}
```

## 接口实现

```go
type Uint interface {  // 类型集 Uint 是 ~uint 和 ~uint8 等类型的并集
    ~uint | ~uint8 | ~uint16 | ~uint32 | ~uint64
}
```

```go
type AllInt interface {
    ~int | ~int8 | ~int16 | ~int32 | ~int64 | ~uint | ~uint8 | ~uint16 | ~uint32 | ~uint32
}

type Uint interface {
    ~uint | ~uint8 | ~uint16 | ~uint32 | ~uint64
}

type A interface { // 接口A代表的类型集是 AllInt 和 Uint 的交集
    AllInt
    Uint
}

type B interface { // 接口B代表的类型集是 AllInt 和 ~int 的交集
    AllInt
    ~int
}
```

## 空接口

```go
type Slice[T any] []T // 代码等价于 type Slice[T interface{}] []T
```

## comparable(可比较) 和 可排序(ordered)

```go
type MyMap[KEY comparable, VALUE any] map[KEY]VALUE // 正确
```

```go
// Ordered 代表所有可比大小排序的类型
type Ordered interface {
    Integer | Float | ~string
}

type Integer interface {
    Signed | Unsigned
}

type Signed interface {
    ~int | ~int8 | ~int16 | ~int32 | ~int64
}

type Unsigned interface {
    ~uint | ~uint8 | ~uint16 | ~uint32 | ~uint64 | ~uintptr
}

type Float interface {
    ~float32 | ~float64
}
```

## 接口的两种类型

- 基本接口(Basic interface)
  - 接口定义中如果只有方法
- 通用（一般）接口(General interface)
  - 接口内不光只有方法，还有类型
  - 通用接口类型不能用来定义变量，只能用于泛型的类型约束中

```go
type Uint interface { // 接口 Uint 中有类型，所以是通用接口
    ~uint | ~uint8 | ~uint16 | ~uint32 | ~uint64
}

type ReadWriter interface {  // ReadWriter 接口既有方法也有类型，所以是通用接口
    ~string | ~[]rune

    Read(p []byte) (n int, err error)
    Write(p []byte) (n int, err error)
}
```

```go
type Uint interface {
    ~uint | ~uint8 | ~uint16 | ~uint32 | ~uint64
}

var uintInf Uint // 错误。Uint是通用接口，只能用于类型约束，不得用于变量定义
```
