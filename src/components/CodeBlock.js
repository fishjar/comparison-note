// import SyntaxHighlighter from "react-syntax-highlighter";
// import { docco } from "react-syntax-highlighter/dist/cjs/styles/hljs";
// import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
// import { dark } from "react-syntax-highlighter/dist/cjs/styles/prism";
import SyntaxHighlighter from "react-syntax-highlighter";
import { a11yDark } from "react-syntax-highlighter/dist/cjs/styles/hljs";

/**
 * 代码高亮组件
 * @param {*} param0
 */
export default function CodeBlock({ value, language }) {
  return (
    <SyntaxHighlighter language={language} style={a11yDark}>
      {value}
    </SyntaxHighlighter>
  );
}
