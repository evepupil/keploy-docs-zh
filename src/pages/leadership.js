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
    <Layout title="领导团队" permalink="/Leadership" description="<head />">
      <div className="my-15 mx-auto w-auto">
        <ul className="text-center">
          <li className="my-7">
            <span className="text-xl font-semibold">妮哈·古普塔</span>
            <img
              className="mx-auto my-3 w-40"
              alt="妮哈·古普塔"
              src="https://avatars.githubusercontent.com/u/15074229?v=4"
            />
            <a className="" href="https://twitter.com/know_neha">
              https://twitter.com/know_neha
            </a>
          </li>
          <li className="my-7">
            <span className="text-xl font-semibold">舒巴姆·贾恩</span>
            <img
              className="mx-auto my-3 w-40"
              alt="舒巴姆·贾恩"
              src="https://avatars.githubusercontent.com/u/12831254?v=4"
            />
            <a href="https://twitter.com/slayerjain">
              https://twitter.com/slayerjain
            </a>
          </li>
        </ul>
      </div>
    </Layout>
  );
}