```go
/**
 * Definition for singly-linked list.
 * type ListNode struct {
 *     Val int
 *     Next *ListNode
 * }
 */
func removeNthFromEnd(head *ListNode, n int) *ListNode {
    r := head
    l := head
    i := 0
    for {
        r = r.Next
        if i > n {
            l = l.Next
        }
        if r == nil {
            if i == n-1 {
                return l.Next
            } else if n == 1 {
                l.Next = nil
            } else {
                l.Next = l.Next.Next
            }
            break
        }
        i++
    }
    return head
}
```
