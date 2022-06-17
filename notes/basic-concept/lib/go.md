每个源文件都是以包的声明语句开始，用来指明包的名字。
当包被导入的时候，包内的成员将通过类似 tempconv.CToF 的形式访问。
而包级别的名字，例如在一个文件声明的类型和常量，
在同一个包的其他源文件也是可以直接访问的，就好像所有代码都在一个文件一样。

Go 语言的代码通过包（package）组织，
包类似于其它语言里的库（libraries）或者模块（modules）。
一个包由位于单个目录下的一个或多个.go 源代码文件组成, 目录定义包的作用。
每个源文件都以一条 package 声明语句开始，这个例子里就是 package main,
表示该文件属于哪个包，紧跟着一系列导入（import）的包，之后是存储在这个文件里的程序语句。

在 Go 语言程序中，每个包都有一个全局唯一的导入路径。
一个导入路径代表一个目录中的一个或多个 Go 源文件。

Go 的标准库提供了 100 多个包，以支持常见功能，如输入、输出、排序以及文本处理。

main 包比较特殊。它定义了一个独立可执行的程序，而不是一个库。

此代码用圆括号组合了导入，这是“分组”形式的导入语句。
不过使用分组导入语句是更好的形式。

在 Go 中，如果一个名字以大写字母开头，那么它就是已导出的。
例如，Pizza 就是个已导出名，Pi 也同样，它导出自 math 包。
pizza 和 pi 并未以大写字母开头，所以它们是未导出的。
在导入一个包时，你只能引用其中已导出的名字。
任何“未导出”的名字在该包外均无法访问。

言外之意，

- 大写字母开头的变量会导出给其他包使用，
- 小写字母开头的变量为包内私有，不会导出

- Go 源文件中的第一个语句必须是 `package 名称`
- 这里的 名称 即为导入该包时使用的默认名称。 （一个包中的所有文件都必须使用相同的 名称。）
- Go 的约定是包名为导入路径的最后一个元素：作为 “crypto/rot13” 导入的包应命名为 rot13。
- 可执行命令必须使用 `package main`。
- 链接成单个二进制文件的所有包，其包名无需是唯一的，只有导入路径（它们的完整文件名） 才是唯一的。

在 `src/pkg/encoding/base64` 中的包应作为 `encoding/base64` 导入，

```go
import (
  "fmt"
  "math"
)
// 等同于
import "fmt"
import "math"

// 别名操作
import(
  f "fmt"
)

// math包内的Pi即为导出的
func main() {
  fmt.Println(math.Pi)
}
```

```sh
# 若你在包的导入路径中包含了代码仓库的URL，go get 就会自动地获取、 构建并安装它：
$ go get github.com/golang/example/hello
$ $GOPATH/bin/hello
Hello, Go examples!

# 在执行完上面的go get 命令后，工作空间的目录树看起来应该是这样的：
bin/
    hello                           # command executable
src/
    github.com/golang/example/
        .git/                       # Git repository metadata
        hello/
            hello.go                # command source
        stringutil/
            reverse.go              # package source
            reverse_test.go         # test source
    github.com/user/
        hello/
            hello.go                # command source
        stringutil/
            reverse.go              # package source
            reverse_test.go         # test source
```
