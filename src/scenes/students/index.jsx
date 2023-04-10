import { Box, Button } from "@mui/material";
import { DataGrid, GridToolbar, GridActionsCellItem } from "@mui/x-data-grid";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/DeleteOutlined";
import { tokens } from "../../theme";
import Header from "../../components/Header";
import { useTheme } from "@mui/material";
import { Link } from "react-router-dom";
import React from "react";
import axios from "axios";

const Students = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [rows, setRows] = React.useState([]);

  const handleDeleteClick = (id) => () => {
    setRows(rows.filter((row) => row.id !== id));
  };

  const columns = [
    { field: "id", headerName: "ID" },
    {
      field: "registrationNo",
      headerName: "Registration Number",
      flex: 1,
      editable: "true",
    },
    {
      field: "firstName",
      headerName: "First Name",
      flex: 1,
      cellClassName: "name-column--cell",
      editable: "true",
    },
    {
      field: "lastName",
      headerName: "Last Name",
      flex: 1,
      cellClassName: "name-column--cell",
      editable: "true",
    },
    {
      field: "contact",
      headerName: "Contact",
      flex: 1,
      editable: "true",
    },
    {
      field: "email",
      headerName: "Email",
      flex: 1.5,
      editable: "true",
    },
    {
      field: "dateOfBirth",
      headerName: "Date of Birth",
      type: "date",
      flex: 1,
      editable: "true",
    },
    {
      field: "gender",
      headerName: "Gender",
      flex: 1,
      editable: "true",
    },
    {
      field: "actions",
      type: "actions",
      headerName: "Actions",
      width: 100,
      cellClassName: "actions",
      getActions: ({ id }) => [
        <GridActionsCellItem
          icon={<DeleteIcon />}
          label="Delete"
          onClick={handleDeleteClick(id)}
        />,
      ],
    },
  ];

  const fetchData = async () => {
    try {
      const response = await axios.get(
        "https://localhost:7117/api/CrudOperation/ReadRecord"
      );
      setRows(response.data.readRecordData);
    } catch (error) {
      console.error(error);
    }
  };

  React.useEffect(() => {
    fetchData();
  }, []);
  return (
    <Box m="20px">
      <Header title="Students" subtitle="Manage Students Info" />
      <Box
        sx={{
          position: "absolute",
          left: "1400px",
          top: "145px",
          zIndex: "9999",
        }}
      >
        <Link to="/addStudent" style={{ textDecoration: "none" }}>
          <Button
            sx={{
              backgroundColor: "black",
              color: "white",
              fontSize: "11px",
              fontWeight: "bold",
              padding: "10px 20px",
              "&:hover": {
                background: "white",
                color: "black",
                border: "1px solid grey",
              },
            }}
            color="primary"
            startIcon={<AddIcon />}
          >
            Add new
          </Button>
        </Link>
      </Box>
      <Box
        m="40px 0 0 0"
        height="75vh"
        sx={{
          "& .MuiDataGrid-root": {
            border: "none",
            fontSize: "13px !important",
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
            fontSize: "14px",
            borderBottom: "none",
          },
          "& .MuiDataGrid-columnHeaderTitle": {
            fontWeight: "700",
          },
          "& .MuiDataGrid-virtualScroller": {
            backgroundColor: "white !important",
          },
          "& .MuiDataGrid-footerContainer": {
            borderTop: "none",
            backgroundColor: "#fffff",
          },
          "& .MuiCheckbox-root": {
            color: "red !important",
          },
          "& .MuiDataGrid-toolbarContainer .MuiButton-text": {
            color: "black !important",
            fontSize: "13px !important",
          },
          "& .MuiDataGrid-toolbarContainer": {
            position: "relative",
            top: "-10px",
          },
        }}
      >
        <DataGrid
          editMode="row"
          rows={rows}
          columns={columns}
          components={{ Toolbar: GridToolbar }}
        />
      </Box>
    </Box>
  );
};

export default Students;
