import { Navbar, Nav } from "react-bootstrap";

import navs from "../utils/navs";
import packageJson from "../../package.json";

/**
 * 页头
 */
export default function Header() {
  return (
    <Navbar bg="light" expand="lg">
      <Navbar.Brand href="/">{packageJson.description}</Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mr-auto">
          {navs.map(nav => (
            <Nav.Link href={nav.asPath} key={nav.id}>
              {nav.readme.title || nav.name}
            </Nav.Link>
          ))}
        </Nav>
      </Navbar.Collapse>
      <a
        href="https://github.com/fishjar/programming-language-comparison"
        title="访问github源码"
      >
        github
      </a>
    </Navbar>
  );
}
