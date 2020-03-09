```go
// helloword.1.go
package main
import "fmt"
func main() {
  fmt.Println("Hello, world")
}
```

```go
// helloword.2.go
package main
import (
  "fmt"
  "time"
)
func main() {
  fmt.Println("Welcome to the playground!")
  fmt.Println("The time is", time.Now())
}
```

```sh
go run helloword.go
```
