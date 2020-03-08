// import "bootstrap/dist/css/bootstrap.min.css";
// import "../pages/bootstrap.min.css";
import { Container, Card } from "react-bootstrap";

import Header from "./Header";
import Footer from "./Footer";

/**
 * 页面整体
 * @param {*} props
 */
export default function Layout(props) {
  return (
    <>
      <Header />
      <Container fluid style={{ paddingTop: 12, paddingBottom: 12 }}>
        {props.children}
      </Container>
      <Footer />
    </>
  );
}
