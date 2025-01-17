import { Box, Stack, Typography } from "@mui/material";
import StatComponent from "../../component/StatComponent";
import SupervisorAccountIcon from "@mui/icons-material/SupervisorAccount";
import WorkIcon from "@mui/icons-material/Work";
import CategoryIcon from "@mui/icons-material/Category";
import { Chart } from "react-google-charts";
import { data, options } from "./data/data";
import ChartComponent from "../../component/ChartComponent";

const AdminDashboard = () => {
  return (
    <>
      <Box sx={{ backgroundColor: "#E3F2FD", minHeight: "100vh", p: 3 }}>
        <Typography variant="h4" sx={{ color: "#1565C0", pb: 3 }}>
          Dashboard
        </Typography>
        <Stack
          direction={{ xs: "column", sm: "row" }}
          spacing={{ xs: 1, sm: 2, md: 4 }}
        >
          <StatComponent
            value="45621"
            icon={
              <SupervisorAccountIcon sx={{ color: "#1565C0", fontSize: 30 }} />
            }
            description="Administrators"
            money=""
            sx={{
              backgroundColor: "white",
              color: "#1565C0",
              borderRadius: 2,
              p: 2,
            }}
          />
          <StatComponent
            value="450"
            icon={<WorkIcon sx={{ color: "#1565C0", fontSize: 30 }} />}
            description="Jobs"
            money=""
            sx={{
              backgroundColor: "white",
              color: "#1565C0",
              borderRadius: 2,
              p: 2,
            }}
          />
          <StatComponent
            value="6548"
            icon={<CategoryIcon sx={{ color: "#1565C0", fontSize: 30 }} />}
            description="Job Categories"
            money=""
            sx={{
              backgroundColor: "white",
              color: "#1565C0",
              borderRadius: 2,
              p: 2,
            }}
          />
        </Stack>

        <Stack
          direction={{ xs: "column", sm: "row" }}
          sx={{ mt: 3 }}
          spacing={{ xs: 1, sm: 2, md: 4 }}
        >
          <ChartComponent>
            <Chart
              chartType="Bar"
              data={data}
              options={{
                ...options,
                backgroundColor: "#E3F2FD", // Light blue chart background
                colors: ["#1565C0", "#90CAF9"], // Light blue and blue for bars
              }}
              width="100%"
              height="300px"
              legendToggle
            />
          </ChartComponent>
        </Stack>
      </Box>
    </>
  );
};

export default AdminDashboard;
