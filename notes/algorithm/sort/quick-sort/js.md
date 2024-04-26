```js
const quickSort = (arr, start, last) => {
  if (start < last) {
    let base = arr[start];
    let [low, high] = [start, last];
    while (low < high) {
      while (low < high && arr[high] >= base) {
        high--;
      }
      arr[low] = arr[high];
      while (low < high && arr[low] <= base) {
        low++;
      }
      arr[high] = arr[low];
    }
    arr[low] = base;
    quickSort(arr, start, low - 1);
    quickSort(arr, low + 1, last);
  }
};

const QuickSort = (arr) => {
  quickSort(arr, 0, arr.length - 1);
  return arr;
};

const arr = [3, 6, 7, 4, 5, 1, 2];
console.log(QuickSort(arr));
```

```js
const quickSort = (arr, start, last) => {
  if (start < last) {
    let [low, high] = [start, last];
    while (low < high) {
      while (low < high && arr[high] >= arr[start]) {
        high--;
      }
      while (low < high && arr[low] <= arr[start]) {
        low++;
      }
      if (low < high) {
        [arr[low], arr[high]] = [arr[high], arr[low]];
      }
    }
    [arr[start], arr[low]] = [arr[low], arr[start]];
    quickSort(arr, start, high - 1);
    quickSort(arr, high + 1, last);
  }
};

const QuickSort = (arr) => {
  quickSort(arr, 0, arr.length - 1);
  return arr;
};

const arr = [3, 6, 7, 4, 5, 1, 2];
console.log(QuickSort(arr));

```