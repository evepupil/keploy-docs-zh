---
id: keploy-passthrough
title: Keploy 透传模式
sidebar_label: Keploy 透传模式
description: 本文档介绍如何重命名测试集
tags:
  - keploy
  - keploy passthrough
keywords:
  - keploy
  - 文档
  - 运行指南
---

通用依赖支持无法模拟某些配置请求，因为服务器会发送初始握手的请求缓冲区而非客户端库。这导致测试因依赖支持的流程差异而失败。

因此，用户可以指定服务器端口来透传外部请求而不进行模拟。

## Keploy 透传示例

您可以使用 `--passThroughPorts` 参数来透传指定端口的出站调用，使其通过 keploy 代理而不进行模拟。

### 录制命令

```zsh
sudo -E env 'PATH=$PATH' main.go record -c "java -jar path/to/user/jar" --passThroughPorts 5672,5432
```

### 测试命令

```zsh
sudo -E env 'PATH=$PATH' main.go test -c "java -jar path/to/user/jar" --delay 25  --passThroughPorts 5672,5432
```