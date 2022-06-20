```python
# 2 is in the list
if 2 in [1, 2, 3]:
    print("2 is in the list")

# 2 is not in the list
if 2 not in [4, 5, 6]:
    print("2 is not in the list")


some_list = ["a", "b", "c", "d", "e"]
# 2
print(some_list.index("c"))
```

```sh
>>> squares = [1, 4, 9, 16, 25]
>>> squares
[1, 4, 9, 16, 25]

# 列表也支持索引和切片:
>>> squares[0]  # indexing returns the item
1

# insert ，remove 或者 sort 方法，只修改列表，没有打印出返回值
>>> fruits = ['orange', 'apple', 'pear', 'banana', 'kiwi', 'apple', 'banana']
>>> fruits.index('banana')
3
>>> fruits.index('banana', 4)  # Find next banana starting a position 4
6
```
