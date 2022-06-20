select 语句使一个 Go 程可以等待多个通信操作。
select 会阻塞到某个分支可以继续执行为止，这时就会执行该分支。
当多个分支都准备好时会随机选择一个执行。

```go
package main
import "fmt"
func fibonacci(c, quit chan int) {
  x, y := 0, 1
  for {
    select {
      case c <- x:
        x, y = y, x+y
      case <-quit:
        fmt.Println("quit")
        return
    }
  }
}
func main() {
  c := make(chan int)
  quit := make(chan int)
  go func() {
    for i := 0; i < 10; i++ {
      fmt.Println(<-c)
    }
    quit <- 0
  }() // 立即执行函数
  fibonacci(c, quit)
}


// 当 select 中的其它分支都没有准备好时，default 分支就会执行。
package main
import (
  "fmt"
  "time"
)
func main() {
  tick := time.Tick(100 * time.Millisecond)
  boom := time.After(500 * time.Millisecond)
  for {
    select {
    case <-tick:
      fmt.Println("tick.")
    case <-boom:
      fmt.Println("BOOM!")
      return
    default:
      fmt.Println("    .")
      time.Sleep(50 * time.Millisecond)
    }
  }
}


// 练习：等价二叉查找树
// 函数 tree.New(k) 用于构造一个随机结构的已排序二叉查找树，
// 它保存了值 k, 2k, 3k, ..., 10k
package main
import (
  "fmt"
  "sort"
  "golang.org/x/tour/tree"
)
func walk(t *tree.Tree, ch chan int) {
  if t == nil {
    return
  }
  walk(t.Left, ch)
  ch <- t.Value
  walk(t.Right, ch)
}
// Walk 遍历 tree t 将所有的值从 tree 发送到 channel ch。
func Walk(t *tree.Tree, ch chan int) {
  walk(t, ch)
  close(ch)
}
// Same 检测树 t1 和 t2 是否含有相同的值。
func Same(t1, t2 *tree.Tree) bool {
  ch1 := make(chan int)
  ch2 := make(chan int)
  a1 := make([]int, 0)
  a2 := make([]int, 0)
  go Walk(t1, ch1)
  go Walk(t2, ch2)
  for v := range ch1 {
    a1 = append(a1, v)
  }
  for v := range ch2 {
    a2 = append(a2, v)
  }
  if len(a1) != len(a2) {
    return false
  }
  // 是否应当Sort？
  // 题目要求的是：检测 t1 和 t2 是否存储了相同的值
  sort.Ints(a1)
  sort.Ints(a2)
  for i, v := range a1 {
    if v != a2[i] {
      return false
    }
  }
  return true
}
func main() {
  // Test Walk
  ch := make(chan int)
  t := tree.New(1)
  fmt.Println("tree:", t)
  go Walk(t, ch)
  for v := range ch {
    fmt.Println("Got value:", v)
  }
  // Test Same
  t2 := tree.New(1)

  fmt.Println("Check same:", Same(t, t2))
}
```
