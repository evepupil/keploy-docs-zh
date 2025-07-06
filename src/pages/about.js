import React from "react";
import Layout from "@theme/Layout";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import useBaseUrl from "@docusaurus/useBaseUrl";

function About() {
  const context = useDocusaurusContext();
  const {siteConfig = {}} = context;
  return (
    <Layout
      title="关于文档"
      permalink="/about"
      description="Keploy文档的通用用户信息"
    >
      <main className="margin-vert--lg container">
        <h1>关于文档</h1>
        <div className="margin-bottom--lg">
          <h2 id="latest">文档服务协议</h2>
          <p>
            Keploy持续致力于改进和扩展其文档内容。因此，部分组件可能会未经通知即发生变更。页面永久链接（URL）、菜单标签以及信息位置等都可能随着我们努力为用户提供最佳体验而进行调整。
          </p>
          <p>
            如果您查找的信息似乎缺失，请访问
            <a href="https://github.com/keploy/docs">GitHub上的keploy/docs</a>获取帮助。
          </p>
          <p>
            若您希望协助改进Keploy文档体验，请查看
            <a href="https://github.com/keploy/docs">源代码仓库README</a>了解贡献指南。
          </p>
        </div>
        <div className="margin-bottom--lg">
          <h2 id="next">MIT许可证</h2>
          <pre>
            <p>版权所有 (c) 2021 Keploy Inc. 保留所有权利。</p>

            <p>
              特此免费授予任何获得本软件及相关文档文件（以下简称"软件"）副本的人士无限制使用软件的权利，
              <br />
              包括但不限于使用、复制、修改、合并、发布、分发、再许可及/或销售软件副本的权利，
              <br />
              并允许向其提供软件的个人按以下条件行使上述权利：
            </p>

            <p>
              须在所有软件副本或实质性部分中包含上述版权声明和本许可声明。
            </p>

            <p>
              本软件按"原样"提供，不附带任何明示或默示的担保，包括但不限于对适销性、
              <br />
              特定用途适用性和非侵权性的担保。在任何情况下，作者或版权持有人均不对
              <br />
              因软件或使用或其他交易行为引起的任何索赔、损害或其他责任承担责任，
              <br />
              无论是合同诉讼、侵权行为或其他情形所导致。
            </p>
          </pre>
        </div>
      </main>
    </Layout>
  );
}

export default About;