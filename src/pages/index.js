import { Card } from "react-bootstrap";
import matter from "gray-matter";
import Head from "next/head";

import Layout from "../components/Layout";
import Nav from "../components/Nav";
import Markdown from "../components/MarkDown";
import packageJson from "../../package.json";

export default function Index({ navs = [], indexContent }) {
  return (
    <Layout navs={navs}>
      <Head>
        <title>{packageJson.description || "对比学习笔记"}</title>
        {/* <meta name="viewport" content="initial-scale=1.0, width=device-width" /> */}
      </Head>
      <div style={{ marginBottom: 12 }}>
        <Markdown source={indexContent} />
      </div>
      <Card>
        {/* <Card.Header>目录</Card.Header> */}
        <Card.Body>
          <Card.Title>目录</Card.Title>
          <Nav navs={navs} />
        </Card.Body>
      </Card>
    </Layout>
  );
}

Index.getInitialProps = async function() {
  // 导入菜单
  const navs = require("../utils/navs.json");

  let indexContent = "";
  try {
    // 导入首页内容
    const indexFile = require(`../../notes/README.md`);
    indexContent = matter(indexFile.default).content;
  } catch (err) {
    console.log("导入首页失败！");
  }

  return { navs, indexContent };
};
