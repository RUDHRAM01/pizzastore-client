import React from "react";
import LandingPage from "../components/landing-page/LandingPage";
import Login from "../components/registration/Login";
import CreateAccount from "../components/registration/CreateAccount";
import Cart from "../components/cart/Cart";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Orders from "../components/order/Orders";
const Home = () => {
  
  if ((window.location.pathname === "/login" || window.location.pathname === "/create-account") && (localStorage.getItem("id") !== null || localStorage.getItem("id") !== undefined)) {
      window.location.href = "/";
  }
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/login" element={<Login />} />
          <Route path="/create-account" element={<CreateAccount />} />
          <Route path="/orders" element={<Orders />} />
        </Routes>
      </Router>
    </>
  );
};

export default Home;
