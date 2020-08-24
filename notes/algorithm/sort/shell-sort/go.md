```go
package main

import (
	"fmt"
)

// ShellSort 希尔排序
// 分组做插入排序，分组越来越少
// 最后是一组做插入排序
func ShellSort(arr []int) []int {
	// 每次分组都减半
	for step := len(arr) / 2; step > 0; step /= 2 {
		// 对每一组做插入排序
		for i := 0; i < len(arr); i += step {
			for j := i; j > 0; j -= step {
				if j-step >= 0 && arr[j] < arr[j-step] {
					arr[j], arr[j-step] = arr[j-step], arr[j]
				}

			}
		}
	}
	return arr
}

func main() {
	a := []int{3, 6, 7, 4, 5, 1, 2}
	fmt.Println(ShellSort(a))
}
```


```go
package main

import (
	"fmt"
)

// ShellSort 希尔排序
func ShellSort(arr []int) {
	for step := len(arr) / 2; step > 0; step /= 2 {
		for i := step; i < len(arr); i++ {
			j := i
			for j >= step && arr[j] < arr[j-step] {
				arr[j], arr[j-step] = arr[j-step], arr[j]
				j = j - step
			}
		}

	}
}

func main() {
	a := []int{3, 6, 7, 4, 5, 1, 2}
	fmt.Println(ShellSort(a))
}
```