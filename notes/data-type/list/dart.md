```dart
var l = [1, 2, 3];

// 在 list 字面量之前添加 const 关键字，
// 可以 定义一个不变的 list 对象（编译时常量）
var constantList = const [1, 2, 3];
var names = <String>['Seth', 'Kathy', 'Lars'];

// Use a List constructor.
var vegetables = new List();

// Or simply use a list literal.
var fruits = ['apples', 'oranges'];

// Add to a list.
fruits.add('kiwis');

// Add multiple items to a list.
fruits.addAll(['grapes', 'bananas']);

// Get the list length.
assert(fruits.length == 5);

// Remove a single item.
var appleIndex = fruits.indexOf('apples');
fruits.removeAt(appleIndex);
assert(fruits.length == 4);

// Remove all elements from a list.
fruits.clear();
assert(fruits.length == 0);

// 使用 indexOf() 来查找 list 中对象的索引
var fruits = ['apples', 'oranges'];
// Access a list item by index.
assert(fruits[0] == 'apples');
// Find an item in a list.
assert(fruits.indexOf('apples') == 0);

// 排序
var fruits = ['bananas', 'apples', 'oranges'];
// Sort a list.
fruits.sort((a, b) => a.compareTo(b));
assert(fruits[0] == 'apples');

// 可以使用 map().toList() 或者 map().toSet() 来 强制立刻执行 map 的方法：
var loudTeaList = teas
    .map((tea) => tea.toUpperCase())
    .toList();
```

## 列表高阶函数

```dart
// 使用 forEach() 函数可以对集合中的每个数据都应用 一个方法：
var teas = ['green', 'black', 'chamomile', 'earl grey'];
teas.forEach((tea) => print('I drink $tea'));

// 在 Map 上使用 forEach() 的时候，方法需要能 接收两个参数（key 和 value）：
hawaiianBeaches.forEach((k, v) {
  print('I want to visit $k and swim at $v');
  // I want to visit Oahu and swim at
  // [Waikiki, Kailua, Waimanalo], etc.
});

// Iterables 也有一个 map() 函数，这个函数返回一个包含所有数据的对象：
var teas = ['green', 'black', 'chamomile', 'earl grey'];
var loudTeas = teas.map((tea) => tea.toUpperCase());
loudTeas.forEach(print);
// map() 函数返回的对象也是一个 Iterable，该对象是懒求值（lazily evaluated） 的，
// 只有当访问里面的值的时候， map 的方法才被调用。
// 可以使用 map().toList() 或者 map().toSet() 来 强制立刻执行 map 的方法：
var loudTeaList = teas
    .map((tea) => tea.toUpperCase())
    .toList();

// Iterable 的 where() 函数可以返回所有满足特定条件的数据。
// any() 判断是否有数据满足特定条件，
// every() 判断是否所有数据都满足 特定条件。

var teas = ['green', 'black', 'chamomile', 'earl grey'];

// Chamomile is not caffeinated.
bool isDecaffeinated(String teaName) =>
    teaName == 'chamomile';

// Use where() to find only the items that return true
// from the provided function.
var decaffeinatedTeas = teas
    .where((tea) => isDecaffeinated(tea));
// or teas.where(isDecaffeinated)

// Use any() to check whether at least one item in the
// collection satisfies a condition.
assert(teas.any(isDecaffeinated));

// Use every() to check whether all the items in a
// collection satisfy a condition.
assert(!teas.every(isDecaffeinated));
```
