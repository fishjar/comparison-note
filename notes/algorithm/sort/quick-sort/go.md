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
		midIdx := partition(arr, start, end)
		quickSort(arr, start, midIdx-1) // 递归左段...
		quickSort(arr, midIdx+1, end)   // 递归右段...
	}
}

// partition 分区
func partition(arr []int, start, end int) int {
	midVal := arr[end]             // 选取最后一个元素作为基准（中间）值
	midIdx := start                // 中间位置的标记，划分在右段
	for i := start; i < end; i++ { // 最后一个元素就是基准所以不用比较
		// 依次比较，如果元素比基准值小
		// 就与标记中间位置元素交换，并把标记右移一位
		if arr[i] < midVal {
			// 相同元素无需交换
			if midIdx != i {
				swap(arr, midIdx, i)
			}
			midIdx++
		}
	}
	// 把基准值与中间位置交换
	// 如果基准值刚好是最大值，midIdx等于end，无需交换
	if midIdx != end {
		swap(arr, midIdx, end)
	}

	return midIdx
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
