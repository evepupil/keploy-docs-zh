---
id: time-freezing
title: 时间冻结
sidebar_label: 时间冻结 🥶
tags:
  - 功能说明
  - 特性指南
  - jwt
  - 时间敏感字段
keywords:
  - 时间冻结
  - keploy cloud
  - jwt
  - 时间敏感字段
---

## 为什么需要时间冻结？ ❄️

在编写测试时，**像JWT令牌这样的时间敏感对象会带来挑战**，因为它们会过期导致测试失败。这会增加测试套件的维护成本，同时影响可靠性。

## 什么是时间冻结？ ⏳

通过Keploy Cloud，用户能够在每次测试运行时**将时间冻结/回滚到测试用例录制时的状态**。

这使得开发者可以确保时间敏感对象不会过期或改变，**让测试保持一致性并更加可靠**。

## 使用方法 🛠️

### 在Linux或Windows(WSL)上运行 🐧💻

对于原生Linux、Windows(WSL)环境，只需在运行测试时**添加`--freezeTime`标志**，例如：

```bash
keploy test -c "<appCmd>" --freezeTime
```

搞定！现在你的测试将在时间冻结模式下运行。

### 在Docker中运行 🐳

对于基于Docker的应用，你需要对Dockerfile进行一些调整来使用此功能：

1. 首先检查系统架构

```sh
uname -a
```

2. 下载对应架构的时间冻结代理，并在Dockerfile中设置`LD_PRELOAD`环境变量

### 对于Golang(Go)应用 -

> 注意：时间冻结功能仅支持到go **1.22.x**版本。

#### amd64/x86_64架构 🖥️

```Dockerfile
# 下载时间冻结代理
ADD https://keploy-enterprise.s3.us-west-2.amazonaws.com/releases/latest/assets/go_freeze_time_amd64 /lib/keploy/go_freeze_time_amd64

# 设置适当权限
RUN chmod +x /lib/keploy/go_freeze_time_amd64

# 运行二进制文件
RUN /lib/keploy/go_freeze_time_amd64

# 使用假时间构建你的二进制文件(测试模式下)
RUN go build -tags=faketime <your_main_file>

```

或

#### arm64/aarch64架构 📱

```Dockerfile
# 下载时间冻结代理
ADD https://keploy-enterprise.s3.us-west-2.amazonaws.com/releases/latest/assets/go_freeze_time_arm64 /lib/keploy/go_freeze_time_arm64

# 设置适当权限
RUN chmod +x /lib/keploy/go_freeze_time_arm64

# 运行二进制文件
RUN /lib/keploy/go_freeze_time_arm64

# 使用假时间构建你的二进制文件(测试模式下)
RUN go build -tags=faketime <your_main_file>
```

3. 仅在<u>**测试模式**</u>下为构建脚本添加`faketime`标签
4. 重新构建Docker镜像
5. 现在运行Keploy测试时**添加`--freeze-time`标志**，例如：

```bash
keploy test -c "<appCmd>" --freeze-time
```

搞定！现在你的测试将在时间冻结模式下运行。

### 对于Node/Java/Python应用 -

#### amd64/x86_64架构 🖥️

```Dockerfile
# 下载时间冻结代理
ADD https://keploy-enterprise.s3.us-west-2.amazonaws.com/releases/latest/assets/freeze_time_amd64.so /lib/keploy/freeze_time_amd64.so

# 设置适当权限
RUN chmod +x /lib/keploy/freeze_time_amd64.so

# 设置LD_PRELOAD环境变量使用freeze_time_amd64.so
ENV LD_PRELOAD=/lib/keploy/freeze_time_amd64.so
```

或

#### arm64/aarch64架构 📱

```Dockerfile
# 下载时间冻结代理
ADD https://keploy-enterprise.s3.us-west-2.amazonaws.com/releases/latest/assets/freeze_time_arm64.so /lib/keploy/freeze_time_arm64.so

# 设置适当权限
RUN chmod +x /lib/keploy/freeze_time_arm64.so

# 设置LD_PRELOAD环境变量使用freeze_time_arm64.so
ENV LD_PRELOAD=/lib/keploy/freeze_time_arm64.so
```

3. 重新构建Docker镜像
4. 现在运行Keploy测试时**添加`--freeze-time`标志**，例如：

```bash
keploy test -c "<appCmd>" --freeze-time
```

搞定！现在你的测试将在时间冻结模式下运行。