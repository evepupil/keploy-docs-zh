---
id: ui-contrib-guide
title: 为 Keploy UI 做贡献 (v1.0.0)
label: UI 贡献指南
description: 本贡献指南面向开发者，用于本地搭建 Keploy UI 开发环境。
keywords:
  - MongoDB
  - UI
  - 本地服务器
  - dockerfile
---

请确保使用 **Node 14.x.x 版本**

### 1. 启动 Keploy 服务器

我们准备了独立的 docker-compose 文件 `docker-compose-dev.yaml`，该文件会暴露 MongoDB 服务，并根据本地代码构建 Docker 镜像。`build` 参数确保二进制文件会重新构建以反映最新代码变更。另提供 `docker-compose-debug.yaml` 文件用于在 4000 端口远程调试 Go 服务。

```shell
git clone https://github.com/keploy/keploy.git && cd keploy
docker-compose -f docker-compose-dev.yaml up --build
```

### 2. 启动 Keploy 控制台/UI

```shell
git clone https://github.com/keploy/ui.git && cd ui
npm i
```

开发环境下，我们需要配置运行在 http://localhost:6789 的本地 Keploy 服务器作为 API 地址：

```shell
export GATSBY_API_URL=http://localhost:6789/api
```

现在启动 Gatsby 服务：

```shell
gatsby develop
```

若您修改了 UI/设计并需要测试数据，请在新目录克隆测试数据仓库：

```shell
git clone https://github.com/keploy/test-data.git && cd test-data
```

在 test-data 目录中执行：

#### 安装 mongo-database-tools

```
brew tap mongodb/brew
brew install mongodb-database-tools
```

#### 恢复数据库

```
mongorestore  dump/
```

此时您应该能在 UI 上看到测试数据。