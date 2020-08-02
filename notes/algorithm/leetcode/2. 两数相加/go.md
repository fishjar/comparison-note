```go
/**
 * Definition for singly-linked list.
 * type ListNode struct {
 *     Val int
 *     Next *ListNode
 * }
 */
func addTwoNumbers(l1 *ListNode, l2 *ListNode) *ListNode {
    l := new(ListNode)  // 创建一个链表
    c := l              // 当前指针
    x := 0
    for l1 != nil || l2 != nil || x != 0 {
        if l1 != nil {
            x += l1.Val
            l1 = l1.Next
        }
        if l2 != nil {
            x += l2.Val
            l2 = l2.Next
        }
        c.Next = new(ListNode)  // 添加一个节点
        c = c.Next              // 移动当前指针
        c.Val =  x % 10         // 改变当前的值
        x = x / 10              // 计算进制数
    }
    return l.Next
}
```

```go
/**
 * Definition for singly-linked list.
 * type ListNode struct {
 *     Val int
 *     Next *ListNode
 * }
 */
func addTwoNumbers(l1 *ListNode, l2 *ListNode) *ListNode {
    l := new(ListNode)
    c := l
    x := 0
    for l1 != nil || l2 != nil || x != 0 {
        c.Next = new(ListNode)
        c = c.Next
        if l1 != nil && l2 != nil {
            x = x + l1.Val + l2.Val
            l1 = l1.Next
            l2 = l2.Next
        } else if l1 != nil {
            x += l1.Val
            if x < 10 && l1.Next != nil {
                c.Next = l1.Next
                l1 = nil
            } else {
                l1 = l1.Next
            }
        } else if l2 != nil {
            x += l2.Val
            if x < 10 && l2.Next != nil {
                c.Next = l2.Next
                l2 = nil
            } else {
                l2 = l2.Next
            }
        }
        c.Val =  x % 10
        x = x / 10
    }
    return l.Next
}
```

```go
/**
 * Definition for singly-linked list.
 * type ListNode struct {
 *     Val int
 *     Next *ListNode
 * }
 */
func addTwoNumbers(l1 *ListNode, l2 *ListNode) *ListNode {
    l := l1
    c := l1
    x := 0
    for l1 != nil || l2 != nil || x != 0 {
        if l1 != nil {
            x += l1.Val
            l1 = l1.Next
        }
        if l2 != nil {
            x += l2.Val
            l2 = l2.Next
        }
        c.Val =  x % 10
        x = x / 10

        if l1 != nil {
            c.Next = l1
            c = c.Next
        } else if l2 != nil {
            c.Next = l2
            c = c.Next
        } else if x > 0 {
            c.Next = new(ListNode)
            c = c.Next
        }
    }
    return l
}
```

```go
/**
 * Definition for singly-linked list.
 * type ListNode struct {
 *     Val int
 *     Next *ListNode
 * }
 */
func addTwoNumbers(l1 *ListNode, l2 *ListNode) *ListNode {
    l := l1
    c := l1
    x := 0
    for l1 != nil || l2 != nil || x != 0 {
        if l1 != nil {
            x += l1.Val
            l1 = l1.Next
        }
        if l2 != nil {
            x += l2.Val
            l2 = l2.Next
        }
        c.Val =  x % 10
        x = x / 10

        if l1 != nil {
            c = c.Next
            if l2 == nil && x == 0 {
                l1 = nil
            }
        } else if l2 != nil {
            c.Next = l2
            c = c.Next
            if x == 0 {
                l2 = nil
            }
        } else if x > 0 {
            c.Next = new(ListNode)
            c = c.Next
        }
    }
    return l
}
```
