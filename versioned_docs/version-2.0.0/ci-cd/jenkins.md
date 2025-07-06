---
id: jenkins
title: 与 Jenkins 集成
description: Keploy Jenkins 流水线指南
sidebar_label: Jenkins 流水线
keywords:
  - 持续集成测试
  - ci/cd
  - jenkins
  - 持续集成流水线
tags:
  - 持续集成
  - 持续交付
  - 插件
---

Keploy 可以与 Jenkins 集成，作为 CI/CD 流水线的一部分实现持续测试。

## 先决条件

- 已安装并运行 Jenkins
- 通过 `jenkins ALL=(ALL) NOPASSWD: ALL` 配置无需密码的 sudo 权限

打开终端运行 `sudo visudo` 命令编辑 sudoers 文件，在文件末尾添加以下内容：

```sh
jenkins ALL=(ALL) NOPASSWD: ALL
```

## 创建流水线

使用以下模板通过脚本在 Jenkins 流水线中安装 Keploy：

```sh
pipeline {
    agent any
    stages {
        stage('安装 Keploy') {
            steps {
                sh '''
                curl --silent -O -L https://keploy.io/install.sh && bash install.sh
                '''
            }
        }
    }
}
```

> **注意：如果使用 `arm_64` 作为运行器，请使用以下命令下载 Keploy 二进制文件**

`curl --silent --location "https://github.com/keploy/keploy/releases/latest/download/keploy_linux_arm64.tar.gz" | tar xz --overwrite -C /tmp`

### 示例

现在我们已经安装了 Keploy，接下来需要切换到应用程序中包含 `keploy` 文件夹的路径，并安装所有应用程序相关依赖。由于我们使用 [gin-mongo](https://github.com/keploy/samples-go/tree/main/gin-mongo) 示例应用，`script` 中的步骤应如下所示：

```sh
pipeline {
    agent any
    stages {
        stage('安装依赖') {
            steps {
                sh 'sudo apt-get update && sudo apt-get install -y curl kmod linux-headers-generic bpfcc-tools git golang-go'
            }
        }
        stage('克隆并设置应用') {
            steps {
                sh '''
                rm -rf samples-go
                git clone 'https://github.com/keploy/samples-go'
                cd gin-mongo
                go mod tidy
                '''
            }
        }
        stage('安装 Keploy') {
            steps {
                sh '''
                curl --silent -O -L https://keploy.io/install.sh && bash install.sh
                '''
            }
        }
        stage('准备 eBPF 钩子') {
            steps {
                sh '''
                sudo mkdir -p /sys/kernel/debug
                sudo mkdir -p /sys/kernel/tracing
                sudo mount -t debugfs nodev /sys/kernel/debug || true
                sudo mount -t tracefs nodev /sys/kernel/tracing || true
                '''
            }
        }
        stage('运行 Keploy 测试') {
            steps {
                sh '''
                cd gin-mongo
                sudo -E keploy test -c "go run main.go handler.go" --disableANSI
                '''
            }
        }
    }
}
```

### 📝 注意

你是否在流水线中注意到一些奇怪的东西？比如 `kmod`、`linux-headers`、`/sys/kernel/debug`...然后心想："等等，我是在黑内核吗？" 😅

别担心 —— 这些只是因为 **Keploy 使用 eBPF**（一个很酷的 Linux 特性）来追踪你的应用行为。

所以我们安装 `kmod`、`linux-headers-generic` 和 `bpfcc-tools` 来实现这种追踪。

一些 CI 系统默认没有 `/sys/kernel/debug` 和 `/sys/kernel/tracing`，所以我们创建它们并挂载 `debugfs` 和 `tracefs` —— 这就像是给 Keploy 一张**后台通行证**，让它能观察你的应用运行。

没有黑魔法。只是一些底层 Linux 机制帮助你的测试像魔法一样运行！ 🪄✨

我们会得到类似下面的输出：

```sh
由用户 admin 启动

...

sudo -E keploy test -c go run main.go handler.go --disableANSI

       ▓██▓▄
    ▓▓▓▓██▓█▓▄
     ████████▓▒
          ▀▓▓███▄      ▄▄   ▄               ▌
         ▄▌▌▓▓████▄    ██ ▓█▀  ▄▌▀▄  ▓▓▌▄   ▓█  ▄▌▓▓▌▄ ▌▌   ▓
       ▓█████████▌▓▓   ██▓█▄  ▓█▄▓▓ ▐█▌  ██ ▓█  █▌  ██  █▌ █▓
      ▓▓▓▓▀▀▀▀▓▓▓▓▓▓▌  ██  █▓  ▓▌▄▄ ▐█▓▄▓█▀ █▓█ ▀█▄▄█▀   █▓█
       ▓▌                           ▐█▌                   █▌
        ▓

版本: 2.5.2

2025-04-18T04:06:50.413Z	INFO	provider/cmd.go:504	颜色编码已禁用
2025-04-18T04:06:50.413Z	WARN	provider/cmd.go:726	延迟设置为5秒，如果你的应用启动需要更长时间，请使用--delay设置自定义延迟
2025-04-18T04:06:50.413Z	INFO	provider/cmd.go:730	示例用法: keploy test -c "/path/to/user/app" --delay 6
2025-04-18T04:06:50.413Z	WARN	replay/replay.go:140	检测到go语言，如需手动设置语言请使用--language
2025-04-18T04:06:50.413Z	WARN	golang/utils.go:28	命令中未找到cover标志，跳过覆盖率计算
2025-04-18T04:06:51.104Z	INFO	hooks/hooks.go:436	keploy已初始化并将探针添加到内核

[GIN-debug] GET    /:param                   --> main.GetURL (3 handlers)
[GIN-debug] POST   /url                      --> main.PutURL (3 handlers)
2025-04-18T04:06:57.585Z	INFO	pkg/util.go:123	开始测试	{"测试用例": "[test-1]", "测试集": "[test-set-0]"}
[GIN] 2025/04/18 - 04:06:57 | 200 |    2.109927ms |             ::1 | POST     "/url"
测试用例 "test-1" 通过

--------------------------------------------------------------------

2025-04-18T04:06:57.588Z	INFO	replay/replay.go:717	结果	{"测试用例ID": "[test-1]", "测试集ID": "[test-set-0]", "通过": "[true]"}
2025-04-18T04:06:57.593Z	INFO	pkg/util.go:123	开始测试	{"测试用例": "[test-2]", "测试集": "[test-set-0]"}
[GIN] 2025/04/18 - 04:06:57 | 303 |     852.601µs |             ::1 | GET      "/Lhr4BWAi"
测试用例 "test-2" 通过

--------------------------------------------------------------------

2025-04-18T04:06:57.597Z	INFO	replay/replay.go:717	结果	{"测试用例ID": "[test-2]", "测试集ID": "[test-set-0]", "通过": "[true]"}

 <=========================================>
  测试集 "test-set-0" 摘要
	总测试数: 2
	通过测试数: 2
	失败测试数: 0
	耗时: "5.02 s"
 <=========================================>
```

_瞧！你已成功在 Jenkins CI/CD 流水线中集成 keploy 🌟_

希望这对你有所帮助，如果仍有疑问，请联系我们。

import GetSupport from '../concepts/support.md'

<GetSupport/>