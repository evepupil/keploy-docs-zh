---
id: installation
title: Linux 安装指南
sidebar_label: Linux
tags:
  - hello-world
  - linux
  - ebpf
  - installation
  - install
keywords:
  - hello-world
  - ebpf
  - installation
  - install
  - ubuntu
  - linux
  - API Test generator
  - Auto Testcase generation
  - installation-guide
  - server-setup
---

Keploy 提供两种安装方式：

1. [一键安装](#one-click-install-keploy)
2. [手动安装](#manual-install)

## 一键安装 Keploy

```shell
 curl --silent -O -L https://keploy.io/install.sh && source install.sh
```

## 手动安装

在 Linux 系统中，可以通过以下两种方式使用 Keploy eBPF：

1. [原生安装](#linux-native)
2. [使用 Docker](#using-docker)

## Linux 原生安装

### 下载 Keploy 二进制文件

```shell
curl --silent --location "https://github.com/keploy/keploy/releases/latest/download/keploy_linux_amd64.tar.gz" | tar xz -C /tmp

sudo mkdir -p /usr/local/bin && sudo mv /tmp/keploy /usr/local/bin && keploy
```

<details>
 <summary> <strong> ARM 架构 </strong> </summary>

```shell
curl --silent --location "https://github.com/keploy/keploy/releases/latest/download/keploy_linux_arm64.tar.gz" | tar xz -C /tmp

sudo mkdir -p /usr/local/bin && sudo mv /tmp/keploy /usr/local/bin && keploy
```

</details>

#### 运行录制模式

在终端执行以下命令开始录制 API 调用：

```shell
sudo -E keploy record -c "CMD_TO_RUN_APP"
```

使用 [Postman](https://www.postman.com/) 或 cURL 命令发起 API 调用。

Keploy 将捕获这些 API 调用并生成测试套件，其中包含测试用例和模拟数据，存储为 `YAML` 格式。

#### 运行测试模式

在终端执行以下命令运行测试用例并生成测试覆盖率报告：

```shell
sudo -E keploy test -c "CMD_TO_RUN_APP" --delay 10
```

恭喜！🧑🏻‍💻 服务已成功运行！

---

## 使用 Docker 安装

由于使用 Docker，我们需要创建一个专用网络，使应用容器之间能通过 `docker network` 桥接通信。

如果使用 **docker-compose 网络**，请将下方 `keploy-network` 替换为你的应用 `docker_compose_network_name`。

```shell
docker network create keploy-network
```

#### 录制测试用例

现在开始录制测试用例：

```shell
keploy record -c "docker run -p <appPort>:<hostPort> --name <containerName> --network keploy-network --rm <applicationImage>" --containerName "<containerName>" --delay 10
```

#### 运行测试用例

现在开始测试录制好的用例：

```shell
keploy test -c "docker run -p <appPort>:<hostPort> --name <containerName> --network keploy-network --rm <applicationImage>" --containerName "<containerName>" --delay 20
```

> **CMD_to_run_user_container** 是运行应用的 docker 命令。
> 如果使用 `docker compose` 命令启动应用，则必须指定 `--containerName` 参数。

恭喜！🧑🏻‍💻 服务已成功运行！

你可以在控制台查看测试结果报告，同时本地 `testReport` 目录也会保存测试报告。

**注意事项**

1. 测试模式必须设置 `delay` 参数
2. 如果使用 `Docker run` 命令，可省略 `containerName` 参数（因为容器名已包含在命令中）