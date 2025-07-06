---
id: express-mongoose-application
title: 示例课程销售API（Express）
sidebar_label: NodeJS - Express + Mongoose
description: 以下示例应用展示了如何使用NodeJS框架和Keploy平台。
tags:
  - javascript
  - quickstart
  - samples
  - examples
  - tutorial
keyword:
  - NodeJS框架
  - MongoDB
  - NodeJS
  - API测试生成器
  - 自动化测试用例生成
---

## 简介

一个简单的CRUD示例应用，看看Keploy如何无缝集成Express和MongoDB。系好安全带，这将是一段有趣的旅程！🎢

import InstallationGuide from '../concepts/installation.md'

<InstallationGuide/>

## 开始吧！🎬

克隆仓库并进入express-mongoose文件夹

```bash
git clone https://github.com/keploy/samples-typescript && cd samples-typescript/node-mongoose

# 安装依赖
npm install
```

### 灯光，摄影，开始录制！🎥

### Docker安装并运行mongodb compass

## 这里我使用WSL，所以按照以下步骤配置docker与mongodb compass

**1. 在Windows中安装docker并按照本教程连接mongodb compass：**

```bash
https://www.youtube.com/watch?v=NEPZqSvKx40&list=PLff_PESolMjuDXQdjiqYRW_GnDQjU32QX
```

**2. 安装docker并运行视频中的命令后，使用此命令创建网络：**

```bash
docker network create keploy-network
```

> \*_URL应类似于此，具体取决于您的连接，您可以调整，同时更新.env文件中的mongodb_url：`mongodb://127.0.0.1:27023/courses`。_

#### 捕获测试用例

```bash
keploy record -c "npm start"
```

如果使用wsl，请使用此命令：

```bash
sudo -E env PATH=$PATH keploy record -c 'npm start'
```

🔥 挑战时间！生成一些测试用例。怎么做？只需**进行一些API调用**。Postman、Hoppscotch甚至curl - 任您选择！

#### 让我们生成测试用例。

使用[Postman](https://postman.com)或cURL命令进行API调用。Keploy将捕获这些调用以生成包含测试用例和数据模拟的测试套件。

🎉 哇哦！通过一个简单的API调用，您已经创建了一个带有模拟的测试用例！进入Keploy目录，查看执行以下步骤后新生成的`test-1.yml`和`mocks.yml`。

_是时候施展API魔法了！_
跟随面包屑...或进行更多API调用

您可以进行的一些API调用

Get请求 - 获取所有课程

```bash
curl --request GET \
--url http://localhost:3000/courses
```

Post请求 - 添加新课程

```bash
curl --location 'http://localhost:3000/courses' \
--header 'Content-Type: application/x-www-form-urlencoded' \
--data-urlencode 'title=react advance' \
--data-urlencode 'description=advance' \
--data-urlencode 'price=1000' \
--data-urlencode 'published=true'
```

Put请求 - 更新课程

- 确保替换课程ID

```bash
curl --location --request PUT 'http://localhost:3000/courses/6626a9cd3840cb305c0a6d52' \
--header 'Content-Type: application/x-www-form-urlencoded' \
--data-urlencode 'title=react advance'
```

Delete请求 - 删除课程

- 确保替换课程ID

```bash
curl --location --request DELETE 'http://localhost:3000/courses/6626a9cd3840cb305c0a6d52'
```

🎉 很简单吧！只需一个API调用，您就创建了一个带有模拟的测试用例。查看Keploy目录，找到您闪亮的新`test-1.yml`和`mocks.yml`文件。

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
    url: http://localhost:3000/courses
    header:
      Accept: "*/*"
      Accept-Encoding: gzip, deflate, br
      Cache-Control: no-cache
      Connection: keep-alive
      Host: localhost:3000
      Postman-Token: 61d4ef71-85a9-4dd9-b036-6beb0136c8d7
      User-Agent: PostmanRuntime/7.32.1
    body: ""
    timestamp: 2024-04-22T23:56:36.910408265+05:30
  resp:
    status_code: 200
    header:
      Access-Control-Allow-Origin: "*"
      Connection: keep-alive
      Content-Length: "740"
      Content-Type: application/json; charset=utf-8
      Date: Mon, 22 Apr 2024 18:26:36 GMT
      Etag: W/"2e4-bpK0GltUbFpXKUMEiWddtMBI/a4"
      Keep-Alive: timeout=5
      X-Powered-By: Express
    body: '{"courses":[{"_id":"66269dd4a16b2f11f9c1c0e9","title":"python course","description":"advance","price":1000,"published":true,"__v":0},{"_id":"66269e13a16b2f11f9c1c0ec","title":"react course","description":"advance","price":1000,"published":true,"__v":0},{"_id":"66269f2034c9140719a0f7de","title":"express","description":"advance","price":1000,"published":true,"__v":0},{"_id":"6626a8f2946288ed91737eb7","title":"express and react","description":"advance","price":1000,"published":true,"__v":0},{"_id":"6626a9cd3840cb305c0a6d52","title":"react and next js","description":"advance","price":1000,"published":true,"__v":0},{"_id":"6626aa43f9602455c7dac9ea","title":"react advance","description":"advance","price":1000,"published":true,"__v":0}]}'
    status_message: OK
    proto_major: 0
    proto_minor: 0
    timestamp: 2024-04-22T23:56:38.951925148+05:30
  objects: []
  assertions:
    noise:
      header.Date: []
  created: 1713810398
curl: |
  curl --request GET \
    --url http://localhost:3000/courses \
    --header 'Connection: keep-alive' \
    --header 'User-Agent: PostmanRuntime/7.32.1' \
    --header 'Accept: */*' \
    --header 'Cache-Control: no-cache' \
    --header 'Postman-Token: 61d4ef71-85a9-4dd9-b036-6beb0136c8d7' \
    --header 'Host: localhost:3000' \
    --header 'Accept-Encoding: gzip, deflate, br' \
```

或者简单地访问您的浏览器并访问`http://localhost:3000/courses`。

您是否在项目库中发现了新的测试和模拟卷轴？太棒了！👏

### 运行测试

是时候进行测试了 🧪

```bash
keploy test -c "npm start" --delay 10
```

如果使用wsl，请使用此命令：

```bash
keploy -E env PATH=$PATH keploy test -c 'npm start' --delay 10
```

Keploy测试报告：
![image](https://github.com/s2ahil/samples-typescript/assets/101473078/48f2b866-04d1-433b-9270-34c15786893c)

> `--delay`标志？哦，那只是给您的应用一点喘息时间（以秒为单位），然后测试用例才会来敲门。

### 使用jest运行测试，使用此命令：

```bash
npm test
```

jest测试覆盖率报告：

![Screenshot 2024-04-22 025850](https://github.com/s2ahil/samples-typescript/assets/101473078/f60570d0-b998-4b4a-912d-80d4c73604e3)

## 获取Keploy jest sdk

```bash
npm i @keploy/sdk nyc jest
```

## 更新package文件

更新运行应用的`package.json`文件：

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

## 使用

对于使用jest集成的Keploy API测试的代码覆盖率，您需要在Jest测试文件中添加以下测试。可以称为`keploy.test.js`。Jest测试文件。可以称为`keploy.test.js`。

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

现在让我们运行jest测试以及keploy，使用命令

```bash
npm test
```

获取与keploy测试覆盖率结合的覆盖率

```bash
npm run coverage
```

### 总结 🎉

恭喜您走到这一步！您已经见识了Keploy的力量，锻炼了您的编码肌肉，还玩得开心！现在，出去继续探索、创新和创造吧！记住，有了正确的工具和一点乐趣，一切皆有可能。😊🚀

编码愉快！✨👩‍💻👨‍💻✨