```go
package main

import (
	"fmt"
)

// InsertionSort 插入排序
func InsertionSort(arr []int) []int {
	for i := 0; i < len(arr); i++ {
		for j := i; j > 0; j-- {
			// 与前面的元素比较，如果大于前面，则往前插（交换位置）
			if arr[j] < arr[j-1] {
				arr[j], arr[j-1] = arr[j-1], arr[j]
			}
		}
	}
	return arr
}

func main() {
	a := []int{3, 6, 7, 4, 5, 1, 2}
	fmt.Println(InsertionSort(a))
}

```

