---
id: integration
title: Go集成指南 (v1.0.0)
description: 将Keploy Go SDK添加到您的应用程序中。
tags:
  - 开发者指南
  - go
---

### 获取SDK

将[Keploy Go SDK](https://github.com/keploy/go-sdk)添加到您的项目：

```bash
go get -u github.com/keploy/go-sdk
```

或克隆Go SDK仓库到指定目录：

```bash
git clone git@github.com:keploy/go-sdk.git
```

## 集成步骤

```go
import(
    "github.com/keploy/go-sdk/keploy"
    "github.com/keploy/go-sdk/integrations/<package_name>"
)
```

创建应用实例

```go
k := keploy.New(keploy.Config{
     App: keploy.AppConfig{
         Name: "<应用名称>",
         Port: "<应用端口>",
     },
     Server: keploy.ServerConfig{
         URL: "<keploy_host>",
         LicenseKey: "<license_key>", //托管服务可选
     },
    })
```

{'<'}details{'>'}{'<'}summary{'>'} 示例 {'<'}/summary{'>'}

```go
port := "6789"
 k := keploy.New(keploy.Config{
     App: keploy.AppConfig{
         Name: "my-app",
         Port: port,
     },
     Server: keploy.ServerConfig{
         URL: "http://localhost:6789/api",
     },
 })
```

{'<'}/details{'>'}

现在可以封装路由、HTTP客户端及数据库等外部依赖。

## 封装依赖项

import SupportedFrameworks from './supported-frameworks.md'

<SupportedFrameworks/>

### SDK模式

[了解更多](../concepts/what-are-keploy-sdk-modes.md)关于SDK模式的信息

### Go SDK技术参考文档在哪？

[Keploy Go SDK API参考](https://pkg.go.dev/github.com/keploy/go-sdk)发布于[pkg.go.dev](https://pkg.go.dev/github.com/keploy/go-sdk)