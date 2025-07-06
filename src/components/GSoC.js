import React from "react";
import Link from "@docusaurus/Link";
import useBaseUrl from "@docusaurus/useBaseUrl";

export const GSoC = () => {
  return (
    <section className="mb-14 mt-1">
      <h2 className="text-3xl md:text-4xl">Keploy GSoC指南</h2>
      <Link to={useBaseUrl("/gsoc/contribution-guide")}>
        <img
          className="mt-5 h-[450px] w-full"
          src="/docs/img/gsoc-banner.png"
          alt={"GSoC 2023"}
        />
      </Link>
      <div className="mt-5 grid grid-cols-1 gap-6 md:grid-cols-2 lg:gap-8">
        <a
          className=" scale flex flex-col items-center justify-center space-y-3 rounded-lg bg-[color:orange] p-6 text-center shadow-lg"
          href="https://github.com/keploy/gsoc/tree/main/2023"
        >
          <p className="text-lg font-semibold">项目列表</p>
        </a>
        <Link
          className=" scale flex flex-col items-center justify-center space-y-3 rounded-lg bg-[color:orange] p-6 text-center shadow-lg"
          to={useBaseUrl("/gsoc/contribution-guide")}
        >
          <p className="text-lg font-semibold">了解更多</p>
        </Link>
      </div>
    </section>
  );
};