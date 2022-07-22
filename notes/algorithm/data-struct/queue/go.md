```go
// 这里类型约束使用了空接口，代表的意思是所有类型都可以用来实例化泛型类型 Queue[T]
type Queue[T interface{}] struct {
    elements []T
}

// 将数据放入队列尾部
func (q *Queue[T]) Put(value T) {
    q.elements = append(q.elements, value)
}

// 从队列头部取出并从头部删除对应数据
func (q *Queue[T]) Pop() (T, bool) {
    var value T
    if len(q.elements) == 0 {
        return value, true
    }

    value = q.elements[0]
    q.elements = q.elements[1:]
    return value, len(q.elements) == 0
}

// 队列大小
func (q Queue[T]) Size() int {
    return len(q.elements)
}

var q1 Queue[int]  // 可存放int类型数据的队列
q1.Put(1)
q1.Put(2)
q1.Put(3)
q1.Pop() // 1
q1.Pop() // 2
q1.Pop() // 3

var q2 Queue[string]  // 可存放string类型数据的队列
q2.Put("A")
q2.Put("B")
q2.Put("C")
q2.Pop() // "A"
q2.Pop() // "B"
q2.Pop() // "C"

var q3 Queue[struct{Name string}]
var q4 Queue[[]int] // 可存放[]int切片的队列
var q5 Queue[chan int] // 可存放int通道的队列
var q6 Queue[io.Reader] // 可存放接口的队列
// ......
```
