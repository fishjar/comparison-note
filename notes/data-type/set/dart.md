```dart
var ingredients = new Set();
ingredients.addAll(['gold', 'titanium', 'xenon']);
assert(ingredients.length == 3);
// Adding a duplicate item has no effect.
ingredients.add('gold');
assert(ingredients.length == 3);
// Remove an item from a set.
ingredients.remove('gold');
assert(ingredients.length == 2);

var ingredients = new Set();
ingredients.addAll(['gold', 'titanium', 'xenon']);
// Check whether an item is in the set.
assert(ingredients.contains('titanium'));
// Check whether all the items are in the set.
assert(ingredients.containsAll(['titanium', 'xenon']));

// 交际是两个 set 中都有的数据的子集：
var ingredients = new Set();
ingredients.addAll(['gold', 'titanium', 'xenon']);
// Create the intersection of two sets.
var nobleGases = new Set.from(['xenon', 'argon']);
var intersection = ingredients.intersection(nobleGases);
assert(intersection.length == 1);
assert(intersection.contains('xenon'));
```

## 判断 Iterable 集合（List, Set, 和 Map）是否为空的

```dart
// 可以使用 isEmpty 函数来判断集合是否为空的：
if (lunchBox.isEmpty) return 'so hungry...';
if (words.isNotEmpty) return words.join(' ');
var teas = ['green', 'black', 'chamomile', 'earl grey'];
assert(!teas.isEmpty);
```
