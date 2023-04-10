import { Box, Button } from "@mui/material";
import { DataGrid} from "@mui/x-data-grid";
import AddIcon from "@mui/icons-material/Add";
import { tokens } from "../../theme";
import { students } from "../../data/students";
import Header from "../../components/Header";
import { useTheme } from "@mui/material";
import { Link } from "react-router-dom";
import React from "react";

const MiniStudents = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [rows, setRows] = React.useState(students);

 

  const columns = [
    { field: "id", headerName: "ID", flex:1},
    {
      field: "registrationNo",
      headerName: "Registration Number",
      flex: 2,

    },
    {
      field: "firstName",
      headerName: "First Name",
      flex: 1,
      cellClassName: "name-column--cell",

    },
    {
      field: "lastName",
      headerName: "Last Name",
      flex: 1,
      cellClassName: "name-column--cell",

    },
    {
      field: "contact",
      headerName: "Contact",
      flex: 1,

    },
    {
      field: "email",
      headerName: "Email",
      flex: 1,

    },
    {
      field: "gender",
      headerName: "Gender",
      flex: 1,

    },
    {
      field: "dateOfBirth",
      headerName: "Date of Birth",
      type: "date",
      flex: 1,

    },
  ];

  return (
    <Box >
      <Box
        width="850px"
        height="75vh"
        mr={"25px"}
        sx={{
          "& .MuiDataGrid-root": {
            border:"none !important",
            fontSize:"10px !important"

          },
          "& .MuiDataGrid-cell": {
            borderBottom: "1px dashed grey !important",
            
          },
          "& .name-column--cell": {
            color: "#fffff",
            
          },
          "& .MuiDataGrid-columnHeaders": {
            backgroundColor: "white",
            color: "black !important",
            fontSize: "11px",
            borderBottom: "none",
          },
          "& .MuiDataGrid-columnHeaderTitle": {
            fontWeight: "700",
          },
          "& .MuiDataGrid-virtualScroller": {
            backgroundColor: "white !important",
          },
          "& .MuiDataGrid-footerContainer": {
            borderTop: "1px dashed ",
            backgroundColor: "#fffff",
            
          },
          "& .MuiCheckbox-root": {
            color: "red !important",
          },
          "& .MuiDataGrid-toolbarContainer .MuiButton-text": {
            color: "black !important",
            fontSize:"11px !important"
          },
          "& .MuiDataGrid-toolbarContainer": {
            position: "relative",
            top: "-10px",
          },
        }}
      >
        <DataGrid
          
          rows={students}
          columns={columns}

        />
      </Box>
    </Box>
  );
};

export default MiniStudents;
