```python
# Fibonacci series:
# the sum of two elements defines the next
a, b = 0, 1
while a < 10:
    print(a)
    a, b = b, a+b

# 关键字参数 end 可以用来取消输出后面的换行, 或是用另外一个字符串来结尾:
a, b = 0, 1
while a < 1000:
    print(a, end=',')
    a, b = b, a+b
# 0,1,1,2,3,5,8,13,21,34,55,89,144,233,377,610,987,
```
