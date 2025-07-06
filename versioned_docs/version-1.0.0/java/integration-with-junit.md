---
id: integration-with-Junit
title: 与Junit集成 (v1.0.0)
sidebar_label: 与Junit集成
---

- 在单元测试文件中添加以下代码，例如在`test/java`目录下的`Sample_Test.java`文件中。

```java
          @Test
          public void TestKeploy() throws InterruptedException {

             CountDownLatch countDownLatch = HaltThread.getInstance().getCountDownLatch();
             mode.setTestMode();
             new Thread(() -> {
                 SamplesJavaApplication.main(new String[]{""});
                 countDownLatch.countDown();
             }).start();

             countDownLatch.await();
          }
```

- 运行`mvn test`命令