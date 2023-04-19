

import Badge from "@mui/material/Badge";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import React, { useEffect } from "react";
import "./../css/product.css";

import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";

import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { addTocart, fetchCartItems } from "../actions/cartActions";
import { fetchProduct } from "../actions/productActions";

export default function ProductDetail() {
  const { product } = useSelector((state) => state.productDetails);
  const { cartItems } = useSelector((state) => state.cart);
  const params = useParams();
  const { id } = params;

  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchCartItems());
    dispatch(fetchProduct(id));
  }, []);
  const handleAdd = (product) => {
    dispatch(addTocart(product));
  };

  const handleOrder = () => {
    if (cartItems.length > 0) {
      navigate("/checkout");
    } else {
      alert("no items to check out");
    }
  };
  return (
    <div>
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
      <div className="m-5">
        <Card sx={{ maxWidth: 345, mt: 5 }}>
          <CardMedia
            sx={{ height: 140 }}
            image={product.imageLink}
            title={product.name}
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              {product.name}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {product.description}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {product.price}
            </Typography>
          </CardContent>
          <CardActions>
            <Button size="small" onClick={() => handleAdd(product)}>
              Add to cart{" "}
            </Button>
            {/* <Button size="small">Learn More</Button> */}
          </CardActions>
        </Card>
      </div>
    </div>
  );
}
const pointer = { cursor: "pointer" };
