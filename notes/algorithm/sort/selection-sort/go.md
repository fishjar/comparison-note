```go
package main

import (
	"fmt"
)

// SelectionSort 选择排序
// 每次迭代选出最小的元素，放到最前面
func SelectionSort(arr []int) []int {
	for i := 0; i < len(arr); i++ {
		min := i // 最小元素的序号
		for j := i; j < len(arr); j++ {
			if arr[j] < arr[min] {
				min = j
			}
		}
		arr[i], arr[min] = arr[min], arr[i] // 最小元素放到最前面
	}
	return arr
}

func main() {
	a := []int{3, 6, 7, 4, 5, 1, 2}
	fmt.Println(SelectionSort(a))
}

```