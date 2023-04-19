import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  updateCartItem
} from "../actions/cartActions";

export default function ProductCard({
  id,
  title,
  image,
  desc,
  price,
  quantity,
  cart_item_id,
}) {
  const dispatch = useDispatch();
  const { cartItems } = useSelector((state) => state.cart);
  
  const updateQuantity = (id, amount) => {
   
    const product = cartItems.find((item) => item.id === id);

    dispatch(updateCartItem(product, amount));
  };
  return (
    <div className="">
      <Card sx={{ maxWidth: 345, mt: 5 }}>
        <CardMedia sx={{ height: 140 }} image={image} title={title} />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {title}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {desc}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Quantity: {quantity}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Total price: {price * quantity}
          </Typography>
        </CardContent>

        <CardActions className="justify-center">
          <Button size="small" color="primary" onClick={() => updateQuantity(id , 1)}>
            <AddIcon />
          </Button>
          <Button size="small" color="primary" onClick={() => updateQuantity(id , -1)}>
            <RemoveIcon />
          </Button>
        </CardActions>
      </Card>
    </div>
  );
}
