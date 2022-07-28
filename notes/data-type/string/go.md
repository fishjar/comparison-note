Go 中的字符串都是采用 UTF-8 字符集编码。
字符串是用一对双引号（""）或反引号（`` ）括起来定义

```go
var frenchHello string  // 声明变量为字符串的一般方法
var emptyString string = ""  // 声明了一个字符串变量，初始化为空字符串
func test() {
  no, yes, maybe := "no", "yes", "maybe"  // 简短声明，同时声明多个变量
  japaneseHello := "Konichiwa"  // 同上
  frenchHello = "Bonjour"  // 常规赋值
}


// Go中字符串是不可变的
var s string = "hello"
s[0] = 'c' // 出错！！！！

s := "hello"
c := []byte(s)  // 将字符串 s 转换为 []byte 类型
c[0] = 'c'
s2 := string(c)  // 再转换回 string 类型
fmt.Printf("%s\n", s2)
```

```go
// `` 括起的字符串为Raw字符串，
// 即字符串在代码中的形式就是打印时的形式，
// 它没有字符转义，换行也将原样输出
m := `hello
  world`
```

```go
package main
import (
    "fmt"
    s "strings"
)
var p = fmt.Println
func main() {
    p("Contains:  ", s.Contains("test", "es"))
    p("Count:     ", s.Count("test", "t"))
    p("HasPrefix: ", s.HasPrefix("test", "te"))
    p("HasSuffix: ", s.HasSuffix("test", "st"))
    p("Index:     ", s.Index("test", "e"))
    p("Join:      ", s.Join([]string{"a", "b"}, "-"))
    p("Repeat:    ", s.Repeat("a", 5))
    p("Replace:   ", s.Replace("foo", "o", "0", -1))
    p("Replace:   ", s.Replace("foo", "o", "0", 1))
    p("Split:     ", s.Split("a-b-c-d-e", "-"))
    p("ToLower:   ", s.ToLower("TEST"))
    p("ToUpper:   ", s.ToUpper("test"))
    p("Len: ", len("hello"))
    p("Char:", "hello"[1])
}

// Contains:   true
// Count:      2
// HasPrefix:  true
// HasSuffix:  true
// Index:      1
// Join:       a-b
// Repeat:     aaaaa
// Replace:    f00
// Replace:    f0o
// Split:      [a b c d e]
// ToLower:    test
// ToUpper:    TEST
// Len:  5
// Char: 101
```
