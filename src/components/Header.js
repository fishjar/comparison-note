import { Navbar, Nav } from "react-bootstrap";
import { useRouter } from "next/router";

import navs from "../utils/navs";
import packageJson from "../../package.json";

/**
 * 页头
 */
export default function Header() {
  const router = useRouter();
  return (
    <Navbar bg="light" expand="lg">
      <Navbar.Brand href={`${process.env.ASSET_PREFIX}/`}>
        {packageJson.description}
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mr-auto">
          {navs.map(nav => {
            const href = `${process.env.ASSET_PREFIX}${nav.asPath}`;
            const active = router.asPath.startsWith(href) ? true : false;
            return (
              <Nav.Link
                active={active}
                href={href}
                eventKey={nav.asPath}
                key={nav.id}
              >
                {nav.readme.title || nav.name}
              </Nav.Link>
            );
          })}
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
}
