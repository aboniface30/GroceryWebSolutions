import { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import NavBar from "./components/NavBar";
import CheckOut from "./pages/CheckOut";
import HomeScreen from "./pages/HomeScreen";
import Landing from "./pages/Landing";
import Login from "./pages/Login";
import ProductDetail from "./pages/ProductDetail";
import Products from "./pages/Products";
import SignUp from "./pages/SignUp";

function App() {
  return (
    <div className="App">
      <NavBar />
      <Router>
        <Routes>
          <Route path="/" element={<Landing />} exact />
          <Route path="/home" element={<HomeScreen />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<SignUp />} />
          <Route path="/products/:id" element={<ProductDetail />} />
          <Route path="/products" element={<Products />} />
          <Route path="/checkout" element={<CheckOut />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
