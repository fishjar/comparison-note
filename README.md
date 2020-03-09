# 对比学习笔记

demo 浏览地址：https://fishjar.github.io/comparison-note/

## 前记

- 不同编程语言，许多特性是相似的，也有许多特性是不同的。
- 在学习多种语言之后，记忆上有诸多混淆，查找文档又散落各处。
- 所以萌发了做一个这样的笔记项目，通过直观的对比记录来学习、查阅相关知识。

## 项目特性

- 支持`markdown`文档，支持无限深度的目录
- 支持导出静态页面
- 支持 github 自动集成/部署
- 初衷是为编程语言学习做的笔记系统，其实不限于此

## 技术栈

- reactjs
- nextjs
- markdown
- bootstrap
- github actions

## 目录说明

```sh
├── bin
│   └── index.js            # 递归导出菜单的脚本
├── src
│   ├── components          # 公用组件
│   │   ├── CodeBlock.js
│   │   ├── Footer.js
│   │   ├── Header.js
│   │   ├── Layout.js
│   │   ├── MarkDown.js
│   │   └── Nav.js
│   ├── pages
│   │   ├── _app.js
│   │   ├── index.js
│   │   └── [...param].js
│   └── utils
│       ├── index.js
│       └── navs.json       # 导出的菜单数据
├── docs                    # 导出静态页面的文件夹
├── LICENSE
├── next.config.js
├── notes                   # markdown笔记文件夹
├── package.json
├── README.md
└── yarn.lock
```

## 笔记编写说明

- 笔记使用`markdown`格式，文件后缀请使用`.md`
- 全部笔记必须保存到`notes`文件夹
- 每个文件夹请编写一个`README.md`文件，且支持`title`字段定义显示的文件夹名称
- 每个文件夹的其他`.md`文件会当作比较笔记

## 开发说明

```sh
# 安装依赖
yarn

# 导出菜单
yarn nav

# 开发
yarn dev

# 编译
yarn build

# 运行
yarn start

# 导出静态页面
yarn export
```

## github 部署说明

- 修改`next.config.js`中的`ASSET_PREFIX`
- 修改`package.json`中的`homepage`
- 给`action`创建一个名为`ACCESS_TOKEN`的`secrets`
- 直接`push`到`master`分支，`actions`会自动部署

## 一些坑

- `getInitialProps`
  - 按理在服务器运行可以使用`fs`，`path`等`nodejs`库，但是没运行成功。
  - 最后只好加了一个独立脚本`bin/index.js`来生成菜单列表。
- `react-syntax-highlighter`
  - 导入类似`react-syntax-highlighter/dist/esm/styles/hljs`是不行的
  - 必须改成`react-syntax-highlighter/dist/ejs/styles/hljs`。
- `next.js`的路由
  - 开发时的路由是 js 控制的，可能没有`/`结尾
  - 但是到处静态`html`后，其实是访问某目录下的`index.html`文件，所以路径会有个`/`结尾
  - 并且部署到非顶级目录时，路由参数也会有变化
  - 这会导致一些路由判断的麻烦
- `github pages`部署
  - 所有`css`和`js`文件 404。
  - 解决是添加`.nojekyll`文件，否则`_next`目录下的`css`和`js`访问不到。

## 后记

- 初次使用`nextjs`，发现坑不少，局限性也挺大
- 转一圈，发现
  - 如果只是简单的几个页面，根本不需要什么`nextjs`，也不需要`react`，
  - 或许直接一个脚本更简单灵活
- 有时间再写一个脚本版本
