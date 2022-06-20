```dart
import 'dart:math' as math;

var random = new math.Random();
random.nextDouble(); // Between 0.0 and 1.0: [0, 1)
random.nextInt(10);  // Between 0 and 9.

var random = new math.Random();
random.nextBool();  // true or false
```

## 生成随机布尔值

```dart
import 'dart:math' as math;

var random = new math.Random();
random.nextBool();  // true or false
```
