---
id: installation
title: Keploy TypeScript SDK 集成指南 (v1.0.0)
description: 本文简要介绍如何将 Keploy Typescript SDK 添加到您的应用程序中。
tags:
  - 开发者指南
  - typescript
---

## 要求

- npm 8+
- yarn

## Keploy Typescript-SDK

[Keploy](https://keploy.io) 是一个无代码测试平台，可从 API 调用生成测试用例。这是用于记录和回放 API 调用的 Typescript 客户端 SDK。包含两种模式：

1. **记录模式**
   1. 记录请求和响应并发送至 Keploy 服务器。
   2. Keploy 服务器去重后，会再次用该请求调用 API 以识别噪声字段。
   3. 将噪声字段发送至 Keploy 服务器，与测试用例一并保存。
2. **测试模式**
   1. 从 Keploy 服务器获取应用的测试用例。
   2. 使用测试用例中的请求载荷调用 API。
   3. 验证响应并将结果上传至 Keploy 服务器。

## 安装

```bash
npm i https://github.com/keploy/typescript-sdk
```

## 使用方法

```js
require("typescript-sdk/dist/integrations/express/register");
```

require 语句应放在主文件（server.js）的顶部。

示例：

```js
require("typescript-sdk/dist/integrations/express/register");
var express = require("express");
var app = express();
app.get("/", function (req, res) {
  res.send("Hello World!\n");
});
var server = app.listen(3000, () =>
  console.log(`Example app listening on port 3000!`)
);
module.exports = server;
```

## 配置

```
export KEPLOY_MODE="test"
export KEPLOY_APP_NAME="my-app"
export KEPLOY_APP_HOST="localhost"
export KEPLOY_APP_PORT=5050 # 服务运行的端口号
export KEPLOY_APP_DELAY=5 # 开始测试前的延迟时间（秒）
export KEPLOY_APP_TIMEOUT=100 # 应为数字
# export KEPLOY_APP_FILTER={"urlRegex":"*"}  # 应为 JSON，用于排除特定 URL 的捕获

export KEPLOY_SERVER_URL="http://localhost:6789/api" # 自托管 Keploy 服务器地址
# export KEPLOY_SERVER_LICENSE="XXX-XXX-XXX" # 托管版 Keploy 服务器 API 密钥
```

### KEPLOY_MODE

包含 3 种模式：

- **Record**: 设置为记录模式。
- **Test**: 设置为测试模式。
- **Off**: 关闭 SDK 提供的所有功能

**注意：** `KEPLOY_MODE` 的值区分大小写。