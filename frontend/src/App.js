import "./App.css";
import Home from "./pages/Home";
import { ProSidebarProvider } from "react-pro-sidebar";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { CssBaseline } from "@mui/material";

const App = () => {
  return (
    <>
      <ToastContainer />
      <CssBaseline />
      <ProSidebarProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/search/location/:location" element={<Home />} />
            <Route path="/search/:keyword" element={<Home />} />
          </Routes>
        </BrowserRouter>
      </ProSidebarProvider>
    </>
  );
};

export default App;
