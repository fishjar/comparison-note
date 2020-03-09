# 对比学习笔记

- 不同编程语言，许多特性是相似的，也有许多特性是不同的。
- 在学习多种语言之后，记忆上有诸多混淆，查找文档又散落各处。
- 所以萌发了做一个这样的笔记项目，通过直观的对比记录来学习、查阅相关知识。

demo浏览地址：https://fishjar.github.io/comparison-note/

## 项目特性

- 支持`markdown`文档，支持无限深度的目录
- 支持导出静态页面
- 支持github自动集成/部署
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

## github部署说明

```sh
```
