import React, { useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "../actions/productActions";
import Product from "../components/Product";

function Products() {
    const dispatch = useDispatch();
  // Sample data for products
//   const products = [
//     {
//       id: 1,
//       name: "Apples",
//       price: 2.99,
//       image: "https://via.placeholder.com/50x50",
//       description: "Fresh apples from local orchards.",
//     },
//     {
//       id: 2,
//       name: "Bananas",
//       price: 1.99,
//       image: "https://via.placeholder.com/50x50",
//       description: "Ripe bananas from tropical climates.",
//     },
//     {
//       id: 3,
//       name: "Broccoli",
//       price: 3.99,
//       image: "https://via.placeholder.com/50x50",
//       description: "Fresh broccoli picked daily.",
//     },
//     {
//       id: 4,
//       name: "Mangoes",
//       price: 2.99,
//       image: "https://via.placeholder.com/50x50",
//       description: "Fresh Mangoes daily.",
//     },
//   ];

    
const { products } = useSelector((state) => state.productList);
    

    useEffect(() => {
        dispatch(fetchProducts());
    },[])
  return (
    <div>
      <h1>Products</h1>
      <p>
        Check out our selection of fresh produce, and staples.
      </p>
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
