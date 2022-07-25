- 若我们只是想保证每次只有一个 Go 程能够访问一个共享的变量，从而避免冲突？
- 我们通常使用 _互斥锁（Mutex）_ 这一数据结构来提供这种机制。
- 我们可以通过在代码前调用 Lock 方法，在代码后调用 Unlock 方法来保证一段代码的互斥执行。
- 我们也可以用 defer 语句来保证互斥锁一定会被解锁

```go
package main
import (
  "fmt"
  "sync"
  "time"
)
// SafeCounter 的并发使用是安全的。
type SafeCounter struct {
  v   map[string]int
  mux sync.Mutex
}
// Inc 增加给定 key 的计数器的值。
func (c *SafeCounter) Inc(key string) {
  c.mux.Lock()
  // Lock 之后同一时刻只有一个 goroutine 能访问 c.v
  c.v[key]++
  c.mux.Unlock()
}
// Value 返回给定 key 的计数器的当前值。
func (c *SafeCounter) Value(key string) int {
  c.mux.Lock()
  // Lock 之后同一时刻只有一个 goroutine 能访问 c.v
  defer c.mux.Unlock()
  return c.v[key]
}
func main() {
  c := SafeCounter{v: make(map[string]int)}
  for i := 0; i < 1000; i++ {
    go c.Inc("somekey")
  }
  time.Sleep(time.Second)
  fmt.Println(c.Value("somekey"))
}
```

```go
package main

import (
    "fmt"
    "sync"
)

type Container struct {
    mu       sync.Mutex
    counters map[string]int
}

func (c *Container) inc(name string) {
    c.mu.Lock()
    defer c.mu.Unlock()
    c.counters[name]++
}

func main() {
    c := Container{
        counters: map[string]int{"a": 0, "b": 0},
    }

    var wg sync.WaitGroup
    doIncrement := func(name string, n int) {
        for i := 0; i < n; i++ {
            c.inc(name)
        }
        wg.Done()
    }

    wg.Add(3)
    go doIncrement("a", 10000)
    go doIncrement("a", 10000)
    go doIncrement("b", 10000)

    wg.Wait()
    fmt.Println(c.counters)
}
```
