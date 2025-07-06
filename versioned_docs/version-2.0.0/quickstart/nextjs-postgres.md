---
id: samples-nextjs
title: NextJs 示例应用
sidebar_label: NextJS + SQL
description: 以下示例应用用于测试 Keploy 与 NextJS、Drizzle 和 Postgres 的集成能力。
tags:
  - NextJs
  - Postgres
keyword:
  - NextJS
  - Postgres
  - API测试生成器
  - 自动化测试用例生成
---

## 简介

这是一个使用 NextJS 和 Postgres 配合 Drizzle ORM 来测试 Keploy 集成能力的示例应用。系好安全带，这将是一段有趣的旅程！🎢

import InstallationGuide from '../concepts/installation.md'

<InstallationGuide/>

## 开始使用！🎬

现在我们已经安装了 bun，接下来将设置我们的应用。

```bash
git clone https://github.com/keploy/samples-typescript && cd samples-typscript/nextjs-postgres

## 下载 node 模块
npm install

# 启动数据库实例
docker-compose up
```

## 安装 📥

- [使用 Docker 容器运行 Postgres 并在本地运行应用](#在-linuxwsl-上本地运行应用-)

## 在 Linux/WSL 上本地运行应用 🐧

我们将在 Linux 上直接运行示例应用，但为了让事情更有趣一点，我们会让数据库（Redis）运行在 Docker 上。准备好了吗？让我们开始派对吧！🎉

### 捕获测试用例

准备，设置，开始记录！方法如下：

```bash
sudo -E env PATH=$PATH keploy record -c 'npm run dev'
```

好了，魔术师！应用已经启动并运行，让我们编织一些测试用例。咒语是什么？发起一些 API 调用！

#### 生成测试用例

**1. 创建 Post 请求**

```sh
curl -X POST -H "Content-Type: application/json" -d '{"name":"John","email":"doe@example.com"}' http://localhost:3000/api/users
```

这将返回响应：

```json
{
  "users": [
    {
      "id": 3,
      "name": "John",
      "email": "doe@example.com",
      "createdAt": "2024-03-27T10:07:30.172Z"
    }
  ]
}
```

**2. 发起 Get 请求**

```sh
curl -X GET http://localhost:3000/api/users
```

![测试记录](../../../static/img/nextjs-postgres-record.png)

给自己一个鼓励吧！通过这个简单的咒语，你已经用模拟数据生成了测试用例！探索 **Keploy 目录**，你会在 `test-1.yml` 和 `mocks.yml` 中发现你的成果。

想看看一切是否如预期般工作吗？

### 运行测试

是时候进行测试了 🧪

```shell
sudo -E env PATH=$PATH keploy test -c "npm run dev" --delay 10
```

![测试记录](../../../static/img/nextjs-postgres-test.png)

> `--delay` 标志？哦，这只是为了让你的应用在测试用例到来之前稍作休息（以秒为单位）。

最后的想法？深入探索！尝试不同的 API 调用，在 `mocks.yml` 中调整数据库响应，或者在 `test-x.yml` 中修改请求或响应。再次运行测试，看看魔法如何展开！✨👩‍💻👨‍💻✨

### 总结 🎉

恭喜你完成了这段旅程！你已经见识了 Keploy 的强大，锻炼了编码能力，还享受了一些乐趣！现在，继续探索、创新和创造吧！记住，只要有合适的工具和一点乐趣，一切皆有可能。😊🚀

希望这对你有所帮助，如果还有任何问题，请联系我们。

import GetSupport from '../concepts/support.md'

<GetSupport/>