import React from "react";

import Card from "@mui/material/Card";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import CardActions from "@mui/material/CardActions";
import { useSelector } from "react-redux";
import ProductCard from "../components/ProductCard";

export default function CheckOut() {
  const { cartItems } = useSelector((state) => state.cart);
  return (
    <div className="">
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
            <Button size="small" color="primary">
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
