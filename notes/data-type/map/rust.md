```rust
use std::collections::HashMap;

// 新建一个哈希 map
let mut scores = HashMap::new();

// 使用 insert 增加元素
scores.insert(String::from("Blue"), 10);
scores.insert(String::from("Yellow"), 50);

// 覆盖一个值
scores.insert(String::from("Blue"), 25);

// 只在键没有对应值时插入
// entry 函数的返回值是一个枚举，Entry，
// 它代表了可能存在也可能不存在的值
// or_insert 方法在键对应的值存在时就返回这个值的可变引用，
// 如果不存在则将参数作为新值插入并返回新值的可变引用。
scores.entry(String::from("Yellow")).or_insert(50);
scores.entry(String::from("Blue")).or_insert(50);

// 访问哈希 map 中的值
// 因为 get 返回 Option<V>，所以结果被装进 Some；
// 如果某个键在哈希 map 中没有对应的值，get 会返回 None
let team_name = String::from("Blue");
let score = scores.get(&team_name);

// 遍历哈希 map
for (key, value) in &scores {
    println!("{}: {}", key, value);
}

// 根据旧值更新一个值
let text = "hello world wonderful world";
let mut map = HashMap::new();
for word in text.split_whitespace() {
    let count = map.entry(word).or_insert(0); // 没有key则插入，并初始化
    *count += 1; // 更新
}
println!("{:?}", map);

// 用队伍列表和分数列表创建哈希 map
let teams  = vec![String::from("Blue"), String::from("Yellow")];
let initial_scores = vec![10, 50];
// 这里 HashMap<_, _> 类型标注是必要的，
// 因为 collect 有可能当成多种不同的数据结构
let scores: HashMap<_, _> = teams.iter().zip(initial_scores.iter()).collect();
```
