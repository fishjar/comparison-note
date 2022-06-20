```dart
var gifts = {
  'first' : 'partridge',
  'second': 'turtledoves',
  'fifth' : 'golden rings'
};

var gifts = new Map();
gifts['first'] = 'partridge';
gifts['second'] = 'turtledoves';
gifts['fifth'] = 'golden rings';

var gifts = {'first': 'partridge'};
gifts['fourth'] = 'calling birds';

final constantMap = const {
  2: 'helium',
  10: 'neon',
  18: 'argon',
};

var pages = <String, String>{
  'index.html': 'Homepage',
  'robots.txt': 'Hints for web robots',
  'humans.txt': 'We are people, not machines'
};
```

## 从 map 中删除 key 和 value

```dart
// 使用中括号来访问或者设置 map 中的数据，
// 使用 remove() 函数来从 map 中删除 key 和 value。
var nobleGases = {54: 'xenon'};
// Retrieve a value with a key.
assert(nobleGases[54] == 'xenon');
// Check whether a map contains a key.
assert(nobleGases.containsKey(54));
// Remove a key and its value.
nobleGases.remove(54);
assert(!nobleGases.containsKey(54));
```

## Maps(字典)遍历，获取 map 的所有 key 和 value

```dart
// 使用 .length 来获取 map 中键值对的数目
var gifts = {'first': 'partridge'};
gifts['fourth'] = 'calling birds';
assert(gifts.length == 2);

var hawaiianBeaches = {
  'Oahu'      : ['Waikiki', 'Kailua', 'Waimanalo'],
  'Big Island': ['Wailea Bay', 'Pololu Beach'],
  'Kauai'     : ['Hanalei', 'Poipu']
};

// Get all the keys as an unordered collection
// (an Iterable).
var keys = hawaiianBeaches.keys;

assert(keys.length == 3);
assert(new Set.from(keys).contains('Oahu'));

// Get all the values as an unordered collection
// (an Iterable of Lists).
var values = hawaiianBeaches.values;
assert(values.length == 3);
assert(values.any((v) => v.contains('Waikiki')));
```

## 判断 map 是否包含一个 key

```dart
// 由于 map 的 value 可以为 null，
// 所有通过 key 来获取 value 并通过 判断 value 是否为 null 来判断 key 是否存在是 行不通的。
var hawaiianBeaches = {
  'Oahu'      : ['Waikiki', 'Kailua', 'Waimanalo'],
  'Big Island': ['Wailea Bay', 'Pololu Beach'],
  'Kauai'     : ['Hanalei', 'Poipu']
};

assert(hawaiianBeaches.containsKey('Oahu'));
assert(!hawaiianBeaches.containsKey('Florida'));
```
