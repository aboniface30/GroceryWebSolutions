import React from "react";
import { Link } from "react-router-dom";
import { Card, Button } from "react-bootstrap";

const Product = ({ product }) => {
  return (
    <Card className="my-3 rounded">
      <Link to={`/products/${product.id}`}>
        <Card.Img
          src={product.imageLink}
          variant="top"
          style={{ height: "280px" }}
        />
      </Link>

      <Card.Body>
        <Card.Title>{product.name}</Card.Title>
        <Card.Text>{product.description}</Card.Text>
        <Card.Text>${product.price}</Card.Text>
      </Card.Body>
    </Card>
  );
};

export default Product;
