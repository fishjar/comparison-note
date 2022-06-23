```go
package main

import (
	"bytes"
	"fmt"
	"math/rand"
	"strings"
	"testing"
)

const letterBytes = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ"

func randomString(n int) string {
	b := make([]byte, n)
	for i := range b {
		b[i] = letterBytes[rand.Intn(len(letterBytes))]
	}
	return string(b)
}

// 使用 + 号
func plusConcat(n int, str string) string {
	s := ""
	for i := 0; i < n; i++ {
		s += str
	}
	return s
}

// 使用 fmt.Sprintf
func sprintfConcat(n int, str string) string {
	s := ""
	for i := 0; i < n; i++ {
		s = fmt.Sprintf("%s%s", s, str)
	}
	return s
}

// 使用 strings.Builder
func builderConcat(n int, str string) string {
	var builder strings.Builder
	for i := 0; i < n; i++ {
		builder.WriteString(str)
	}
	return builder.String()
}

// 最优方式
// 使用 strings.Builder，预分配内存的方式 Grow
func preBuilderConcat(n int, str string) string {
	var builder strings.Builder
	builder.Grow(n * len(str))
	for i := 0; i < n; i++ {
		builder.WriteString(str)
	}
	return builder.String()
}

// 使用 bytes.Buffer
func bufferConcat(n int, s string) string {
	buf := new(bytes.Buffer)
	for i := 0; i < n; i++ {
		buf.WriteString(s)
	}
	return buf.String()
}

// 使用 []byte
func byteConcat(n int, str string) string {
	buf := make([]byte, 0)
	for i := 0; i < n; i++ {
		buf = append(buf, str...)
	}
	return string(buf)
}

// 使用 []byte，预分配切片的容量(cap)
func preByteConcat(n int, str string) string {
	buf := make([]byte, 0, n*len(str))
	for i := 0; i < n; i++ {
		buf = append(buf, str...)
	}
	return string(buf)
}

func benchmark(b *testing.B, f func(int, string) string) {
	var str = randomString(10)
	for i := 0; i < b.N; i++ {
		f(10000, str)
	}
}

func BenchmarkPlusConcat(b *testing.B)       { benchmark(b, plusConcat) }
func BenchmarkSprintfConcat(b *testing.B)    { benchmark(b, sprintfConcat) }
func BenchmarkBuilderConcat(b *testing.B)    { benchmark(b, builderConcat) }
func BenchmarkPreBuilderConcat(b *testing.B) { benchmark(b, preBuilderConcat) }
func BenchmarkBufferConcat(b *testing.B)     { benchmark(b, bufferConcat) }
func BenchmarkByteConcat(b *testing.B)       { benchmark(b, byteConcat) }
func BenchmarkPreByteConcat(b *testing.B)    { benchmark(b, preByteConcat) }
```

```sh
go test -bench="Concat$" -benchmem .
goos: linux
goarch: amd64
pkg: demo
cpu: AMD Ryzen 5 3500X 6-Core Processor             
BenchmarkPlusConcat-6                 25          50676691 ns/op        530997136 B/op     10016 allocs/op
BenchmarkSprintfConcat-6              12          95763922 ns/op        833576833 B/op     37388 allocs/op
BenchmarkBuilderConcat-6            9614            107031 ns/op          514801 B/op         23 allocs/op
BenchmarkPreBuilderConcat-6        21030             56843 ns/op          106496 B/op          1 allocs/op
BenchmarkBufferConcat-6             9000            129491 ns/op          423536 B/op         13 allocs/op
BenchmarkByteConcat-6              11332            106953 ns/op          621298 B/op         24 allocs/op
BenchmarkPreByteConcat-6           19999             58401 ns/op          212992 B/op          2 allocs/op
PASS
ok      demo    10.523s
```
