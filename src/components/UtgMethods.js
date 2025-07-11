import React from "react";
import Link from "@docusaurus/Link";
import useBaseUrl from "@docusaurus/useBaseUrl";

function UTGMethods() {
  return (
    <div className="mb-8 rounded-lg">
      <h2 className="mb-6 text-2xl font-semibold tracking-wide md:text-3xl">
        三种生成单元测试的方法 🚀
      </h2>
      <p className="mb-6 max-w-4xl text-lg">
        选择最适合您工作流程的方式——从自动化PR集成到一键式IDE生成：
      </p>

      <ul className="grid auto-cols-[300px] grid-flow-col gap-3 lg:gap-5">
        <li className="mt-5 flex flex-col space-y-3 text-lg">
          <Link
            className="text-foreground-light flex-grow text-sm"
            to={useBaseUrl(
              "/running-keploy/unit-test-generator/#1-pr-agent-latest-"
            )}
          >
            <div className="rounded-lg bg-[color:var(--ifm-card-background-color)] p-5 shadow transition hover:shadow-lg hover:shadow-[color:var(--ifm-card-shadow-color)]">
              <div className="flex items-center space-x-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="mb-4 h-10 w-10 rounded-lg bg-[color:var(--ifm-color)] p-2 text-[color:var(--ifm-background-color)]"
                  viewBox="0 0 24 24"
                  width="24"
                  height="24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M16 22h2a2 2 0 0 0 2-2V7l-5-5H6a2 2 0 0 0-2 2v3" />
                  <path d="M14 2v4a2 2 0 0 0 2 2h4" />
                  <circle cx="8" cy="16" r="6" />
                  <path d="m6 18 1.5-1.5L9 18l1.5-1.5" />
                </svg>
                <h2 className="mb-4 text-xl font-semibold">
                  PR代理（最新）
                </h2>
              </div>
              <ul>
                <li>
                  <p className="font">
                    创建拉取请求时自动生成单元测试。安装一次，即可为每个包含变更文件的PR获取测试。
                  </p>
                </li>
              </ul>
            </div>
          </Link>
        </li>

        <li className="mt-5 flex flex-col space-y-3 text-lg">
          <Link
            className="text-foreground-light flex-grow text-sm"
            to={useBaseUrl(
              "/running-keploy/unit-test-generator/#2-vs-code-extension-"
            )}
          >
            <div className="rounded-lg bg-[color:var(--ifm-card-background-color)] p-5 shadow transition hover:shadow-lg hover:shadow-[color:var(--ifm-card-shadow-color)]">
              <div className="flex items-center space-x-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="mb-4 h-10 w-10 rounded-lg bg-[color:var(--ifm-color)] p-2 text-[color:var(--ifm-background-color)]"
                  viewBox="0 0 24 24"
                  width="24"
                  height="24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <rect width="18" height="18" x="3" y="3" rx="2" />
                  <path d="M9 8l3 3-3 3" />
                  <path d="m16 16-5 0" />
                </svg>
                <h2 className="mb-4 text-xl font-semibold">
                  VS Code扩展
                </h2>
              </div>
              <ul>
                <li>
                  <p className="font">
                    在VS Code中一键生成单元测试。安装扩展后立即为整个项目生成测试。
                  </p>
                </li>
              </ul>
            </div>
          </Link>
        </li>

        <li className="mt-5 flex flex-col space-y-3 text-lg">
          <Link
            className="text-foreground-light flex-grow text-sm"
            to={useBaseUrl(
              "/running-keploy/unit-test-generator/#3-command-line-interface-"
            )}
          >
            <div className="rounded-lg bg-[color:var(--ifm-card-background-color)] p-5 shadow transition hover:shadow-lg hover:shadow-[color:var(--ifm-card-shadow-color)]">
              <div className="flex items-center space-x-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="mb-4 h-10 w-10 rounded-lg bg-[color:var(--ifm-color)] p-2 text-[color:var(--ifm-background-color)]"
                  viewBox="0 0 24 24"
                  width="24"
                  height="24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <polyline points="4 17 10 11 4 5" />
                  <line x1="12" x2="20" y1="19" y2="19" />
                </svg>
                <h2 className="mb-4 text-xl font-semibold">
                  命令行界面
                </h2>
              </div>
              <ul>
                <li>
                  <p className="font">
                    传统CLI方式，完全控制测试生成。非常适合CI/CD流水线和自动化工作流。
                  </p>
                </li>
              </ul>
            </div>
          </Link>
        </li>
      </ul>
    </div>
  );
}

export default UTGMethods;