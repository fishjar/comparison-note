```python
some_list = [1, 2, 3, 4]
# reversed(some_list) is just an iterable.
# To convert an iterable into a list, use list()
reversed_list = list(reversed(some_list))
# 4
# 3
# 2
# 1
for item in reversed_list:
    print(item)
# You can use an iterable instead of a list in a for loop
# for item in reversed(some_list):
```

```sh
# insert ，remove 或者 sort 方法，只修改列表，没有打印出返回值
>>> fruits = ['orange', 'apple', 'pear', 'banana', 'kiwi', 'apple', 'banana']
>>> fruits.reverse()
>>> fruits.sort()
```
