# 接口完整性检查

```go
type Shape interface {
    Sides() int
    Area() int
}
type Square struct {
    len int
}
func (s* Square) Sides() int {
    return 4
}
func main() {
    s := Square{len: 5}
    fmt.Printf("%d\n",s.Sides())
}

// 声明一个 _ 变量（没人用），
// 其会把一个 nil 的空指针，从 Square 转成 Shape，
// 这样，如果没有实现完相关的接口方法，编译器就会报错
var _ Shape = (*Square)(nil)
```
