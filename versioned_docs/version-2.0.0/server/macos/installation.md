---
id: installation
title: MacOS 安装指南
sidebar_label: MacOS
tags:
  - hello-world
  - macos
  - ebpf
  - installation
  - install
  - installation-guide
  - server-setup
keywords:
  - hello-world
  - macos
  - apple
  - ebpf
  - installation
  - guide
  - api
  - docker
---

目前有两种方式在 MacOS 上使用 Keploy eBPF：[使用 Colima](#使用-colima) 和 [使用 Docker Desktop](#使用-docker-desktop)。

在 MacOS 上安装 Keploy eBPF 有两种方法，您可以选择：

1. [一键安装](#一键安装-keploy)
2. [手动设置](#使用-docker-desktop)

## 一键安装 Keploy

```shell
 curl --silent -O -L https://keploy.io/install.sh && source install.sh
```

## 使用 Docker Desktop

注意：要通过 [Docker](https://docs.docker.com/desktop/release-notes/#4252) 在 MacOS 上运行 Keploy，版本必须为 `4.25.2` 或更高。

### 创建 Docker 卷和网络

我们需要创建 debug 卷来使用 Docker-Desktop 运行 Keploy：

```shell
docker volume create --driver local --opt type=debugfs --opt device=debugfs debugfs
```

由于我们使用 Docker，需要为 Keploy 创建一个自定义网络，因此应用容器需要 `docker network` 作为它们之间的桥梁。

如果您使用 **docker-compose 网络**，请将下面的 `keploy-network` 替换为您的应用的 `docker_compose_network_name`。

```shell
docker network create keploy-network
```

## 使用 Colima

### 安装 Colima

您需要在系统上安装最新版本的 `brew`，然后在终端中运行以下命令：

```shell
brew install colima
```

以默认配置启动 Colima

```shell
colima start
```

### 创建别名

由于我们使用 Docker，需要为 Keploy 创建一个自定义网络，因此应用容器需要 `docker network` 作为它们之间的桥梁。

如果您使用 **docker-compose 网络**，请将下面的 `keploy-network` 替换为您的应用的 `docker_compose_network_name`。

```shell
docker network create keploy-network
```

### 记录测试用例和数据模拟

在开始记录前，请注意以下几点：

- 如果您通过 **docker compose** 运行，请确保在 docker-compose.yaml 文件中将 `<CONTAINER_NAME>` 包含在您的应用服务下，[参考示例](https://github.com/keploy/samples-python/blob/9d6cf40da2eb75f6e035bedfb30e54564785d5c9/flask-mongo/docker-compose.yml#L14)。
- 如果您修改了网络名称，请将 `--network` 标志从 `keploy-network` 改为您的自定义网络名称。
- `Docker_CMD_to_run_user_container` 指的是启动应用的 Docker **命令**。

使用 keploy 捕获测试用例。在应用的**根目录**下**执行**以下命令。

```shell
keploy record -c "docker run -p <appPort>:<hostPort> --name <containerName> --network keploy-network --rm <applicationImage>" --containerName "<containerName>" --delay 10
```

使用 [Postman](https://www.postman.com/) 或 cURL 命令发起 API 调用。

Keploy 将捕获您进行的 API 调用，并生成包含**测试用例 (KTests) 和数据模拟 (KMocks)** 的测试套件，格式为 `YAML`。

### 运行测试用例

现在，执行测试用例。在应用的**根目录**下按照以下步骤操作。

当使用 **docker-compose** 启动应用时，请确保 `--containerName` 参数与 `docker-compose.yaml` 文件中的容器名称匹配。

```shell
keploy test -c "docker run -p <appPort>:<hostPort> --name <containerName> --network keploy-network --rm <applicationImage>" --containerName "<containerName>" --delay 20
```

恭喜！ 🧑🏻‍💻 我们已经成功运行了包含数据模拟的测试！ 🐰🎉

您可以在控制台以及本地的 `testReport` 目录中看到运行的测试用例及其结果报告。

注意事项：
1. 使用测试模式时，必须设置 `delay` 参数。
2. 如果使用 `Docker run` 命令，`containerName` 是可选的，因为容器名称会包含在命令中。