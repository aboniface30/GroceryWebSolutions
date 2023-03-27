import React from "react";
import { Container, Row, Col, Button } from "react-bootstrap";

function Landing() {
  return (
    <div>
      <header>
        <Container>
          <Row>
            <Col>
              <h1>Grocery Store</h1>
              <p>
                Welcome to our online grocery store! Shop for fresh and
                high-quality produce, and more.
              </p>
              <a href="/products">
                <Button variant="primary">Shop now</Button>
              </a>
            </Col>
          </Row>
        </Container>
      </header>
      <main>
        <Container>
          <Row>
            <Col md={6}>
              <h2>Featured Products</h2>
              <ul>
                <li>Apples</li>
                <li>Oranges</li>
                <li>Mangos</li>
              </ul>
            </Col>
            <Col md={6}>
              <img
                src="https://media.istockphoto.com/id/1386010022/photo/checking-the-bill.jpg?b=1&s=170667a&w=0&k=20&c=u31aUWBjFaywAcBcO1Kzcshw0ke_9T3a-FC6q_y21Rk="
                alt="Featured Product"
              />
            </Col>
          </Row>
        </Container>
      </main>
      <footer>
        <Container>
          <Row>
            <Col>
              <p>&copy; 2023 GroceryWebSolutions. All rights reserved.</p>
            </Col>
          </Row>
        </Container>
      </footer>
    </div>
  );
}

export default Landing;
