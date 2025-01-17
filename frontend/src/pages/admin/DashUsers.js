import React, { useEffect } from "react";
import { Box, Button, Paper, Typography } from "@mui/material";
import { DataGrid, gridClasses, GridToolbar } from "@mui/x-data-grid";
import { Link } from "react-router-dom";
import AddIcon from "@mui/icons-material/Add";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";
import { allUserAction } from "../../redux/actions/userAction";

const DashUsers = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(allUserAction());
  }, [dispatch]);

  const { users, loading } = useSelector((state) => state.allUsers);
  let data = users && users.length > 0 ? users : [];

  const deleteUserById = (e, id) => {
    console.log(id);
  };

  const columns = [
    {
      field: "_id",
      headerName: "User ID",
      width: 150,
    },
    {
      field: "email",
      headerName: "E_mail",
      width: 150,
    },
    {
      field: "role",
      headerName: "User status",
      width: 150,
      renderCell: (params) =>
        params.row.role === 1 ? "Admin" : "Regular user",
    },
    {
      field: "createdAt",
      headerName: "Creation date",
      width: 150,
      renderCell: (params) =>
        moment(params.row.createdAt).format("YYYY-MM-DD HH:MM:SS"),
    },
    {
      field: "Actions",
      width: 200,
      renderCell: (values) => (
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            width: "170px",
          }}
        >
          <Button variant="contained" sx={{ backgroundColor: "#1565C0" }}>
            <Link
              style={{ color: "white", textDecoration: "none" }}
              to={`/admin/edit/user/${values.row._id}`}
            >
              Edit
            </Link>
          </Button>
          <Button
            onClick={(e) => deleteUserById(e, values.row._id)}
            variant="contained"
            color="error"
          >
            Delete
          </Button>
        </Box>
      ),
    },
  ];

  return (
    <>
      <Box sx={{ backgroundColor: "#E3F2FD", minHeight: "100vh", p: 3 }}>
        <Typography variant="h4" sx={{ color: "#1565C0", pb: 3 }}>
          All Users
        </Typography>
        <Box sx={{ pb: 2, display: "flex", justifyContent: "right" }}>
          <Button
            variant="contained"
            sx={{ backgroundColor: "#1565C0", color: "white" }}
            startIcon={<AddIcon />}
          >
            Create User
          </Button>
        </Box>
        <Paper
          sx={{
            backgroundColor: "white",
            padding: 2,
          }}
        >
          <Box sx={{ height: 400, width: "100%" }}>
            <DataGrid
              sx={{
                "& .MuiTablePagination-displayedRows": {
                  color: "#1565C0",
                },
                "& .MuiDataGrid-columnHeaders": {
                  backgroundColor: "#90CAF9",
                  color: "white",
                },
                "& .MuiDataGrid-row": {
                  backgroundColor: "#E3F2FD",
                  "&:hover": {
                    backgroundColor: "#BBDEFB",
                  },
                },
                "& .MuiButtonBase-root": {
                  color: "#1565C0",
                },
                "& .MuiDataGrid-cell": {
                  color: "#1565C0",
                },
              }}
              getRowId={(row) => row._id}
              rows={data}
              columns={columns}
              pageSize={3}
              rowsPerPageOptions={[3]}
              checkboxSelection
              slots={{ toolbar: GridToolbar }}
            />
          </Box>
        </Paper>
      </Box>
    </>
  );
};

export default DashUsers;
