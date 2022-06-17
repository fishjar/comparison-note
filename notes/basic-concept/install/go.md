```sh
# 卸载旧版本
sudo rm -rf /usr/local/go

# 下载此压缩包并提取到 /usr/local 目录，在 /usr/local/go 中创建Go目录树。
# 该压缩包的名称可能不同，这取决于你安装的Go版本和你的操作系统以及处理器架构。
sudo tar -C /usr/local -xzf go$VERSION.$OS-$ARCH.tar.gz

# 要将 /usr/local/go/bin 添加到 PATH 环境变量，
# 你需要将此行添加到你的 /etc/profile（全系统安装）或 $HOME/.profile 文件中：
export PATH=$PATH:/usr/local/go/bin

# 安装到指定位置
# GOROOT 仅在安装到指定位置时才需要设置。
export GOROOT=$HOME/go
export PATH=$PATH:$GOROOT/bin

# 测试你的安装
# package main
# import "fmt"
# func main() {
#     fmt.Printf("hello, world\n")
# }
go run hello.go

# GOPATH 环境变量
# GOPATH 环境变量指定了你的工作空间位置。
# 注意，它绝对不能和你的Go安装目录相同。
mkdir $HOME/work
export GOPATH=$HOME/work
export PATH=$PATH:$GOPATH/bin
```
