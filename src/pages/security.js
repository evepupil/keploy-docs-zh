import React from "react";
import clsx from "clsx";
import Layout from "@theme/Layout";
import Link from "@docusaurus/Link";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import useBaseUrl from "@docusaurus/useBaseUrl";
import styles from "./styles.module.css";

export default function Security() {
  const context = useDocusaurusContext();
  const {siteConfig = {}} = context;
  return (
    <Layout
      title="Keploy 安全"
      permalink="/security"
      description="<head />"
    >
      <header className={clsx("hero hero--primary", styles.heroBanner)}>
        <div className="container">
          <h1 className="hero__title text-black">Keploy 安全</h1>
          <p className="hero__subtitle text-black">我们的承诺</p>
        </div>
      </header>
      <div className={clsx("hero hero--secondary", styles.heroBanner)}>
        <div className="container">
          <div className="row">
            <div className={clsx("col col--5", styles.securityPageHeaders)}>
              <h2>责任披露</h2>
            </div>
            <div className={clsx("col col--4", styles.justifyLeft)}>
              <p>
                如果您有任何安全问题或需要报告安全漏洞，请联系我们的团队：
                <a href="mailto:hello@keploy.io">hello@keploy.io</a>。
              </p>
              <p>
                我们承诺不会对符合以下条件的人员采取法律行动：
              </p>
              <ul>
                <li>
                  向我们完整披露所发现的问题细节
                </li>
                <li>
                  在合理修复期内对漏洞信息保密
                </li>
                <li>
                  不故意破坏我们的服务或窃取数据
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}