---
id: docker-tls
title: Docker TLS支持
sidebar_label: Docker TLS支持
description: 本文档介绍在通过docker运行keploy时如何使用TLS。
tags:
  - docker tls
  - docker
keywords:
  - docker
  - 文档
  - tls
  - 运行指南
---

### 记录测试用例和数据模拟 <img src="https://cdn4.iconfinder.com/data/icons/logos-and-brands/512/97_Docker_logo_logos-512.png" width="20" height="20"/>

1. 要记录测试用例和数据模拟，请在应用程序的**根目录**中按照以下步骤操作。确保满足以下先决条件：

- 如果通过**docker-compose**运行，请确保在docker-compose.yaml文件中将`<CONTAINER_NAME>`包含在应用服务下[示例](https://github.com/keploy/samples-python/blob/9d6cf40da2eb75f6e035bedfb30e54564785d5c9/flask-mongo/docker-compose.yml#L14)。
- 使用**docker run命令**时，必须确保所有容器都在同一网络运行（可通过`--network`参数指定自定义**网络名称**）。
- 在**Docker Compose**文件中，所有容器应运行在同一网络。
- `Docker_CMD_to_run_user_container`指启动应用的Docker**命令**。
- 按以下说明在Dockerfile中添加必要命令。

2. 在Dockerfile中添加以下命令以下载`ca.crt`文件和`setup_ca.sh`脚本。

```dockerfile
    # 安装ca-certificates包以使用系统证书（以下命令适用于Debian系统，其他发行版可能需要调整）
    RUN apt-get update && apt-get install -y ca-certificates
    # 下载ca.crt文件和setup_ca.sh脚本
    ADD  https://raw.githubusercontent.com/keploy/keploy/refs/heads/main/pkg/core/proxy/tls/asset/ca.crt ca.crt
    ADD https://raw.githubusercontent.com/keploy/keploy/refs/heads/main/pkg/core/proxy/tls/asset/setup_ca.sh setup_ca.sh
    # 为setup_ca.sh脚本添加执行权限
    RUN chmod +x setup_ca.sh

    # 运行CA设置脚本后启动应用服务
    CMD ["/bin/bash", "-c", "source ./setup_ca.sh && <your app running command>"]
```

要捕获测试用例，请在应用的**根目录**中**执行**以下命令。

```shell
keploy record -c "Docker_CMD_to_run_user_container --network <network_name>" --container-name "<container_name>"
```

使用[Postman](https://www.postman.com/)或cURL命令发起API调用。

Keploy将捕获已执行的API调用，生成包含**测试用例(KTests)和数据模拟(KMocks)**的测试套件，格式为`YAML`。

### 运行测试用例

要执行测试用例，请在应用程序的**根目录**中按照以下步骤操作。

当使用**docker-compose**启动应用时，需确保`--container-name`参数与`docker-compose.yaml`文件中的容器名称匹配。

```shell
keploy test -c "Docker_CMD_to_run_user_container --network <network_name>" --container-name "<container_name>" --delay 20
```

大功告成！🧑🏻‍💻 测试与数据模拟已成功运行！🐰🎉

您可以在控制台和本地的`testReport`目录中查看测试用例的执行结果报告。