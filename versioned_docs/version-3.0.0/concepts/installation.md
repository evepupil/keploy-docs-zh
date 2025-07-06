---
id: installation
title: Keploy 安装指南
sidebar_label: 安装
tags:
  - linux
  - ebpf
  - installation
  - install
keywords:
  - ebpf
  - installation
  - install
  - ubuntu
  - linux
  - windows
  - API 测试生成器
  - 自动化测试用例生成
  - 安装指南
  - 服务器配置
---

import PlatformRequirements from '../concepts/platform-requirements.md'

<PlatformRequirements/>

# Keploy 安装指南

## 通过 CLI 快速安装

首先通过以下命令设置 Keploy 别名：

```bash
 curl --silent -O -L https://keploy.io/install.sh && source install.sh
```

您将看到类似输出：

```bash
       ▓██▓▄
    ▓▓▓▓██▓█▓▄
     ████████▓▒
          ▀▓▓███▄      ▄▄   ▄               ▌
         ▄▌▌▓▓████▄    ██ ▓█▀  ▄▌▀▄  ▓▓▌▄   ▓█  ▄▌▓▓▌▄ ▌▌   ▓
       ▓█████████▌▓▓   ██▓█▄  ▓█▄▓▓ ▐█▌  ██ ▓█  █▌  ██  █▌ █▓
      ▓▓▓▓▀▀▀▀▓▓▓▓▓▓▌  ██  █▓  ▓▌▄▄ ▐█▓▄▓█▀ █▓█ ▀█▄▄█▀   █▓█
       ▓▌                           ▐█▌                   █▌
        ▓

Keploy CLI

可用命令：
  example           通过keploy记录和测试的示例
  config --generate 生成keploy配置文件
  record            记录API调用的测试用例
  test              运行记录的测试用例并执行断言
  update            更新Keploy

标志：
      --debug     调试模式运行
  -h, --help      显示帮助信息
  -v, --version   显示版本信息

使用 "keploy [命令] --help" 获取命令详情。
```

🎉 恭喜！您已成功安装Keploy。

## 其他安装方式

<details>
<summary>使用Docker安装</summary>

### 通过Docker运行Keploy

#### macOS系统

注意：Keploy不原生支持MacOS，可通过以下方式使用Docker运行

1. 打开终端窗口

2. 创建Docker桥接网络：

```bash
docker network create keploy-network
```

3. 运行以下命令启动Keploy容器：

```bash
alias keploy="docker run --name keploy-v2 -p 16789:16789 --network keploy-network --privileged --pid=host -v $(pwd):$(pwd) -w $(pwd) -v /sys/fs/cgroup:/sys/fs/cgroup -v /sys/kernel/debug:/sys/kernel/debug -v /sys/fs/bpf:/sys/fs/bpf -v /var/run/docker.sock:/var/run/docker.sock --rm ghcr.io/keploy/keploy"
```

</details>

<details>
<summary>原生环境安装</summary>

### 原生环境安装指南

**系统要求：**

- Linux内核版本5.15或更高
- 运行`uname -a`验证系统架构
- Windows系统需使用Ubuntu 20.04 LTS或更高版本的WSL

<summary>WSL/Linux AMD系统安装</summary>

#### WSL/Linux AMD系统

1. 打开终端会话
2. 运行以下命令下载安装：

```bash
curl --silent --location "https://github.com/keploy/keploy/releases/latest/download/keploy_linux_amd64.tar.gz" | tar xz --overwrite -C /tmp
sudo mkdir -p /usr/local/bin && sudo mv /tmp/keploy /usr/local/bin/keploy
```

#### WSL/Linux ARM系统

1. 打开终端会话
2. 运行以下命令下载安装：

```bash
curl --silent --location "https://github.com/keploy/keploy/releases/latest/download/keploy_linux_arm64.tar.gz" | tar xz --overwrite -C /tmp
sudo mkdir -p /usr/local/bin && sudo mv /tmp/keploy /usr/local/bin/keploy

```

> 注意：Keploy不原生支持MacOS系统

### WSL 2的Docker Desktop配置

1. 从[官网](https://docs.docker.com/desktop/windows/install/)安装Docker Desktop

在Windows系统使用Docker Desktop和WSL 2时，必须配置Docker Desktop允许WSL 2分发版访问Docker守护进程。这种配置能实现Windows环境、WSL 2 Linux分发版和Docker之间的无缝集成。

默认情况下，Docker Desktop可能不会自动配置支持所有WSL 2分发版。正确配置后，您可以直接在WSL 2环境中运行Docker命令，获得更接近原生Linux的开发体验。

> 此配置对Keploy在WSL 2环境中正常运行至关重要，因为它需要与Docker守护进程交互来有效管理容器和网络。
> 详细配置指南请参考[官方文档](https://docs.docker.com/desktop/wsl/)。

</details>