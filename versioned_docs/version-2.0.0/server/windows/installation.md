---
id: installation
title: Windows 安装指南
sidebar_label: Windows
tags:
  - hello-world
  - windows
  - ebpf
  - installation
  - install
  - installation-guide
  - server-setup
keywords:
  - hello-world
  - windows
  - ebpf
  - installation
  - guide
  - api
  - docker
---

Keploy 提供两种安装方式：

1. [一键安装](#one-click-install-keploy)
2. [手动安装](#manual-install)

## 一键安装 Keploy

```shell
 curl --silent -O https://keploy.io/install.sh && source install.sh
```

## 手动安装

在 Windows 系统中有两种使用 Keploy eBPF 的方式：

1. [原生 Windows 环境](#windows-native)（通过 WSL）
2. [使用 Docker 容器](#using-docker)

## 原生 Windows 环境

### 下载 Keploy 二进制文件

Windows 系统需要通过 WSL 运行 Keploy 二进制文件。您的系统需满足 Windows 10 版本 2004 及以上（内部版本 19041 及以上）或 Windows 11。

```shell
wsl --install -d <发行版名称>
```

推荐使用 "Ubuntu-22.04"

该命令将启用 WSL 所需功能并安装 Ubuntu Linux 发行版（可更改默认发行版）。

如需旧版系统或分步安装指导，请参考 WSL 旧版手动安装步骤。

安装完成后，通过以下命令下载 Keploy 二进制文件：

```shell
curl --silent --location "https://github.com/keploy/keploy/releases/latest/download/keploy_linux_amd64.tar.gz" | tar xz -C /tmp

sudo mkdir -p /usr/local/bin && sudo mv /tmp/keploy /usr/local/bin && keploy
```

#### 运行录制模式

在终端执行以下命令开始录制 API 调用：

```shell
sudo -E keploy record -c "应用程序二进制文件路径"
```

使用 [Postman](https://www.postman.com/) 或 cURL 命令发起 API 调用。

Keploy 将捕获这些 API 调用，生成包含测试用例和数据模拟的 `YAML` 格式测试套件。

#### 运行测试模式

在终端执行以下命令运行测试用例并生成覆盖率报告：

```shell
sudo -E keploy test -c "应用程序二进制文件路径" --delay 10
```

恭喜！🧑🏻‍💻 服务已成功运行！

---

## 使用 Docker 容器

### 为 WSL 2 配置 Docker Desktop

1. 从[官网](https://docs.docker.com/desktop/windows/install/)下载 Docker Desktop for Windows

在 Windows 上使用 Docker Desktop 和 WSL 2 开发时，必须配置 Docker Desktop 允许 WSL 2 发行版访问 Docker 守护进程。这种配置能实现 Windows 环境、WSL 2 Linux 发行版与 Docker 的无缝集成。

默认情况下，Docker Desktop 可能未配置为支持所有 WSL 2 发行版。正确配置后，您可以直接在 WSL 2 环境中运行 Docker 命令，获得更接近原生 Linux 的开发体验。

> 此配置对 Keploy 在 WSL 2 环境中正常运行至关重要，因为其需要与 Docker 守护进程交互来管理容器和网络。

详细配置指南请参考 [Docker 官方文档](https://docs.docker.com/desktop/wsl/)。

### 创建别名

由于使用 Docker，我们需要为 Keploy 创建自定义网络，这样应用容器之间可以通过 `docker network` 建立桥接。

如果使用 **docker-compose 网络**，请将下方命令中的 `keploy-network` 替换为您的应用网络名称。

```shell
docker network create keploy-network
```

#### 运行录制模式

开始录制测试用例：

```shell
keploy record -c "docker run -p <应用端口>:<主机端口> --name <容器名称> --network keploy-network --rm <应用镜像>" --containerName "<容器名称>" --delay 10
```

#### 运行测试模式

运行已录制的测试用例：

```shell
keploy test -c "docker run -p <应用端口>:<主机端口> --name <容器名称> --network keploy-network --rm <应用镜像>" --containerName "<容器名称>" --delay 20
```

> **CMD_to_run_user_container** 是运行应用的 docker 命令。
> 如果使用 `docker compose` 启动应用，则必须指定 `--containerName` 参数。

恭喜！🧑🏻‍💻 服务已成功运行！

您可以在控制台查看测试结果报告，同时本地 `testReport` 目录也会保存测试报告。

**注意事项**

1. 测试模式必须设置 `delay` 参数
2. 使用 `Docker run` 命令时可省略 containerName 参数，因为容器名称已包含在命令中