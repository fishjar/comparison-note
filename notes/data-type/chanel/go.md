信道是带有类型的管道，你可以通过它用信道操作符 `<-` 来发送或者接收值。

```go
ch <- v    // 将 v 发送至信道 ch。
v := <-ch  // 从 ch 接收值并赋予 v。
ch := make(chan int) // 和映射与切片一样，信道在使用前必须创建：


package main
import "fmt"
func sum(s []int, c chan int) {
  sum := 0
  for _, v := range s {
    sum += v
  }
  c <- sum // 将和送入 c
}
func main() {
  s := []int{7, 2, 8, -9, 4, 0}
  c := make(chan int)
  go sum(s[:len(s)/2], c)
  go sum(s[len(s)/2:], c)
  x, y := <-c, <-c // 从 c 中接收
  fmt.Println(x, y, x+y)
}
// -5 17 12


// 将缓冲长度作为第二个参数提供给 make 来初始化一个带缓冲的信道：
// 仅当信道的缓冲区填满后，向其发送数据时才会阻塞。
// 当缓冲区为空时，接受方会阻塞。
package main
import "fmt"
func main() {
  ch := make(chan int, 2)
  ch <- 1
  ch <- 2
  fmt.Println(<-ch)
  fmt.Println(<-ch)
}


// 发送者可通过 close 关闭一个信道来表示没有需要发送的值了。
// 若没有值可以接收且信道已被关闭
// v, ok := <-ch
// ok 会被设置为 false。
// 记住应该在生产者的地方关闭channel，而不是消费的地方去关闭它，这样容易引起panic
// 另外记住一点的就是channel不像文件之类的，不需要经常去关闭，
// 只有当你确实没有任何发送数据了，或者你想显式的结束range循环之类的

// 循环 for i := range c 会不断从信道接收值，直到它被关闭。
// *注意：* 只有发送者才能关闭信道，而接收者不能。
// for i := range c能够不断的读取channel里面的数据，直到该channel被显式的关闭。
package main
import (
  "fmt"
)
func fibonacci(n int, c chan int) {
  x, y := 0, 1
  for i := 0; i < n; i++ {
    c <- x
    x, y = y, x+y
  }
  close(c) // 关闭信道，不关闭会报错
}
func main() {
  c := make(chan int, 10)
  go fibonacci(cap(c), c)
  for i := range c { // 循环信道，注意i就是信道保存值，而不是序号
    fmt.Println(i)
  }
}
// 0
// 1
// 1
// 2
// 3
// 5
// 8
// 13
// 21
// 34




// 练习：Web 爬虫
package main
import (
  "fmt"
)
// 定义接口
type Fetcher interface {
  // Fetch 返回 URL 的 body 内容，并且将在这个页面上找到的 URL 放到一个 slice 中。
  Fetch(url string) (body string, urls []string, err error)
}
// fakeFetcher 是返回若干结果的 Fetcher。
type fakeFetcher map[string]*fakeResult
type fakeResult struct {
  body string
  urls []string
}
// 实现接口方法
func (f fakeFetcher) Fetch(url string) (string, []string, error) {
  if res, ok := f[url]; ok {
    return res.body, res.urls, nil
  }
  return "", nil, fmt.Errorf("not found: %s", url)
}
// fetcher 是填充后的 fakeFetcher。
var fetcher = fakeFetcher{
  "https://golang.org/": &fakeResult{
    "The Go Programming Language",
    []string{
      "https://golang.org/pkg/",
      "https://golang.org/cmd/",
    },
  },
  "https://golang.org/pkg/": &fakeResult{
    "Packages",
    []string{
      "https://golang.org/",
      "https://golang.org/cmd/",
      "https://golang.org/pkg/fmt/",
      "https://golang.org/pkg/os/",
    },
  },
  "https://golang.org/pkg/fmt/": &fakeResult{
    "Package fmt",
    []string{
      "https://golang.org/",
      "https://golang.org/pkg/",
    },
  },
  "https://golang.org/pkg/os/": &fakeResult{
    "Package os",
    []string{
      "https://golang.org/",
      "https://golang.org/pkg/",
    },
  },
}
// Crawl 使用 fetcher 从某个 URL 开始递归的爬取页面，直到达到最大深度。
func Crawl(url string, depth int, fetcher Fetcher) {
  // TODO: 并行的抓取 URL。
  // TODO: 不重复抓取页面。
        // 下面并没有实现上面两种情况：
  if depth <= 0 {
    return
  }
  body, urls, err := fetcher.Fetch(url)
  if err != nil {
    fmt.Println(err)
    return
  }
  fmt.Printf("found: %s %q\n", url, body)
  for _, u := range urls {
    Crawl(u, depth-1, fetcher)
  }
  return
}
func main() {
  Crawl("https://golang.org/", 4, fetcher)
}
```

## 信道阻塞

`ch := make(chan type, value)`

- 当 `value = 0` 时，`channel` 是无缓冲阻塞读写的，
- 当 `value > 0` 时，`channel` 有缓冲、是非阻塞的，
  直到写满 `value` 个元素才阻塞写入。

- 如果一个 go 程写，一个 go 程读，不会阻塞报错
- 如果同一个 go 程写+读，需要注意信道的缓冲大小

```go
package main
import "fmt"
func main() {
  c := make(chan int, 2) //修改2为1就报错，修改2为3可以正常运行
  c <- 1
  c <- 2
  fmt.Println(<-c)
  fmt.Println(<-c)
}


// 亦会报错
package main
import "fmt"
func main() {
  c := make(chan int) // 想当于 c := make(chan int， 0)
  c <- 1 // 此处阻塞，无法执行，必须在另一个go程取出数据才会继续
  c <- 2
  fmt.Println(<-c)
  fmt.Println(<-c)
}


// 正确执行
package main
import "fmt"
func main() {
  c := make(chan int)
  go func() { // 新开一个go程，向信道写入数据
    c <- 1
    c <- 2
  }()
  fmt.Println(<-c) // 取出数据
  fmt.Println(<-c)
}


// package main
import "fmt"
func main() {
  ch := make(chan int, 2)
  ch <- 1
  ch <- 2
  close(ch) // 这里不关闭将会报错
  for i := range ch {
    fmt.Println(i)
  }
}
```
