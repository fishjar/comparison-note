import ReactMarkdown from "react-markdown";

import CodeBlock from "./CodeBlock";

/**
 * markdown显示组件
 * @param {*} param0
 */
export default function MarkDown({ source }) {
  return (
    <ReactMarkdown
      className="markdown-body"
      source={source}
      renderers={{ code: CodeBlock }}
    />
  );
}
