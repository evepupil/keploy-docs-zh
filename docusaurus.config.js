//@ts-check

import {themes as prismThemes} from "prism-react-renderer";
const path = require("path");
import {visit} from "unist-util-visit";
const FontPreloadPlugin = require("webpack-font-preload-plugin");

/** @type {import('@docusaurus/types').DocusaurusConfig} */
module.exports = {
  title: "Keploy官方文档中文版",
  titleDelimiter: "🐰",
  tagline: "API 测试生成工具",
  url: "https://keploy.docslib.dev",
  baseUrl: "/",
  onBrokenLinks: "warn",
  onBrokenMarkdownLinks: "warn",
  trailingSlash: true,
  favicon: "img/favicon.png",
  organizationName: "keploy", // 通常是 GitHub 组织/用户名
  projectName: "docs", // 通常是仓库名
  plugins: [
    function preloadFontPlugin() {
      return {
        name: "preload-font-plugin",
        configureWebpack() {
          return {
            plugins: [new FontPreloadPlugin()],
          };
        },
      };
    },
    "docusaurus-tailwindcss-loader",
  ],
  themeConfig: {
    canonicalBase: "https://www.keploy.io/",
    metadata: [
      {
        description: "Keploy 后端测试生成器文档",
      },
      {
        name: "x-default",
        content: "en-us",
      },
      {
        name: "description",
        content:
          "Keploy - 开源工具，可从 API 调用生成带有模拟和桩的回归测试，类似单元测试。",
      },
      {
        name: "keywords",
        content:
          "API 测试, Keploy 文档, 事件回放, 网络调用, 代码路径, 测试场景, 代码覆盖率, 桩, junit, go-test, 生产环境, 生产事件, 开源, 回归测试, AI 测试",
      },
      {name: "twitter:card", content: "summary_large_image"},
    ],
    headTags: [
      // 预连接标签
      {
        tagName: "link",
        attributes: {
          rel: "preconnect",
          href: "https://keploy.io/",
        },
      },
      {
        tagName: "script",
        attributes: {
          type: "application/ld+json",
        },
        innerHTML: JSON.stringify({
          "@context": "https://schema.org/",
          "@type": "Product",
          description:
            "Keploy - 开源工具，可从 API 调用生成带有模拟或桩的集成测试，类似单元测试。",
          keywords:
            "API 测试, 事件回放, 网络调用, 代码路径, 测试场景, 代码覆盖率, 桩, junit, go-test, 生产环境, 生产事件, 开源, 回归测试, AI 测试",
          name: "Keploy",
          url: "https://keploy.io/",
          logo: "https://keploy.io/docs/img/favicon.png",
        }),
      },
    ],
    colorMode: {
      defaultMode: "light",
      disableSwitch: false,
      // switchConfig: {
      //   darkIcon: "🌙",
      //   darkIconStyle: {
      //     content: `url(/img/moon.svg)`,
      //     transform: "scale(2)",
      //     margin: "0 0.2rem",
      //   },
      //   lightIcon: "\u{1F602}",
      //   lightIconStyle: {
      //     content: `url(/img/sun.svg)`,
      //     transform: "scale(2)",
      //   },
      // },
    },
    announcementBar: {
      id: "announcementBar_1", // 变更时递增
      content: `⭐️ 如果喜欢 Keploy，请在 <a target="_blank" rel="noopener noreferrer" href="https://github.com/keploy/keploy">GitHub</a> 上给我们点星，并在 <a target="_blank" rel="noopener noreferrer" href="https://twitter.com/keployio">Twitter</a> 上关注我们 ❤️ `,
    },
    prism: {
      theme: prismThemes.vsLight,
      darkTheme: prismThemes.dracula,
      additionalLanguages: ["java", "ruby", "php", "bash"],
    },
    // hideableSidebar: true,
    navbar: {
      hideOnScroll: false,
      logo: {
        alt: "Keploy 标志",
        src: "img/keploy-logo-dark.svg",
        srcDark: "img/keploy-logo-dark.svg",
      },
      items: [
        {
          label: "产品",
          position: "left",
          items: [
            {
              label: "集成测试",
              to: "/keploy-explained/introduction",
            },
            {
              label: "API 测试 (AI)",
              to: "/running-keploy/api-test-generator",
            },
            {
              label: "单元测试",
              to: "/running-keploy/utg-pr-agent",
            },
          ],
        },
        {
          label: "博客",
          items: [
            {
              label: "技术博客",
              href: "https://keploy.io/blog/technology",
            },
            {
              label: "社区文章",
              href: "https://keploy.io/blog/community",
            },
            {
              label: "术语表",
              href: "/concepts/reference/glossary/",
            },
          ],
          position: "left",
        },
        {
          to: "/keploy-explained/contribution-guide",
          label: "贡献指南",
          position: "left",
        },
        {
          type: "docsVersionDropdown",
          position: "right",
          dropdownActiveClassDisabled: true,
        },
        {
          href: "https://github.com/keploy/keploy",
          position: "right",
          className: "header-github-link",
          "aria-label": "GitHub 仓库",
        },
      ],
    },
    footer: {
      copyright: `
         
    <div className="footer__icons footer">
        <a href="https://github.com/keploy/keploy" aria-label="GitHub"><svg class="footer__svg" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg></a>
        <a href="https://twitter.com/keployio" aria-label="Twitter"><svg class="footer__svg" xmlns="http://www.w3.org/2000/svg"  width="27px" height="24px" viewBox="0 0 24 24" version="1.1"><path  d="M 20.476562 0.00390625 L 24.464844 0.00390625 L 15.753906 10.167969 L 26 23.996094 L 17.976562 23.996094 L 11.691406 15.609375 L 4.503906 23.996094 L 0.511719 23.996094 L 9.828125 13.125 L 0 0.00390625 L 8.226562 0.00390625 L 13.90625 7.671875 Z M 19.078125 21.558594 L 21.285156 21.558594 L 7.027344 2.3125 L 4.65625 2.3125 Z M 19.078125 21.558594 "/>
        </g>
        </svg></a>
        <a href="https://www.youtube.com/channel/UC6OTg7F4o0WkmNtSoob34lg" aria-label="YouTube"><svg class="footer__svg" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z"/></svg></a>
        <a href="https://join.slack.com/t/keploy/shared_invite/zt-357qqm9b5-PbZRVu3Yt2rJIa6ofrwWNg" aria-label="Slack"><svg class="footer__svg" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 2447.6 2452.5">
        <path d="m897.4 0c-135.3.1-244.8 109.9-244.7 245.2-.1 135.3 109.5 245.1 244.8 245.2h244.8v-245.1c.1-135.3-109.5-245.1-244.9-245.3.1 0 .1 0 0 0m0 654h-652.6c-135.3.1-244.9 109.9-244.8 245.2-.2 135.3 109.4 245.1 244.7 245.3h652.7c135.3-.1 244.9-109.9 244.8-245.2.1-135.4-109.5-245.2-244.8-245.3z" /><path d="m2447.6 899.2c.1-135.3-109.5-245.1-244.8-245.2-135.3.1-244.9 109.9-244.8 245.2v245.3h244.8c135.3-.1 244.9-109.9 244.8-245.3zm-652.7 0v-654c.1-135.2-109.4-245-244.7-245.2-135.3.1-244.9 109.9-244.8 245.2v654c-.2 135.3 109.4 245.1 244.7 245.3 135.3-.1 244.9-109.9 244.8-245.3z" /><path d="m1550.1 2452.5c135.3-.1 244.9-109.9 244.8-245.2.1-135.3-109.5-245.1-244.8-245.2h-244.8v245.2c-.1 135.2 109.5 245 244.8 245.2zm0-654.1h652.7c135.3-.1 244.9-109.9 244.8-245.2.2-135.3-109.4-245.1-244.7-245.3h-652.7c-135.3.1-244.9 109.9-244.8 245.2-.1 135.4 109.4 245.2 244.7 245.3z" /><path d="m0 1553.2c-.1 135.3 109.5 245.1 244.8 245.2 135.3-.1 244.9-109.9 244.8-245.2v-245.2h-244.8c-135.3.1-244.9 109.9-244.8 245.2zm652.7 0v654c-.2 135.3 109.4 245.1 244.7 245.3 135.3-.1 244.9-109.9 244.8-245.2v-653.9c.2-135.3-109.4-245.1-244.7-245.3-135.4 0-244.9 109.8-244.8 245.1 0 0 0 .1 0 0"/>
        </svg></a>
        </div>
     <div className="footer__icons footer">
    <a class="footer__link-item" href="https://docs.google.com/forms/d/e/1FAIpQLSdj9q7dyRh3D7ZzRExHLWRRkNPOnLnFfrbKqSwqH3Ur4HzP4g/viewform">有 Keploy 使用案例？联系我们！</a> 
    </div> 
      <div class="footer__copyright"><span class="footer__block">版权所有 © ${new Date().getFullYear()}</span> Keploy Inc.</div>
      <div>
        <a class="footer__link-item" href="/about">关于我们</a>
        <span class="footer__separators"> | </span>
        <a class="footer__link-item" href="https://keploy.io/docs/security/">安全</a>
        <span class="footer__separators"> | </span>
        <a class="footer__link-item" href="/privacy-policy">隐私政策</a>
      </div>
      `,
    },
    algolia: {
      apiKey: "c4628c331b0f4997178c879978033276",
      indexName: "keploy",
      appId: "WZTL8PLCOD",
      contextualSearch: true, // 可选，如果有不同版本的文档（如 v1 和 v2）不显示重复结果
      // algoliaOptions: {}, // 可选，如果 Algolia 提供
    },
  },
  presets: [
    [
      "@docusaurus/preset-classic",
      {
        // 将传递给 @docusaurus/plugin-content-docs
        docs: {
          sidebarPath: require.resolve("./sidebars.js"),
          routeBasePath: "/",
          exclude: ["**/shared/**"], // 不渲染 "shared" 内容
          editUrl: "https://github.com/keploy/docs/blob/master",
          /**
           * 是否显示最后更新文档的作者。
           */
          showLastUpdateAuthor: false,
          /**
           * 是否显示文档最后更新的日期。
           */
          showLastUpdateTime: false,
          /**
           * 启用版本控制时跳过下一个版本的文档。
           * 这将不会为 `/docs/next` 目录中的文档生成生产环境的 HTML 文件，仅生成版本化文档。
           */
          // excludeNextVersionDocs: false,
          lastVersion: "3.0.0",
          versions: {
            "1.0.0": {
              label: "1.0.0",
              path: "1.0.0",
              banner: "unmaintained",
            },
            "2.0.0": {
              label: "2.0.0",
              path: "2.0.0",
              banner: "unmaintained",
            },
          },
          onlyIncludeVersions: ["1.0.0", "2.0.0", "3.0.0"],
          includeCurrentVersion: true, // excludeNextVersionDocs 现已弃用
          // // 下面的 remark 插件已禁用，直到我们弄清楚为什么它没有正确转译为 ESNext - swyx
          remarkPlugins: [
            [
              () =>
                function addTSNoCheck(tree) {
                  // 禁用任何 TypeScript 代码块的 TS 类型检查。
                  // 这是因为使用 snipsync 时导入很混乱：我们无法为每个示例
                  // snipsync 拉取的内容单独配置。
                  function visitor(node) {
                    if (!/^ts$/.test(node.lang)) {
                      return;
                    }
                    node.value = "// @ts-nocheck\n" + node.value.trim();
                  }

                  visit(tree, "code", visitor);
                },
              {},
            ],
            [
              () =>
                function removeTSNoCheck(tree) {
                  function visitor(node) {
                    if (!/^ts$/.test(node.lang) && !/^js$/.test(node.lang)) {
                      return;
                    }
                    if (node.value.startsWith("// @ts-nocheck\n")) {
                      node.value = node.value.slice("// @ts-nocheck\n".length);
                    }
                    // 如果 TS 编译输出为空，替换为更有帮助的注释
                    if (
                      node.lang === "js" &&
                      node.value.trim() === "export {};"
                    ) {
                      node.value = "// JavaScript 中不需要";
                    } else if (node.lang === "js") {
                      node.value = convertIndent4ToIndent2(node.value).trim();
                    }
                  }
                  visit(tree, "code", visitor);
                },
              {},
            ],
          ],
        },
        // 将传递给 @docusaurus/plugin-content-blog
        // TODO : 添加博客部分
        // blog: {
        //   routeBasePath: "blog",
        //   path: "blog",
        //   postsPerPage: 10,
        //   editUrl: "https://github.com/keploy/docs/blob/master",
        //   blogTitle: "Keploy 博客",
        //   showReadingTime: true, // 显示博客文章的预计阅读时间。
        //   feedOptions: {
        //     type: "all",
        //     copyright: `版权所有 © ${new Date().getFullYear()} Keploy Inc. 保留所有权利。`,
        //   },
        // },
        // 将传递给 @docusaurus/theme-classic。
        theme: {
          customCss: require.resolve("./src/css/custom.css"),
        },
        gtag: {
          trackingID: "G-LLS95VWZPC",
          // 可选字段。
          anonymizeIP: true, // 是否匿名化 IP？
        },
        // 将传递给 @docusaurus/plugin-content-sitemap
        sitemap: {
          // 从 v2.0.0-alpha.72 开始，cacheTime 现已弃用
          //cacheTime: 600 * 1000, // 600 秒 - 缓存清除周期
          changefreq: "weekly",
          priority: 0.5,
        },
      },
    ],
  ],
  scripts: [
    {
      src: "/scripts/feedback.js",
      async: true,
      defer: true,
    },
    {
      src: "/scripts/clarity.js",
      async: true,
      defer: true,
    },
    {
      src: "/scripts/chat.js",
      async: true,
      defer: true,
    },
    // {
    //   src: "/scripts/fullstory.js",
    //   async: true,
    //   defer: true,
    // },
  ],
};

function convertIndent4ToIndent2(code) {
  // TypeScript 总是输出 4 空格缩进。这是一个变通方法。
  // 参见 https://github.com/microsoft/TypeScript/issues/4042
  return code.replace(/^( {4})+/gm, (match) => {
    return "  ".repeat(match.length / 4);
  });
}
