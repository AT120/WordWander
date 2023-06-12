import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';

function Footer() {
  return (
    <footer className="footer bg-dark text-light fixed-bottom" style={{zIndex: '-9999'}}>
      <Container>
        <Row>
          <Col md={6}>
          <div>© 2023 - WordWonder</div>
          </Col>
        </Row>
      </Container>
    </footer>
  );
}

export default Footer;