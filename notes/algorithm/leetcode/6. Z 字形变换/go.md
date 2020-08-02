```go
func convert(s string, numRows int) string {
    if numRows == 1 {
        return s
    }
    var a []string
    l := 0
    front := true
    for i,c := range s {
        if i < numRows {
            a = append(a,string(c))
        } else {
            a[l] += string(c)
        }
        if l==numRows-1 {
            front = false
        }
        if l==0 {
            front = true
        }
        if front {
            l++
        } else {
            l--
        }
    }
    str := ""
    for _,item := range a {
        str += item
    }
    return str
}
```

```go
func convert(s string, numRows int) string {

    if numRows == 1 || len(s) <= numRows {
        return s
    }

    gLength := 2*numRows - 2
    res := make([]byte,0,len(s))
    for row := 0; row < numRows; row++ {
        l := row
        r := gLength - row
        for {
            if l >= len(s) {
                break
            }
            res = append(res,s[l])
            l+=gLength

            if row != 0 && row != numRows-1 {
                if r >= len(s) {
                    break
                }
                res = append(res,s[r])
                r+=gLength
            }
        }
    }

    return string(res)
}
```
