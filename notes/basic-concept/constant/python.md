```python
# 自定义
class Const:
  class ConstError(TypeError) :
    pass
  class ConstCaseError(ConstError):
    pass

  def __setattr__(self, name, value):
    if name in self.__dict__:
      raise self.ConstError, "Can't change const value!"
    if not name.isupper():
      raise self.ConstCaseError, 'const "%s" is not all letters are capitalized' %name
    self.__dict__[name] = value

import sys
sys.modules[__name__] = Const()

# 使用
import constant
constant.MAX_COUNT=1
```
