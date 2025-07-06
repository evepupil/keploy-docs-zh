---
id: supported-frameworks
title: Ts (v1.0.0) 支持的框架
description: 支持的框架
tags:
  - 开发者指南
  - typescript
---

## 支持的路由器

### 1. Express

```js
require("typescript-sdk/dist/integrations/express/register");
```

require 语句应放在主文件（server.js）的顶部。

#### 示例

```js
require("typescript-sdk/dist/integrations/express/register");
const express = require("express");
const app = express();
const port = process.env.PORT || 5050;

app.use(express.json());

app.get("/", (req, res) => {
  res.json({field: "应用运行正常", opacity: Math.random()});
});

app.listen(port, () => {
  console.log(`服务器运行在端口: ${port}`);
});
```

注意：不能使用 import 语句。请使用 require 替代 import。

## 支持的依赖项

### 1. Octokit

```js
require("typescript-sdk/dist/integrations/octokit/require");
```

该语句应放在主文件（server.js）的顶部。

注意：不能使用 import 语句。目前仅支持 CommonJs。

## 开发环境设置

- 本项目使用 [Yarn](https://yarnpkg.com/) 进行包管理。安装 yarn 前请确保已安装 [Node](https://nodejs.org/en/)，然后执行：

```sh
npm i -g yarn
```

- 假设您位于项目根目录，安装本地依赖项请执行：

```sh
yarn install
```