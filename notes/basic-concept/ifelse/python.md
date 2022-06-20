```python
# 一个 if ... elif ... elif ... 序列
# 可以看作是其他语言中的 switch 或 case 语句的替代
x = int(input("Please enter an integer: "))

if x < 0:
    x = 0
    print('Negative changed to zero')
elif x == 0:
    print('Zero')
elif x == 1:
    print('Single')
else:
    print('More')
```
