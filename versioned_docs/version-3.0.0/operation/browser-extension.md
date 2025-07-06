---
id: browser-extension-operations
title: 浏览器扩展操作指南
description: Keploy Chrome浏览器扩展使用手册
sidebar_label: Selenium浏览器扩展
tags:
  - 浏览器扩展
  - 插件
---

## 先决条件

1. [Golang](https://go.dev/dl/)
2. [Docker](https://docs.docker.com/get-docker/)
3. [Selenium IDE扩展](https://chrome.google.com/webstore/detail/selenium-ide/mooikfkahbdckldjjndioackbalphokd?hl=en)
4. [Keploy](https://github.com/keploy/keploy)
5. GCC编译器

## 在PC上安装Keploy

```shell
git clone https://github.com/keploy/keploy.git
```

进入该目录后，通过运行以下命令在docker中启动项目。

```shell
docker-compose -f docker-compose-dev.yaml up
```

从以下链接安装Keploy浏览器扩展：https://github.com/keploy/browser-extension/releases

安装浏览器扩展后，进入扩展管理器并切换到开发者模式。

![扩展管理器](https://miro.medium.com/max/828/1*xQcKiTOy2bak4Lo9k_qsTg.png)

然后点击"加载已解压的扩展"按钮（该按钮会在开启开发者模式后出现），从预期位置导入扩展文件。

![加载扩展](https://miro.medium.com/max/828/1*cdRr3Neb1lsDRzHztdWmSA.png)

现在我们已经具备：

- 安装Selenium扩展
- 安装Keploy扩展
- Keploy工具已安装并在docker中运行

让我们开始使用Selenium IDE扩展进行前端测试。Keploy扩展将在后台持续运行，只要keploy服务器处于运行状态。

**步骤1**：创建新项目并重命名，或打开现有项目

![创建项目](https://miro.medium.com/max/750/1*K6-I3fOHGu29sgUEjcpxUA.png)

![项目命名](https://miro.medium.com/max/750/1*lEwF0okhMyKzaS2a8dPA7Q.png)

**步骤2**：为第一个测试用例命名

![测试用例](https://miro.medium.com/max/828/1*u1VNf-nXXvekruNphAIfIQ.png)
![重命名测试用例](https://miro.medium.com/max/378/1*CL3156yKX4UhklO3l_vH4Q.png)
![测试用例名称](https://miro.medium.com/max/750/1*0KeAj9Nij6i1_-Gd_265uA.png)

**步骤3**：输入待测试网站的URL

![项目端点](https://miro.medium.com/max/640/1*zkGIhYuzH6MVIhk4ByTpkg.png)

**步骤4**：点击右上角的录制按钮

![录制](https://miro.medium.com/max/456/1*OJBhp3uWaOnNaOynI_jigw.png)

**步骤5**：默认浏览器将打开（本例中使用Chrome浏览器）

**步骤6**：执行所需操作，Selenium将开始记录位置、动作及该位置的数据

**步骤7**：本例中我们使用关键词"oss"进行谷歌搜索。虽然出现了许多搜索结果建议，但我们选择第一个选项

![执行操作](https://miro.medium.com/max/828/1*9wXASZ3JLur3r_Gk2Q-gug.jpeg)
![记录操作](https://miro.medium.com/max/828/1*4ur53dlBZ94Y2gbJCZLYJA.jpeg)

**步骤8**：Keploy服务器已在后台运行，且Chrome浏览器中已安装Keploy扩展。后台中，Keploy服务器正将所有来自前端API的数据记录到MongoDB。让我们通过Mongo Compass查看数据库

![Compass截图](https://miro.medium.com/max/828/1*WYChY6_nwLcmUJw5I-j7Dg.jpeg)

**步骤9**：现在我们将重放Selenium中记录的数据，但这次数据不会来自谷歌的实时服务器，而是来自Keploy创建的模拟数据库

![使用Keploy重运行](https://miro.medium.com/max/828/1*9wXASZ3JLur3r_Gk2Q-gug.jpeg)
![测试运行](https://miro.medium.com/max/828/1*4ur53dlBZ94Y2gbJCZLYJA.jpeg)

**步骤10**：由于使用静态数据库，所有Selenium测试用例都将通过

![依赖模拟](https://miro.medium.com/max/828/1*LGHdZuf_GnlMamxJGYKXUg.png)