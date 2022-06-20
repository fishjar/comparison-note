```python
# 1
# 2
# Fizz
# 4
# Buzz
for number in range(1, 101):
    if number == 3:
        print("Fizz")
        continue
    if number == 5:
        print("Buzz")
        break
    print(number)
```

```sh
# 循环语句可能带有一个 else 子句；
# 它会在循环遍历完列表 (使用 for) 或是在条件变为假 (使用 while) 的时候被执行，
# 但是不会在循环被 break 语句终止时被执行。

# 当和循环一起使用时，else 子句与 try 语句中的 else 子句的共同点多于 if 语句中的子句:
# try 语句中的 else 子句会在未发生异常时执行，
# 而循环中的 else 子句则会在未发生 break 时执行。

# 计算质数(素数)
>>> for n in range(2, 10):
...     for x in range(2, n):
...         if n % x == 0:
...             print(n, 'equals', x, '*', n//x)
...             break
...     else: # else 子句属于 for 循环， 不属于 if 语句。
...         # loop fell through without finding a factor
...         print(n, 'is a prime number')
...
2 is a prime number
3 is a prime number
4 equals 2 * 2
5 is a prime number
6 equals 2 * 3
7 is a prime number
8 equals 2 * 4
9 equals 3 * 3

# continue 语句也是借鉴自 C 语言，表示继续循环中的下一次迭代:
>>> for num in range(2, 10):
...     if num % 2 == 0:
...         print("Found an even number", num)
...         continue
...     print("Found a number", num)
Found an even number 2
Found a number 3
Found an even number 4
Found a number 5
Found an even number 6
Found a number 7
Found an even number 8
Found a number 9
```
