---
id: gin-mongo-2
title: 用户档案示例应用 (v1.0.0)
sidebar_label: Gin-Mongo 示例 2
tags:
  - quickstart
  - go
  - sdk
  - tutorial
keywords:
  - SDK
  - Docker
  - MongoDB
  - API测试
---

# 用户档案管理示例应用

一个在mongoDB中对用户进行CRUD（获取、创建、更新和删除）操作的示例应用。

## 安装

导航至[安装指南](../../server/server-installation.md)快速安装并运行keploy服务器。

### 本地启动Docker和MongoDB

1. 打开Docker应用
2. 运行命令`docker container run -it -p27017:27017 mongo`在本地启动MongoDB

### 启动用户档案示例应用

```
git clone https://github.com/keploy/samples-go
cd samples-go
cd users-profile
go get .
export KEPLOY_MODE=record
go run .
```

> export KEPLOY_MODE="record"将环境变量更改为记录测试用例

## 路由

> 示例应用端口: http://localhost:8080

- `/user` : POST - 在数据库中创建新用户
- `/user/:userId` : GET - 从数据库获取用户
- `/user/:userId` : PUT - 编辑数据库中的现有用户
- `/user/:userId` : DELETE - 从数据库中删除现有用户
- `/users` : GET - 从数据库获取所有用户

## 生成测试用例

要生成测试用例，您需要发起一些API调用。可以使用Thunder Client、Postman Desktop Agent或您偏好的API测试工具。

这里展示使用Thunder Client的请求示例：

- POST请求
  ![POST-请求](/img/POST-request.png)
- GET请求
  ![GET-请求](/img/GET-request.png)

完成后，您可以在Keploy服务器上看到如下测试用例：

![keploy测试用例](/img/keploy-test-cases.png)

## 生成测试运行

要生成测试运行，**关闭应用**并在_users-profile_目录下运行以下命令：

```
export KEPLOY_MODE=test
go test -v -coverpkg=./... -covermode=atomic  ./...
```

完成后，Keploy终端应显示如下：

![keploy测试运行](/img/keploy-test-runs.png)

## 检查MongoDB数据库

要检查数据库中实际变更的数据。打开MongoDB Compass并输入以下URI查看数据：

> mongodb://localhost:27017

\*在发起PUT请求时使用 - 用于获取用户的"id"

**用户档案示例到此结束！**