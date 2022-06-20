```sh
# 内置函数 range() 会派上用场。它生成算术级数:
>>> for i in range(5):
...     print(i)
...
0
1
2
3
4

# range也可以以另一个数字开头，或者以指定的幅度增加
range(5, 10)
   5, 6, 7, 8, 9

range(0, 10, 3)
   0, 3, 6, 9

range(-10, -100, -30)
  -10, -40, -70

# 要以序列的索引来迭代，您可以将 range() 和 len() 组合如下:
# 然而，在大多数这类情况下，使用 enumerate() 函数比较方便
>>> a = ['Mary', 'had', 'a', 'little', 'lamb']
>>> for i in range(len(a)):
...     print(i, a[i])
...
0 Mary
1 had
2 a
3 little
4 lamb

# range 返回的是一个可迭代对象
>>> print(range(10))
range(0, 10)
>>> list(range(5))
[0, 1, 2, 3, 4]
```
