---
id: testing
title: 在Js中测试你的应用程序 (v1.0.0)
description: 测试你的应用程序
tags:
  - 开发者指南
  - typescript
---

## 与Mocha测试框架集成

你只需要在单元测试文件中进行一些导入并调用内置的断言函数，就这么简单！！🔥🔥🔥

```js
const {runServer} = require("../server"); //你的服务器封装
const {keploy} = require("typescript-sdk/dist/integrations/express/register");
const {describe, test, before, after} = require("mocha");
describe("test function", () => {
  before((done) => {
    keploy.setTestMode();
    runServer();
    done();
  });
  test("should be running", async () => {
    return keploy.assertTests();
  });
  after(() => {
    process.exit(1); //退出node服务器
  });
});
```

注意：要查看代码覆盖率，请使用nyc mocha并查看覆盖了多少行代码！！

注意：目前不支持Jest！！

- 此外，为了提交更改，请使用`yarn commit`而不是`git commit`以获得更好的提交体验。

- 对于VSCode设置，请确保安装了以下扩展：
  - [EditorConfig](https://marketplace.visualstudio.com/items?itemName=EditorConfig.EditorConfig)
  - [Eslint](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint)