```go
func maxArea(height []int) int {
    res := 0
    for i:=0; i<len(height)-1; i++ {
        for j:=i+1; j<len(height); j++ {
            res = max(res,(j-i)*min(height[i],height[j]))
        }
    }
    return res
}

func min(x,y int) int {
    if x < y {
        return x
    }
    return y
}

func max(x,y int) int {
    if x > y {
        return x
    }
    return y
}
```

```go
func maxArea(height []int) int {
    res := 0
    i := 0
    j := len(height)-1
    for i<j {
        res = max(res,(j-i)*min(height[i],height[j]))
        if height[i] < height[j] {
            i++
        } else {
            j--
        }
    }
    return res
}

func min(x,y int) int {
    if x < y {
        return x
    }
    return y
}

func max(x,y int) int {
    if x > y {
        return x
    }
    return y
}
```
