一个变量就是一个可寻址的内存空间，里面存储了一个值，
并且存储的值可以通过内存地址来更新。

可以通过调用reflect.ValueOf(&x).Elem()，
来获取任意变量x对应的可取地址的Value。

```go
x := 2                   // value   type    variable?
a := reflect.ValueOf(2)  // 2       int     no
b := reflect.ValueOf(x)  // 2       int     no
c := reflect.ValueOf(&x) // &x      *int    no
d := c.Elem()            // 2       int     yes (x)

// 调用reflect.Value的CanAddr方法来判断其是否可以被取地址
fmt.Println(a.CanAddr()) // "false"
fmt.Println(b.CanAddr()) // "false"
fmt.Println(c.CanAddr()) // "false"
fmt.Println(d.CanAddr()) // "true"

// 另一个相关的方法CanSet是用于检查对应的reflect.Value是否是可取地址并可被修改的：
fmt.Println(fd.CanAddr(), fd.CanSet()) // "true false"
```