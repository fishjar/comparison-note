```go
package main

import (
	"fmt"
)

// QuickSort 快速排序
func QuickSort(arr []int) {
	quickSort(arr, 0, len(arr)-1)
}

// quickSort 迭代函数
func quickSort(arr []int, start, end int) {
	// 开始索引小于结束索引，才需排序
	// 如果只有一个元素 start == end
	// 迭代时，基准值刚好为最大或最小元素 start > end
	if start < end {
		// 把数组分成[左段...,中间值（基准值）,右段...]，返回中间值（基准值）的索引
		// 其中左段、右段可能一个元素，也可能为空
		pivot := partition(arr, start, end)
		quickSort(arr, 0, pivot-1)   // 递归左段...
		quickSort(arr, pivot+1, end) // 递归右段...
	}
}

// partition 分区
func partition(arr []int, start, end int) int {
	pivot := arr[end]              // 选取最后一个元素作为基准pivot
	i := start                     // 中间位置的标记
	for j := start; j < end; j++ { // 最后一个元素就是基准所以不用比较
		// 依次比较，如果元素比基准值小
		// 就与标记中间位置元素交换，并把标记右移一位
		if arr[j] < pivot {
			// 相同元素无需交换
			if i != j {
				swap(arr, i, j)
			}
			i++
		}
	}
	// 把基准值与中间位置交换
	// 如果基准值刚好是最大值，i等于end，无需交换
	if i != end {
		swap(arr, i, end)
	}

	return i
}

// swap 交换数组中两个位置的元素
func swap(arr []int, i, j int) {
	arr[i], arr[j] = arr[j], arr[i]
}

func main() {
	a := []int{3, 6, 7, 4, 5, 1, 2}
	QuickSort(a)
	fmt.Println(a)
}
```
