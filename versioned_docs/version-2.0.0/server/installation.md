---
id: installation
title: Keploy 安装指南
sidebar_label: 安装
tags:
  - hello-world
  - linux
  - ebpf
  - installation
  - install
keywords:
  - hello-world
  - ebpf
  - 安装指南
  - 安装
  - ubuntu
  - linux
  - API 测试生成器
  - 自动化测试用例生成
  - 安装指南
  - 服务器配置
---

Keploy 使用 eBPF 技术拦截网络层的 API 调用，自动生成测试用例和模拟桩。

import InstallationGuide from '../concepts/installation.md'

<InstallationGuide/>

## 🎬 捕获测试用例

要开始记录 API 调用，请在终端执行以下命令：

```bash
keploy record -c "CMD_TO_RUN_APP"
```

例如，如果您使用简单的 Golang 程序，**CMD_TO_RUN_APP** 可能类似于：

```bash
keploy record -c "go run main.go"
```

## 🏃 运行测试用例

要运行测试用例并检查是否存在回归问题，请使用以下终端命令：

```bash
keploy test -c "CMD_TO_RUN_APP" --delay 10
```

查看[测试覆盖率生成指南](https://keploy.io/docs/server/sdk-installation/go/)了解如何与单元测试库结合查看测试覆盖率，以及[Keploy 运行指南](https://keploy.io/docs/running-keploy/configuration-file/)获取更多配置选项和优化建议。