---
id: javascript
title: 合并单元测试覆盖率数据
sidebar_label: Javascript
tags:
  - javascript
  - js
  - node
  - npm
  - coverage
keywords:
  - coverage
  - Jest
  - Javascript
  - Mongo
  - Ava
  - Intern
  - mocha
  - IoT.js
  - tap
  - Typescript
---

import WhatAreKeployFeatures from './index.md'

<WhatAreKeployFeatures/>

## 🛠️ 语言特定要求

| 编程语言       | 前提条件                                |
| :------------: | :--------------------------------------- |
| javascript     | [nyc](https://www.npmjs.com/package/nyc) |

## 使用方法

### 更新 package 文件

更新运行应用的 `package.json` 文件：

```json
  "scripts": {
    //其他脚本
    "test": "jest --coverage --collectCoverageFrom='src/**/*.{js,jsx}'",
    "coverage:merge": "mkdir -p ./coverage && nyc merge ./coverage .nyc_output/out.json",
    "coverage:report": "nyc report --reporter=lcov --reporter=text",
    //其他脚本
  }
```

在测试脚本中，--coverage 标志会触发 Jest 的报告生成。对于其他测试框架如 Mocha、Intern 或 Tap，你需要使用它们各自的覆盖率工具。

要生成单元测试的覆盖率报告，运行：

```bash
npm test
```

要将单元测试的覆盖率数据与 keploy 测试合并，运行：

```bash
npm run coverage:merge
```

要获取合并后覆盖率数据的相关信息，运行：

```bash
npm run coverage:report
```