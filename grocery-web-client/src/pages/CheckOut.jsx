import React, { useState } from "react";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import BootstrapButton from "react-bootstrap/Form";
import { Row, Col } from "react-bootstrap";
import Card from "@mui/material/Card";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import CardActions from "@mui/material/CardActions";
import { useSelector, useDispatch } from "react-redux";
import ProductCard from "../components/ProductCard";
import { Link } from "react-router-dom";
export default function CheckOut() {
  const { cartItems } = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const [show, setShow] = useState(false);
  const [checkout, setCheckOut] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const handleCheckout = () => {
    setCheckOut(true);
  };

  const handleLogin = () => {
    setCheckOut(true);
    dispatch(loginUser(username, password));
  };
  return (
    <div className="">
      <Modal show={checkout}>
        <Modal.Header closeButton>
          <Modal.Title>Login First</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                type="username"
                placeholder="username"
                autoFocus
                onChange={(e) => setUsername(e.target.value)}
              />
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="password"
                autoFocus
                onChange={(e) => setPassword(e.target.value)}
              />
            </Form.Group>
            <Form.Group
              className="mb-3"
              controlId="exampleForm.ControlTextarea1"
            >
              {/* <Form.Link>don't have an account? , register</Form.Link> */}
              {/* <Form.Control as="textarea" rows={3} /> */}

              <Row className="py-3">
                <Col>
                  New Customer? <Link to={`/register`}>Create an Account</Link>
                </Col>
              </Row>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button color="secondary" onClick={() => setCheckOut(false)}>
            {" "}
            Close
          </Button>
          <Button color="primary" onClick={handleLogin}>
            Login
          </Button>
        </Modal.Footer>
      </Modal>
      <Typography variant="body2" color="warning.main">
        {cartItems.length === 0
          ? "No Items to Check out, Please go back and add other products"
          : ""}
      </Typography>
      <Box p={2} clasName="justify-center" style={checkoutStyle}>
        <Grid container spacing={5} item xs={8}>
          {cartItems?.map((item, i) => {
            return (
              <Grid key={i} item>
                <ProductCard
                  key={i}
                  title={item.name}
                  id={item.id}
                  image={item.imageLink}
                  desc={item.description}
                  price={item.price}
                />
              </Grid>
            );
          })}
        </Grid>
      </Box>

      <div>
        {cartItems.length > 0 ? (
          <CardActions className="justify-center" style={checkoutStyle}>
            <Button size="small" color="primary" onClick={handleCheckout}>
              checkout
            </Button>

            <Button>
              {" "}
              <span className="justify-center" style={checkoutStyle}>
                total price = $
                {cartItems
                  ?.map((item) => parseFloat(item.price))
                  .reduce(
                    (prev, curr) => parseFloat(prev) + parseFloat(curr),
                    0
                  )}
              </span>
            </Button>
          </CardActions>
        ) : (
          ""
        )}
      </div>
    </div>
  );
}

const checkoutStyle = {
  justifyContent: "center",
  border: "1px",
};
