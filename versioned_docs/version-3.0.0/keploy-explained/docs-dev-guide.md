---
id: docs-dev-guide
title: 文档开发指南
sidebar_label: 文档开发指南
tags:
  - 开发指南
  - 说明
  - 贡献
---

# 如何贡献

我们欢迎社区成员的贡献。

**对于除错别字和小修正之外的任何更改，请创建[GitHub issue](https://github.com/keploy/docs/issues)。**

如果您要创建拉取请求(PR)，请遵循我们的风格指南。

我们会定期审查GitHub issues和PRs。

为确保每次更改都相关且经过同行评审，请遵守开源贡献的最佳实践。
这意味着如果您不属于Keploy组织，必须fork仓库并从您自己的fork创建PR分支。
GitHub的[first-contributions仓库](https://github.com/firstcontributions/first-contributions)中的README提供了示例。

## 如何本地设置文档网站？

Keploy文档站点使用静态网站生成器Docusaurus 2。

您可以在不预览浏览器更改的情况下本地进行修改。
但如果要在浏览器中构建站点并预览更改，需要安装Docusaurus 2依赖项。

通过在仓库根目录运行[`yarn`](https://classic.yarnpkg.com/en/docs/cli/)或[`npm`](https://docs.npmjs.com/cli/v10)初始化Docusaurus 2。

现在可以本地构建和查看站点：

```shell
npm start
```

或

```shell
npm start
```

或

```shell
yarn start
```

该命令将启动本地开发服务器并打开浏览器窗口。

## Prettier

**注意：网站已迁移使用`npm`进行构建、测试和部署。**

步骤1至3对`yarn`和`npm`相同

1. Fork仓库

2. 克隆仓库，替换{'<'}GITHUB_USERNAME{'>'}为您的用户名

```shell
git clone https://github.com/<GITHUB_USERNAME>/docs.git
```

3. 进入项目目录

```shell
cd docs
```

### 使用`npm`

4. 安装所有依赖

```shell
npm install
```

5. 启动开发服务器

```shell
npm start
```

6. 格式化代码：

```shell
npm prettier --write '**/*.{js,md}'
```

### 使用`yarn`(旧版)

4. 安装所有依赖

```shell
yarn
```

5. 启动开发服务器

```shell
yarn start
```

6. 格式化代码：

```shell
yarn prettier --write '**/*.{js,md}'
```

当您的PR被合并时，将自动触发新构建并将更改发布到[https://docs.keploy.io](https://docs.keploy.io)。

## 如何贡献代码？

错误修复、性能改进、代码格式化...
有很多方式可以贡献代码！
项目的问题列表是寻找可协助内容的好地方。

为提高代码合并几率，请确保：

- 满足我们的贡献标准
- 您的拉取请求：
  - 通过所有检查且无冲突
  - 具有简明扼要的标题和描述变更的消息

## 如何报告错误、提供反馈或请求功能？

我们欢迎各类错误报告、用户反馈和功能请求！我们创建了一些问题模板来协助您。请在相关项目仓库中使用它们创建新问题。如果不确定如何创建问题，步骤如下：

1. 导航至文档网站仓库主页

2. 点击`Issues`

3. 点击`New issue`

4. 我们的仓库使用问题模板，点击对应类型问题旁的`Get started`

5. 输入问题标题。建议按照问题模板描述问题

6. 完成后点击`Submit new issue`

## 如何提交拉取请求添加新文档或修复错误？

在本地克隆文档仓库后，编辑要更改的文件并按照以下步骤提交拉取请求。

1. 将更改`add`和`commit`到您的仓库

2. 将更改Git push到您的Github fork

3. 在Github上点击`Create a new Pull Request`按钮

4. 使用简洁标题和描述性评论说明您的拉取请求。确保维护者能从描述中理解您的建议变更

## 如何建议UI/UX改进？

Keploy UI是我们软件最重要的改进领域之一。我们非常需要您的帮助！

如果有改进想法，请通过创建[新问题](https://github.com/keploy/keploy/issues/new/choose)与我们分享。

## 如何贡献翻译？

目前我们的界面不支持翻译，也没有翻译策略。但我们希望改变这一点。希望项目对非英语用户更友好。如果有任何想法，请通过创建[新问题]分享。

希望这些对您有所帮助，如果仍有疑问，请联系我们。

import GetSupport from '../concepts/support.md'

<GetSupport/>