---
id: java-spring-boot-mongo
title: 使用Spring-Boot和MongoDB构建的示例REST API
sidebar_label: 魔药应用(MongoDb)
description: 这个CRUD应用用于管理Keploy库存中魔法药水的数据。
tags:
  - java
  - spring-jpa
  - java框架
  - 快速入门
  - 示例
  - 教程
  - mongodb
keyword:
  - MongoDB
  - Maven
  - Springboot框架
  - Postgres
  - SQL
  - Java
  - API测试生成器
  - 自动化测试用例生成
  - Junit
---

## 简介

🪄 深入REST API的世界，看看Keploy如何无缝集成[Spring-Boot](https://github.com/spring-projects/spring-boot)和MongoDB。系好安全带，这将是一段有趣的旅程！🎢

## 先决条件 🛠️

- 安装JDK并设置JAVA_HOME环境变量
- 安装[Maven](https://maven.apache.org/install.html)
- 安装[Docker](https://docs.docker.com/engine/install/)

## 开始吧！🎬

### 设置Mongo数据库

创建docker网络 -

```bash
docker network create backend
```

启动MongoDB实例 -

```bash
docker run -p 27017:27017 --name spring-boot-mongo --network backend mongo
```

### 克隆示例REST API CRUD应用 🧪

```bash
git clone https://github.com/keploy/samples-java.git && cd samples-java/spring-boot-mongo
mvn wrapper:wrapper
./mvnw clean install
```

> **注意**：Windows用户请使用`mvnw.cmd clean install`

## 安装Keploy 📥

首先，如果您在Windows上使用WSL，请使用以下命令在用户主目录启动wsl：

```bash
wsl ~
```

好了，让我们获取**最新版Keploy二进制文件**：

```bash
curl --silent --location "https://github.com/keploy/keploy/releases/latest/download/keploy_linux_amd64.tar.gz" | tar xz -C /tmp

sudo mkdir -p /usr/local/bin && sudo mv /tmp/keploy /usr/local/bin && keploy
```

如果一切顺利，您的屏幕应该会显示类似这样的内容：

<img src="/docs/img/code-snippets/install-keploy-logs.png" alt="测试用例生成器" width="50%" />

## 运行应用

我们将在Linux上直接运行示例应用，但为了让事情更有趣，我们会让数据库(MongoDB)运行在Docker上。准备好了吗？让我们开始吧！🎉

### 📼 开始录制！

准备开始录制：

```bash
keploy record -c "./mvnw spring-boot:run"
```

好了，魔法师！应用已经启动运行，让我们创建一些测试用例。魔法咒语？就是发送一些API请求！可以使用Postman、Hoppscotch或经典的curl - 选择您的魔法杖吧。

### 生成测试用例

要生成测试用例，我们只需要**发送一些API请求**。

**1. 发送POST请求**

```bash
curl --location 'http://localhost:8080/potions' \
--header 'Content-Type: application/json' \
--data '    {
      "name": "力量药水 v2",
      "description": "暂时增强饮用者的体力。",
      "bottle": 3,
      "quantity": 150
  }'
```

**2. 发送GET请求**

```bash
curl --location --request GET 'http://localhost:8080/potions'
```

> 记下`id`并在后续API请求中用这个`id`替换`UUID_OF_POTION`！

**3. 发送PUT请求**

```bash
  curl --location --request PUT 'http://localhost:8080/potions/UUID_OF_POTION' \
  --header 'Content-Type: application/json' \
  --data '    {
        "name": "力量药水",
        "description": "暂时增强饮用者的体力。",
        "bottle": 5,
        "quantity": 200
    }'
```

**4. 发送GET请求**

```bash
curl --location --request GET 'http://localhost:8080/potions/UUID_OF_POTION'
```

**5. 发送DELETE请求**

```bash
curl --location --request DELETE 'http://localhost:8080/potions/UUID_OF_POTION'
```

给自己一个鼓励！通过这个简单的魔法，您已经创建了带有模拟数据的测试用例！查看**Keploy目录**，您会在`test-x.yml`和`mocks.yml`中找到您的工作成果。

想看看一切是否如预期般工作吗？

### 运行测试 🏁

准备好测试您的魔法了吗？

```bash
keploy test -c "./mvnw spring-boot:run" --delay 15
```

这将在当前工作目录的`Keploy/reports`目录中运行测试并生成报告。

最后想说的是？深入探索！尝试不同的API调用，修改`mocks.yml`中的数据库响应，或者调整`test-x.yml`中的请求或响应。我们在[potions.json](https://github.com/keploy/samples-java/blob/main/spring-boot-mongo/potions.json)中提供了一些数据。再次运行测试，见证魔法发生！✨👩‍💻👨‍💻✨

## 总结 🎉

恭喜您完成这段旅程！您已经见识了Keploy的强大功能，锻炼了编码能力，还获得了一些乐趣！现在，继续探索、创新和创造吧！记住，有了合适的工具和一点乐趣，一切皆有可能。😊🚀

希望这对您有所帮助，如果还有任何问题，请联系我们。

import GetSupport from '../concepts/support.md'

<GetSupport/>