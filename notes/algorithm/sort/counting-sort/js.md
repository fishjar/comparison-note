```js
function CountingSort(arr) {
  const [max, min] = countMaxMin(arr);
  const tmp = new Array(max - min + 1).fill(0);
  arr.forEach((v) => tmp[v - min]++);
  let index = 0;
  tmp.forEach((v, k) => {
    while (v > 0) {
      arr[index] = k + min;
      index++;
      v--;
    }
  });
  return arr;
}

function countMaxMin(arr) {
  let [max, min] = [arr[0], arr[0]];
  arr.forEach((v) => {
    v > max && (max = v);
    v < min && (min = v);
  });
  return [max, min];
}

const arr = [3, 6, 7, 4, 5, 1, 2];
console.log(CountingSort(arr));
```
