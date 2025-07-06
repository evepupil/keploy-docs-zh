---
id: how-keploy-works
title: Keploy 工作原理
sidebar_label: Keploy 工作原理
tags:
  - 技术解析
  - 测试用例回放
  - 回放指南
  - 录制指南
  - 测试用例录制
---

## 🌟 Keploy V2 架构 🌟

### 🎯 目标

- 🛠 **自动插桩:** 无需修改代码
- 📡 **自动流量捕获:** 捕获并操作进出流量
- ✍️ **可读可编辑:** 测试用例和桩数据易于理解修改
- 🔒 **TLS 支持:** 支持 HTTPS 或数据库的安全连接
- 🔄 **请求匹配:** 通过请求匹配实现测试时的响应模拟

## 🏗 高层架构

Keploy 使用 eBPF 技术实现无代码侵入的应用插桩，主要组件包括：

- **eBPF 钩子加载器**
- **网络代理**
- **API 服务器**

<img src="/docs/img/oss/keploy-arch.png?raw=true" alt="Keploy 架构图"/>

### 🪝 eBPF 钩子加载器

eBPF 钩子加载器处理入口和出口拦截逻辑：

- **入口拦截器:** 捕获 HTTP 入站调用并存储为 YAML 格式，拦截与 HTTP 请求连接相关的系统调用
- **出口拦截器:** 将 TCP 和特定 UDP 连接透明转发至代理进行拦截，应用对此过程无感知

### 🌐 网络代理

网络代理作为透明代理用于记录或模拟出站网络调用，处理 TCP 数据流并通过匹配协议使用相应的[集成包](https://github.com/keploy/keploy/tree/main/pkg/core/proxy/integrations)。

- **可读性:** 将 TCP 连接的二进制流转换为结构化的 YAML，涵盖数据库、缓存、API 调用等出站请求
- **未知依赖支持:** 通过 base64 编码记录二进制数据，测试时使用模糊匹配关联入站请求
- **TLS 拦截:** 对 HTTPS 等 TLS 连接，通过在应用与代理间插入伪造证书链实现流量拦截，具体实现方式因语言和运行时而异

### 🖥 API 服务器

API 服务器管理启动/停止命令和资源（如测试用例、桩数据），正在演进为支持完整代理模式（不限于 CLI）。

## 🧪 示例

假设一个应用服务同时为 web/移动端、Postman 或 curl 提供 HTTP API，并依赖数据库和其他 API：

- **录制模式:** 注入 eBPF 钩子捕获入站 HTTP 流量，重定向出站 TCP/UDP 流量至代理服务器，异步捕获数据包并存储为 YAML
- **测试模式:** 读取 YAML 测试用例和桩数据，启动应用后发送录制的 HTTP 测试用例，并对出站调用模拟响应，确保非幂等操作不会产生副作用

如有其他问题，欢迎联系我们。

import GetSupport from '../concepts/support.md'

<GetSupport/>