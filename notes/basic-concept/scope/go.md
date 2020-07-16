```go
var cwd string

func init() {
    var err error
    // cwd, err := os.Getwd() // NOTE: wrong!
    cwd, err = os.Getwd()
    if err != nil {
        log.Fatalf("os.Getwd failed: %v", err)
    }
}
```
