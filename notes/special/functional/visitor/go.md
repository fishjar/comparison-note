## 一个简单示例

```go
package main

import (
	"encoding/json"
	"encoding/xml"
	"fmt"
)

// 定义一个 visitor 函数，参数是一个接口类型
type Visitor func(shape Shape)

// 接口包含一个accept方法，参数是 visitor 函数
// Shape 方法的的参数 的参数是自己
type Shape interface {
	accept(Visitor)
}

// 定义一个结构体
type Circle struct {
	Radius int
}

// 把结构体自己当作参数，传给参数函数的参数
func (c Circle) accept(v Visitor) {
	v(c)
}

// // 定义另一个结构体
type Rectangle struct {
	Width, Heigh int
}

func (r Rectangle) accept(v Visitor) {
	v(r)
}

// 实现一个visitor函数
func JsonVisitor(shape Shape) {
	bytes, err := json.Marshal(shape)
	if err != nil {
		panic(err)
	}
	fmt.Println(string(bytes))
}

// 实现另一个visitor函数
func XmlVisitor(shape Shape) {
	bytes, err := xml.Marshal(shape)
	if err != nil {
		panic(err)
	}
	fmt.Println(string(bytes))
}

func main() {
	c := Circle{10}
	r := Rectangle{100, 200}
	shapes := []Shape{c, r}

	for _, s := range shapes {
		s.accept(JsonVisitor)
		s.accept(XmlVisitor)
	}
}
```

```sh
{"Radius":10}
<Circle><Radius>10</Radius></Circle>
{"Width":100,"Heigh":200}
<Rectangle><Width>100</Width><Heigh>200</Heigh></Rectangle>
```
