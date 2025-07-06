---
id: mock-library
title: 模拟库使用指南 (v1.0.0)
description: 本文简要介绍如何使用模拟库
tags:
  - 开发者指南
  - typescript
---

单元测试中的外部调用将被记录，并通过名为mocks目录下的yaml文件进行模拟回放。

以下是使用octokit的单元测试示例：

#### 示例

```js
require("typescript-sdk/dist/integrations/octokit/require");
var {NewContext} = require("typescript-sdk/dist/mock/mock");
var assert = require("assert");
const {Octokit, App} = require("octokit");
describe("routes", function () {
  var server, octokit;
  beforeEach(function () {
    NewContext({Mode: "record", Name: "your demo app name"}); // 在此设置你的keploy模式和名称
    // 清除缓存，确保每个测试都使用新的服务器实例
    // delete require.cache[require.resolve('../app')];

    octokit = new Octokit({auth: "your authentication token"});
  });
  // 测试URL是否正确响应
  it("url/", async function () {
    return new Promise(function (resolve) {
      octokit.rest.users.getAuthenticated({}).then((result) => {
        assert.equal(result.data.login, "your github username");
        resolve();
      });
    });
  });
});
```