import React, { useState } from "react";
import {
  CardGroup,
  Card,
  ButtonToolbar,
  ToggleButtonGroup,
  ToggleButton,
  Row,
  Col,
} from "react-bootstrap";
import matter from "gray-matter";
import Head from "next/head";

import Markdown from "../components/MarkDown";
import Layout from "../components/Layout";
import Nav from "../components/Nav";
import { findNav } from "../utils";

export default function Post({ nav, content, cards = [] }) {
  // 对比显示的菜单组
  const [menus, setMenus] = useState(cards.map(item => item.baseName));
  const handleToggleCard = menus => {
    setMenus(menus);
  };

  return (
    <Layout>
      <Head>
        <title>
          {(nav && (nav.readme.title || nav.name)) || "对比学习笔记"}
        </title>
      </Head>
      <h1>{nav && (nav.readme.title || nav.name)}</h1>
      <div style={{ marginBottom: 12 }}>
        <Markdown source={content} />
      </div>
      {cards.length > 0 && (
        <Row className="justify-content-md-center" style={{ marginBottom: 12 }}>
          <Col md="auto">
            <ButtonToolbar>
              <ToggleButtonGroup
                size="sm"
                type="checkbox"
                value={menus}
                onChange={handleToggleCard}
              >
                {cards.map(item => (
                  <ToggleButton
                    key={item.name}
                    variant="secondary"
                    value={item.baseName}
                  >
                    {item.baseName}
                  </ToggleButton>
                ))}
              </ToggleButtonGroup>
            </ButtonToolbar>
          </Col>
        </Row>
      )}
      {cards.length > 0 && (
        <CardGroup>
          {cards
            .filter(item => menus.includes(item.baseName))
            .map(item => (
              <Card key={item.name}>
                <Card.Header>{item.baseName}</Card.Header>
                <Card.Body>
                  {/* <Card.Title>{item.baseName}</Card.Title> */}
                  <Markdown source={item.content} />
                </Card.Body>
              </Card>
            ))}
        </CardGroup>
      )}
      {nav && nav.nodes.length > 0 && (
        <Card style={{ marginTop: 12 }}>
          <Card.Body>
            <h6>了解更多</h6>
            <Nav navs={nav.nodes} />
          </Card.Body>
        </Card>
      )}
    </Layout>
  );
}

Post.getInitialProps = async function(context) {
  // 导入菜单
  const navs = require("../utils/navs.json");
  const nav = findNav(context.asPath, navs);

  let content = "";
  const cards = [];
  if (nav) {
    try {
      // 导入本页内容
      const readmeFile = require(`../../notes${nav.readme.fullPath}`);
      content = matter(readmeFile.default).content;
    } catch (err) {
      console.log("导入页面失败！");
    }
    nav.cards.forEach(item => {
      let cardContent = "";
      try {
        const cardFile = require(`../../notes${item.fullPath}`);
        cardContent = matter(cardFile.default).content;
      } catch (err) {
        console.log("导入笔记失败！");
      }
      // 导入对比笔记
      cards.push({
        ...item,
        content: cardContent,
      });
    });
  }

  return { nav, content, cards };
};
