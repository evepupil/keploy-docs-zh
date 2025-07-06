import React from "react";
import useBaseUrl from "@docusaurus/useBaseUrl";
import Link from "@docusaurus/Link";

const links = [
  {
    type: "article",
    title: "什么是Keploy？",
    length: "阅读时间3-20分钟",
    url: "/keploy-explained/introduction",
  },
  {
    type: "article",
    title: "安装指南",
    length: "阅读时间10分钟",
    url: "/server/installation/",
  },
  {
    type: "article",
    title: "Go示例应用快速入门",
    length: "阅读时间10分钟",
    url: "/quickstart/samples-gin",
  },
  {
    type: "article",
    title: "为什么选择Keploy？",
    length: "阅读时间1分钟",
    url: "/keploy-explained/why-keploy",
  },
  {
    type: "video",
    title: "Keploy演示视频",
    length: "观看时间2分钟",
    url: "https://www.youtube.com/watch?v=23yQaY81Zho",
  },
];

export const Resources = () => {
  return (
    <section className="mb-4 mt-12">
      <h2 className="mb-4 text-2xl font-semibold tracking-wide md:text-3xl">
        快速链接
      </h2>
      <ul className="mt-5 flex flex-col space-y-3 text-lg">
        {links.map((link, i) => (
          <li key={i} className="flex items-center space-x-3 hover:underline">
            {link.type === "article" ? (
              // 文章链接图标
              <svg
                className="h-7 w-7 text-[color:var(--ifm-color-primary-dark)]"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 6a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1zm1 3a1 1 0 100 2h6a1 1 0 100-2H7z"
                  clipRule="evenodd"
                />
              </svg>
            ) : (
              // 其他链接图标（如视频、文档）
              <svg
                className="h-7 w-7 text-[color:var(--ifm-color-primary-dark)]"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z"
                  clipRule="evenodd"
                />
              </svg>
            )}

            {/* 链接文本 */}
            <Link className="flex-1" to={useBaseUrl(link.url)}>
              {link.title}{" "}
              <span className="text-xs uppercase opacity-80">
                {link.length}
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
};