```js
// 1
// 2
// Fizz
// 4
// Buzz
for (let i = 1; i <= 100; i = i + 1) {
  if (i === 3) {
    console.log("Fizz");
    continue;
  }

  if (i === 5) {
    console.log("Buzz");
    break;
  }

  console.log(i);
}
```
