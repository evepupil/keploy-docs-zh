import React from "react";
import clsx from "clsx";
import {translate} from "@docusaurus/Translate";
import {useThemeConfig} from "@docusaurus/theme-common";
import Link from "@docusaurus/Link";
import useBrokenLinks from "@docusaurus/useBrokenLinks";
import styles from "./styles.module.css";
export default function Heading({as: As, id, ...props}) {
  const brokenLinks = useBrokenLinks();
  const {
    navbar: {hideOnScroll},
  } = useThemeConfig();
  // H1标题不需要id，因为它们不会出现在目录中
  // if (As === 'h1' || !id) {
  //   return <As {...props} id={"heading"} />;
  // }

  if (!id) {
    id = "heading";
  }
  brokenLinks.collectAnchor(id);
  const anchorTitle = translate(
    {
      id: "theme.common.headingLinkTitle",
      message: "直达 {heading} 的链接",
      description: "指向标题的链接标题",
    },
    {
      heading: typeof props.children === "string" ? props.children : id,
    }
  );
  return (
    <As
      {...props}
      className={clsx(
        "anchor",
        hideOnScroll
          ? styles.anchorWithHideOnScrollNavbar
          : styles.anchorWithStickyNavbar,
        props.className
      )}
      id={id}
    >
      {props.children}
      <Link
        className="hash-link"
        to={`#${id}`}
        aria-label={anchorTitle}
        title={anchorTitle}
      >
        &#8203;
      </Link>
    </As>
  );
}