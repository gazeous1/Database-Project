import { Box, Button, IconButton, Typography, useTheme } from "@mui/material";
import { tokens } from "../../theme";
import { recentAdded } from "../../data/mockData";
import DownloadOutlinedIcon from "@mui/icons-material/DownloadOutlined";
import PeopleAltRoundedIcon from "@mui/icons-material/PeopleAltRounded";
import ManageAccountsRoundedIcon from "@mui/icons-material/ManageAccountsRounded";
import HomeRepairServiceRoundedIcon from "@mui/icons-material/HomeRepairServiceRounded";
import Groups2RoundedIcon from "@mui/icons-material/Groups2Rounded";
import Header from "../../components/Header";
import LineChart from "../../components/charts/LineChart";
import StatBox from "../../components/charts/StatBox";
import { Link } from "react-router-dom";
import { Margin } from "@mui/icons-material";
import axios from "axios";
import React from "react";

const Dashboard = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [rows, setRows] = React.useState([]);

  const fetchData = async () => {
    try {
      const response = await axios.get(
        "https://localhost:7117/api/CrudOperation/ReadRecord"
      );
      const sortedData = response.data.readRecordData.sort((a, b) => b.id - a.id);
      setRows(sortedData);
    } catch (error) {
      console.error(error);
    }
  };

  React.useEffect(() => {
    fetchData();
  }, []);

  const MAX_STUDENTS = 200;
  const numStudents = rows.length;
  const progress = numStudents / MAX_STUDENTS;
  const increase = (numStudents / MAX_STUDENTS)*100;
  return (
    <Box m="20px">
      {/* HEADER */}
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Header title="DASHBOARD" />

        <Box sx={{ position: "absolute", top: "109px", left: "1270px" }}>
          <Button
            sx={{
              backgroundColor: "black",
              color: "white",
              fontSize: "12px",
              fontWeight: "bold",
              padding: "10px 20px",
              "&:hover": {
                backgroundColor: "white",
                color: "black",
                border: "1px solid",
              },
            }}
          >
            <DownloadOutlinedIcon sx={{ mr: "10px" }} />
            Download Reports
          </Button>
        </Box>
      </Box>

      {/* GRID & CHARTS */}
      <Box
        mt={"70px"}
        display="grid"
        gridTemplateColumns="repeat(12, 1fr)"
        gridAutoRows="140px"
        gap="25px"
      >
        {/* ROW 1 */}
        <Box
          gridColumn="span 3"
          backgroundColor="white"
          boxShadow={"1px 1px 5px 2px lightgrey"}
          borderRadius="18px"
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <StatBox
            title={rows.length}
            subtitle="Students"
            progress={progress}
            increase={increase+"%"} 
            icon={
              <PeopleAltRoundedIcon sx={{ color: "black", fontSize: "26px" }} />
            }
          />
        </Box>
        <Box
          gridColumn="span 3"
          backgroundColor="white"
          boxShadow={"1px 1px 5px 2px lightgrey"}
          borderRadius="18px"
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <StatBox
            title=""
            subtitle="Advisors"
            progress=""
            increase=""
            icon={
              <ManageAccountsRoundedIcon
                sx={{ color: "black", fontSize: "26px" }}
              />
            }
          />
        </Box>
        <Box
          gridColumn="span 3"
          backgroundColor="white"
          boxShadow={"1px 1px 5px 2px lightgrey"}
          borderRadius="18px"
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <StatBox
            title=""
            subtitle="Projects"
            progress=""
            increase=""
            icon={
              <HomeRepairServiceRoundedIcon
                sx={{ color: "black", fontSize: "26px" }}
              />
            }
          />
        </Box>
        <Box
          gridColumn="span 3"
          backgroundColor="white"
          boxShadow={"1px 1px 5px 2px lightgrey"}
          borderRadius="18px"
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <StatBox
            title=""
            subtitle="Groups"
            progress=""
            increase=""
            icon={
              <Groups2RoundedIcon sx={{ color: "black", fontSize: "26px" }} />
            }
          />
        </Box>

        {/* ROW 2 */}
        <Box
          gridColumn="span 8"
          gridRow="span 2"
          backgroundColor="white"
          boxShadow={"1px 1px 5px 2px lightgrey"}
          borderRadius="18px"
        >
          <Box
            mt="25px"
            p="0 30px"
            display="flex "
            justifyContent="space-between"
            alignItems="center"
          >
            <Box>
              <Typography
                variant="h5"
                fontWeight="500"
                color={"darkgrey"}
                mb="5px"
              >
                Evalouation Marks
              </Typography>
              <Typography variant="h3" fontWeight="bold" color={"black"}>
                Groups
              </Typography>
            </Box>
          </Box>
          <Box height="250px" m="-20px 0 0 0">
            <LineChart isDashboard={true} />
          </Box>
        </Box>
        <Box
          gridColumn="span 4"
          gridRow="span 2"
          backgroundColor="white"
          boxShadow={"1px 1px 5px 2px lightgrey"}
          borderRadius="18px"
          overflow="auto"
        >
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            borderBottom={`1px dashed ${colors.primary[500]}`}
            colors={colors.grey[100]}
            p="15px"
          >
            <Typography color={"black"} variant="h5" fontWeight="600">
              Recently Added Students
            </Typography>
            <Link
              to="/students"
              style={{ textDecoration: "none", color: "grey" }}
            >
              View All
            </Link>
          </Box>
          {rows.map((student, i) => (
            <Box
              key={`${student.registrationNo}-${i}`}
              display="flex"
              justifyContent="space-between"
              alignItems="center"
              p="15px"
              borderBottom={`1px dashed ${colors.primary[500]}`}
            >
              <Box>
                <Typography color={"black"} variant="h5" fontWeight="600">
                  {student.firstName}
                </Typography>
                <Typography color={"colors.grey[100]"}>
                  {student.registrationNo}
                </Typography>
              </Box>
              
              <Box
                backgroundColor={"black"}
                color="white"
                p="5px 10px"
                borderRadius="4px"
              >
                Active
              </Box>
            </Box>
          ))}
        </Box>
      </Box>
    </Box>
  );
};

export default Dashboard;
