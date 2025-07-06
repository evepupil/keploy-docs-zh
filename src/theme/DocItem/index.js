/**
 * 版权所有 (c) Facebook, Inc. 及其关联公司。
 *
 * 此源代码根据 MIT 许可证授权，完整许可证文本可在
 * 此源代码树的根目录下的 LICENSE 文件中找到。
 */
import React from "react";
import clsx from "clsx";
import DocPaginator from "@theme/DocPaginator";
import DocVersionBanner from "@theme/DocVersionBanner";
import DocVersionBadge from "@theme/DocVersionBadge";
// import Seo from "@theme/Seo";
import TOC from "@theme/TOC";
import TOCCollapsible from "@theme/TOCCollapsible";
import Heading from "@theme/Heading";
import styles from "./styles.module.css";
import {ThemeClassNames, useWindowSize} from "@docusaurus/theme-common";
import DocBreadcrumbs from "@theme/DocBreadcrumbs";
import Layout from "@docusaurus/core/lib/client/theme-fallback/Layout";
import Head from "@docusaurus/Head";
import MDXContent from "@theme/MDXContent";

export default function DocItem(props) {
  const {content: DocContent} = props;
  const {metadata, frontMatter, assets} = DocContent;
  const {
    keywords,
    hide_title: hideTitle,
    hide_table_of_contents: hideTableOfContents,
    toc_min_heading_level: tocMinHeadingLevel,
    toc_max_heading_level: tocMaxHeadingLevel,
  } = frontMatter;
  const {description, title} = metadata;
  const image = assets.image ?? frontMatter.image; // 仅在以下情况添加标题：
  // - 用户通过 front matter 要求隐藏标题
  // - Markdown 内容本身不包含顶级 h1 标题

  const shouldAddTitle =
    !hideTitle && typeof DocContent.contentTitle === "undefined";
  const windowSize = useWindowSize();
  const canRenderTOC =
    !hideTableOfContents && DocContent.toc && DocContent.toc.length > 0;
  const renderTocDesktop =
    canRenderTOC && (windowSize === "desktop" || windowSize === "ssr");

  const MDXComponent = props.content;
  return (
    <>
      <Head>
        <title>{title}</title>
        {description && <meta name="description" content={description} />}
      </Head>
      <Layout
        {...{
          title,
          description,
          keywords,
          image,
        }}
      />

      <div className="row">
        <div
          className={clsx("col", {
            [styles.docItemCol]: !hideTableOfContents,
          })}
        >
          <DocVersionBanner />
          <div className={styles.docItemContainer}>
            <article>
              {/* 移除面包屑导航，因该组件会影响 SEO 排名。根据 schema.org 标准，这不是有效的面包屑组件 */}
              <DocBreadcrumbs />
              <DocVersionBadge />

              {canRenderTOC && (
                <TOCCollapsible
                  toc={DocContent.toc}
                  minHeadingLevel={tocMinHeadingLevel}
                  maxHeadingLevel={tocMaxHeadingLevel}
                  className={clsx(
                    ThemeClassNames.docs.docTocMobile,
                    styles.tocMobile
                  )}
                />
              )}

              <div
                className={clsx(ThemeClassNames.docs.docMarkdown, "markdown")}
              >
                <article className="md:prose-md prose mx-auto my-12 max-w-full px-2 lg:prose-lg md:px-6">
                  {/*
                标题可以在 md 内容中声明，也可以通过 front matter 手动添加。
                为使两种情况保持一致，添加的标题会被放在相同的 div.markdown 区块下
                参见 https://github.com/facebook/docusaurus/pull/4882#issuecomment-853021120
                */}
                  {shouldAddTitle && (
                    <header>
                      <Heading as="h1">{title}</Heading>
                    </header>
                  )}
                  <MDXContent>
                    <MDXComponent />
                  </MDXContent>
                </article>
              </div>
            </article>

            <DocPaginator previous={metadata.previous} next={metadata.next} />
          </div>
        </div>
        {renderTocDesktop && (
          <div className="col col--3">
            <TOC
              toc={DocContent.toc}
              minHeadingLevel={tocMinHeadingLevel}
              maxHeadingLevel={tocMaxHeadingLevel}
              className={ThemeClassNames.docs.docTocDesktop}
            />
          </div>
        )}
      </div>
    </>
  );
}