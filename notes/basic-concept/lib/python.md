- `module`：一个文件就是一个模块
- `package`：包是一个包含 `__init__.py` 文件的目录
  包是一种通过用“带点号的模块名”来构造 Python 模块命名空间的方法。
- `lib`：库是完成一定功能的代码集合，在 python 中是包和模块的形式

当一个名为 spam 的模块被导入的时候，
解释器首先寻找具有该名称的内置模块。
如果没有找到，然后解释器从 `sys.path` 变量给出的目录列表里寻找名为 `spam.py` 的文件。
`sys.path` 初始有这些目录地址:

- 包含输入脚本的目录（或者未指定文件时的当前目录）。
- PYTHONPATH （一个包含目录名称的列表，它和 shell 变量 PATH 有一样的语法）。
- 取决于安装的默认设置

```python
# fibo.py
def fib(n):    # write Fibonacci series up to n
  a, b = 0, 1
  while a < n:
    print(a, end=' ')
    a, b = b, a+b
  print()
def fib2(n):   # return Fibonacci series up to n
  result = []
  a, b = 0, 1
  while a < n:
    result.append(a)
    a, b = b, a+b
  return result

#
import fibo
fibo.fib(1000)
#
from fibo import fib, fib2
fib(1000)
#
from fibo import *
fib(1000)
#
import fibo as fib
fib.fib(500)
#
from fibo import fib as fibonacci
fibonacci(500)

# 以脚本的方式执行模块
# python fibo.py <arguments>
if __name__ == "__main__":
    import sys
    fib(int(sys.argv[1]))

# 子包参考
from . import echo
from .. import formats
from ..filters import equalizer
```
