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

## kubectl 的实现方法

```go
package main

import (
	"fmt"
)

// 定义一个函数
type VisitorFunc func(*Info, error) error

// 定义一个接口
type Visitor interface {
	Visit(VisitorFunc) error
}

// 定义一个结构体
type Info struct {
	Namespace   string
	Name        string
	OtherThings string
}

// 实现接口
func (info *Info) Visit(fn VisitorFunc) error {
	fmt.Println("Info Visit()")
	return fn(info, nil)
}

// 嵌入 visitor 字段
type NameVisitor struct {
	visitor Visitor
}

// 实现接口
func (v NameVisitor) Visit(fn VisitorFunc) error {
	fmt.Println("NameVisitor Visit()")
	// 调用嵌入字段的同名函数
	// 相当于调用套娃里面的同名函数
	return v.visitor.Visit(func(info *Info, err error) error {
		fmt.Println("NameVisitor() before call function")
		err = fn(info, err) // 这里调用上层套娃函数
		if err == nil {
			fmt.Printf("==> Name=%s, NameSpace=%s\n", info.Name, info.Namespace)
		}
		fmt.Println("NameVisitor() after call function")
		return err
	})
}

type OtherThingsVisitor struct {
	visitor Visitor
}

func (v OtherThingsVisitor) Visit(fn VisitorFunc) error {
	fmt.Println("OtherThingsVisitor Visit()")
	return v.visitor.Visit(func(info *Info, err error) error {
		fmt.Println("OtherThingsVisitor() before call function")
		err = fn(info, err)
		if err == nil {
			fmt.Printf("==> OtherThings=%s\n", info.OtherThings)
		}
		fmt.Println("OtherThingsVisitor() after call function")
		return err
	})
}

type LogVisitor struct {
	visitor Visitor
}

func (v LogVisitor) Visit(fn VisitorFunc) error {
	fmt.Println("LogVisitor Visit()")
	return v.visitor.Visit(func(info *Info, err error) error {
		fmt.Println("LogVisitor() before call function")
		err = fn(info, err)
		fmt.Println("LogVisitor() after call function")
		return err
	})
}

func main() {
	info := Info{}
	var v Visitor = &info
	// v 结构体做了三次套娃
	v = LogVisitor{v}
	v = NameVisitor{v}
	v = OtherThingsVisitor{v}

	loadFile := func(info *Info, err error) error {
		fmt.Println("loadFile()")
		info.Name = "Hao Chen"
		info.Namespace = "MegaEase"
		info.OtherThings = "We are running as remote team."
		return nil
	}
	v.Visit(loadFile)
}
```

## visitor 修饰器

```go
package main

import (
	"fmt"
)

type VisitorFunc func(*Info, error) error

type Visitor interface {
	Visit(VisitorFunc) error
}

type Info struct {
	Namespace   string
	Name        string
	OtherThings string
}

func (info *Info) Visit(fn VisitorFunc) error {
	fmt.Println("Info Visit()")
	return fn(info, nil)
}

func NameVisitor(info *Info, err error) error {
	fmt.Println("NameVisitor() before call function")
	fmt.Printf("==> Name=%s, NameSpace=%s\n", info.Name, info.Namespace)
	return err
}

func OtherVisitor(info *Info, err error) error {
	fmt.Println("OtherThingsVisitor() before call function")
	return err
}

type DecoratedVisitor struct {
	visitor    Visitor
	decorators []VisitorFunc
}

func NewDecoratedVisitor(v Visitor, fn ...VisitorFunc) Visitor {
	if len(fn) == 0 {
		return v
	}
	return DecoratedVisitor{v, fn}
}

func (v DecoratedVisitor) Visit(fn VisitorFunc) error {
	fmt.Println("DecoratedVisitor Visit()")
	return v.visitor.Visit(func(info *Info, err error) error {
		fmt.Println("DecoratedVisitor v.visitor.Visit()")
		if err != nil {
			return err
		}
		if err := fn(info, nil); err != nil {
			return err
		}
		for i := range v.decorators {
			if err := v.decorators[i](info, nil); err != nil {
				return err
			}
		}
		return nil
	})
}

func main() {
	info := Info{}
	var v Visitor = &info
	v = NewDecoratedVisitor(v, NameVisitor, OtherVisitor)

	loadFile := func(info *Info, err error) error {
		fmt.Println("loadFile()")
		info.Name = "Hao Chen"
		info.Namespace = "MegaEase"
		info.OtherThings = "We are running as remote team."
		return nil
	}

	v.Visit(loadFile)
}
```
