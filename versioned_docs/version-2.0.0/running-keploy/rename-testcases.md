---
id: rename-testcases
title: 重命名默认测试名称
sidebar_label: 重命名测试名称
description: 本文档介绍如何重命名测试用例和测试集
tags:
  - 重命名测试用例
  - 重命名测试集
keywords:
  - 测试用例
  - 文档
  - 重命名
  - 测试集
---

## 重命名测试用例

要为测试用例命名，请发起API调用并**添加一个头字段**，其键设置为`Keploy-Test-Name`，值设置为所需的测试用例名称。

### 示例

我们以[gin-mongo](https://github.com/keploy/samples-go/tree/main/gin-mongo)示例应用进行演示。

1. 克隆仓库并构建应用。

```bash
git clone https://github.com/keploy/samples-go && cd samples-go/gin-mongo
go build
```

2. 在记录模式下运行keploy，并提供二进制文件路径。

```bash
sudo -E keploy record -c "./test-app-url-shortener"
```

3. 发起API调用并添加头字段，键设为`Keploy-Test-Name`，值设为想要的测试用例名称（例如'renametest'）。

```bash
curl --request POST \
  --url http://localhost:8080/url \
  --header 'content-type: application/json' \
  --header 'Keploy-Test-Name: renamed-test' \
  --data '{
  "url": "https://google.com"
}'
```

5. 名为`renamed-test.yaml`的测试用例已成功创建。🎉

## 重命名测试集

要重命名测试集，您可以手动将`keploy`文件夹中的默认名称从`test-set-0`改为`kTest-0`。