```go
func lengthOfLongestSubstring(s string) int {
    max := 0
    for len(s) > max {
        n := 0
        m := make(map[string]bool)
        for _,str := range s {
            if _,ok := m[string(str)]; ok {
                break
            }
            m[string(str)] = true
            n++
        }
        if n > max {
            max = n
        }
        s = s[1:]
    }
    return max
}
```

```go
func lengthOfLongestSubstring(s string) int {
    i,j,p := 0,0,0
    for j < len(s) {
        index := strings.LastIndex(s[i:j],string(s[j]))
        if  index != -1 { // 发现重复
            tp := index+1+j
            if p < tp {
                p = tp
            }
            i++
            j++
        } else if j < p { // 无重复，但是 j-i 比之前小，继续右移
            i++
            j++
        } else {
            j++
        }
    }
    return j-i
}
```

```go
func lengthOfLongestSubstring(s string) int {
    i,j,p := 0,0,0
    for p < len(s) {
        index := strings.LastIndex(s[i:p],string(s[p]))
        if  index != -1 {
            i+=index+1
            j+=index+1
        } else if p > j-1 {
            j++
        }
        p++
    }
    return j-i
}
```
