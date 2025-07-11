---
id: api-testing-chrome-extension
title: API测试录制器（Chrome扩展）
sidebar_label: API测试录制器
description: 学习如何直接从浏览器安装、录制、导出并自动生成Keploy测试。
---

安装扩展后，点击**录制API调用**，操作您的网页应用，然后按下**生成测试**将捕获的流量发送至Keploy。

## API测试录制器的功能

**浏览器端流量捕获** — 在您点击浏览时嗅探XHR/fetch调用。

**即时回放格式** — 将捕获的调用导出为cURL、JSON或原生Keploy YAML格式。

**URL过滤与调试** — 限定捕获特定端点，并自动修复不完整的请求/响应对。

**一键生成测试** — 将流量推送至Keploy控制台，立即获得可运行的带断言API测试。

## 安装步骤

1. [打开Chrome应用商店中的**Keploy API测试录制器**页面](https://chromewebstore.google.com/detail/keploy-api-test-recorder/ohcclfkaidblnjnggclkiecgkpgldihe)

2. 点击**添加到Chrome → 添加扩展**。  
   Chrome将自动下载签名版本并启用。

3. 固定**Keploy API测试录制器**图标以便快速访问：  
   **扩展程序** **⋮ → 固定**。

## 快速入门流程

1. **登录**使用与app.keploy.io相同的邮箱。
2. 点击**录制API调用**。
3. 在另一个标签页中**操作您的应用**（如创建账户、加入购物车等）。
4. 观察实时计数器：
   - **捕获的调用** – 拦截到的XHR/fetch请求总数。
   - **完整的请求/响应** – 请求和响应均被完整捕获的对数。
5. 若请求/响应对数低于预期，点击**调试**修复缺失对。  
   示例：

```
调试摘要：

总调用数：33
完整（状态码+正文）：2
不完整：31
有状态码无正文：13
有正文无状态码：0
标记为完整：30
已修复记录：15
```

6. 点击**生成测试**。
   - 扩展将捕获集POST至`https://app.keploy.io`。
   - 浏览器将打开新标签页显示测试用例生成进度。
   - 完成后会显示可运行的**测试套件**。
7. 从**导出格式**中选择：
   - **cURL命令** – 每个调用单行命令，可分享至Slack/Gist。
   - **Keploy YAML** – 直接用于`keploy run`。
   - **JSON** – 原始负载供自定义工具使用。
8. 点击**导出数据**下载或**复制**到剪贴板。

## 界面参考

| 按钮/字段            | 用途                                           | 备注                                      |
| --------------------- | --------------------------------------------- | ---------------------------------------- |
| **登出**             | 清除认证令牌并停止后台监听。                   | 可随时重新登录。                         |
| **录制API调用**      | 开始/停止捕获会话。                            | 激活状态显示为红色。                     |
| **捕获的调用**       | 蓝色计数器显示总请求数。                       | 包含不完整的对。                         |
| **完整的请求/响应**  | 绿色计数器显示完整捕获的对数。                 | 此为实际导出的数量。                     |
| **检查状态**         | 快速检查本地捕获数据库的健康状态。             |
| **调试**             | 尝试匹配孤立的请求和响应。                     |
| **重置数据库**       | 危险操作：清除所有本地捕获数据。               | 不可逆；适合开始新测试前使用。           |
| **URL过滤器**        | 正则表达式或纯URL子字符串过滤。                | 留空则捕获所有流量。                     |
| **复制**             | 将导出内容复制到剪贴板。                       | 便于快速粘贴至终端。                     |
| **生成测试**         | 发送数据至Keploy控制台并跳转。                 | 需保持网络连接。                         |

## 最佳实践

- **输入URL** – 设置URL过滤器为需要录制的基础域名，确保捕获关键流量。
- **保持会话简短** – 每次只为一个功能流生成测试，通过迭代而非单次录制所有内容。

## 故障排除

| 现象                                                      | 可能原因                               | 解决方法                                                                |
| -------------------------------------------------------- | -------------------------------------- | ---------------------------------------------------------------------- |
| `捕获的调用`增加但`完整的请求/响应`始终为0 | 响应被CORS或Service Worker拦截。       | 点击**调试**，或在扩展权限中白名单域名。                              |
| 点击**生成测试**时出现"网络错误"         | 认证令牌过期。                         | 重新登录。                                                            |