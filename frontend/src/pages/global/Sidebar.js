import React, { useEffect } from "react";
import {
  Sidebar,
  Menu,
  MenuItem,
  menuClasses,
  useProSidebar,
} from "react-pro-sidebar";
import DashboardIcon from "@mui/icons-material/Dashboard";
import GroupAddIcon from "@mui/icons-material/GroupAdd";
import { Box, useTheme } from "@mui/material";
import WorkIcon from "@mui/icons-material/Work";
import CategoryIcon from "@mui/icons-material/Category";
import WorkHistoryIcon from "@mui/icons-material/WorkHistory";
import Person3Icon from "@mui/icons-material/Person3";
import Avatar from "@mui/material/Avatar";
import logoDashboard from "../../images/hr-project.png";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import LoginIcon from "@mui/icons-material/Login";

const SidebarAdm = () => {
  const { palette } = useTheme();
  const { collapsed } = useProSidebar();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  return (
    <Sidebar backgroundColor="#ADD8E6" style={{ borderRightStyle: "none" }}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          flexDirection: "column",
          height: "100%",
        }}
      >
        <Box>
          <Box sx={{ pt: 3, pb: 5, display: "flex", justifyContent: "center" }}>
            {collapsed ? (
              <Avatar alt="logo dashboard" src={logoDashboard} />
            ) : (
              <Box sx={{ display: "flex", justifyContent: "center" }}>
                <img
                  style={{
                    width: "100px",
                    height: "100px",
                    textAlign: "center",
                    transition: "all ease-out .5s",
                  }}
                  src={logoDashboard}
                  alt="logo dashboard"
                />
              </Box>
            )}
          </Box>

          <Menu
            menuItemStyles={{
              button: {
                [`&.${menuClasses.button}`]: {
                  color: "#ffffff", // White text color
                },
                "&:hover": {
                  backgroundColor: "#87CEEB", // Light blue on hover
                  color: "#ffffff", // White text on hover
                },
              },
              icon: {
                [`&.${menuClasses.icon}`]: {
                  color: "#ffffff", // White icon color
                },
              },
            }}
          >
            <>
              <MenuItem component={<Link to="/" />} icon={<DashboardIcon />}>
                Dashboard
              </MenuItem>
              <MenuItem component={<Link to="/" />} icon={<GroupAddIcon />}>
                Users
              </MenuItem>
              <MenuItem component={<Link to="/" />} icon={<WorkIcon />}>
                Jobs
              </MenuItem>
              <MenuItem component={<Link to="/" />} icon={<CategoryIcon />}>
                Category
              </MenuItem>
            </>

            <>
              <MenuItem
                component={<Link to="/user/dashboard" />}
                icon={<DashboardIcon />}
              >
                Dashboard
              </MenuItem>
              <MenuItem
                component={<Link to="/user/jobs" />}
                icon={<WorkHistoryIcon />}
              >
                Applied Jobs
              </MenuItem>
              <MenuItem
                component={<Link to="/user/info" />}
                icon={<Person3Icon />}
              >
                Personal Info
              </MenuItem>
            </>
          </Menu>
        </Box>
        <Box sx={{ pb: 2 }}>
          <Menu
            menuItemStyles={{
              button: {
                [`&.${menuClasses.button}`]: {
                  color: "#ffffff", // White text color
                },
                "&:hover": {
                  backgroundColor: "#87CEEB", // Light blue on hover
                  color: "#ffffff", // White text on hover
                },
              },
              icon: {
                [`&.${menuClasses.icon}`]: {
                  color: "#ffffff", // White icon color
                },
              },
            }}
          >
            <MenuItem icon={<LoginIcon />}>Log out</MenuItem>
          </Menu>
        </Box>
      </Box>
    </Sidebar>
  );
};

export default SidebarAdm;
