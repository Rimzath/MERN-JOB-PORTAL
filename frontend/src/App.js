import "./App.css";
import Home from "./pages/Home";
import Register from "./pages/Register";
import LogIn from "./pages/LogIn";
import UserDashboard from "./pages/user/UserDashboard";
import Layout from "./pages/global/Layout";
import UserJobsHistory from "./pages/user/UserJobsHistory";
import UserInfoDashboard from "./pages/user/UserInfoDashboard";
import { ProSidebarProvider } from "react-pro-sidebar";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { CssBaseline } from "@mui/material";
import AdminDashboard from "./pages/admin/AdminDashboard";
import DashUsers from "./pages/admin/DashUsers";
import DashJobs from "./pages/admin/DashJobs";
import DashCategory from "./pages/admin/DashCategory";

//HOC
const UserDashboardHOC = Layout(UserDashboard);
const UserJobsHistoryHOC = Layout(UserJobsHistory);
const UserInfoDashboardHOC = Layout(UserInfoDashboard);
const AdminDashboardHOC = Layout(AdminDashboard);
const DashUsersHOC = Layout(DashUsers);
const DashJobsHOC = Layout(DashJobs);
const DashCategoryHOC = Layout(DashCategory);

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
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<LogIn />} />
            <Route path="/user/dashboard" element={<UserDashboardHOC />} />
            <Route path="/user/dashboard" element={<UserDashboardHOC />} />
            <Route path="/user/jobs" element={<UserJobsHistoryHOC />} />
            <Route path="/user/info" element={<UserInfoDashboardHOC />} />
            <Route path="/admin/dashboard" element={<AdminDashboardHOC />} />
            <Route path="/admin/users" element={<DashUsersHOC />} />
            <Route path="/admin/jobs" element={<DashJobsHOC />} />
            <Route path="/admin/category" element={<DashCategoryHOC />} />
          </Routes>
        </BrowserRouter>
      </ProSidebarProvider>
    </>
  );
};

export default App;
