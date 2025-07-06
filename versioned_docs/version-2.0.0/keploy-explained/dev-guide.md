---
id: contribution-guide
title: 贡献指南
sidebar_label: 贡献指南
tags:
  - 说明文档
  - 开发指南
  - 贡献指南
---

# 贡献指南 🚀

欢迎来到Keploy开发世界！这里我们将帮助您快速上手，让您的Keploy之旅畅通无阻。

### 1. **平台设置**：

在macOS或Windows上运行Keploy？没问题！您需要创建一个Linux虚拟机。

- macOS用户请安装[Lima](https://github.com/lima-vm/lima#installation)
- Windows用户请安装[WSL](https://learn.microsoft.com/en-us/windows/wsl/install)

注意：Linux用户可直接开始

### 2. **先决条件**：

首先确保已安装[Golang](https://go.dev/doc/install)

### 3. **克隆Keploy仓库**：

获取Keploy代码！运行以下命令克隆仓库并下载Go依赖：

```shell
git clone https://github.com/keploy/keploy.git && cd keploy
go mod download
```

### 4. 在v2版本运行Keploy：

Keploy CLI通过捕获应用程序与其依赖项之间的所有网络流量来工作。
它会详细记录API调用、数据库查询以及应用程序参与的所有其他交互。

记录阶段完成后，Keploy可以轻松生成YAML格式的测试用例和数据模拟。

#### Keploy有两种工作模式：

- `record`：从API调用捕获Keploy测试用例
- `test`：执行记录的测试用例并验证断言

要体验Keploy，您可以使用[gin-mongo URL Shortener](https://github.com/keploy/samples-go/tree/main/gin-mongo)示例应用：

#### 克隆示例应用仓库：

```shell
git clone https://github.com/keploy/samples-go.git && cd samples-go/gin-mongo
go mod download   # 下载依赖：
go build -o gin-mongo-binary  # 生成应用二进制文件：
```

### 现在尝试运行keploy：

#### 捕获测试用例：

```shell
 go run -exec "sudo -E env 'PATH=$PATH'" -tags=viper_bind_struct main.go record -c "path/to/go/binary/of/application"
```

进入记录模式后，向您的应用发送请求以生成测试用例。

#### 运行测试用例：

```shell
go run -exec "sudo -E env 'PATH=$PATH'" -tags=viper_bind_struct main.go test -c "path/to/go/binary/of/application" --delay 10
```

运行Keploy服务器暴露测试API：

```shell
go run -exec "sudo -E env 'PATH=$PATH'" -tags=viper_bind_struct main.go test -c "path/to/go/binary/of/application" --delay 10 --coverage
```

生成的测试用例可在Keploy目录中找到。

### 5. 使用二进制文件设置Keploy：

#### 生成Keploy二进制文件：

```shell
go build -race -tags=viper_bind_struct -o keploy . && sudo mv keploy /usr/local/bin
```

#### 捕获测试用例：

```shell
sudo -E env PATH="$PATH" keploy record -c "path/to/go/binary"
```

#### 运行测试用例：

```shell
sudo -E env PATH="$PATH" keploy test -c "path/to/go/binary" --delay 10
```

注意：使用`--debug`标志可在调试模式下运行Keploy以获取详细日志。

### 6. 通过Docker设置Keploy：

#### 安装Keploy Docker镜像：

```shell
docker pull ghcr.io/keploy/keploy
```

#### 创建Keploy别名：

```shell
alias keployV2='sudo docker run --pull always --name keploy-v2 -p 16789:16789 --network keploy-network --privileged --pid=host -it -v $(pwd):$(pwd) -w $(pwd) -v /sys/fs/cgroup:/sys/fs/cgroup -v /sys/kernel/debug:/sys/kernel/debug -v /sys/fs/bpf:/sys/fs/bpf -v /var/run/docker.sock:/var/run/docker.sock --rm ghcr.io/keploy/keploy'
```

#### 捕获测试用例：

```shell
keployV2 record -c "docker run -p 8080:8080 --name <containerName>  --network keploy-network --rm <imageName>"" --containerName  <containerName>
```

#### 运行测试用例：

```shell
keployV2 test --c "docker run -p 8080:8080  --name <containerName> --network keploy-network --rm <imageName>" --delay 10
```

### 7. 测试本地构建的Docker镜像：

#### 构建Docker镜像：

在keploy仓库内运行以下命令，确保主仓库中没有名为keploy的目录。

```shell
sudo docker image build -t ghcr.io/keploy/keploy:v2-dev .
```

#### 创建别名：

```shell
alias keployV2='sudo docker run --name keploy-v2 -p 16789:16789 --privileged --pid=host -it -v $(pwd):$(pwd) -w $(pwd) -v /sys/fs/cgroup:/sys/fs/cgroup -v /sys/kernel/debug:/sys/kernel/debug -v /sys/fs/bpf:/sys/fs/bpf -v /var/run/docker.sock:/var/run/docker.sock -v '"$HOME"'/.keploy-config:/root/.keploy-config -v '"$HOME"'/.keploy:/root/.keploy --rm ghcr.io/keploy/keploy:v2-dev'
```

#### 记得设置Keploy二进制文件。详情参见[使用二进制文件设置Keploy](#5-setup-keploy-using-binary)

#### 捕获测试用例：

```shell
sudo -E env PATH="$PATH" keployV2 record -c "docker run -p 8080:8080 --name <containerName>  --network keploy-network --rm <imageName>"" --containerName  <containerName>
```

#### 运行测试用例：

```shell
sudo -E env PATH="$PATH" keployV2 test --c "docker run -p 8080:8080  --name <containerName> --network keploy-network --rm <imageName>" --delay 10
```

大功告成！通过本指南，您已准备好投入Keploy开发。祝您测试愉快！🧪🔍💻

> **注意**：运行`go run github.com/99designs/gqlgen generate --config pkg/graph/gqlgen.yml`生成graphql服务器存根，可与JUnit、PyTest等单元测试库配合使用。

如果仍有疑问，请联系我们。

import GetSupport from '../concepts/support.md'

<GetSupport/>