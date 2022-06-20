```python
# Measure some strings:
words = ['cat', 'window', 'defenestrate']
for w in words:
    print(w, len(w))

# 如果在循环内需要修改序列中的值（比如重复某些选中的元素），推荐你先拷贝一份副本。
for w in words[:]:  # Loop over a slice copy of the entire list.
    if len(w) > 6:
        words.insert(0, w)
# ['defenestrate', 'cat', 'window', 'defenestrate']
# 如果写成 for w in words:，这个示例就会创建无限长的列表，
# 一次又一次重复地插入 defenestrate。
```
