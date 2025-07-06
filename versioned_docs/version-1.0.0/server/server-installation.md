---
id: server-installation
title: Keploy 服务器安装指南 (v1.0.0)
sidebar_label: 服务器安装
---

[Keploy Server](https://github.com/keploy/keploy) 可以在本地安装并运行。要快速安装并运行 Keploy 服务器，请根据您的操作系统平台下载对应的二进制文件：

<!--
- [Helm Charts](#helm-charts): 将服务器部署到 [Kubernetes](https://kubernetes.io/) 是提升测试 QA、SDE 和 SDET 团队协作效率的便捷方式。
-->

<!--
## Helm Charts

Keploy 也可以通过 Helm chart 安装到您的 Kubernetes 集群中。它会自动使用 [Bitnami Mongo Helm chart](https://github.com/bitnami/charts/tree/master/bitnami/mongodb) 部署一个 mongo 实例。

#### 安装

```shell
helm upgrade -i keploy .
```

#### 通过 kube proxy 访问

```shell
export POD_NAME=$(kubectl get pods --namespace default -l "app.kubernetes.io/name=keploy,app.kubernetes.io/instance=keploy" -o jsonpath="{.items[0].metadata.name}")
export CONTAINER_PORT=$(kubectl get pod --namespace default $POD_NAME -o jsonpath="{.spec.containers[0].ports[0].containerPort}")
kubectl --namespace default port-forward $POD_NAME 6789:$CONTAINER_PORT
```

然后就可以通过 http://127.0.0.1:6789 访问 keploy 服务。

#### 通过 ingress 访问

要通过 ingress 访问 Keploy，请在 [values.yaml](https://github.com/keploy/keploy/blob/main/deployment/keploy/values.yaml) 文件中添加 ingress 的相关配置。

-->

## 安装二进制文件

### MacOS

```shell
curl --silent --location "https://github.com/keploy/keploy/releases/tag/v0.9.1/download/keploy_darwin_all.tar.gz" | tar xz -C /tmp

sudo mkdir -p /usr/local/bin && sudo mv /tmp/keploy /usr/local/bin && keploy
```

### Linux

<details>
<summary>Linux</summary>

```shell
curl --silent --location "https://github.com/keploy/keploy/releases/tag/v0.9.1/download/keploy_linux_amd64.tar.gz" | tar xz -C /tmp

sudo mkdir -p /usr/local/bin && sudo mv /tmp/keploy /usr/local/bin && keploy
```

</details>

<details>
<summary>Linux ARM</summary>

```shell
curl --silent --location "https://github.com/keploy/keploy/releases/tag/v0.9.1/download/keploy_linux_arm64.tar.gz" | tar xz -C /tmp

sudo mkdir -p /usr/local/bin && sudo mv /tmp/keploy /usr/local/bin && keploy
```

用户界面可以通过 http://localhost:6789 访问。

</details>

### Windows

<details>
<summary>Windows</summary>

- 下载 [Keploy Windows AMD64](https://github.com/keploy/keploy/releases/tag/v0.9.1/download/keploy_windows_amd64.tar.gz)，并从压缩文件夹中解压文件。

- 运行 `keploy.exe` 文件。

</details>

<details>
<summary>Windows ARM</summary>

- 下载 [Keploy Windows ARM64](https://github.com/keploy/keploy/releases/tag/v0.9.1/download/keploy_windows_arm64.tar.gz)，并从压缩文件夹中解压文件。

- 运行 `keploy.exe` 文件。

</details>

搞定！🧑🏻‍💻 服务器已经运行起来了！