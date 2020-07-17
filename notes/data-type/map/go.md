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
