```go
package main

import (
	"fmt"
)

// CountingSort 计数排序
// 将数组的值映射到，存入另一个临时数组的键，并统计次数
// 因为键是排好序的，迭代一次临时数组即可按次序取出存进的值
func CountingSort(arr []int) []int {
	max, min := countMaxMin(arr)  // 找出最大，最小值
	tmp := make([]int, max-min+1) // 创建临时数组
	for _, v := range arr {       // 将值存入临时数组，统计次数
		tmp[v-min]++ // min相当于值的偏移量
	}

	index := 0
	// 迭代临时数组
	// 这里的k其实是存入的值，v是存入的次数
	for k, v := range tmp {
		for v > 0 {
			arr[index] = k + min // 需要加上偏移量
			index++
			v--
		}
	}
	return arr
}

// countMaxMin 找出数组最大最小值
func countMaxMin(arr []int) (max int, min int) {
	max, min = arr[0], arr[0]
	for _, v := range arr {
		if v > max {
			max = v
		}
		if v < min {
			min = v
		}
	}
	return
}

func main() {
	a := []int{3, 6, 7, 4, 5, 1, 2}
	fmt.Println(CountingSort(a))
}
```
