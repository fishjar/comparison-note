Go 代码必须放在工作空间内。它其实就是一个目录，其中包含三个子目录：

- src 目录包含 Go 的源文件，它们被组织成包（每个目录都对应一个包），
- pkg 目录包含包对象，
- bin 目录包含可执行命令。

go 工具用于构建源码包，并将其生成的二进制文件安装到 pkg 和 bin 目录中。
src 子目录通常包会含多种版本控制的代码仓库（例如 Git 或 Mercurial）， 以此来跟踪一个或多个源码包的开发。

```sh
# 此工作空间包含三个代码库（goauth2、streak 和 todo），
# 两个命令（streak 和 todo） 以及两个库（oauth 和 task）。
bin/
  streak                         # 可执行命令
  todo                           # 可执行命令
pkg/
  linux_amd64/
    code.google.com/p/goauth2/
      oauth.a                # 包对象
    github.com/nf/todo/
      task.a                 # 包对象
src/
  code.google.com/p/goauth2/
    .hg/                       # mercurial 代码库元数据
    oauth/
      oauth.go               # 包源码
      oauth_test.go          # 测试源码
  github.com/nf/
    streak/
      .git/                      # git 代码库元数据
      oauth.go               # 命令源码
      streak.go              # 命令源码
    todo/
      .git/                      # git 代码库元数据
      task/
        task.go            # 包源码
      todo.go                # 命令源码
```

```go
// hello.go
package main
import (
  "fmt"
  "github.com/user/stringutil"
)
func main() {
  fmt.Printf(stringutil.Reverse("!oG ,olleH"))
}

// reverse.go
// stringutil 包含有用于处理字符串的工具函数。
package stringutil
// Reverse 将其实参字符串以符文为单位左右反转。
func Reverse(s string) string {
  r := []rune(s)
  for i, j := 0, len(r)-1; i < len(r)/2; i, j = i+1, j-1 {
    r[i], r[j] = r[j], r[i]
  }
  return string(r)
}
```

```sh
# 你的第一个程序
bin/
  hello                 # 可执行命令
pkg/
  linux_amd64/          # 这里会反映出你的操作系统和架构
    github.com/user/
      stringutil.a  # 包对象
src/
  github.com/user/
    hello/
      hello.go      # 命令源码
    stringutil/
      reverse.go       # 包源码


# 创建目录
mkdir $GOPATH/src/github.com/user/hello

# 用 go build 命令来测试该包
# 它会将包的对象放到工作空间的 pkg 目录中
# 这不会产生输出文件。想要输出的话，必须使用 go install 命令
go build github.com/user/stringutil
# 若你在该包的源码目录中，只需执行
go build

# 用 go 工具构建并安装此程序
# 此命令会构建 hello 命令，产生一个可执行的二进制文件。
# 接着它会将该二进制文件作为 hello（在 Windows 下则为 hello.exe）安装到工作空间的 bin 目录中。
# go 工具只有在发生错误时才会打印输出
go install github.com/user/hello
# 或者
cd $GOPATH/src/github.com/user/hello
go install

# 现在，你可以在命令行下输入它的完整路径来运行它了：
$GOPATH/bin/hello
# 若你已经将 $GOPATH/bin 添加到 PATH 中了
hello
```

```sh
bin/
    hello                          # command executable
    outyet                         # command executable
src/
    github.com/golang/example/
        .git/                      # Git repository metadata
  hello/
      hello.go               # command source
  outyet/
      main.go                # command source
      main_test.go           # test source
  stringutil/
      reverse.go             # package source
      reverse_test.go        # test source
    golang.org/x/image/
        .git/                      # Git repository metadata
  bmp/
      reader.go              # package source
      writer.go              # package source
    ... (many more repositories and packages omitted) ...
```
