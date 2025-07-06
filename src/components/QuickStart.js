import React from "react";
import Link from "@docusaurus/Link";
import useBaseUrl from "@docusaurus/useBaseUrl";

export const QuickStart = () => {
  return (
    <section className="mt-1">
      <h1 className="mb-4 text-4xl font-semibold tracking-wide md:text-4xl">
        欢迎来到Keploy文档！🚀
      </h1>
      <p className="text-l max-w-3xl">
        本文档将帮助您充分利用Keploy——无论您是构建第一个项目还是升级测试工作流。
      </p>

      <h2 className="mb-4 mt-8 text-2xl font-semibold tracking-wide md:text-3xl">
        Keploy是什么？🤔
      </h2>
      <p className="text-l max-w-4xl">
        Keploy是面向开发者的开源后端测试工具。它使工程团队的后端测试变得简单高效，具备易用性、强大功能和可扩展性。🛠️ Keploy还提供AI驱动的工具，帮助快速生成单元测试和API测试，让开发者专注于编写代码而非测试用例。
      </p>

      <p className="text-l mt-4 max-w-4xl">
        Keploy通过记录API调用和数据库查询，从用户流量自动生成测试用例和数据模拟/桩，显著加速发布周期并提升可靠性。📈
      </p>

      <h2 className="mt-8 text-2xl font-semibold tracking-wide md:text-3xl">
        安装指南 📗
      </h2>
      <p className="text-l mb-8 mt-4 max-w-4xl">
        让我们在您的Windows、Linux或macOS设备上快速安装Keploy，几分钟即可开始创建测试用例。⏱️
      </p>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-3 lg:gap-8">
        <Link
          className="scale flex flex-col items-center justify-center space-y-3 rounded-lg bg-[color:var(--ifm-card-background-color)] p-6 text-center shadow-lg"
          to={useBaseUrl("/server/installation/")}
        >
          <img
            className="h-16 w-16"
            src="/docs/img/os/windows-logo.svg"
            alt="Windows logo"
          />
          <p className="text-lg font-semibold">Windows</p>
        </Link>
        <Link
          className="scale flex flex-col items-center justify-center space-y-3 rounded-lg bg-[color:var(--ifm-card-background-color)] p-6 text-center shadow-lg"
          to={useBaseUrl("/server/installation/")}
        >
          <img
            className="h-16 w-16"
            src="/docs/img/os/linux-logo.svg"
            alt="Linux logo"
          />
          <p className="text-lg font-semibold">Linux</p>
        </Link>
        <Link
          className="scale flex flex-col items-center justify-center space-y-3 rounded-lg bg-[color:var(--ifm-card-background-color)] p-6 text-center shadow-lg"
          to={useBaseUrl("/server/installation/")}
        >
          <img
            className="h-16 w-16"
            src="/docs/img/os/apple-logo.svg"
            alt="Mac logo"
          />
          <p className="text-lg font-semibold">MacOS</p>
        </Link>
      </div>
      <p className=" text-l mt-6 text-gray-500">
        ⚠️ 请注意Keploy v2目前处于开发阶段，Linux系统体验最佳。Docker支持尚属实验性质，某些使用场景可能存在限制。
      </p>
    </section>
  );
};