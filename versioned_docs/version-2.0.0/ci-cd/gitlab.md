---
id: gitlab
title: 与 GitLab CI 集成
description: Keploy GitLab CI 流水线指南
sidebar_label: GitLab Runner
keywords:
  - 持续集成测试
  - ci/cd
  - github
  - gitlab
tags:
  - 持续集成
  - 持续交付
  - 插件
---

Keploy 可以与 GitLab CI 集成，以简化您的测试流程，并确保作为 CI/CD 流水线的一部分进行持续测试。

## 创建流水线

要将 Keploy 集成到 `GitLab` 中，我们首先需要通过以下步骤在 `.gitlab-ci.yml` 中进行安装和设置：

```yaml
---
stages:
  - test

keploy-test-job: # 此任务在测试阶段运行。
  image: ubuntu:22.04
  stage: test
  before_script:
    ## 添加依赖项
    - apt-get update && apt-get install -y curl python3 python3-pip git kmod linux-headers-generic bpfcc-tools sudo
    - git clone https://github.com/keploy/samples-python
    - cd flask-mongo
    - mkdir -p /sys/kernel/debug
    - mkdir -p /sys/kernel/tracing

  script:
    ## 安装 Keploy 并运行应用程序的步骤
    ...
```

> **注意：如果使用 `arm_64` 作为运行器，请使用以下命令下载 Keploy 二进制文件**

`curl --silent --location "https://github.com/keploy/keploy/releases/latest/download/keploy_linux_arm64.tar.gz" | tar xz --overwrite -C /tmp`

现在我们已经安装了 Keploy，一切准备就绪，我们需要切换到应用程序中存在 `keploy` 文件夹的路径，并安装所有应用程序相关的依赖项。由于我们使用的是 [flask-mongo](https://github.com/keploy/samples-python) 示例应用程序，`script:` 中的步骤将如下所示：

```yaml
script:
  ## 安装 Keploy 并运行应用程序的步骤
  # 安装 Keploy
  - curl --silent -O -L https://keploy.io/install.sh && source install.sh

  # 挂载所需的文件系统
  - mount -t debugfs nodev /sys/kernel/debug || true
  - mount -t tracefs nodev /sys/kernel/tracing || true

  # 运行 Keploy 测试
  - pip3 install -r requirements.txt
  - keploy test -c "python3 app.py"  --delay 50
```

在您的 `.gitlab-ci.yml` 文件中，最后一步是使用 `keploy test` 命令运行 Keploy 生成的测试套件，这将设置 Keploy 以重放其生成的交互并执行 CI 测试。

### 📝 注意

您是否在流水线中注意到一些奇怪的东西？比如 `kmod`、`linux-headers`、`/sys/kernel/debug`...然后想，“等等，我是在黑内核还是什么？” 😅

别担心——这些只是因为 **Keploy 使用 eBPF**（一个很酷的 Linux 功能）来跟踪您的应用程序行为。

所以我们安装了 `kmod`、`linux-headers-generic` 和 `bpfcc-tools` 来实现这种跟踪。

一些 CI 系统默认没有 `/sys/kernel/debug` 和 `/sys/kernel/tracing`，所以我们创建它们并挂载 `debugfs` 和 `tracefs` —— 这就像是给 Keploy 一张**后台通行证**，让它能够观察您的应用程序运行。

没有黑魔法。只是一些底层的 Linux 东西帮助您的测试像魔法一样运行！ 🪄✨

我们将看到以下输出：

```sh
$ keploy test -c "python3 app.py"  --delay 50
       ▓██▓▄
    ▓▓▓▓██▓█▓▄
     ████████▓▒
          ▀▓▓███▄      ▄▄   ▄               ▌
         ▄▌▌▓▓████▄    ██ ▓█▀  ▄▌▀▄  ▓▓▌▄   ▓█  ▄▌▓▓▌▄ ▌▌   ▓
       ▓█████████▌▓▓   ██▓█▄  ▓█▄▓▓ ▐█▌  ██ ▓█  █▌  ██  █▌ █▓
      ▓▓▓▓▀▀▀▀▓▓▓▓▓▓▌  ██  █▓  ▓▌▄▄ ▐█▓▄▓█▀ █▓█ ▀█▄▄█▀   █▓█
       ▓▌                           ▐█▌                   █▌
        ▓
version: 2.5.1
🐰 Keploy: 2025-04-14T16:22:12Z 	WARN	python language detected. please use --language to manually set the language if needed
🐰 Keploy: 2025-04-14T16:22:13Z 	INFO	keploy initialized and probes added to the kernel.
🐰 Keploy: 2025-04-14T16:22:14Z 	INFO	starting UDP DNS server at addr :26789
🐰 Keploy: 2025-04-14T16:22:14Z 	INFO	Keploy has taken control of the DNS resolution mechanism, your application may misbehave if you have provided wrong domain name in your application code.
🐰 Keploy: 2025-04-14T16:22:14Z 	INFO	Proxy started at port:16789
🐰 Keploy: 2025-04-14T16:22:14Z 	INFO	running	{"test-set": "[test-set-0]"}
🐰 Keploy: 2025-04-14T16:22:14Z 	INFO	starting TCP DNS server at addr :26789
 * Serving Flask app 'app'
 * Debug mode: on
WARNING: This is a development server. Do not use it in a production deployment. Use a production WSGI server instead.
 * Running on all addresses (0.0.0.0)
 * Running on http://127.0.0.1:6000
 * Running on http://127.0.0.1:6000
Press CTRL+C to quit
 * Restarting with stat
 * Debugger is active!
 * Debugger PIN: 100-754-563
🐰 Keploy: 2025-04-14T16:23:04Z 	INFO	starting test for of	{"test case": "[test-1]", "test set": "[test-set-0]"}
127.0.0.1 - - [14/Apr/2025 16:23:04] "POST /students HTTP/1.1" 200 -
Testrun passed for testcase with id: "test-1"
--------------------------------------------------------------------
🐰 Keploy: 2025-04-14T16:23:04Z 	INFO	result	{"testcase id": "[test-1]", "testset id": "[test-set-0]", "passed": "[true]"}
 <=========================================>
  TESTRUN SUMMARY. For test-set: "test-set-0"
	Total tests: 1
	Total test passed: 1
	Total test failed: 0
	Time Taken: "50.01 s"
 <=========================================>
  COMPLETE TESTRUN SUMMARY.
	Total tests: 1
	Total test passed: 1
	Total test failed: 0
	Total time taken: "50.01 s"
	Test Suite Name		Total Test	Passed		Failed		Time Taken
	"test-set-0"		1		1		0		"50.01 s"
<=========================================>
🐰 Keploy: 2025-04-14T16:23:05Z 	INFO	calculating coverage for the test run and inserting it into the report
Wrote JSON report to coverage.json
🐰 Keploy: 2025-04-14T16:23:05Z 	INFO	[Total Coverage Percentage:  64%]
🐰 Keploy: 2025-04-14T16:23:05Z 	INFO	stopping Keploy	{"reason": "replay completed successfully"}
🐰 Keploy: 2025-04-14T16:23:05Z 	INFO	proxy stopped...
🐰 Keploy: 2025-04-14T16:23:05Z 	INFO	eBPF resources released successfully...
Cleaning up project directory and file based variables
00:00
Job succeeded

```

_然后...瞧！您已成功将 Keploy 集成到 GitLab CI/CD 流水线中 🌟_

将 Keploy 与 GitLab CI 集成可以自动化测试流程，确保每次提交和合并请求时都运行测试。通过在 CI 流水线中自动运行测试，您可以及早发现问题，并确保应用程序保持稳定和可靠。

### 📦 需要完整的流水线吗？

如果您在想，“这个流水线看起来很酷，但我需要_完整的_流水线来与您的应用程序集成！” —— 那么您很幸运！在这里查看[完整流水线](https://github.com/keploy/samples-python)，准备好复制粘贴，走向成功！ ✨🚀

希望这对您有所帮助，如果您还有任何问题，请联系我们。

import GetSupport from '../concepts/support.md'

<GetSupport/>