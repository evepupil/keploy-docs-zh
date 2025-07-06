---
id: samples-typescript
title: Typescript 示例应用
sidebar_label: Typescript - Nhost
description: 以下示例应用用于测试 Keploy 与 Typescript 和 Nhost 的集成能力。
tags:
  - Typescript
  - Nhost
keyword:
  - Typescript
  - Nhost
  - API 测试生成器
  - 自动化测试用例生成
---

## 简介

这是一个使用 Typescript 和 Nhost 测试 Keploy 集成能力的示例应用。让我们立即开始吧！🎢

import InstallationGuide from '../concepts/installation.md'

<InstallationGuide/>

## 快速开始 🎬

### 设置应用

克隆仓库并通过以下命令安装必要依赖：

```bash
git clone https://github.com/keploy/samples-typescript && cd samples-typescript/ts-nhost
```

```bash
npm install
```

### 创建 .env 文件

创建包含 `HASURA_ADMIN_SECRET` 和 `GRAPHQL_ENDPOINT` 的 .env 文件（参考 ts-nhost/sample.env 文件）

生成 HASURA_ADMIN_SECRET 和 GRAPHQL_ENDPOINT 的步骤：

1. 访问 nhost
2. 注册/登录并创建新项目
3. 进入 Hasura 控制台并打开 Hasura（确保在下一步前保存好密钥）
4. 获取 `x-hasura-admin-secret` 和 `GraphQL Endpoint`，在 .env 中分别命名为 `HASURA_ADMIN_SECRET` 和 `GRAPHQL_ENDPOINT`

## 运行应用 📥

有两种方式可以运行此示例应用：

- [在 Linux/WSL 原生运行](#在-linuxwsl-原生运行)
- [使用 Docker 运行应用](#使用-docker-运行应用)

## 在 Linux/WSL 原生运行

我们将在 Linux 上直接设置示例应用，同时通过 Nhost 的 Hasura 提供 GraphQL 后端支持，并使用 Nhost 的云服务管理数据库。

准备好开始了吗？让我们轻松完成设置！🌟

### 开始记录测试：

```bash
sudo -E env "PATH=$PATH" keploy record -c 'ts-node src/app.ts'
```

`sudo -E`: 以提升的权限运行命令并保留用户环境。

`env "PATH=$PATH"`: 确保保留并使用当前 PATH 环境变量。

`keploy record`: 以记录模式调用 Keploy。

`-c 'ts-node src/app.ts`': 指定启动应用的命令（此处使用 ts-node 执行 TypeScript 应用入口）。

### 生成测试用例

1. 创建用户

```bash
curl --request POST \
      --url http://localhost:3000/users \
      --header 'Host: localhost:3000' \
      --header 'User-Agent: curl/8.6.0' \
      --header 'Accept: */*' \
      --header 'Content-Type: application/json' \
      --data '{
        "email": "a@gmail.com",
        "password": "123456789",
        "locale": "en",
        "displayName": "A"
      }'
```

2. 获取用户

```bash
    curl --request GET \
      --url http://localhost:3000/users \
      --header 'User-Agent: curl/8.6.0' \
      --header 'Accept: */*' \
      --header 'Content-Type: application/json' \
      --header 'Host: localhost:3000'

```

3. 删除用户

```bash
    curl --request DELETE \
      --url http://localhost:3000/users/<ID> \
      --header 'Host: localhost:3000' \
      --header 'User-Agent: curl/8.6.0' \
      --header 'Accept: */*' \
      --header 'Content-Type: application/json'
```

我们已成功捕获 API 调用！

查看 **Keploy 目录**，您将在 `test-1.yml` 和 `mocks.yml` 中找到生成的测试用例。

以下是 YAML 文件的示例：

```bash
version: api.keploy.io/v1beta1
kind: Http
name: test-1
spec:
    metadata: {}
    req:
        method: POST
        proto_major: 1
        proto_minor: 1
        url: http://localhost:3000/users
        header:
            Accept: '*/*'
            Content-Length: "113"
            Content-Type: application/json
            Host: localhost:3000
            User-Agent: curl/8.6.0
        body: |-
            {
                "email": "arpit@gmail.com",
                "password": "123456789",
                "locale": "en",
                "displayName": "Arpit"
              }
        timestamp: 2024-07-31T21:13:23.94427882Z
    resp:
        status_code: 200
        header:
            Access-Control-Allow-Origin: '*'
            Connection: keep-alive
            Content-Length: "142"
            Content-Type: application/json; charset=utf-8
            Date: Wed, 31 Jul 2024 21:13:24 GMT
            Etag: W/"8e-qRQmCOp8z1PPQCp1OFSshzkDzmQ"
            Keep-Alive: timeout=5
            X-Powered-By: Express
        body: '{"message":"Successfully created a user","user":{"id":"f14a7f34-c7c6-4c60-a81f-7ca895e08af0","displayName":"Arpit","email":"arpit@gmail.com"}}'
        status_message: OK
        proto_major: 0
        proto_minor: 0
        timestamp: 2024-07-31T21:13:27.09463946Z
    objects: []
    assertions:
        noise:
            header.Date: []
    created: 1722460407
curl: |-
    curl --request POST \
      --url http://localhost:3000/users \
      --header 'Host: localhost:3000' \
      --header 'User-Agent: curl/8.6.0' \
      --header 'Accept: */*' \
      --header 'Content-Type: application/json' \
      --data '{
        "email": "arpit@gmail.com",
        "password": "123456789",
        "locale": "en",
        "displayName": "Arpit"
      }'
```

### 运行测试用例

现在，让我们测试并再次以测试模式运行 Keploy：

```bash
sudo -E env "PATH=$PATH" keploy test -c 'ts-node src/app.ts' --delay 10
```

太棒了！！我们的测试用例已通过 🌟

您将在终端中看到测试用例运行的摘要！

现在您可以尝试不同的 API 调用并调整响应！

## 使用 Docker 运行应用

我们将使用 Docker compose 在 Docker 容器中运行应用和 GraphQL。

### 捕获测试用例

我们将以记录模式运行 Keploy，并使用 docker-compose 启动应用：

```bash
keploy record -c "sudo docker-compose up" --containerName "ts-nhost"
```

<img src="/docs/img/wsl-record-ts.png" alt="Sample Keploy Record TS Nhost" width="100%" style={{ borderRadius: '5px' }} />

### 生成测试用例

让我们生成测试用例。

使用 Hoppscotch、Postman 或 cURL 命令发起 API 调用。Keploy 将捕获这些调用以生成包含测试用例和数据模拟的测试套件。

1. 创建用户

```bash
curl --request POST \
      --url http://localhost:3000/users \
      --header 'Host: localhost:3000' \
      --header 'User-Agent: curl/8.6.0' \
      --header 'Accept: */*' \
      --header 'Content-Type: application/json' \
      --data '{
        "email": "arpit@gmail.com",
        "password": "123456789",
        "locale": "en",
        "displayName": "Arpit"
      }'
```

2. 获取用户

```bash
    curl --request GET \
      --url http://localhost:3000/users \
      --header 'User-Agent: curl/8.6.0' \
      --header 'Accept: */*' \
      --header 'Content-Type: application/json' \
      --header 'Host: localhost:3000'
```

3. 删除用户

```
    curl --request DELETE \
      --url http://localhost:3000/users/<ID> \
      --header 'Host: localhost:3000' \
      --header 'User-Agent: curl/8.6.0' \
      --header 'Accept: */*' \
      --header 'Content-Type: application/json'
```

### 运行测试用例

让我们运行捕获的测试用例：

```bash
keploy test -c 'sudo docker-compose up' --containerName "ts-nhost" --delay 10
```

响应应如下所示！

<img src="/docs/img/wsl-test-ts.png" alt="Sample Keploy Test TS Nhost" width="100%" style={{ borderRadius: '5px' }} />

<img src="/docs/img/wsl-test-summary-ts.png" alt="Sample Keploy TS Nhost Summary" width="100%" style={{ borderRadius: '5px' }} />

## 总结 🎉

🎉 **恭喜您完成这一里程碑！** 🎉

您已成功测试工具并创建模拟和测试用例——做得太棒了！现在您已打下坚实基础，是时候进一步提升成就了。

祝您在项目中不断创新，达到新高度！🚀

希望这对您有所帮助，如果仍有疑问，请联系我们。

import GetSupport from '../concepts/support.md'

<GetSupport/>