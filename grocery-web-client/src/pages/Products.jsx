import React, { useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "../actions/productActions";
import Product from "../components/Product";
import "./../css/product.css";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import Badge from "@mui/material/Badge";
import { useNavigate } from "react-router-dom";
import { fetchCartItems } from "../actions/cartActions";
function Products() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { products } = useSelector((state) => state.productList);
  const { cartItems } = useSelector((state) => state.cart);
  useEffect(() => {
    dispatch(fetchProducts());
    dispatch(fetchCartItems());
  }, []);

  const handleOrder = () => {
    if (cartItems.length > 0) {
      navigate("/checkout");
    } else {
      alert("no items to check out");
    }
  };

  return (
    <div>
      <h1>Products</h1>
      <div className="cart">
        <Badge
          style={pointer}
          color="primary"
          badgeContent={cartItems.length}
          onClick={handleOrder}
        >
          <ShoppingCartIcon color="warning" />
        </Badge>
      </div>
      <p>Check out our selection of fresh produce, and staples.</p>
      <div className="">
        <Container fluid>
          <Row>
            {products.map((product) => (
              <Col key={product.id} sm={12} md={6} lg={4} xl={3}>
                <Product product={product} />
              </Col>
            ))}
          </Row>
        </Container>
      </div>
    </div>
  );
}

export default Products;
const pointer = { cursor: "pointer" };
