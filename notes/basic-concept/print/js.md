```js
console.log(`The number is ${aNumber}.`);
var number = 11 * 9;
var color = "red";
console.log("%d %s balloons", number, color);

console.log(" %s + %s ", 1, 1, "= 2");
// 1 + 1  = 2

console.log({ foo: "bar" });
// Object {foo: "bar"}
console.log(Date);
// function Date() { [native code] }

var languages = [
  { name: "JavaScript", fileExtension: ".js" },
  { name: "TypeScript", fileExtension: ".ts" },
  { name: "CoffeeScript", fileExtension: ".coffee" },
];
console.table(languages);

var languages = {
  csharp: { name: "C#", paradigm: "object-oriented" },
  fsharp: { name: "F#", paradigm: "functional" },
};
console.table(languages);

console.assert(false, "判断条件不成立");
// Assertion failed: 判断条件不成立
// 相当于
try {
  if (!false) {
    throw new Error("判断条件不成立");
  }
} catch (e) {
  console.error(e);
}
```
