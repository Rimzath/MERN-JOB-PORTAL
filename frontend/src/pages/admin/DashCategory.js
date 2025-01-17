import React, { useEffect } from "react";
import { Box, Button, Paper, Typography } from "@mui/material";
import { DataGrid, gridClasses } from "@mui/x-data-grid";
import { Link } from "react-router-dom";
import AddIcon from "@mui/icons-material/Add";
import { useDispatch, useSelector } from "react-redux";
import { jobTypeLoadAction } from "../../redux/actions/jobTypeAction";
import moment from "moment";

const DashCategory = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(jobTypeLoadAction());
  }, [dispatch]);

  const { jobType, loading } = useSelector((state) => state.jobTypeAll);
  let data = jobType !== undefined && jobType.length > 0 ? jobType : [];

  // Delete job category by ID
  const deleteJobCategoryById = (e, id) => {
    console.log(id);
  };

  const columns = [
    {
      field: "_id",
      headerName: "Category ID",
      width: 150,
      editable: true,
    },
    {
      field: "jobTypeName",
      headerName: "Category",
      width: 150,
    },
    {
      field: "createdAt",
      headerName: "Created At",
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
          <Button
            variant="contained"
            sx={{
              backgroundColor: "#1565C0",
              color: "white",
            }}
          >
            <Link
              style={{ color: "white", textDecoration: "none" }}
              to={`/admin/edit/category/${values.row._id}`}
            >
              Edit
            </Link>
          </Button>
          <Button
            onClick={(e) => deleteJobCategoryById(e, values.row._id)}
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
    <Box sx={{ backgroundColor: "#E3F2FD", minHeight: "100vh", p: 3 }}>
      <Typography variant="h4" sx={{ color: "#1565C0", pb: 3 }}>
        Job Categories
      </Typography>
      <Box sx={{ pb: 2, display: "flex", justifyContent: "right" }}>
        <Button
          variant="contained"
          sx={{
            backgroundColor: "#1565C0",
            color: "white",
          }}
          startIcon={<AddIcon />}
        >
          <Link
            style={{ color: "white", textDecoration: "none" }}
            to="/admin/category/create"
          >
            Create Category
          </Link>
        </Button>
      </Box>
      <Paper
        sx={{
          backgroundColor: "white",
          p: 2,
          borderRadius: 2,
          boxShadow: 3,
        }}
      >
        <Box sx={{ height: 400, width: "100%" }}>
          <DataGrid
            getRowId={(row) => row._id}
            sx={{
              "& .MuiTablePagination-displayedRows": {
                color: "#1565C0",
              },
              color: "#1565C0",
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
              "& .MuiDataGrid-cell": {
                color: "#1565C0",
              },
              "& .MuiButtonBase-root": {
                color: "#1565C0",
              },
            }}
            rows={data}
            columns={columns}
            pageSize={5}
            rowsPerPageOptions={[5]}
            checkboxSelection
          />
        </Box>
      </Paper>
    </Box>
  );
};

export default DashCategory;
