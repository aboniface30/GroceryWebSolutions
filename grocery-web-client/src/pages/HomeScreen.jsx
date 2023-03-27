import React from "react";
import { Navbar, Nav, Container, Card, Button } from "react-bootstrap";

function HomeScreen() {
  return (
    <div>
      <Container fluid>
        <h1>Welcome to Grocery Store!</h1>
        <p>
          We offer a wide variety of fresh produce, meats, and pantry staples.
        </p>
        <Card>
          <Card.Img variant="top" src="https://via.placeholder.com/400x400" />
          <Card.Body>
            <Card.Title>Special Deal</Card.Title>
            <Card.Text>
              Get 10% off your first purchase with the code FIRST10.
            </Card.Text>
            <Button variant="primary">Shop Now</Button>
          </Card.Body>
        </Card>
      </Container>
    </div>
  );
}

export default HomeScreen;
