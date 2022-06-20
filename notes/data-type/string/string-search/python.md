```python
# 2 is in the string
if "2" in "123":
    print("2 is in the string")

# 2 is not in the string
if "2" not in "456":
    print("2 is not in the string")


import re

# Has a number
if re.search(r"\d", "iphone 8"):
    print("Has a number")

# Doesn't have a number
if not re.search(r"\d", "iphone x"):
    print("Doesn't have a number")
```
