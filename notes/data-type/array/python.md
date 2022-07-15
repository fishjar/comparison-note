```python
some_list = ["a", "b", "c"]
# a,b,c
print(",".join(some_list))

some_list = [6, 3, 5]
print(len(some_list))
# 6
# 3
# 5
for item in some_list:
    print(item)

# 2 is in the list
if 2 in [1, 2, 3]:
    print("2 is in the list")

# 2 is not in the list
if 2 not in [4, 5, 6]:
    print("2 is not in the list")

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


some_list = [1]
some_list.extend([2, 3])

# 1
# 2
# 3
for x in some_list:
    print(x)


original_list = [1]
new_list = original_list + [2, 3]
original_list[0] = 5
# 1
# 2
# 3
for x in new_list:
    print(x)


some_list = [4, 5]
some_list.insert(0, 3)
# 3
# 4
# 5
for x in some_list:
    print(x)


some_list = ["a", "b", "c"]
del some_list[1]
# a
# c
for x in some_list:
    print(x)


some_list = [1, 2, 3, 4]
# 4
print(some_list.pop())
# 1
print(some_list.pop(0))
# 2
# 3
for x in some_list:
    print(x)


some_list = ["a", "b", "c", "d", "e"]
# 2
print(some_list.index("c"))


original_list = [1, 2, 3]
new_list = original_list[:]  # or original_list.copy()
original_list[2] = 4
# 1
# 2
# 3
for x in new_list:
    print(x)


some_list = [1, 2, 3]
# 6
print(sum(some_list))
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

# 列表同样支持拼接操作:
>>> squares + [36, 49, 64, 81, 100]
[1, 4, 9, 16, 25, 36, 49, 64, 81, 100]

# 与 immutable 的字符串不同, 列表是一个 mutable 类型，
# 就是说，它自己的内容可以改变:
>>> cubes = [1, 8, 27, 65, 125]  # something's wrong here
>>> 4 ** 3  # the cube of 4 is 64, not 65!
64
>>> cubes[3] = 64  # replace the wrong value
>>> cubes
[1, 8, 27, 64, 125]

# 通过 append() 方法 添加新元素
>>> cubes.append(216)  # add the cube of 6
>>> cubes.append(7 ** 3)  # and the cube of 7
>>> cubes
[1, 8, 27, 64, 125, 216, 343]

# 给切片赋值也是可以的，这样甚至可以改变列表大小，或者把列表整个清空:
>>> letters = ['a', 'b', 'c', 'd', 'e', 'f', 'g']
>>> letters
['a', 'b', 'c', 'd', 'e', 'f', 'g']
>>> # replace some values
>>> letters[2:5] = ['C', 'D', 'E']
>>> letters
['a', 'b', 'C', 'D', 'E', 'f', 'g']
>>> # now remove them
>>> letters[2:5] = []
>>> letters
['a', 'b', 'f', 'g']
>>> # clear the list by replacing all the elements with an empty list
>>> letters[:] = []
>>> letters
[]

# 内置函数 len() 也可以作用到列表上:
>>> letters = ['a', 'b', 'c', 'd']
>>> len(letters)
4

# 也可以嵌套列表 (创建包含其他列表的列表), 比如说:
>>> a = ['a', 'b', 'c']
>>> n = [1, 2, 3]
>>> x = [a, n]
>>> x
[['a', 'b', 'c'], [1, 2, 3]]
>>> x[0]
['a', 'b', 'c']
>>> x[0][1]
'b'
```

```sh
# insert ，remove 或者 sort 方法，只修改列表，没有打印出返回值
>>> fruits = ['orange', 'apple', 'pear', 'banana', 'kiwi', 'apple', 'banana']
>>> fruits.count('apple')
2
>>> fruits.count('tangerine')
0
>>> fruits.index('banana')
3
>>> fruits.index('banana', 4)  # Find next banana starting a position 4
6
>>> fruits.reverse()
>>> fruits
['banana', 'apple', 'kiwi', 'banana', 'pear', 'apple', 'orange']
>>> fruits.append('grape')
>>> fruits
['banana', 'apple', 'kiwi', 'banana', 'pear', 'apple', 'orange', 'grape']
>>> fruits.sort()
>>> fruits
['apple', 'apple', 'banana', 'banana', 'grape', 'kiwi', 'orange', 'pear']
>>> fruits.pop()
'pear'

# 列表作为栈使用
>>> stack = [3, 4, 5]
>>> stack.append(6)
>>> stack.append(7)
>>> stack
[3, 4, 5, 6, 7]
>>> stack.pop()
7
>>> stack
[3, 4, 5, 6]
>>> stack.pop()
6
>>> stack.pop()
5
>>> stack
[3, 4]

# 列表作为队列使用
>>> from collections import deque
>>> queue = deque(["Eric", "John", "Michael"])
>>> queue.append("Terry")           # Terry arrives
>>> queue.append("Graham")          # Graham arrives
>>> queue.popleft()                 # The first to arrive now leaves
'Eric'
>>> queue.popleft()                 # The second to arrive now leaves
'John'
>>> queue                           # Remaining queue in order of arrival
deque(['Michael', 'Terry', 'Graham'])

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

## 列表推导式

```python
original_list = [1, 2, 3]
new_list = [x * 2 for x in original_list]
# 2
# 4
# 6
for x in new_list:
    print(x)


first_list = [1, 3]
second_list = [3, 4]
combined_list = [[x + y for y in second_list] for x in first_list]
# 4
print(combined_list[0][0])
# 5
print(combined_list[0][1])
# 6
print(combined_list[1][0])
# 7
print(combined_list[1][1])


original_list = [1, 2, 3, 4, 5, 6]
new_list = [x for x in original_list if x % 2 == 0]
# 2
# 4
# 6
for x in new_list:
    print(x)


squares = []
for x in range(10):
    squares.append(x**2)
# 等价于
squares = list(map(lambda x: x**2, range(10)))
# 或者，等价于
squares = [x**2 for x in range(10)]

[(x, y) for x in [1,2,3] for y in [3,1,4] if x != y]
# 等价于
combs = []
for x in [1,2,3]:
    for y in [3,1,4]:
        if x != y:
            combs.append((x, y))
```

```sh
>>> vec = [-4, -2, 0, 2, 4]
>>> # create a new list with the values doubled
>>> [x*2 for x in vec]
[-8, -4, 0, 4, 8]
>>> # filter the list to exclude negative numbers
>>> [x for x in vec if x >= 0]
[0, 2, 4]
>>> # apply a function to all the elements
>>> [abs(x) for x in vec]
[4, 2, 0, 2, 4]
>>> # call a method on each element
>>> freshfruit = ['  banana', '  loganberry ', 'passion fruit  ']
>>> [weapon.strip() for weapon in freshfruit]
['banana', 'loganberry', 'passion fruit']
>>> # create a list of 2-tuples like (number, square)
>>> [(x, x**2) for x in range(6)]
[(0, 0), (1, 1), (2, 4), (3, 9), (4, 16), (5, 25)]
>>> # the tuple must be parenthesized, otherwise an error is raised
>>> [x, x**2 for x in range(6)]
  File "<stdin>", line 1, in <module>
    [x, x**2 for x in range(6)]
               ^
SyntaxError: invalid syntax
>>> # flatten a list using a listcomp with two 'for'
>>> vec = [[1,2,3], [4,5,6], [7,8,9]]
>>> [num for elem in vec for num in elem]
[1, 2, 3, 4, 5, 6, 7, 8, 9]

# 列表推导式可以使用复杂的表达式和嵌套函数
>>> from math import pi
>>> [str(round(pi, i)) for i in range(1, 6)]
['3.1', '3.14', '3.142', '3.1416', '3.14159']
```

```python
matrix = [
    [1, 2, 3, 4],
    [5, 6, 7, 8],
    [9, 10, 11, 12],
]
# 下面的列表推导式将交换其行和列
[[row[i] for row in matrix] for i in range(4)]
# [[1, 5, 9], [2, 6, 10], [3, 7, 11], [4, 8, 12]]
# 等价于
transposed = []
for i in range(4):
    transposed.append([row[i] for row in matrix])
# 也等价于
transposed = []
for i in range(4):
    # the following 3 lines implement the nested listcomp
    transposed_row = []
    for row in matrix:
        transposed_row.append(row[i])
    transposed.append(transposed_row)

# 实际应用中，你应该会更喜欢使用内置函数去组成复杂的流程语句。
# zip() 函数将会很好地处理这种情况
list(zip(*matrix))
# [(1, 5, 9), (2, 6, 10), (3, 7, 11), (4, 8, 12)]
```
