---
id: platform-requirements
title: Keploy 平台特定要求
sidebar_label: 平台特定要求
tags:
  - linux
  - ebpf
  - installation
  - install
keywords:
  - ebpf
  - 安装
  - 安装指南
  - ubuntu
  - linux
  - windows
  - API 测试生成器
  - 自动化测试用例生成
  - 服务器设置
---

## 🛠️ Keploy 平台特定要求

下表总结了在 MacOS、Windows 和 Linux 上原生安装及通过 Docker 安装 Keploy 所需的工具：

| 操作系统                                                                                                                                                                                                                                                                                              | 非 Docker 安装                                                                                                                  | Docker 安装                                                                                                             | 先决条件                                                                                                                                                                            |
| ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| <img src="https://www.pngplay.com/wp-content/uploads/3/Apple-Logo-Transparent-Images.png" width="15" height="15" alt="MacOS" /> **MacOS**                                                                                                                                                                     | <img src="https://upload.wikimedia.org/wikipedia/en/b/ba/Red_x.svg" width="20" height="20" alt="不支持" />               | <img src="https://upload.wikimedia.org/wikipedia/commons/e/e5/Green_tick_pointed.svg" width="20" height="20" alt="支持" /> | - Docker Desktop 版本必须为 4.25.2 或更高<br/> - 如需在 MacOS 上原生运行 Keploy，请参阅[指南](/keploy-explained/mac-linux.md)                                           |
| <img src="https://upload.wikimedia.org/wikipedia/commons/5/5f/Windows_logo_-_2012.svg" width="15" height="15" alt="Windows" /> **Windows**                                                                                                                                                                    | <img src="https://upload.wikimedia.org/wikipedia/commons/e/e5/Green_tick_pointed.svg" width="20" height="20" alt="支持" /> | <img src="https://upload.wikimedia.org/wikipedia/commons/e/e5/Green_tick_pointed.svg" width="20" height="20" alt="支持" /> | - 使用 [WSL](https://learn.microsoft.com/en-us/windows/wsl/install#install-wsl-command) `wsl --install` <br/> - Windows 10 版本 2004 及更高（内部版本 19041 及更高）或 Windows 11 |
| <img src="https://th.bing.com/th/id/R.7802b52b7916c00014450891496fe04a?rik=r8GZM4o2Ch1tHQ&riu=http%3a%2f%2f1000logos.net%2fwp-content%2fuploads%2f2017%2f03%2fLINUX-LOGO.png&ehk=5m0lBvAd%2bzhvGg%2fu4i3%2f4EEHhF4N0PuzR%2fBmC1lFzfw%3d&risl=&pid=ImgRaw&r=0" width="10" height="10" alt="Linux" /> **Linux** | <img src="https://upload.wikimedia.org/wikipedia/commons/e/e5/Green_tick_pointed.svg" width="20" height="20" alt="支持" /> | <img src="https://upload.wikimedia.org/wikipedia/commons/e/e5/Green_tick_pointed.svg" width="20" height="20" alt="支持" /> | Linux 内核 5.15 或更高版本                                                                                                                                                              |

在 MacOS 和 Windows 上，由于缺乏原生 eBPF 支持，Keploy 需要额外的工具。