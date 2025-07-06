---
id: crud-nodejs
title: NodeJS 示例应用
sidebar_label: NodeJS - Express + Mongoose
description: 以下示例应用展示了如何使用 NodeJS 框架和 Keploy 平台。
tags:
  - javascript
  - nodejs
  - expressjs
  - mongoDB
  - quickstart
  - samples
  - examples
  - tutorial
keyword:
  - NodeJS 框架
  - ExpressJs
  - MongoDB
  - NodeJS
  - API 测试生成器
  - 自动化测试用例生成
---

## 介绍 📌

这是一个展示 Keploy 如何无缝集成 **_Express.js_** 和 **_MongoDB_** 的 **_CRUD_** 示例应用。准备好见证 Keploy 的强大功能吧 🔅🔅。

## 开始使用！🎬

克隆仓库并进入 crud-API 文件夹

```bash
git clone https://github.com/keploy/samples-typescript && cd samples-typescript/crud-API

# 安装依赖
npm install
```

import InstallationGuide from '../concepts/installation.md'

<InstallationGuide/>

🎉 哇哦！我们已经准备好使用 Keploy 了。

## 🎬 捕获测试用例

要开始记录应用的 API 调用，打开终端并导航到应用目录，然后执行以下命令：

```bash
keploy record -c "npm start"
```

使用 Hoppscotch、Postman 或 curl 命令发起 API 调用。Keploy 将捕获这些调用并生成包含测试用例和数据模拟的测试套件。

**1. 提交商品详情**<br />
**_POST 请求_**

```bash
curl --request POST \
  --url http://localhost:3000/api/products \
  --header 'content-type: application/json' \
  --data '{
    "name" : "airpods",
    "quantity": 4,
    "price": 20000
}'
```

以下是返回的响应示例：

```json
{
  "name": "airpods",
  "quantity": 4,
  "price": 20000,
  "_id": "6629499175a4795410ee4012",
  "createdAt": "2024-04-24T18:04:01.499Z",
  "updatedAt": "2024-04-24T18:04:01.499Z",
  "__v": 0
}
```

**2. 获取商品详情** <br />
**_GET 请求_**

```bash
curl --location --request GET 'http://localhost:3000/api/products/:id'
```

将 :id 替换为你想要获取详情的商品 ID！<br />

**3. 更新商品详情**<br />
**_PUT 请求_**

```bash
curl --location --request PUT 'http://localhost:3000/api/products/:id' \
  --header 'Content-Type: application/json' \
  --data '{
    "name": "airpods",
    "quantity": 4,
    "price": 20000
    }'
```

**4. 删除商品详情**<br />
**_DELETE 请求_**

```bash
curl --location --request DELETE 'http://localhost:8080/potions/:id'
```

🎉 简单吧！只需一个 API 调用，你就创建了一个包含模拟数据的测试用例。查看 Keploy 目录，你会发现新生成的 `test-1.yml` 和 `mocks.yml` 文件。

```yaml
version: api.keploy.io/v1beta1
kind: Http
name: test-1
spec:
  metadata: {}
  req:
    method: GET
    proto_major: 1
    proto_minor: 1
    url: http://localhost:3000/
    header:
      Accept: text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8
      Accept-Encoding: gzip, deflate, br
      Accept-Language: en-GB,en
      Connection: keep-alived
      Host: localhost:3000
      If-None-Match: W/"22-1zTtRKCtWDH+a9AlmEC9xS1mvKM"
      Sec-Ch-Ua: '"Chromium";v="122", "Not(A:Brand";v="24", "Brave";v="122"'
      Sec-Ch-Ua-Mobile: ?0
      Sec-Ch-Ua-Platform: '"Linux"'
      Sec-Fetch-Dest: document
      Sec-Fetch-Mode: navigate
      Sec-Fetch-Site: none
      Sec-Fetch-User: ?1
      Sec-Gpc: "1"
      Upgrade-Insecure-Requests: "1"
      User-Agent: Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36
    body: ""
    timestamp: 2024-04-22T14:59:23.376284154+05:30
  resp:
    status_code: 304
    header:
      Connection: keep-alive
      Date: Mon, 22 Apr 2024 09:29:23 GMT
      Etag: W/"22-1zTtRKCtWDH+a9AlmEC9xS1mvKM"
      Keep-Alive: timeout=5
      X-Powered-By: Express
    body: ""
    status_message: Not Modified
    proto_major: 0
    proto_minor: 0
    timestamp: 2024-04-22T14:59:23.516347365+05:30
  objects: []
  assertions:
    noise:
      header.Date: []
  created: 1713778163
curl: |
  curl --request GET \
    --url http://localhost:3000/ \
    --header 'Sec-Fetch-User: ?1' \
    --header 'Sec-Fetch-Dest: document' \
    --header 'Upgrade-Insecure-Requests: 1' \
    --header 'Sec-Gpc: 1' \
    --header 'Accept-Encoding: gzip, deflate, br' \
    --header 'Sec-Fetch-Mode: navigate' \
    --header 'Accept-Language: en-GB,en' \
    --header 'Host: localhost:3000' \
    --header 'If-None-Match: W/"22-1zTtRKCtWDH+a9AlmEC9xS1mvKM"' \
    --header 'Sec-Ch-Ua-Mobile: ?0' \
    --header 'User-Agent: Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36' \
    --header 'Sec-Fetch-Site: none' \
    --header 'Accept: text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8' \
    --header 'Connection: keep-alive' \
    --header 'Sec-Ch-Ua: "Chromium";v="122", "Not(A:Brand";v="24", "Brave";v="122"' \
    --header 'Sec-Ch-Ua-Platform: "Linux"' \
```

## 运行 keploy 测试

想看看实际效果吗？运行以下命令执行 Keploy 测试：

```bash
keploy test -c "npm run" --delay 10
```

太棒了，你已经完成了所有步骤 🥳！现在，让我们深入探索如何将 Keploy 与 jest 测试集成 📌

## 获取 Keploy jest SDK

```bash
npm i @keploy/sdk nyc jest
```

## 更新 package 文件

更新运行应用的 `package.json` 文件：

```json
 "scripts": {
    //其他脚本
    "test": "jest --coverage --collectCoverageFrom='src/**/*.{js,jsx}'",
    "coverage": "nyc npm test && npm run coverage:merge && npm run coverage:report",
    "coverage:merge": "mkdir -p ./coverage && nyc merge ./coverage .nyc_output/out.json",
    "coverage:report": "nyc report --reporter=lcov --reporter=text"
    //其他脚本
  }
```

## 使用方法

要为 Keploy API 测试生成代码覆盖率，你需要在 Jest 测试文件中添加以下测试。可以将其命名为 `keploy.test.js`。

```javascript
const {expect} = require("@jest/globals");
const keploy = require("@keploy/sdk");
const timeOut = 300000;

describe(
  "Keploy Server Tests",
  () => {
    test(
      "TestKeploy",
      (done) => {
        const cmd = "npm start";
        const options = {};
        keploy.Test(cmd, options, (err, res) => {
          if (err) {
            done(err);
          } else {
            expect(res).toBeTruthy(); // 断言测试结果
            done();
          }
        });
      },
      timeOut
    );
  },
  timeOut
);
```

现在运行以下命令来执行包含 Keploy 的 jest 测试：

```bash
npm test
```

要获取包含 Keploy 测试覆盖率的综合覆盖率报告：

```bash
npm run coverage
```

## 总结 🎉

恭喜！你已经掌握了 Keploy，并在 NodeJS 应用中释放了其强大的自动化测试能力。结合 Jest，你可以确保代码覆盖率坚如磐石。现在，去创造更棒的东西吧！🧑🏻‍💻

如果还有任何问题，欢迎联系我们。

import GetSupport from '../concepts/support.md'

<GetSupport/>