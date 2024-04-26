```go
package main

import (
	"fmt"
)

func quickSort(arr []int, start, last int) {
	if start < last {
		base := arr[start]
		low, high := start, last
		for low < high {
			// base是选取的前面第一个，所以这里必须先移动后面指针
			for low < high && arr[high] >= base {
				high--
			}
			arr[low] = arr[high]
			for low < high && arr[low] <= base {
				low++
			}
			arr[high] = arr[low]
		}
		// 到这里low和high相等了
		arr[low] = base
		quickSort(arr, 0, low-1)
		quickSort(arr, low+1, last)
	}
}

func QuickSort(arr []int) {
	quickSort(arr, 0, len(arr)-1)
}

func main() {
	a := []int{3, 6, 7, 4, 5, 1, 2}
	QuickSort(a)
	fmt.Println(a)
}
```

```go
package main

import (
	"fmt"
)

func quickSort(arr []int, start, last int) {
	if start < last {
		low, high := start, last
		// 默认选取前面第一个为base
		for low < high {
			for low < high && arr[high] >= arr[start] {
				high--
			}
			for low < high && arr[low] <= arr[start] {
				low++
			}
			arr[low], arr[high] = arr[high], arr[low]
		}
		// 到这里low和high相等了
		arr[start], arr[low] = arr[low], arr[start]
		quickSort(arr, 0, low-1)
		quickSort(arr, low+1, last)
	}
}

func QuickSort(arr []int) {
	quickSort(arr, 0, len(arr)-1)
}

func main() {
	a := []int{3, 6, 7, 4, 5, 1, 2}
	QuickSort(a)
	fmt.Println(a)
}
```

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
			// 交换也无影响
			if midIdx != i {
				swap(arr, midIdx, i)
			}
			midIdx++
		}
	}
	// 把基准值与中间位置交换
	// 如果基准值刚好是最大值，midIdx等于end，无需交换
	// 交换也无影响
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
