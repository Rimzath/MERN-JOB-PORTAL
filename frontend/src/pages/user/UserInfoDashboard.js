import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";

const UserInfoDashboard = () => {
  return (
    <>
      <Box sx={{ maxWidth: "50%", margin: "auto", pt: 10 }}>
        <Card sx={{ minWidth: 275 }}>
          <CardContent>
            <Typography sx={{ fontSize: 16 }} color="#fafafa" gutterBottom>
              Personal Info
            </Typography>
            <hr style={{ marginBottom: "30px" }} />
            <Typography variant="h6" component="div" sx={{ color: "#fafafa" }}>
              First name:
            </Typography>
            <Typography variant="h6" component="div" sx={{ color: "#fafafa" }}>
              Last name:
            </Typography>
            <Typography variant="h6" component="div" sx={{ color: "#fafafa" }}>
              E-mail:
            </Typography>
            <Typography
              sx={{ mb: 1.5, color: "grey", pt: 2 }}
              color="text.secondary"
            >
              Status:
            </Typography>
          </CardContent>
        </Card>
      </Box>
    </>
  );
};

export default UserInfoDashboard;
