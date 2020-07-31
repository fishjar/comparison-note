```go
package main

import (
	"fmt"
)

// MergeSort 归并排序
func MergeSort(arr []int) []int {
	return mergeSort(arr)
}

// mergeSort 迭代函数
func mergeSort(arr []int) []int {
	if len(arr) <= 1 { // 一个或零个元素，直接返回
		return arr
	}
	mid := len(arr) / 2           // 中间分为两段
	left := mergeSort(arr[:mid])  // 递归，对左段排序
	right := mergeSort(arr[mid:]) // 递归，对右段排序
	result := merge(left, right)  // 合并左段和右段，此时左段元素都是小于右段元素的
	return result
}

// merge 合并两边的数组
func merge(left, right []int) []int {
	var result []int
	l, r := 0, 0
	for l < len(left) && r < len(right) {
		if left[l] > right[r] {
			result = append(result, right[r])
			r++
		} else {
			result = append(result, left[l])
			l++
		}
	}
	// 剩余部分合并
	result = append(result, left[l:]...)
	result = append(result, right[r:]...)
	return result
}

func main() {
	a := []int{3, 6, 7, 4, 5, 1, 2}
	fmt.Println(MergeSort(a))
}
```