import React from "react";
import Navbar from "../component/Navbar";
import Header from "../component/Header";
import Footer from "../component/Footer";
import { Box } from "@mui/material";

const Home = () => {
  return (
    <>
      <Box sx={{ bgcolor: "#fafafa", minHeight: "100vh" }}>
        <Navbar />
        <Header />
        <div>Welcome to Home</div>
      </Box>
      <Footer />
    </>
  );
};

export default Home;
