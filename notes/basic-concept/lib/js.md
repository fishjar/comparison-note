- 一个 Node.js 文件就是一个模块
- 包是在模块基础上更深一步的抽象，使用 npm 来解决包的发布和获取，
  `package.json`必须在包的顶层目录下

```js
import { stat, exists, readFile } from "fs";
import _, { each, forEach } from "lodash";
// 整体加载的写法
import * as circle from "./circle";

// profile.js
export var firstName = "Michael";
export var lastName = "Jackson";
export var year = 1958;

// profile.js
var firstName = "Michael";
var lastName = "Jackson";
var year = 1958;
export { firstName, lastName, year };

// export-default.js
export default function() {
  console.log("foo");
}
// import-default.js
import customName from "./export-default";
customName(); // 'foo'

export { foo, bar } from "my_module";
// 可以简单理解为
import { foo, bar } from "my_module";
export { foo, bar };
```
