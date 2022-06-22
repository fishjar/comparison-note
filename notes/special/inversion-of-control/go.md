不好的实现：

```go
// 一个存放整数的数据结构
// Add() 、Delete() 和 Contains() 三个操作，
// 前两个是写操作，后一个是读操作
type IntSet struct {
    data map[int]bool
}
func NewIntSet() IntSet {
    return IntSet{make(map[int]bool)}
}
func (set *IntSet) Add(x int) {
    set.data[x] = true
}
func (set *IntSet) Delete(x int) {
    delete(set.data, x)
}
func (set *IntSet) Contains(x int) bool {
    return set.data[x]
}

// 实现Undo功能
// 嵌套数据结构，并增加一个undo的函数列表
// 缺点是数据结构和undo的控制逻辑耦合在一起了
// 因为 Undo 是属于嵌套数据结构 UndoableIntSet 的方法
type UndoableIntSet struct { // Poor style
    IntSet    // Embedding (delegation)
    functions []func()
}
func NewUndoableIntSet() UndoableIntSet {
    return UndoableIntSet{NewIntSet(), nil}
}
func (set *UndoableIntSet) Add(x int) { // Override
    if !set.Contains(x) {
        set.data[x] = true
        set.functions = append(set.functions, func() { set.Delete(x) })
    } else {
        set.functions = append(set.functions, nil)
    }
}
func (set *UndoableIntSet) Delete(x int) { // Override
    if set.Contains(x) {
        delete(set.data, x)
        set.functions = append(set.functions, func() { set.Add(x) })
    } else {
        set.functions = append(set.functions, nil)
    }
}
func (set *UndoableIntSet) Undo() error {
    if len(set.functions) == 0 {
        return errors.New("No functions to undo")
    }
    index := len(set.functions) - 1
    if function := set.functions[index]; function != nil {
        function()
        set.functions[index] = nil // For garbage collection
    }
    set.functions = set.functions[:index]
    return nil
}
```

更好的实现：

```go
// 增加函数列表类型，解藕undo
type Undo []func()
func (undo *Undo) Add(function func()) {
  *undo = append(*undo, function)
}
func (undo *Undo) Undo() error {
  functions := *undo
  if len(functions) == 0 {
    return errors.New("No functions to undo")
  }
  index := len(functions) - 1
  if function := functions[index]; function != nil {
    function()
    functions[index] = nil // For garbage collection
  }
  *undo = functions[:index]
  return nil
}

// 数据结构增加 Undo 字段
// 通过调用该字段的方法来实现控制功能
type IntSet struct {
    data map[int]bool
    undo Undo
}
 func NewIntSet() IntSet {
    return IntSet{data: make(map[int]bool)}
}
func (set *IntSet) Undo() error {
    return set.undo.Undo()
}
func (set *IntSet) Contains(x int) bool {
    return set.data[x]
}
func (set *IntSet) Add(x int) {
    if !set.Contains(x) {
        set.data[x] = true
        set.undo.Add(func() { set.Delete(x) })
    } else {
        set.undo.Add(nil)
    }
}
func (set *IntSet) Delete(x int) {
    if set.Contains(x) {
        delete(set.data, x)
        set.undo.Add(func() { set.Add(x) })
    } else {
        set.undo.Add(nil)
    }
}
```
