import React from "react";
import { Button, Card } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { addTocart } from "../actions/cartActions";

const Product = ({ product }) => {
  const dispatch = useDispatch();
  const handleAdd = (product) => {
    dispatch(addTocart(product));
  };
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

        <Button variant="primary" onClick={() => handleAdd(product)}>
          Add to cart{" "}
        </Button>
      </Card.Body>
    </Card>
  );
};

export default Product;
