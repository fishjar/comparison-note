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
