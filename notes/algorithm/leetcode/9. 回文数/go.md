```go
func isPalindrome(x int) bool {
    if x >= 0 && x < 10 {
        return true
    } else if x < 0 || x%10==0 {
        return false
    }

    tmp := x
    y := 0
    for {
        y = y*10 + tmp%10
        tmp /= 10
        if tmp == 0 {
            break
        }
    }
    return y == x
}
```

```go
func isPalindrome(x int) bool {
    if x >= 0 && x < 10 {
        return true
    } else if x < 0 || x%10==0 {
        return false
    }

    y := 0
    for y < x {
        y = y*10 + x%10
        x /= 10
    }

    return x == y || x == y/10
}
```
