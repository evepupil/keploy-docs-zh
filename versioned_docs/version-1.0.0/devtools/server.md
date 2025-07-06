---
id: server-contrib-guide
title: 为 Keploy 服务器做贡献 (v1.0.0)
label: 服务器贡献指南
description: 本贡献指南帮助开发者在本地搭建 Keploy 后端服务器。
keywords:
  - SDK
  - Docker Compose
  - Dockerfile
  - GraphQL
  - Docker
---

我们提供了一个单独的 docker-compose 文件 `docker-compose-dev.yaml`，它可以帮助暴露 mongo 服务器，并从本地代码构建 dockerfile。`build` 标志确保二进制文件会重新构建以反映最新的代码变更。另外还有 `docker-compose-debug.yaml` 文件，可用于在 40000 端口远程调试 go 服务器。

```shell
docker-compose -f docker-compose-dev.yaml up --build
```

如果不使用 docker，可以直接构建并运行 keploy 服务器。请确保通过 `KEPLOY_MONGO_URI` 环境变量提供 Mongo 连接字符串。同时确保 `ENABLE_TEST_EXPORT=false`，因为默认情况下它是 `true`，这样在 UI 中将无法看到测试用例数据，如果不想导出测试用例，请将其设为 `false`。

```shell
export KEPLOY_MONGO_URI="mongodb://mongo:27017"
export ENABLE_TEST_EXPORT=false
go run cmd/server/main.go
```

Keploy 基于 [gqlgen](https://github.com/99designs/gqlgen) 为前端提供 GraphQL API。修改 schema 文件 `graph/schema.graphqls` 后，可以使用以下命令自动生成 graphQL 处理器 `graph/schema.resolvers.go`：

```shell
go generate ./...
```

注意：由于我们遵循约定式提交 (conventional commits)，因此鼓励您在提交时也遵循这一规范。您可以在这里了解更多相关信息。