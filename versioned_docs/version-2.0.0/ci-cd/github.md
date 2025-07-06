---
id: github
title: 与GitHub CI集成
description: Keploy GitHub CI流水线指南
sidebar_label: GitHub工作流
keywords:
  - 持续集成测试
  - CI/CD
  - GitHub
  - CI流水线
tags:
  - 持续集成
  - 持续交付
  - 插件
---

Keploy可以通过两种方式与GitHub集成：

1. [使用Shell脚本](#shell-scripts)
2. [使用GitHub Actions](#github-actions)

## Shell脚本

GitHub脚本是与Keploy集成的最简单方式。我们将使用[express-mongoose](https://github.com/keploy/samples-typescript/tree/main/express-mongoose)示例应用进行演示。您可以将以下脚本添加到您的`github workflow`中，或创建一个新的工作流`.github/workflows/keploy-test.yml`：

```yaml
- name: 检出代码
  uses: actions/checkout@v2
- name: Keploy测试
  id: keploy-run-test
  run: |
    curl --silent --location "https://github.com/keploy/keploy/releases/latest/download/keploy_linux_amd64.tar.gz" | tar xz --overwrite -C /tmp
    sudo mkdir -p /usr/local/bin && sudo mv /tmp/keploy /usr/local/bin/keploy
  ...
```

> **注意：如果使用`arm_64`作为运行器，请使用以下命令下载Keploy二进制文件**

`curl --silent --location "https://github.com/keploy/keploy/releases/latest/download/keploy_linux_arm64.tar.gz" | tar xz --overwrite -C /tmp`

### 脚本示例

在GitHub CI中使用[express-mongoose](https://github.com/keploy/samples-typescript/tree/main/express-mongoose)示例应用进行Keploy测试时，工作流如下：

```yaml
- name: 检出代码
  uses: actions/checkout@v2
- name: 设置Node环境
  uses: actions/setup-node@v2
  with:
    node-version: 18

- name: Keploy测试
  id: keploy-run-test
  run: |
    curl --silent --location "https://github.com/keploy/keploy/releases/latest/download/keploy_linux_amd64.tar.gz" | tar xz --overwrite -C /tmp
    sudo mkdir -p /usr/local/bin && sudo mv /tmp/keploy /usr/local/bin/keploy

    # 安装应用依赖
    npm install

    # 运行Keploy捕获的测试
    keploy test -c "node src/app.js"
```

我们将看到如下输出：

```sh

       ▓██▓▄
    ▓▓▓▓██▓█▓▄
     ████████▓▒
          ▀▓▓███▄      ▄▄   ▄               ▌
         ▄▌▌▓▓████▄    ██ ▓█▀  ▄▌▀▄  ▓▓▌▄   ▓█  ▄▌▓▓▌▄ ▌▌   ▓
       ▓█████████▌▓▓   ██▓█▄  ▓█▄▓▓ ▐█▌  ██ ▓█  █▌  ██  █▌ █▓
      ▓▓▓▓▀▀▀▀▓▓▓▓▓▓▌  ██  █▓  ▓▌▄▄ ▐█▓▄▓█▀ █▓█ ▀█▄▄█▀   █▓█
       ▓▌                           ▐█▌                   █▌
        ▓

  版本: 2.1.0-alpha23

  🐰 Keploy: 2024-06-05T04:55:12Z 	INFO	未找到配置文件；仅使用标志继续
  🐰 Keploy: 2024-06-05T04:55:12Z 	WARN	延迟设置为5秒，如果您的应用需要更长时间启动，请使用--delay设置自定义延迟
  🐰 Keploy: 2024-06-05T04:55:12Z 	INFO	示例用法：keploy test -c "/path/to/user/app" --delay 6
  🐰 Keploy: 2024-06-05T04:55:12Z 	INFO	GitHub Actions工作流文件生成成功	{"path": "/githubactions/keploy.yml"}
  🐰 Keploy: 2024-06-05T04:55:13Z 	INFO	keploy已初始化并将探针添加到内核。

  ...

  🐰 Keploy: 2024-06-05T04:55:16Z 	INFO	启动TCP DNS服务器，地址：:26789
  🐰 Keploy: 2024-06-05T04:55:16Z 	INFO	启动UDP DNS服务器，地址：:26789
  🐰 Keploy: 2024-06-05T04:55:16Z 	INFO	代理启动于端口：16789
  🐰 Keploy: 2024-06-05T04:55:16Z 	INFO	运行中	{"test-set": "test-set-0"}

  监听端口8000
  已连接到MongoDB

  🐰 Keploy: 2024-06-05T04:55:21Z 	INFO	开始测试	{"test case": "test-1", "test set": "test-set-0"}

  测试用例ID为"test-1"的测试运行通过

  --------------------------------------------------------------------

  🐰 Keploy: 2024-06-05T04:55:21Z    INFO    结果  {"testcase id": "test-1", "testset id": "test-set-0", "passed": "true"}

  <=========================================>
    TESTRUN 摘要。测试集："test-set-0"
          总测试数：1
          通过测试数：1
          失败测试数：0
  <=========================================>

  🐰 Keploy: 2024-06-05T05:18:49Z 	INFO	测试运行完成	{"passed overall": true}
  🐰 Keploy: 2024-06-05T05:18:49Z 	INFO	停止Keploy	{"reason": "回放成功完成"}
  🐰 Keploy: 2024-06-05T05:18:49Z 	INFO	代理已停止...
  🐰 Keploy: 2024-06-05T05:18:50Z 	INFO	eBPF资源已成功释放...
```

_太棒了！您已成功在GitHub CI流水线中集成了Keploy 🌟_

---

## GitHub Actions

GitHub Actions是与Keploy集成的更高级方式。我们将使用[express-mongoose](https://github.com/keploy/samples-typescript/tree/main/express-mongoose)示例应用进行演示。在`.github/workflow`下创建一个名为`keploy-test.yml`的新工作流：

```yaml
jobs:
  my_job:
    runs-on: ubuntu-latest
    steps:
      - name: 检出代码
        uses: actions/checkout@v2
      - name: 测试报告
        uses: keploy/testgpt@main
        with:
          command: "<运行应用的命令>" ## 运行应用的命令
```

在上述示例中，我们使用`keploy/testgpt` Action来运行测试用例。

> - `working-directory`（可选）是应用的路径，默认在根目录下查找keploy文件夹。
> - `delay`（可选）是等待应用启动的时间。
> - `command`是运行应用的命令。

### Actions示例

在GitHub CI中使用[express-mongoose](https://github.com/keploy/samples-typescript/tree/main/express-mongoose)示例应用通过Actions进行Keploy测试时，工作流如下：

```yaml
jobs:
  keploy_test_case:
    runs-on: ubuntu-latest
    steps:
      - name: 检出代码
        uses: actions/checkout@v2
      - name: 测试报告
        uses: keploy/testgpt@main
        with:
          working-directory: /express-mongoose
          delay: 10
          command: "node src/app.js"
```

> **注意：`keploy/testgpt` Action仅支持基于amd_64的运行器。**

我们将看到如下输出：

```sh
测试模式启动中 🎉
sudo -E keploy test -c node src/app.js --delay 10 --path ./

       ▓██▓▄
    ▓▓▓▓██▓█▓▄
     ████████▓▒
          ▀▓▓███▄      ▄▄   ▄               ▌
         ▄▌▌▓▓████▄    ██ ▓█▀  ▄▌▀▄  ▓▓▌▄   ▓█  ▄▌▓▓▌▄ ▌▌   ▓
       ▓█████████▌▓▓   ██▓█▄  ▓█▄▓▓ ▐█▌  ██ ▓█  █▌  ██  █▌ █▓
      ▓▓▓▓▀▀▀▀▓▓▓▓▓▓▌  ██  █▓  ▓▌▄▄ ▐█▓▄▓█▀ █▓█ ▀█▄▄█▀   █▓█
       ▓▌                           ▐█▌                   █▌
        ▓

  版本: 2.1.0-alpha23

  🐰 Keploy: 2024-06-05T05:18:35Z 	INFO	未找到配置文件；仅使用标志继续
  🐰 Keploy: 2024-06-05T05:18:35Z 	INFO	GitHub Actions工作流文件生成成功	{"path": "/githubactions/keploy.yml"}
  🐰 Keploy: 2024-06-05T05:18:35Z 	INFO	keploy已初始化并将探针添加到内核。

  ...

  🐰 Keploy: 2024-06-05T05:18:39Z 	INFO	启动TCP DNS服务器，地址：:26789
  🐰 Keploy: 2024-06-05T05:18:39Z 	INFO	启动UDP DNS服务器，地址：:26789
  🐰 Keploy: 2024-06-05T05:18:39Z 	INFO	代理启动于端口：16789
  🐰 Keploy: 2024-06-05T05:18:39Z 	INFO	运行中	{"test-set": "test-set-0"}
  监听端口8000
  已连接到MongoDB
  🐰 Keploy: 2024-06-05T05:18:49Z 	INFO	开始测试	{"test case": "test-1", "test set": "test-set-0"}

  测试用例ID为"test-1"的测试运行通过

  --------------------------------------------------------------------

  🐰 Keploy: 2024-06-05T04:55:21Z    INFO    结果  {"testcase id": "test-1", "testset id": "test-set-0", "passed": "true"}

  <=========================================>
    TESTRUN 摘要。测试集："test-set-0"
          总测试数：1
          通过测试数：1
          失败测试数：0
  <=========================================>
  ...
  🐰 Keploy: 2024-06-05T04:55:21Z    INFO    测试运行完成      {"passed overall": true}
```

_太棒了！您已成功在GitHub CI流水线中集成了Keploy 🌟_

希望这对您有所帮助，如果仍有疑问，请联系我们。

import GetSupport from '../concepts/support.md'

<GetSupport/>