import React from "react";
import LandingPage from "../components/landing-page/LandingPage";
import Login from "../components/registration/Login";
import CreateAccount from "../components/registration/CreateAccount";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
const Home = () => {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/create-account" element={<CreateAccount />} />
        </Routes>
      </Router>
    </>
  );
};

export default Home;
