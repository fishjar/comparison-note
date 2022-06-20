```sh
>>> tel = {'jack': 4098, 'sape': 4139}
>>> tel['guido'] = 4127
>>> tel
{'jack': 4098, 'sape': 4139, 'guido': 4127}
>>> tel['jack']
4098
>>> del tel['sape']
>>> tel['irv'] = 4127
>>> tel
{'jack': 4098, 'guido': 4127, 'irv': 4127}
>>> list(tel)
['jack', 'guido', 'irv']
>>> sorted(tel)
['guido', 'irv', 'jack']
>>> 'guido' in tel
True
>>> 'jack' not in tel
False

# dict() 构造函数可以直接从键值对序列里创建字典。
>>> dict([('sape', 4139), ('guido', 4127), ('jack', 4098)])
{'sape': 4139, 'guido': 4127, 'jack': 4098}

# 字典推导式可以从任意的键值表达式中创建字典
>>> {x: x**2 for x in (2, 4, 6)}
{2: 4, 4: 16, 6: 36}

# 当关键字是简单字符串时，有时直接通过关键字参数来指定键值对更方便
>>> dict(sape=4139, guido=4127, jack=4098)
{'sape': 4139, 'guido': 4127, 'jack': 4098}


some_variable = 2
some_dict = {(some_variable + 1): "three"}
# three
print(some_dict[3])
```

循环的技巧

```python
some_list = [6, 3, 5]
# 0 6
# 1 3
# 2 5
for i, item in enumerate(some_list):
    print(f"{i} {item}")
# If you're not using this in a for loop, use list()
# list(enumerate(some_list)) # [(0, 6), (1, 3), (2, 5)]


list_1 = [1, 3, 5]
list_2 = [2, 4, 6]
# 1 2
# 3 4
# 5 6
for x, y in zip(list_1, list_2):
    print(f"{x} {y}")
```

```sh
# 当在字典中循环时，用 items() 方法可将关键字和对应的值同时取出
>>> knights = {'gallahad': 'the pure', 'robin': 'the brave'}
>>> for k, v in knights.items():
...     print(k, v)
...
gallahad the pure
robin the brave

# 当在序列中循环时，用 enumerate() 函数可以将索引位置和其对应的值同时取出
>>> for i, v in enumerate(['tic', 'tac', 'toe']):
...     print(i, v)
...
0 tic
1 tac
2 toe

# 当同时在两个或更多序列中循环时，可以用 zip() 函数将其内元素一一匹配。
>>> questions = ['name', 'quest', 'favorite color']
>>> answers = ['lancelot', 'the holy grail', 'blue']
>>> for q, a in zip(questions, answers):
...     print('What is your {0}?  It is {1}.'.format(q, a))
...
What is your name?  It is lancelot.
What is your quest?  It is the holy grail.
What is your favorite color?  It is blue.

# 当逆向循环一个序列时，先正向定位序列，然后调用 reversed() 函数
>>> for i in reversed(range(1, 10, 2)):
...     print(i)
...
9
7
5
3
1

# 用 sorted() 函数，它可以在不改动原序列的基础上返回一个新的排好序的序列
>>> basket = ['apple', 'orange', 'apple', 'pear', 'orange', 'banana']
>>> for f in sorted(set(basket)):
...     print(f)
...
apple
banana
orange
pear

# 有时可能会想在循环时修改列表内容，一般来说改为创建一个新列表是比较简单且安全的
>>> import math
>>> raw_data = [56.2, float('NaN'), 51.7, 55.3, 52.5, float('NaN'), 47.8]
>>> filtered_data = []
>>> for value in raw_data:
...     if not math.isnan(value):
...         filtered_data.append(value)
...
>>> filtered_data
[56.2, 51.7, 55.3, 52.5, 47.8]
```
