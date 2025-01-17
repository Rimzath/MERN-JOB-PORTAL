import React, { useEffect } from "react";
import { Box, Button, Paper, Typography } from "@mui/material";
import { DataGrid, gridClasses } from "@mui/x-data-grid";
import { Link } from "react-router-dom";
import AddIcon from "@mui/icons-material/Add";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteSingleJobAction,
  jobLoadAction,
} from "../../redux/actions/jobAction";

const DashJobs = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(jobLoadAction());
  }, [dispatch]);

  const { success: deleteSuccess } = useSelector((state) => state.deleteJob);
  const { jobs, loading } = useSelector((state) => state.loadJobs);
  let data = jobs && jobs.length > 0 ? jobs : [];

  // Delete a job by ID
  const deleteJobById = (e, id) => {
    if (window.confirm(`You really want to delete job ID: "${id}"?`)) {
      dispatch(deleteSingleJobAction(id));
      if (deleteSuccess) {
        dispatch(jobLoadAction());
      }
    }
  };

  const columns = [
    {
      field: "_id",
      headerName: "Job ID",
      width: 150,
    },
    {
      field: "title",
      headerName: "Job Name",
      width: 150,
    },
    {
      field: "jobType",
      headerName: "Category",
      width: 150,
      valueGetter: (data) => data.row?.jobType?.jobTypeName,
    },
    {
      field: "user",
      headerName: "User",
      width: 150,
      valueGetter: (data) => data.row?.user?.firstName,
    },
    {
      field: "available",
      headerName: "Available",
      width: 150,
      renderCell: (values) => (values.row.available ? "Yes" : "No"),
    },
    {
      field: "salary",
      headerName: "Salary",
      type: Number,
      width: 150,
      renderCell: (values) => `$${values.row.salary}`,
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
            sx={{ backgroundColor: "#1565C0", color: "white" }}
          >
            <Link
              style={{ color: "white", textDecoration: "none" }}
              to={`/admin/edit/job/${values.row._id}`}
            >
              Edit
            </Link>
          </Button>
          <Button
            onClick={(e) => deleteJobById(e, values.row._id)}
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
        Jobs List
      </Typography>
      <Box sx={{ pb: 2, display: "flex", justifyContent: "right" }}>
        <Button
          variant="contained"
          sx={{ backgroundColor: "#1565C0", color: "white" }}
          startIcon={<AddIcon />}
        >
          <Link
            style={{ color: "white", textDecoration: "none" }}
            to="/admin/job/create"
          >
            Create Job
          </Link>
        </Button>
      </Box>
      <Paper
        sx={{
          backgroundColor: "white",
          p: 2,
        }}
      >
        <Box sx={{ height: 400, width: "100%" }}>
          <DataGrid
            getRowId={(row) => row._id}
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

export default DashJobs;
