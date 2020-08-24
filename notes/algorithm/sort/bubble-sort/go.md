```go
package main

import (
	"fmt"
)

// BubbleSort 冒泡排序
// 迭代比较相邻元素大小，如果大的在前，则互换位置
// 直到无需交换位置，说明已经排序完成
func BubbleSort(arr []int) []int {
	for {
		done := true // 是否排序完成标志
		for i := 0; i < len(arr)-1; i++ {
			if arr[i] > arr[i+1] {
				arr[i], arr[i+1] = arr[i+1], arr[i] // 交换相邻元素
				done = false
			}
		}
		if done {
			break
		}
	}
	return arr
}

func main() {
	a := []int{3, 6, 7, 4, 5, 1, 2}
	fmt.Println(BubbleSort(a))
}
```

```go
// 改进版
package main

import (
	"fmt"
)

// BubbleSort 冒泡排序
// 迭代比较相邻元素大小，如果大的在前，则互换位置
// 直到无需交换位置，说明已经排序完成
func BubbleSort(arr []int) []int {
	j := 0 // 记录迭代次数
	for {
		j++
		done := true // 是否排序完成标志
		for i := 0; i < len(arr)-j; i++ {
			if arr[i] > arr[i+1] {
				arr[i], arr[i+1] = arr[i+1], arr[i] // 交换相邻元素
				done = false
			}
		}
		if done {
			break
		}
	}
	return arr
}

func main() {
	a := []int{3, 6, 7, 4, 5, 1, 2}
	fmt.Println(BubbleSort(a))
}
```
