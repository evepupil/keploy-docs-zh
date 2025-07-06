---
id: mac-linux
title: "在MacOS上通过搭建Linux环境原生运行Keploy"
sidebar_label: MacOS原生环境运行Keploy
---

# 在MacOS上通过搭建Linux环境原生运行Keploy

### 在MacOS上使用Debian下载并原生运行Keploy

1. 打开终端会话。
2. 运行以下命令。这将安装homebrew，使macOS上的软件和包管理更加便捷

```bash
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
```

3. 现在，借助homebrew，我们可以通过运行以下命令来安装Lima（Linux虚拟机）。

```bash
brew install lima
```

4. 创建一个Debian实例。

```bash
limactl create template://debian-12
```

5. 启动实例

```bash
limactl start debian-12
```

6. 进入运行的Linux实例的shell

```bash
limactl shell debian-12
```

7. 现在你已进入Debian实例的Linux shell。运行以下命令进入`Users`目录

```bash
cd /Users
```

8. 将以下命令中的`Username`替换为你的macOS用户名。这将带你进入macOS的主目录。（可能需要在弹出的窗口中允许Terminal.app访问）

```bash
cd /{Username}
```

9. 运行以下命令安装Keploy

```bash
curl --silent --location "https://github.com/keploy/keploy/releases/latest/download/keploy_linux_arm64.tar.gz" | tar xz --overwrite -C /tmp
sudo mkdir -p /usr/local/bin && sudo mv /tmp/keploy /usr/local/bin/keploy
```

10. 运行以下命令安装Zsh

```bash
sudo apt-get -y install zsh
```

**原因**：zsh（Z Shell）是一个比默认bash shell功能更强大的高级shell。它提供了更好的自动补全、高级通配符、改进的历史记录管理以及更多自定义选项。

11. 安装Git

```bash
sudo apt-get -y install git
```

12. 安装'Oh-my-zsh'

```bash
sh -c "$(wget https://raw.githubusercontent.com/ohmyzsh/ohmyzsh/master/tools/install.sh -O -)"
```

**原因**：oh-my-zsh是一个用于管理zsh配置的框架。它包含一系列插件、主题和增强zsh体验的有用功能。

13. 安装docker的命令

```bash
sudo apt-get -y update
```

```bash
sudo apt-get -y install ca-certificates curl
```

```bash
sudo install -m 0755 -d /etc/apt/keyrings
```

```bash
sudo curl -fsSL https://download.docker.com/linux/debian/gpg -o /etc/apt/keyrings/docker.asc
```

```bash
sudo chmod a+r /etc/apt/keyrings/docker.asc
```

```bash
echo \
  "deb [arch=$(dpkg --print-architecture) signed-by=/etc/apt/keyrings/docker.asc] https://download.docker.com/linux/debian \
  $(. /etc/os-release && echo "$VERSION_CODENAME") stable" | \
  sudo tee /etc/apt/sources.list.d/docker.list > /dev/null
```

```bash
sudo apt-get -y update
```

```bash
sudo apt-get -y install docker-ce docker-ce-cli containerd.io docker-buildx-plugin docker-compose-plugin
```

14. 将docker添加到sudoers

```bash
sudo groupadd docker
```

```bash
sudo gpasswd -a $USER docker
```