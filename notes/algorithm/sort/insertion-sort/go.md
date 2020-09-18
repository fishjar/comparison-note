```go
package main

import (
	"fmt"
)

// InsertionSort 插入排序
func InsertionSort(arr []int) []int {
	for i := 0; i < len(arr); i++ {
		// j 没必要从0开始，因为i前面都是排序的了
		for j := i; j > 0; j-- {
			// 与前面的元素比较，如果大于等于前面的，说明刚好按顺序排，直接退出迭代
			if arr[j] >= arr[j-1] {
				break
			}
			// 否则，小于前面的，则往前插（交换位置）
			arr[j], arr[j-1] = arr[j-1], arr[j]
		}
	}
	return arr
}

func main() {
	a := []int{3, 6, 7, 4, 5, 1, 2}
	fmt.Println(InsertionSort(a))
}

```

