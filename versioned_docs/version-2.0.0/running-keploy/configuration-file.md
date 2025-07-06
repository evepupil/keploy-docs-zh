---
id: configuration-file
title: 配置文件
sidebar_label: 配置文件
description: 本节介绍配置文件
tags:
  - 配置文件
keywords:
  - 配置
---

## 简介

厌倦了为每条记录或测试命令重复指定相同的容器名称、应用命令、延迟和过滤器？😴  

隆重推出 **Keploy-config** 🎉 —— 这是一个基于YAML的配置文件，允许您定义测试配置，包括容器设置、延迟以及其他相关参数。

## 快速开始

我们将使用一个示例应用来演示Keploy配置文件的使用。

要生成keploy-config文件，请运行：

```bash
keploy config --generate --path "./config-dir/"
```

为了演示，我们使用了[echo-sql应用的根目录](https://github.com/keploy/samples-go/tree/main/echo-sql)。您可以将它放在项目中的任意位置。

命令成功执行后，会创建一个名为`keploy.yaml`的默认初始化配置文件，内容如下：

```yaml
path: ""
command: "./echo-psql-url-shortener"
port: 0
proxyPort: 16789
dnsPort: 26789
debug: false
disableTele: false
inDocker: false
generateGithubActions: true
containerName: ""
networkName: ""
buildDelay: 30
test:
  selectedTests: {}
  globalNoise:
    global: {}
    test-sets: {}
  delay: 5
  apiTimeout: 5
  coverage: false
  skipCoverage: false
  coverageReportPath: ""
  ignoreOrdering: true
  mongoPassword: "default@123"
  language: ""
  removeUnusedMocks: false
record:
  recordTimer: 0s
  filters: []
configPath: ""
bypassRules: []
cmdType: "native"
enableTesting: false
keployContainer: "keploy-v2"
keployNetwork: "keploy-network"
# 访问 [https://keploy.io/docs/running-keploy/configuration-file/] 了解如何通过配置文件使用keploy。
```

## 使用配置文件

Keploy-config文件消除了为每条记录或测试命令重复指定参数的需要。文件中的参数对应于Keploy [CLI命令文档](http://keploy.io/docs/running-keploy/cli-commands/)中的标志。使用keploy-config可以将记录和测试命令简化为：

### 记录命令：

```bash
keploy record
```

### 测试命令：

```bash
keploy test
```

访问[CLI命令文档](http://keploy.io/docs/running-keploy/cli-commands/)了解更多关于标志/参数及其用法的信息。

## 配置部分

### 记录部分

Keploy-config文件中的`record`部分允许您定义记录API调用的参数。

- **`path`**：记录发生的项目路径。（必填字段）

- **`command`**：记录期间执行的命令。

- **`proxyport`**：代理的端口号。默认为0。

- **`containerName`**：记录期间的容器名称。

- **`networkName`**：记录期间的容器网络名称。

- **`delay`**：记录每个请求前的延迟秒数。默认为5秒。

- **`filters`**：避免记录的应用程序API调用。

  示例：

  ```yaml
  record:
    filters:
      - path: "/user/app"
        urlMethods: ["GET"]
        headers: {"^asdf*": "^test"}
        host: "dc.services.visualstudio.com"
  ```

  这将避免记录路径为`/user/app`、方法为`GET`、头部以`asdf`开头且主机为`dc.services.visualstudio.com`的API调用。

- **`tests`**：记录测试的过滤器。

  示例：

  ```yaml
  tests:
    filters:
      - path: ""
        urlMethods: []
        headers: {}
        host: ""
  ```

- **`bypassRules`**：用于模拟API调用的绕过规则。

  示例：

  ```yaml
  bypassRules:
    filters:
      - path: ""
        host: ""
        port: 0
  ```

### 测试部分

Keploy-config文件中的`test`部分允许您定义测试API调用的参数。

- **`path`**：测试发生的项目路径。（必填字段）

- **`command`**：测试期间执行的命令。

- **`proxyport`**：测试期间的代理端口号。默认为0。

- **`containerName`**：测试期间的容器名称。

- **`networkName`**：测试期间的容器网络名称。

- **`ignoreOrdering`**：设置为`true`时，测试期间忽略响应体中数组元素的顺序。

- **`selectedTests`**：选择要运行的测试。
  示例：

  ```yaml
  selectedTests:
    "test-set-1": ["test-1", "test-2"]
    "test-set-2": []
  ```

- **`globalNoise`**：在全局/测试集级别忽略的噪声字段。
  示例：

  ```yml
  globalNoise:
  global:
    body: {"url": ["https?://\S+"]}
  test-sets: {}
  ```

- **`delay`**：测试每个请求前的延迟秒数。默认为5秒。

- **`apiTimeout`**：测试期间API调用的超时秒数。默认为5秒。

- **` bypassRules`**：用于模拟API调用的绕过规则。

  ```yaml
  bypassRules:
  filters:
    - path: ""
      host: ""
      port: 0
  ```

- **`withCoverage`**：是否在测试期间生成覆盖率报告。默认为`false`。

- **`coverageReportPath`**：存储覆盖率报告的路径。
  示例：
  ```yaml
  coverageReportPath: "/path/to/coverage/report"
  ```

Keploy-config文件中的tests部分允许您定义在API调用期间记录测试场景的参数。

- **`filters`**：根据路径、HTTP方法、头部和主机记录特定测试的过滤器。

  示例：

  ```yml
  tests:
    filters:
      - path: "/user/app"
        urlMethods: ["GET"]
        headers:
          "^asdf*": "^test"
        host: "dc.services.visualstudio.com"
  ```

tests部分使您能够指定在API调用期间记录测试的条件。filters子部分允许您定义特定条件，如路径、HTTP方法、头部和主机，以记录相关的测试场景。

- **`path`**：指定应记录测试的路径。它定义了API端点的URL路径。

- **`urlMethods`**：指定应记录测试的HTTP方法。它允许您专注于特定的HTTP方法，如GET、POST等。

- **`headers`**：指定应记录测试的头部及其值。它使您能够根据特定头部过滤测试。

- **`host`**：指定应记录测试的主机。它定义了API服务器的域名或IP地址。

#### 组合或独立使用测试过滤器

您可以根据测试场景组合或独立使用**`path`**、**`urlMethods`**、**`headers`**和**`host`**过滤器。这种灵活性使您能够精确定义记录测试的条件。

### 绕过规则部分

Keploy-config文件中的`bypassRules`部分允许您定义绕过和模拟API调用的参数。

示例：

```yaml
bypassRules:
  - path: "/user/app"
    port: 8080
  - port: 8081
  - host: "dc.services.visualstudio.com"
  - port: 8081
    host: "dc.services.visualstudio.com"
    path: "/user/app"
```

`bypassRules`部分提供了一种在测试期间绕过和模拟API调用的方法。filters子部分允许您定义应用存根的具体条件，如路径、端口和主机。您可以根据测试场景组合或独立使用这些过滤器。

- **`path`**：指定应应用存根的路径。它定义了API端点的URL路径。

- **`port`**：指定应应用存根的端口。它定义了API调用的网络端口。

- **`host`**：指定应应用存根的主机。它定义了API服务器的域名或IP地址。

在提供的示例中：

- 第一条绕过规则适用于路径"/user/app"和端口8080。
- 第二条绕过规则适用于端口8081。
- 第三条绕过规则适用于主机"dc.services.visual

## 高级噪声过滤

以前，添加[噪声字段](http://keploy.io/docs/concepts/general-glossary/#3-noisy-field)的唯一方法是修改单个测试文件（测试用例级别）。现在，随着配置文件的引入，用户可以通过配置文件本身在测试集和全局级别添加噪声字段。

### 全局噪声

`globalNoise`的`global子部分`用于定义在测试期间所有API调用中全局忽略的参数。它使您能够过滤掉一致的噪声，确保更干净的响应评估。

**注意** - 以下示例支持xml和json类型的响应。

```yml
globalNoise:
  global: {body: {
          # 要忽略某个字段的某些值，将正则模式传递给相应的数组值
          "url": ['https?://\S+', 'http://\S+'],
        }, header: {
          # 要忽略整个字段，传递一个空数组
          "Date": [],
        }}
```

**注意：** 要将整个响应体标记为全局噪声，请使用：

```yml
globalNoise:
global: {body: {"*": "*"}}
```

1. **`global`**：

- **`body`**：定义要忽略的响应体模式，例如过滤掉URL。示例：`{"url": ['https?://\S+', 'http://\S+']}`
- **`header`**：指定要全局忽略的头部或头部值。示例：`{"Date": []}`

2. **`test-sets`**：示例中此部分为空。它允许您为特定测试集指定额外的噪声参数，为不同的测试场景提供定制的噪声过滤。

### 测试集噪声

在`globalNoise`的`test-sets子部分`下，您可以定义特定于某个测试集的噪声参数。这确保某些噪声仅在与该特定测试集相关的API调用中被忽略。

```yml
test-sets: {test-set-1: {body: {
            # 忽略"uuid"字段的所有值
            "uuid": [],
          }, header: {
            # 我们也可以传递要忽略的字段的精确值
            "User-Agent": ["PostmanRuntime/7.34.0"],
          }}}
```

**`test-set-1`**：

- **`body`**：定义在指定测试集中要忽略的响应体模式。
- **`header`**：指定在指定测试集中要忽略的头部或头部值。示例：`{"User-Agent": ["PostmanRuntime/7.34.0"]}`

## 处理深度嵌套的JSON字段 🧩

在处理响应体中的深度嵌套JSON字段时，正确指定Keploy配置文件中字段的路径非常重要。以下示例说明如何将嵌套的`token`字段添加到全局噪声配置中。

### 示例JSON响应 📄

考虑以下JSON响应：

```json
{
  "data": {
    "signUp": {
      "id": "100",
      "email": "keploy@test.com",
      "firstName": "keploy",
      "lastName": "keploy",
      "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImNyZWF0ZWRBdCI6IjIwMjQtMDUtMjJUMTA6NDk6MjIuNjI0WiIsImlkIjoxMDAsImZpcnN0TmFtZSI6InNhZ2FyIiwibGFzdE5hbWUiOiJ0b21hciIsImVtYWlsIjoic2FnYXJAdGVzdC5jb20iLCJwYXNzd29yZCI6IjU1ZjQ1MTg2OWI3OTZlMmFlZmU3ODA2ZjA0YTJlMzBkIiwidXBkYXRlZEF0IjoiMjAyNC0wNS0yMlQxMDo0OToyMi4wMzlaIiwiZGVsZXRlZEF0IjpudWxsfSwiaWF0IjoxNzE2Mzc0OTYyLCJleHAiOjE3MTY0NjEzNjJ9.21A-gz8QLnbx2bhpzMcezENjTGWKhBfwU4o2paFuEVM",
      "createdAt": "2024-05-22T10:49:22.624Z",
      "deletedAt": null,
      "updatedAt": "2024-05-22T10:49:22.039Z"
    }
  }
}
```

### 将嵌套字段添加到配置中 ⚙️

要将`signUp`对象中的`token`字段添加到全局噪声配置中，您需要指定字段的完整路径。

```yaml
globalNoise:
  fields:
    - path: "data.signUp.token"
    - path: "data.signUp.createdAt"
    - path: "data.signUp.updatedAt"
    - path: "data.signUp.deletedAt"
```

在此示例中：

- `data.signUp.token`指的是嵌套`signUp`对象中的`token`字段。
- 类似地，其他嵌套字段如`createdAt`、`updatedAt`和`deletedAt`也被指定。

通过以这种方式指定路径，Keploy将正确识别和处理配置中的这些深度嵌套字段。

### **注意**：

`globalNoise`和`test-sets`是配置文件中的可选字段。如果未指定，这两个字段的默认值为空对象`{}`。这种灵活性使您能够根据测试需求无缝集成高级噪声过滤。

## 结论

恭喜！您现在已经探索了`Keploy-config`提供的功能和配置选项。

现在，借助Keploy-config，您可以开始更有组织、更高效地使用Keploy记录和测试API。请随意探索其他功能，自定义配置，并参考[CLI命令文档](http://keploy.io/docs/running-keploy/cli-commands/)了解更多关于可用标志和参数的详细信息。

祝您测试愉快，愿您的API始终返回预期结果！🚀