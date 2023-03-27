import React, { useEffect } from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { useDispatch, useSelector } from "react-redux";
import { removeFromCart } from "../actions/cartActions";

export default function ProductCard({ id, title, image, desc, price }) {
  const dispatch = useDispatch();

  const handleRemove = (id) => {
    dispatch(removeFromCart(id));
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
            {price}
          </Typography>
        </CardContent>

        <CardActions className="justify-center">
          <Button size="small" color="primary" onClick={() => handleRemove(id)}>
            remove
          </Button>
        </CardActions>
      </Card>
    </div>
  );
}
