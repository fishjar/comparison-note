```sh
sound/                          Top-level package
      __init__.py               Initialize the sound package
      formats/                  Subpackage for file format conversions
              __init__.py
              wavread.py
              wavwrite.py
              aiffread.py
              aiffwrite.py
              auread.py
              auwrite.py
              ...
      effects/                  Subpackage for sound effects
              __init__.py
              echo.py
              surround.py
              reverse.py
              ...
      filters/                  Subpackage for filters
              __init__.py
              equalizer.py
              vocoder.py
              karaoke.py
              ...
```

```python
# 包的用户可以从包中导入单个模块，例如:
import sound.effects.echo
sound.effects.echo.echofilter(input, output, delay=0.7, atten=4)

# 导入子模块的另一种方法是
from sound.effects import echo
echo.echofilter(input, output, delay=0.7, atten=4)

# 另一种形式是直接导入所需的函数或变量:
from sound.effects.echo import echofilter
echofilter(input, output, delay=0.7, atten=4)

# 文件 sound/effects/__init__.py 可以包含以下代码:
__all__ = ["echo", "surround", "reverse"]
# 当用户写
from sound.effects import *
# 意味着 from sound.effects import * 将导入 sound 包的三个命名子模块
```
