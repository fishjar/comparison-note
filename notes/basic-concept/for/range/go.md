for 循环的 range 形式可遍历切片或映射。
当使用 for 循环遍历切片时，每次迭代都会返回两个值。

- 第一个值为当前元素的下标，
- 第二个值为该下标所对应元素的一份副本。

```go
package main
import "fmt"
var pow = []int{1, 2, 4, 8, 16, 32, 64, 128}
func main() {
  for i, v := range pow {
    fmt.Printf("2**%d = %d\n", i, v)
  }
}
// 2**0 = 1
// 2**1 = 2
// 2**2 = 4
// 2**3 = 8
// 2**4 = 16
// 2**5 = 32
// 2**6 = 64
// 2**7 = 128


// 可以将下标或值赋予 _ 来忽略它。
package main
import "fmt"
func main() {
  pow := make([]int, 5)
  for i := range pow {
    pow[i] = 1 << uint(i) // == 2**i
  }
  for _, value := range pow {
    fmt.Printf("%d\n", value)
  }
}
// 1
// 2
// 4
// 8
// 16


// Go语言的range循环在处理字符串的时候，会自动隐式解码UTF8字符串。
for i, r := range "Hello, 世界" {
  fmt.Printf("%d\t%q\t%d\n", i, r, r)
}
// 0	'H'	72
// 1	'e'	101
// 2	'l'	108
// 3	'l'	108
// 4	'o'	111
// 5	','	44
// 6	' '	32
// 7	'世'	19990
// 10	'界'	30028
```
