```python
original_list = [1, 2, 3]
new_list = original_list[:]  # or original_list.copy()
original_list[2] = 4
# 1
# 2
# 3
for x in new_list:
    print(x)
```

```sh
>>> squares = [1, 4, 9, 16, 25]
>>> squares
[1, 4, 9, 16, 25]

# 列表也支持索引和切片:
>>> squares[0]  # indexing returns the item
1
>>> squares[-1]
25
>>> squares[-3:]  # slicing returns a new list
[9, 16, 25]

# 切片会返回列表的一个新的(浅)拷贝:
>>> squares[:]
[1, 4, 9, 16, 25]

# del语句
>>> a = [-1, 1, 66.25, 333, 333, 1234.5]
>>> del a[0]
>>> a
[1, 66.25, 333, 333, 1234.5]
>>> del a[2:4]
>>> a
[1, 66.25, 1234.5]
>>> del a[:]
>>> a
[]

# del 也可以被用来删除整个变量
>>> del a
```
