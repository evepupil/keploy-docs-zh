---
id: debugger-guide
title: 调试器指南
sidebar_label: 调试器指南
tags:
  - 说明文档
  - 开发指南
  - 调试指南
---

# 调试器指南 👨‍🔧

本篇博客将介绍如何使用Visual Studio Code集成调试器调试keploy。

## 配置文件设置

要打开**运行和调试**视图，请点击VS Code侧边栏活动栏中的**运行和调试**图标。您也可以使用快捷键：MacOS按`Cmd + Shift + D`，Windows按`Ctrl + shift + D`。

如果尚未配置运行和调试（未创建`launch.json`文件），VS Code会显示运行启动视图。

点击**创建launch.json文件** 👉 **Go** 👉 **Go: Launch Package**

导航至`launch.json`文件开始编写JSON对象。

```json
{
  "version": "0.2.0",
  "configurations": [
    {
      "name": "Record",
      "type": "go",
      "request": "launch",
      "mode": "auto",
      "asRoot": true,
      "console": "integratedTerminal",
      "program": "main.go",
      "args": ["record", "-c", "<path_to_executable>"],
      "env": {
        "PATH": "${env:PATH}"
      }
    },
    {
      "name": "Test",
      "type": "go",
      "request": "launch",
      "mode": "auto",
      "asRoot": true,
      "console": "integratedTerminal",
      "program": "main.go",
      "args": ["test", "-c", "<path_to_executable>"],
      "env": {
        "PATH": "${env:PATH}"
      }
    }
  ]
}
```

## 获取PATH环境变量

### macOS/Linux系统

<ul><li>

终端执行：

```shell
echo $PATH
```

</li>

</ul>

### Windows系统

<ul><li>

命令提示符(CMD):

```shell
echo %PATH%
```

</li>

</ul>

让我们仔细看看JSON文件中几个重要的键值对：

- `"name"`参数可以任意命名，但为方便起见建议使用keploy命令名称（如`Record`和`Test`）。
- `args`参数表示运行应用程序的完整keploy命令。例如在[Gin + Mongo](https://keploy.io/docs/quickstart/samples-gin/)中，Linux系统使用`record -c "go run main.go handler.go"`，MacOS系统使用`record -c "docker compose up" --containerName "ginMongoApp"`。

您可以在"configurations"数组中添加更多对象，或修改单个对象中的"args"属性来添加更多命令。

> **注意**：默认情况下，keploy测试和报告会生成在keploy目录中。您可以通过创建[generate-config](https://keploy.io/docs/running-keploy/cli-commands/#generate-config)并指定所需路径来更改此设置。

## 运行调试器

点击**开始调试**按钮，即可见证调试魔法无缝展开。

希望本指南对您有所帮助，如果仍有疑问，请联系我们。

import GetSupport from '../concepts/support.md'

<GetSupport/>