## CGO 基础

要使用 CGO 特性，需要安装 C/C++ 构建工具链，
在 macOS 和 Linux 下是要安装 GCC，
在 windows 下是需要安装 MinGW 工具。

同时需要保证环境变量 `CGO_ENABLED` 被设置为 1，这表示 CGO 是被启用的状态。
在本地构建时 `CGO_ENABLED` 默认是启用的，当交叉构建时 CGO 默认是禁止的。

比如要交叉构建 ARM 环境运行的 Go 程序，
需要手工设置好 C/C++ 交叉构建的工具链，
同时开启 `CGO_ENABLED` 环境变量。
然后通过 `import "C"` 语句启用 CGO 特性。

## CGO 示例

基于 C 标准库函数输出字符串

```go
// hello.go
package main

//#include <stdio.h>
import "C"

func main() {
    C.puts(C.CString("Hello, World\n"))
}
```

使用自己的 C 函数

```go
// hello.go
package main

/*
#include <stdio.h>

static void SayHello(const char* s) {
    puts(s);
}
*/
import "C"

func main() {
    C.SayHello(C.CString("Hello, World\n"))
}
```

将 `SayHello` 函数放到当前目录下的一个 `C` 语言源文件中（后缀名必须是 `.c`）

注意，如果之前运行的命令是 `go run hello.go` 或 `go build hello.go` 的话，
此处须使用 `go run "your/package"` 或 `go build "your/package"` 才可以。
若本就在包路径下的话，也可以直接运行 `go run .` 或 `go build`

```c++
// hello.c

#include <stdio.h>

void SayHello(const char* s) {
    puts(s);
}
```

```go
// hello.go
package main

//void SayHello(const char* s);
import "C"

func main() {
    C.SayHello(C.CString("Hello, World\n"))
}
```

## C 代码的模块化

```c++
// hello.h
void SayHello(const char* s);
```

```c++
// hello.c

#include "hello.h"
#include <stdio.h>

void SayHello(const char* s) {
    puts(s);
}
```

## 用 Go 重新实现 C 函数

```c++
// hello.h
void SayHello(/*const*/ char* s);
```

通过 `CGO` 的 `//export SayHello` 指令将 Go 语言实现的函数 `SayHello` 导出为 C 语言函数。

```go
// hello.go
package main

import "C"

import "fmt"

//export SayHello
func SayHello(s *C.char) {
    fmt.Print(C.GoString(s))
}
```

## 面向 C 接口的 Go 编程

几个文件重新合并到一个 Go 文件

```go
package main

//void SayHello(char* s);
import "C"

import (
    "fmt"
)

func main() {
    C.SayHello(C.CString("Hello, World\n"))
}

//export SayHello
func SayHello(s *C.char) {
    fmt.Print(C.GoString(s))
}
```

Go1.10 中 CGO 新增加了一个 `_GoString_` 预定义的 C 语言类型，用来表示 Go 语言字符串

```go
// +build go1.10

package main

//void SayHello(_GoString_ s);
import "C"

import (
    "fmt"
)

func main() {
    C.SayHello("Hello, World\n")
}

//export SayHello
func SayHello(s string) {
    fmt.Print(s)
}
```

虽然看起来全部是 Go 语言代码，
但是执行的时候是先从 Go 语言的 `main` 函数，
到 CGO 自动生成的 C 语言版本 `SayHello` 桥接函数，
最后又回到了 Go 语言环境的 `SayHello` 函数。

## `#cgo` 语句

在 `import "C"` 语句前的注释中可以通过 `#cgo` 语句设置编译阶段和链接阶段的相关参数。

```go
// #cgo CFLAGS: -DPNG_DEBUG=1 -I./include
// #cgo LDFLAGS: -L/usr/local/lib -lpng
// #include <png.h>
import "C"
```

CFLAGS 部分，
`-D` 部分定义了宏 PNG_DEBUG，值为 1；
`-I` 定义了头文件包含的检索目录。

LDFLAGS 部分，
`-L` 指定了链接时库文件检索目录，
`-l` 指定了链接时需要链接 png 库。

因为 C/C++ 遗留的问题，
C 头文件检索目录可以是相对目录，
但是库文件检索目录则需要绝对路径。
在库文件的检索目录中可以通过 `${SRCDIR}` 变量表示当前包目录的绝对路径：

```go
// #cgo LDFLAGS: -L${SRCDIR}/libs -lfoo
```

展开后

```go
// #cgo LDFLAGS: -L/go/src/foo/libs -lfoo
```

条件编译选项

```go
// #cgo windows CFLAGS: -DX86=1
// #cgo !windows LDFLAGS: -lm
```

```go
package main

/*
#cgo windows CFLAGS: -DCGO_OS_WINDOWS=1
#cgo darwin CFLAGS: -DCGO_OS_DARWIN=1
#cgo linux CFLAGS: -DCGO_OS_LINUX=1

#if defined(CGO_OS_WINDOWS)
    const char* os = "windows";
#elif defined(CGO_OS_DARWIN)
    const char* os = "darwin";
#elif defined(CGO_OS_LINUX)
    const char* os = "linux";
#else
#	error(unknown os)
#endif
*/
import "C"

func main() {
    print(C.GoString(C.os))
}
```

## build tag 条件编译

下面的源文件只有在设置 `debug` 构建标志时才会被构建

```go
// +build debug

package main

var buildMode = "debug"
```

```sh
go build -tags="debug"
go build -tags="windows debug"
```

`linux,386` 中 `linux` 和 `386` 用逗号链接表示 AND 的意思；
而 `linux,386` 和 `darwin,!cgo` 之间通过空白分割来表示 OR 的意思。

```go
// +build linux,386 darwin,!cgo
```
