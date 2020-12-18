```go
package main

import (
	"fmt"
)

// InsertionSort 插入排序
// 从第一个元素开始，该元素可以认为已经被排序
// 取出下一个元素，在已经排序的元素序列中从后向前扫描
// 如果该元素（已排序）大于新元素，将该元素移到下一位置
// 直到找到已排序的元素小于或者等于新元素
func InsertionSort(arr []int) []int {
	for i := 1; i < len(arr); i++ {
		key := arr[i]                // 取出元素，从第二个开始
		j := i - 1                   // 前面的元素
		for j >= 0 && arr[j] > key { // 与取出元素比较，大于则后移
			arr[j+1] = arr[j]
			j--
		}
		arr[j+1] = key // 将取出的元素插入合适的位置
	}
	return arr
}

func main() {
	a := []int{3, 6, 7, 4, 5, 1, 2}
	fmt.Println(InsertionSort(a))
}

```
