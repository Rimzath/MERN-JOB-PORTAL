import React from "react";
import Navbar from "../component/Navbar";
import Header from "../component/Header";
import { Box } from "@mui/material";

const Home = () => {
  return (
    <Box sx={{ bgcolor: "#fafafa", minHeight: "100vh" }}>
      <Navbar />
      <Header />
      <div>Welcome to Home</div>
    </Box>
  );
};

export default Home;
