import ShoppingCartCheckoutIcon from "@mui/icons-material/ShoppingCartCheckout";
import Alert from "@mui/material/Alert";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import CardActions from "@mui/material/CardActions";
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import React, { useEffect, useState } from "react";
import { Col, Row } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import { useDispatch, useSelector } from "react-redux";

import { ReactSpinner } from "react-spinning-wheel";
import "react-spinning-wheel/dist/style.css";

import { Link, useNavigate } from "react-router-dom";
import { fetchCartItems } from "../actions/cartActions";
import { saveOrder } from "../actions/orderActions";
import { refreshToken } from "../actions/refreshToken";
import { loginUser } from "../actions/userActions";
import ProductCard from "../components/ProductCard";
import { clearCart } from "../features/cart/cartSlice";

import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function CheckOut() {
  
  const navigate = useNavigate();

  const { cartItems } = useSelector((state) => state.cart);
  const { tokens, loading, success } = useSelector((state) => state.userSignIn);
  const { saveSuccess } = useSelector((state) => state.orders);
  const { access, refresh } = tokens;

  const dispatch = useDispatch();
  const [isAnonymous, setIsAnonymous] = useState(false);
  const [show, setShow] = useState(false);
  const [checkout, setCheckOut] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    dispatch(fetchCartItems());
    if (access !== "") {
      dispatch(refreshToken());
    } else {
      console.log("No token");
    }

    let fourMinutes = 1000 * 60 * 4;

    let interval = setInterval(() => {
      if (access && refresh) {
        dispatch(refreshToken());
      }
    }, fourMinutes);
    return () => clearInterval(interval);
  }, []);

  const saveUserOrder = async () => {
    if (success) {
      dispatch(saveOrder());
    }
  };

  const handleCheckout = async () => {
    if (access === "") {
      setIsAnonymous(true);
    }
    const res = await saveUserOrder();
    if (saveSuccess) {
      console.log("order res = ", saveSuccess);
      toast.success("Order Placed Successfully!");
      dispatch(clearCart());
      setShow(true);
      // navigate("/orders");
    } else {
      toast.error("Order failed. Please try again later.");
    }
  };

  const handleLogin = async () => {
    setCheckOut(true);

    try {
      const result = await dispatch(loginUser(username, password));
      if (result.status == 200) {
        setIsAnonymous(false);
      }
    } catch (error) {
      setCheckOut(false);
    }
  };

  const viewOrders = () => {
    navigate("/orders");
  };
  return (
    <div className="w-screen">
      <div className="flex w-screen">
        <ToastContainer />

        <div className="ml-auto bg-slate-400 rounded-md mr-5 mt-2">
          {show ? (
            <CardActions className="justify-center" style={checkoutStyle}>
              {" "}
              <Button size="small" color="primary" onClick={viewOrders}>
                check your orders{" "}
              </Button>
            </CardActions>
          ) : (
            ""
          )}
          {cartItems.length > 0 ? (
            <CardActions className="justify-center" style={checkoutStyle}>
              <Button size="small" color="primary" onClick={handleCheckout}>
                checkout <ShoppingCartCheckoutIcon />
              </Button>

              <Button>
                {" "}
                <span className="justify-center" style={checkoutStyle}>
                  total price = $
                  {cartItems
                    ?.map(
                      (item) =>
                        parseFloat(item.price) * parseFloat(item.quantity)
                    )
                    .reduce((prev, curr) => prev + curr, 0)
                    .toFixed(2)}
                </span>
              </Button>
            </CardActions>
          ) : (
            ""
          )}
        </div>
      </div>
      <Modal show={isAnonymous} onHide={() => setIsAnonymous(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Login First</Modal.Title>
          {loading && <ReactSpinner size={50} color="#686769" />}
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
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
                id="password"
                placeholder="password"
                autoFocus
                onChange={(e) => setPassword(e.target.value)}
              />
            </Form.Group>
            <Form.Group
              className="mb-3"
              controlId="exampleForm.ControlTextarea2"
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
          <Button color="secondary" onClick={() => setIsAnonymous(false)}>
            {" "}
            Close
          </Button>
          <Button color="primary" onClick={handleLogin}>
            Login
          </Button>
        </Modal.Footer>
      </Modal>
      {/* <Typography variant="body2" color="warning.main">
        {cartItems.length === 0
          ? "No Items to Check out, Please go back and add other products"
          : ""}
      </Typography> */}
      {cartItems.length === 0 ? (
        <div className="w-1/2">
          <Stack sx={{ ml: 2, mr: 10, mt: 10 }} spacing={2}>
            <Alert severity="warning">
              No Items to Check out, Please go back and add other products
            </Alert>
          </Stack>
        </div>
      ) : (
        ""
      )}

      <Box p={2} clasName="justify-center">
        <Grid container spacing={5} item xs={12}>
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
                  quantity={item.quantity}
                  cart_item_id={item.cart_item_id}
                />
              </Grid>
            );
          })}
        </Grid>
      </Box>
    </div>
  );
}

const checkoutStyle = {
  justifyContent: "center",
  border: "1px",
  color: "white",
};
