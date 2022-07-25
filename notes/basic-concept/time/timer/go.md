单纯的等待，使用 `time.Sleep` 就够了。 使用定时器的原因之一就是，你可以在定时器触发之前将其取消。

```go
package main

import (
    "fmt"
    "time"
)

func main() {

    timer1 := time.NewTimer(2 * time.Second)
    <-timer1.C
    fmt.Println("Timer 1 fired")

    timer2 := time.NewTimer(time.Second)
    go func() {
        <-timer2.C
        fmt.Println("Timer 2 fired")
    }()
    stop2 := timer2.Stop()
    if stop2 {
        fmt.Println("Timer 2 stopped")
    }

    // timer2 足够的时间来触发它，以证明它实际上已经停止了。
    time.Sleep(2 * time.Second)
}
```
