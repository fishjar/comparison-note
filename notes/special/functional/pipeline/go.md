## Channel 管理

```go
package main

import (
	"fmt"
)

// Channel转发函数
func echo(nums []int) <-chan int {
	out := make(chan int)
	go func() {
		for _, n := range nums {
			out <- n
		}
		close(out)
	}()
	return out
}

// 平方函数
func sq(in <-chan int) <-chan int {
	out := make(chan int)
	go func() {
		for n := range in {
			out <- n * n
		}
		close(out)
	}()
	return out
}

// 过滤奇数函数
func odd(in <-chan int) <-chan int {
	out := make(chan int)
	go func() {
		for n := range in {
			if n%2 != 0 {
				out <- n
			}
		}
		close(out)
	}()
	return out
}

// 求和函数
func sum(in <-chan int) <-chan int {
	out := make(chan int)
	go func() {
		var sum = 0
		for n := range in {
			sum += n
		}
		out <- sum
		close(out)
	}()
	return out
}

func main() {
	var nums = []int{1, 2, 3, 4, 5, 6, 7, 8, 9, 10}
	for n := range sum(sq(odd(echo(nums)))) {
		fmt.Println(n)
	}
}
```

使用一个代理函数来完成

```go
// ...

type EchoFunc func([]int) <-chan int
type PipeFunc func(<-chan int) <-chan int

func pipeline(nums []int, echo EchoFunc, pipeFns ...PipeFunc) <-chan int {
	ch := echo(nums)
	for i := range pipeFns {
		ch = pipeFns[i](ch)
	}
	return ch
}

func main() {
	var nums = []int{1, 2, 3, 4, 5, 6, 7, 8, 9, 10}
	for n := range pipeline(nums, echo, odd, sq, sum) {
		fmt.Println(n)
	}
}
```

## Fan in/Out

通过并发的方式来对一个很长的数组中的质数进行求和运算，
我们想先把数组分段求和，然后再把其集中起来。

```go
package main

import (
	"fmt"
	"math"
	"sync"
)

func echo(nums []int) <-chan int {
	out := make(chan int)
	go func() {
		for _, n := range nums {
			out <- n
		}
		close(out)
	}()
	return out
}

func sum(in <-chan int) <-chan int {
	out := make(chan int)
	go func() {
		var sum = 0
		for n := range in {
			sum += n
		}
		out <- sum
		close(out)
	}()
	return out
}

func is_prime(value int) bool {
    // 非素书，约数最小是2,另一个约数最大是value/2
    // 因此迭代验证到value/2即可
	for i := 2; i <= int(math.Floor(float64(value)/2)); i++ {
		if value%i == 0 {
			return false
		}
	}
	return value > 1
}

func prime(in <-chan int) <-chan int {
	out := make(chan int)
	go func() {
		for n := range in {
			if is_prime(n) {
				out <- n
			}
		}
		close(out)
	}()
	return out
}

func makeRange(min, max int) []int {
	a := make([]int, max-min+1)
	for i := range a {
		a[i] = min + i
	}
	return a
}

// cs 是 sum 里面定义的 channel 列表
func merge(cs []<-chan int) <-chan int {
	var wg sync.WaitGroup
	out := make(chan int)

	wg.Add(len(cs))
	for _, c := range cs {
		go func(c <-chan int) {
			for n := range c {
				out <- n
			}
			wg.Done()
		}(c)
	}
	go func() {
		wg.Wait()
		close(out)
	}()
	return out
}

func main() {
	nums := makeRange(1, 10000) // 生成1-10000的数组
	in := echo(nums)            // 将数组放到一个go程的channel

	const nProcess = 5             // 并发数量
	var chans [nProcess]<-chan int // 初始化5个channel
	for i := range chans {
		// 从 in 取数据，并连续执行 Pipeline 函数（prime过滤，sum求和），并将结果放进 channel
		// 返回的 channel 是 sum 里面定义的
		chans[i] = sum(prime(in))
	}

	// merge 其实和 echo 函数类似的做用
	// echo 是将列表的数据放到一个 channel
	// merge 是将不同的 channel 的数据 合并到一个 channel
	// 然后就可以再次调用 sum 函数
	for n := range sum(merge(chans[:])) {
		fmt.Println(n)
	}
}
```
