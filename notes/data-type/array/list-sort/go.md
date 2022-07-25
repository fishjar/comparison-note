```go
package main

import (
    "fmt"
    "sort"
)

func main() {

    strs := []string{"c", "a", "b"}
    sort.Strings(strs)
    fmt.Println("Strings:", strs)

    ints := []int{7, 2, 4}
    sort.Ints(ints)
    fmt.Println("Ints:   ", ints)

    s := sort.IntsAreSorted(ints)
    fmt.Println("Sorted: ", s)
}
```

## 使用函数自定义排序

```go
package main

import (
    "fmt"
    "sort"
)

type byLength []string

func (s byLength) Len() int {
    return len(s)
}
func (s byLength) Swap(i, j int) {
    s[i], s[j] = s[j], s[i]
}
func (s byLength) Less(i, j int) bool {
    return len(s[i]) < len(s[j])
}

func main() {
    fruits := []string{"peach", "banana", "kiwi"}
    sort.Sort(byLength(fruits))
    fmt.Println(fruits)
}
```
