每个 `Go` 程序都是由包构成的。

程序从 `main` 包开始运行。

按照约定，包名与导入路径的最后一个元素一致。例如，`math/rand` 包中的源码均以 `package rand` 语句开始。

```go
package main

import (
	"fmt"
	"math/rand"
)

func main() {
	fmt.Println("My favorite number is", rand.Intn(10))
}
```

### 导入

可以编写多个导入语句。

不过使用分组导入语句是更好的形式。

```go
import "fmt"
import "math"
```

### 导出名

在 Go 中，如果一个名字以大写字母开头，那么它就是已导出的。

在导入一个包时，你只能引用其中已导出的名字。任何“未导出”的名字在该包外均无法访问。
