```go
fmt.Printf("Hello %d\n", 23)
fmt.Fprint(os.Stdout, "Hello ", 23, "\n")
fmt.Println("Hello", 23)
fmt.Println(fmt.Sprint("Hello ", 23))

var x uint64 = 1<<64 - 1
fmt.Printf("%d %x; %d %x\n", x, x, int64(x), int64(x))

// 若你只想要默认的转换，如使用十进制的整数，你可以使用通用的格式 %v（对应“值”）；
// 其结果与 Print 和 Println 的输出完全相同。
// 此外，这种格式还能打印任意值，甚至包括数组、结构体和映射。
fmt.Printf("%v\n", timeZone)  // 或只用 fmt.Println(timeZone)

// 改进的格式 %+v 会为结构体的每个字段添上字段名，
// 而另一种格式 %#v 将完全按照Go的语法打印值。
type T struct {
  a int
  b float64
  c string
}
t := &T{ 7, -2.35, "abc\tdef" }
fmt.Printf("%v\n", t)
fmt.Printf("%+v\n", t)
fmt.Printf("%#v\n", t)
fmt.Printf("%#v\n", timeZone)
// &{7 -2.35 abc   def}
// &{a:7 b:-2.35 c:abc     def}
// &main.T{a:7, b:-2.35, c:"abc\tdef"}
// map[string] int{"CST":-21600, "PST":-28800, "EST":-18000, "UTC":0, "MST":-25200}
```
