```python
some_string = "abcd"
# 4
print(len(some_string))

'spam eggs'  # single quotes
'doesn\'t'  # use \' to escape the single quote...
"doesn't"  # ...or use double quotes instead
'"Yes," they said.'
"\"Yes,\" they said."
'"Isn\'t," they said.'

print('C:\some\name')  # here \n means newline!
print(r'C:\some\name')  # note the r before the quote

# 字符串可以用 + 进行连接（粘到一起），也可以用 * 进行重复:
# 3 times 'un', followed by 'ium'
3 * 'un' + 'ium'

# 相邻的两个或多个 字符串字面值 （引号引起来的字符）将会自动连接到一起.
'Py' 'thon'
```

```sh
# 字符串是可以被 索引 （下标访问）的，第一个字符索引是 0。
>>> word = 'Python'
>>> word[0]  # character in position 0
'P'
>>> word[5]  # character in position 5
'n'

# 索引也可以用负数，这种会从右边开始数:
>>> word[-1]  # last character
'n'
>>> word[-2]  # second-last character
'o'
>>> word[-6]
'P'

# 除了索引，字符串还支持 切片。
>>> word[0:2]  # characters from position 0 (included) to 2 (excluded)
'Py'
>>> word[2:5]  # characters from position 2 (included) to 5 (excluded)
'tho'
>>> word[:2] + word[2:]
'Python'
>>> word[:4] + word[4:]
'Python'
```

```python
print(r'C:\some\name')  # note the r before the quote
```
