```js
function BubbleSort(arr) {
  let j = 0;
  for (;;) {
    j++;
    let done = true;
    for (let i = 0; i < arr.length - j; i++) {
      if (arr[i] > arr[i + 1]) {
        [arr[i], arr[i + 1]] = [arr[i + 1], arr[i]];
        done = false;
      }
    }
    if (done) {
      break;
    }
  }
  return arr;
}
const arr = [3, 6, 7, 4, 5, 1, 2];
console.log(BubbleSort(arr));
```
