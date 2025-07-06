---
id: docs-contrib-guide
title: 为Keploy文档网站做贡献 (v1.0.0)
label: 文档网站贡献指南
description: 本贡献指南面向开发者，介绍如何在本地搭建Keploy环境。
keywords:
  - GitHub
---

# 为Keploy文档网站做贡献

我们欢迎社区成员的贡献。

**对于除拼写错误和小修小补之外的任何改动，请先创建[GitHub issue](https://github.com/keploy/docs/issues)。**

如果您要创建拉取请求(PR)，请遵循我们的[风格指南](https://github.com/keploy/docs/blob/main/STYLE.md)。

我们会定期审查GitHub issues和PRs。

为确保每次改动都相关且经过同行评审，请遵守开源贡献的最佳实践。
这意味着如果您不属于Keploy组织，必须先fork仓库，然后从您自己的fork创建PR分支。
GitHub的[首次贡献仓库](https://github.com/firstcontributions/first-contributions)中的README提供了一个示例。

## 如何在本地搭建文档网站？

Keploy文档网站使用静态网站生成器Docusaurus 2。

您可以在不预览的情况下直接本地修改。
但如果想构建网站并在浏览器中预览改动，需要先安装Docusaurus 2的依赖。

在仓库根目录运行一次[`yarn`](https://classic.yarnpkg.com/en/docs/cli/)来初始化Docusaurus 2。

现在可以构建并本地查看网站：

```bash
yarn start
```

该命令会启动本地开发服务器并打开浏览器窗口。

## Prettier代码格式化

1. Fork仓库

<br/>

2. 克隆仓库（将{'<'}GITHUB_USERNAME{'>'}替换为您的用户名）

```sh
git clone https://github.com/GITHUB_USERNAME/docs.git
```

<br/>

3. 进入项目目录

```sh
cd docs
```

<br/>

4. 安装所有依赖

```sh
yarn
```

<br/>

5. 启动开发服务器

```sh
yarn start
```

6. 格式化代码：

```
yarn prettier --write '**/*.{js,md}'
```

当您的PR被合并后，系统会自动构建并将改动发布到[https://docs.keploy.io](https://docs.keploy.io)。

## 如何贡献代码？

错误修复、性能优化、代码格式化...
有很多方式可以贡献代码！
项目的问题列表是寻找可贡献内容的好地方。

为提高代码被合并的几率，请确保：

- 满足我们的贡献标准
- 您的拉取请求：
  - 通过所有检查且无冲突
  - 标题和描述简明扼要地说明您的改动

## 如何报告错误、提供反馈或请求功能？

我们欢迎各类错误报告、用户反馈和功能请求！我们准备了一些issue模板来协助您。请在相关项目仓库中使用它们创建新issue。如果不知道如何创建issue，步骤如下：

1. 导航到文档网站仓库主页
2. 点击`Issues`
3. 点击`New issue`
4. 我们的仓库使用issue模板，点击对应类型issue旁的`Get started`
5. 输入issue标题。建议按照模板描述问题
6. 完成后点击`Submit new issue`

## 如何提交PR来添加新文档或修复错误？

在本地克隆文档仓库后，编辑您想改动的文件，并按照以下步骤提交PR：

1. 将更改`add`和`commit`到您的仓库
2. 将更改push到您在Github上的fork
3. 在Github上点击`Create a new Pull Request`按钮
4. 使用简洁的标题和描述性评论说明您的PR。确保维护者能从描述中理解您的改动

## 如何建议UI/UX改进？

Keploy UI是我们软件最重要的改进领域之一，我们非常需要您的帮助！

如果您有改进想法，请通过创建[新issue](https://github.com/keploy/ui/issues/new/choose)与我们分享。

## 如何贡献翻译？

目前我们的界面不支持翻译，也没有制定翻译策略。但我们希望改变这一点，让项目对非英语用户更友好。如果您有任何想法，请通过创建[新issue]与我们分享。