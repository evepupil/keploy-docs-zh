import React from "react";
import Layout from "@theme/Layout";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import {SDKs} from "../components/SDKs";

export default function ApplicationDevelopment() {
  const context = useDocusaurusContext();
  const {siteConfig = {}} = context;
  return (
    <Layout
      title="Keploy应用开发"
      permalink="/application-development"
    >
      <div className="mx-auto mb-12 max-w-screen-lg p-6 md:p-10">
        <SDKs />
      </div>
    </Layout>
  );
}