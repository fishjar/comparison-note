字符串和字节 slice

```go
s := "abc"
b := []byte(s)
s2 := string(b)
```

字符串和数字

```go
x := 123

// 一种方法是用fmt.Sprintf返回一个格式化的字符串
y := fmt.Sprintf("%d", x)

// 另一个方法是用strconv.Itoa(“整数到ASCII”)
fmt.Println(y, strconv.Itoa(x)) // "123 123"

// 不同的进制来格式化数字
fmt.Println(strconv.FormatInt(int64(x), 2)) // "1111011"

// fmt.Printf函数的%b、%d、%o和%x等参数提供功能往往比strconv包的Format函数方便很多
s := fmt.Sprintf("x=%b", x) // "x=1111011"

// 如果要将一个字符串解析为整数，可以使用strconv包的Atoi或ParseInt函数，
// 还有用于解析无符号整数的ParseUint函数：
x, err := strconv.Atoi("123")             // x is an int
y, err := strconv.ParseInt("123", 10, 64) // base 10, up to 64 bits
```

表达式 `T(v)` 将值 v 转换为类型 T。
Go 在不同类型的项之间赋值时需要显式转换。

对于每一个类型 T，都有一个对应的类型转换操作`T(x)`，
用于将 x 转为 T 类型（译注：如果 T 是指针类型，
可能会需要用小括弧包装 T，比如`(*int)(0)`）。
只有当两个类型的底层基础类型相同时，才允许这种转型操作，
或者是两者都是指向相同底层结构的指针类型，
这些转换只改变类型而不会影响值本身。
如果 x 是可以赋值给 T 类型的值，那么 x 必然也可以被转为 T 类型，但是一般没有这个必要。

```go
var i int = 42
var f float64 = float64(i)
var u uint = uint(f)

// 或者，更加简单的形式：
i := 42
f := float64(i)
u := uint(f)


// 字符串和字节slice之间可以相互转换
s := "abc"
b := []byte(s)
s2 := string(b)


// 整数转为字符串
x := 123
y := fmt.Sprintf("%d", x)
fmt.Println(y, strconv.Itoa(x)) // "123 123"
fmt.Println(strconv.FormatInt(int64(x), 2)) // "1111011"
s := fmt.Sprintf("x=%b", x) // "x=1111011"


// 字符串解析为整数
// 可以使用strconv包的Atoi或ParseInt函数，
// 还有用于解析无符号整数的ParseUint函数：
x, err := strconv.Atoi("123")             // x is an int
y, err := strconv.ParseInt("123", 10, 64) // base 10, up to 64 bits
```
