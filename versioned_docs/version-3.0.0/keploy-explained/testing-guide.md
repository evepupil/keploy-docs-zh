---
id: testing-guide
title: 测试指南
sidebar_label: 测试指南
tags:
  - 说明文档
  - 运行指南
  - CI指南
  - 限制条件
---

# 测试指南 🧪

本文将介绍Keploy测试平台的工作原理，以及如何为Keploy的代码覆盖率做贡献。

## Keploy如何测试自身？

- Keploy的测试平台基于"Keploy可以测试自身"的原则构建，通过两种模式运行：`RECORD`（记录）和`TEST`（测试）。每种模式会激活代码库的不同部分，两者之间存在部分重叠。这些模式可以并发执行以提高测试效率。

- `keployR`和`keployT`是功能相同的二进制文件，仅命名不同以提高可读性。

- 举例来说，如果你已经为Go + MongoDB应用[keploy/samples-go/gin-mongo](https://github.com/keploy/samples-go/tree/native-linux/gin-mongo)录制了测试用例和模拟数据，测试平台允许你通过以下伪命令在记录模式(`keployR`)中运行测试模式(`keployT`)：`keployR record -c "keployT test -c ./gin-mongo-app`。该命令会启动记录模式的Keploy，继而运行测试模式的Keploy来执行应用。当`keployT`运行测试集时，它会为每个测试用例模拟API调用。这些模拟的API调用随后会被`keployR`记录为新的测试用例，同时应用产生的外部调用会被捕获为模拟数据。与此同时，`keployT`会生成测试运行的最终报告。这种方法实现了Keploy记录流和测试流的同步执行。

- 这种方法的主要优势在于，它无需在CI流水线中设置外部依赖进行测试。`KeployT`充当虚拟数据库，其调用会被`keployR`记录，从而简化测试流程。

## 运行指南

本指南介绍如何使用Keploy测试平台进行测试用例和模拟数据的录制与测试。

### 准备工作

- 通过[此链接](https://github.com/keploy/keploy?tab=readme-ov-file#-quick-installation)获取最新版Keploy，并使用`sudo mv usr/local/bin/keploy /usr/local/bin/keployR`将二进制文件重命名为`keployR`（发布版）

- 通过以下命令构建当前修改版本的Keploy二进制文件：

```bash
go build -tags=viper_bind_struct -cover -o keployB . && sudo mv keployB /usr/local/bin/keployB
```

- 现在你将拥有构建版和发布版两个Keploy二进制文件：`keployB`和`keployR`

- 准备一个应用（例如gin-mongo示例应用），录制至少两组测试用例。使用以下命令通过发布版Keploy录制测试和模拟数据：

```bash
sudo -E env PATH=$PATH keployR record -c "<running cmd of gin-mongo>"
```

- 你还需要安装[pilot](https://github.com/keploy/pilot)来断言测试结果和准备模拟数据：

```bash
curl --silent -o pilot --location "https://github.com/keploy/pilot/releases/latest/download/pilot_linux_amd64" &&
          sudo chmod a+x pilot && sudo mkdir -p /usr/local/bin && sudo mv pilot /usr/local/bin
```

- 要启用Keploy的测试模式，需要添加`--enableTesting`标志。

### 为何需要发布版和构建版两个二进制文件？

注意：此处`keployR`是发布版二进制文件，`keployB`是构建版二进制文件。
设计这两种使用场景：

1. 使用最新发布版Keploy录制测试和模拟数据，同时使用构建版Keploy进行测试：
   `keployR record -c "keployB test -c ./gin-mongo-app`

2. 使用最新发布版Keploy进行测试，同时使用构建版Keploy录制测试和模拟数据：
   `keployB record -c "keployR test -c ./gin-mongo-app`

这两种场景旨在检测变更，包括可能影响向后兼容性的重大变更或调整。

### 通过测试平台录制和测试

本指南目前仅展示第一种场景，要运行第二种场景只需按照**第4步**说明替换二进制文件。

#### 录制阶段 🎥

1. 假设你已经录制了gin-mongo应用的测试和模拟数据，我们称之为**预录制**测试。

2. 要通过测试平台录制测试和模拟数据，需要为每个测试集运行以下命令：

```bash
sudo -E env PATH=$PATH keployR record -c "sudo -E env PATH=$PATH keployB test -c '<binary of gin-mongo>' --proxyPort 56789 --dnsPort 46789  --delay=<delay> --testsets <test-set-id> --configPath '<config-path>' --path '<path-to-pre-recorded-tests>' --enableTesting --generateGithubActions=false" --path "./test-bench/" --proxyPort=36789 --dnsPort 26789 --configPath '<config-path>' --enableTesting --generateGithubActions=false
```

3. 上述命令将从你的**预录制**测试和模拟数据生成新的测试和模拟数据。

4. 对于第二种场景，只需用`keployB`录制，用`keployR`测试。

#### 测试阶段 🧪

1. **_断言测试结果_**

此步骤通过pilot比较**预录制**和**测试平台录制**的HTTP请求和响应来验证测试结果，会根据配置文件考虑噪声字段。

```bash
pilot -test-assert -preRecPath <path-to-pre-recorded-tests> -testBenchPath ./test-bench -configPath <path-to-config-file>
```

2. **_准备模拟数据断言_**

通过将新录制的模拟数据与预录制的相互验证，可以确认新模拟数据的有效性。Keploy独特地将每个请求和响应的时间戳纳入测试(ingress)，并与模拟数据(egress)的时间戳进行比较，从而降低不匹配概率。

```bash
pilot -mock-assert -preRecPath <path-to-pre-recorded-tests> -testBenchPath ./test-bench -configPath <path-to-config-file>
```

3. **_执行实际模拟数据断言_**

只需使用发布版Keploy对**预录制**和**测试平台录制**的测试和模拟数据分别运行测试模式：

- **预录制**测试：

```bash
sudo -E env PATH=$PATH keployR test -c "<app running command>" --delay <app delay> --path "<path-to-pre-recorded-tests>" --generateGithubActions=false
```

- **测试平台录制**测试：

```bash
sudo -E env PATH=$PATH keployR test -c "<app running command>" --delay <app delay> --path "./test-bench" --generateGithubActions=false
```

如果两种场景都显示"passed"，则说明该方法与常规Keploy录制测试流程一致，你的测试和模拟数据验证通过。

## 在CI中运行(Github Actions)

- 在CI中实施此设置将通过包含不同依赖的样本应用来增强Keploy测试，全面评估代理和解析器等主要组件。

- 需要为每个样本应用添加两个工作流，涵盖录制和测试两种场景。

## 限制条件 ⚠️

- 端口配置：Keploy Record(`keployR`)和Keploy Test(`keployT`)的端口需要硬编码，无法更改。
- 测试集顺序：每次只能运行一个测试集。
- 环境支持：目前仅支持原生二进制环境，不支持Docker环境。
- 录制延迟：测试运行后需要等待1秒确保测试用例正确录制（与实现相关）。
- 进程过滤：`keployR`应只处理应用相关调用，不处理`keployT`相关调用。为此`keployT`会等待`keployR`获取PID后再开始测试（与实现相关）。
- 目前不支持在WSL上运行此设置。
- 运行过程中请勿重命名**测试集**或**测试用例**。

<!-- 要了解内部原理可参考此[博客](blog link)。 -->

如有任何问题，请联系我们。

import GetSupport from '../concepts/support.md'

<GetSupport/>