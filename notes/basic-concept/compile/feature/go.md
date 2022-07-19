`debug.go`

```go
// +build debug
package main
const debug = true
```

`release.go`

```go
// +build !debug
package main
const debug = false
```

`main.go`

```go
package main
import "log"
func main() {
	if debug {
		log.Println("debug mode is enabled")
	}
}
```

- `// +build debug` 表示 `build tags` 中包含 `debug` 时，该源文件参与编译。
- `// +build !debug` 表示 `build tags` 中不包含 `debug` 时，该源文件参与编译。

例如下面的写法表示：此源文件只能在 `linux/386` 或者 `darwin/386` 平台下编译。

```go
// +build linux darwin
// +build 386
```

```sh
# 编译一个 debug 版本
go build -tags debug -o debug .
# 编译 release 版本
go build -o release .
```
