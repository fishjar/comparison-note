## 一个例子

```sh
example/
   |--calc.go
   |--calc_test.go
```

```go
// calc.go
package main

func Add(a int, b int) int {
    return a + b
}

func Mul(a int, b int) int {
    return a * b
}
```

```go
// calc_test.go
package main

import "testing"

func TestAdd(t *testing.T) {
	if ans := Add(1, 2); ans != 3 {
		t.Errorf("1 + 2 expected be 3, but %d got", ans)
	}

	if ans := Add(-10, -20); ans != -30 {
		t.Errorf("-10 + -20 expected be -30, but %d got", ans)
	}
}
```

```sh
# 执行所有测试用例
$ go test -v
=== RUN   TestAdd
--- PASS: TestAdd (0.00s)
=== RUN   TestMul
--- PASS: TestMul (0.00s)
PASS
ok      example 0.007s

# 只想运行其中的一个用例
$ go test -run TestAdd -v
=== RUN   TestAdd
--- PASS: TestAdd (0.00s)
PASS
ok      example 0.007s
```

## 单元测试

运行 `go testing` 会扫描并编译运行工程目录下 `xxx_test.go` 代码文件中的 `TestXxx` 测试函数。

- 测试代码文件名 `xxx_test.go`，必须遵守。
- 测试函数签名 `TestXxx(t *testing.T)`，必须遵守。

```sh
# 当前目录（某目录）查找 xxx_test.go 测试代码
go test .
go test ./xxx/xxx

# 当前目录（某目录）以及子目录下所的 xxx_test.go 测试代码
go test ./...
go test ./xxx/xxx/...

# -v 参数，打开终端信息打印的开关。
# 测试代码中的打印函数（t.Log、t.Skip、t.Error、t.Fatal）
# fmt.Print 只会在任一测试函数为 FAIL 时，信息才会显示。
go test . -v

# -run 用来指定执行某个 TestXXX 单元测试函数，支持使用正则表达式来匹配测试函数名称。
# 像 TestMain、init() 这类框架性代码仍然会被执行，以确保环境正确。
go test -run ^TestXxx$
```

```go
// youwu_test.go
// 其实 t.Error 等同于 t.Log + t.Fail，当只标记错误不打印信息时，使用t.Fail。
// 打印的函数 `t.Log`、`t.Error`、`t.Fatal` 都有对应的格式化形式 `t.Logf`、`t.Errorf`、`t.Fatalf`
package main_test

import (
    "fmt"
    "testing"
)
func TestWorld(t *testing.T) {
    t.Log("TestWorlds")
}

// 初始化 init 方式
func init() {
    fmt.Println("hello, i'm \"init\".")
}

// 使用 t 实例的 Cleanup 方法注册一个在单元测试程序退出前执行的函数。
// 包级别：使用 TestMain 模式。
func cleanuptest() {
    fmt.Println("Cleanup.😀")
}
func TestClean(t *testing.T) {
    t.Cleanup(cleanuptest)
    t.Log("testing done.")
}
```

```sh
...
=== RUN   TestReportError
    youwu_test.go:42: report in: t.Error
--- FAIL: TestReportError (0.00s)
...
exit status 1
FAIL    hellotest       0.498s
```

```go
// 跳出当前单元测试函数，状态为跳出（SKIP，不计为失败），执行下一个测试函数
t.SkipNow()

// .Log -> t.SkipNow 打印并跳出当前单元测试函数
t.Skip("信息")

// 标记当前单元测试函数状态为错误（FAILED），继续执行
t.Fail()

// 标记当前单元测试函数状态为错误（FAILED）并跳出，执行下一个测试函数
t.FailNow()

// t.Log(信息) -> t.Fail()，该单元测试会继续执行
t.Error("信息")

// t.Log(信息) -> t.FailNow()，跳出该单元测试，执行下一个单元测试函数
t.Fatal("信息")
```

## 子测试

```go
// calc_test.go
// t.Error/t.Errorf 遇错不停，还会继续执行其他的测试用例
// t.Fatal/t.Fatalf 遇错即停
func TestMul(t *testing.T) {
	t.Run("pos", func(t *testing.T) {
		if Mul(2, 3) != 6 {
			t.Fatal("fail")
		}

	})
	t.Run("neg", func(t *testing.T) {
		if Mul(2, -3) != -6 {
			t.Fatal("fail")
		}
	})
}
```

对于多个子测试的场景，更推荐如下的写法(table-driven tests)：
如果数据量较大，或是一些二进制数据，推荐使用相对路径从文件中读取。

```go
//  calc_test.go
func TestMul(t *testing.T) {
	cases := []struct {
		Name           string
		A, B, Expected int
	}{
		{"pos", 2, 3, 6},
		{"neg", 2, -3, -6},
		{"zero", 2, 0, 0},
	}

	for _, c := range cases {
		t.Run(c.Name, func(t *testing.T) {
			if ans := Mul(c.A, c.B); ans != c.Expected {
				t.Fatalf("%d * %d expected %d, but %d got",
					c.A, c.B, c.Expected, ans)
			}
		})
	}
}
```

## 帮助函数

Go 语言在 1.9 版本中引入了 `t.Helper()`，用于标注该函数是帮助函数，
报错时将输出帮助函数调用者的信息，而不是帮助函数的内部信息。

关于 helper 函数的 2 个建议：

- 不要返回错误， 帮助函数内部直接使用 t.Error 或 t.Fatal 即可，
- 调用 t.Helper() 让报错信息更准确，有助于定位。

```go
// calc_test.go
package main

import "testing"

type calcCase struct{ A, B, Expected int }

func createMulTestCase(t *testing.T, c *calcCase) {
	t.Helper()
	if ans := Mul(c.A, c.B); ans != c.Expected {
		t.Fatalf("%d * %d expected %d, but %d got",
			c.A, c.B, c.Expected, ans)
	}

}

func TestMul(t *testing.T) {
	createMulTestCase(t, &calcCase{2, 3, 6})
	createMulTestCase(t, &calcCase{2, -3, -6})
	createMulTestCase(t, &calcCase{2, 0, 1}) // wrong case
}
```

## TestMain 方式

`TestMain` 是 `go testing` 测试框架的指定函数。
用于控制整个测试过程，这个函数是包级别的。
即一个包下，如果有多个 `xxx_test.go` 测试代码，只能在其中某个 `xxx_test.go` 中定义。

```go
// youwu_test.go
package main_test

import (
    "fmt"
    "os"
    "testing"
)

func TestHello(t *testing.T) {
    t.Log("TestHello")
}

// func TestWorld(t *testing.T) {
//  t.Log("TestWorlds")
// }

func cleanuptest() {
    fmt.Println("Cleanup.😀")
}
func TestClean(t *testing.T) {
    t.Cleanup(cleanuptest)
    t.Log("testing done.")
}

func init() {
    fmt.Println("hello, i'm \"init\".")
}

func TestMain(m *testing.M) {
    // 在开始运行单元测试代码之前
    // 可以在此处添加环境初始化相关代码或者函数调用
    fmt.Println("😀 开始所有测试前")

    retCode := m.Run()

    // 在全部测试代码运行结束退出之前
    // 可以在此处添加清理代码或函数调用
    fmt.Println("😀 结束所有测试前")

    os.Exit(retCode)
}
```

```sh
~/Projects/go/examples/hellotest
➜  go test -v
hello, i'm "init".
😀 开始所有测试前
=== RUN   TestHello
    youwu_test.go:10: TestHello
--- PASS: TestHello (0.00s)
=== RUN   TestClean
    youwu_test.go:22: testing done.
Cleanup.😀
--- PASS: TestClean (0.00s)
PASS
😀 结束所有测试前
ok      hellotest       0.369s
```

## benckmark 性能基准测试

多次运行，并计算其平均执行时间从而评估其运行效率。
go 性能基准测试代码的函数命名：

- `func BenchmarkXxx(*testing.T)`

基准测试报告每一列值对应的含义如下：

```go
type BenchmarkResult struct {
    N         int           // 迭代次数
    T         time.Duration // 基准测试花费的时间
    Bytes     int64         // 一次迭代处理的字节数
    MemAllocs uint64        // 总的分配内存的次数
    MemBytes  uint64        // 总的分配内存的字节数
}
```

```go
// youwu_test.go
package main_test

import (
    "fmt"
    "math/rand"
    "os"
    "testing"
)

func TestHello(t *testing.T) {
    t.Log("TestHello")
}

func init() {
    fmt.Println("hello, i'm \"init\".")
}

func TestMain(m *testing.M) {
    // 在开始运行单元测试代码之前
    // 可以在此处添加环境初始化相关代码或者函数调用
    fmt.Println("😀 开始所有测试前")

    retCode := m.Run()

    // 在全部测试代码运行结束退出之前
    // 可以在此处添加清理代码或函数调用
    fmt.Println("😀 结束所有测试前")

    os.Exit(retCode)
}

func BenchmarkRandInt(b *testing.B) {
    for i := 0; i < b.N; i++ {
        rand.Int()
    }
}
```

```sh
~/Projects/go/examples/hellotest
➜  go test -bench='Rand' -v .
hello, i'm "init".
😀 开始所有测试前
=== RUN   TestHello
    youwu_test.go:19: TestHello
--- PASS: TestHello (0.00s)
goos: darwin
goarch: amd64
pkg: hellotest
cpu: Intel(R) Core(TM) i5-7500 CPU @ 3.40GHz
BenchmarkRandInt
BenchmarkRandInt-4      70186930                16.21 ns/op
PASS
😀 结束所有测试前
ok      hellotest       1.476s
```

可以使用 b.ResetTimer() 先重置定时器

```go
func BenchmarkHello(b *testing.B) {
    ... // 耗时操作
    b.ResetTimer()
    for i := 0; i < b.N; i++ {
        fmt.Sprintf("hello")
    }
}
```

使用 RunParallel 测试并发性能

```go
func BenchmarkParallel(b *testing.B) {
	templ := template.Must(template.New("test").Parse("Hello, {{.}}!"))
	b.RunParallel(func(pb *testing.PB) {
		var buf bytes.Buffer
		for pb.Next() {
			// 所有 goroutine 一起，循环一共执行 b.N 次
			buf.Reset()
			templ.Execute(&buf, "World")
		}
	})
}
```
