import React from "react";
import { Box, useTheme } from "@mui/material";
import { useGetCustomersQuery } from "state/api";
import Header from "components/Header";
import { DataGrid } from "@mui/x-data-grid";

const Customers = () => {
  const theme = useTheme();
  const { data, isLoading } = useGetCustomersQuery();

  const columns = [{
    field: "_id",
    headerName: "ID",
    flex: 0.6,
  }, {
    field: "name",
    headerName: "Name",
    flex: 0.4,
  }, {
    field: "email",
    headerName: "Email",
    flex: 0.7,
  }, {
    field: "phoneNumber",
    headerName: "Phone Number",
    flex: 0.5,
    renderCell: (params) => {
      return params.value.replace(/^(\d{3})(\d{3})(\d{4})/, "($1)$2-$3");
    }
  }, {
    field: "country",
    headerName: "Country",
    flex: 0.3,
  }, {
    field: "occupation",
    headerName: "Occupation",
    flex: 0.5,
  }, {
    field: "role",
    headerName: "Role",
    flex: 0.2,
  }];

  return (
    <Box m="1.5rem 2.5rem" display="flex" flexWrap="wrap" justifyContent="end">
      <Header title="CUSTOMERS" subtitle="List of Customers" />
      <Box
        mt="40px"
        height="75vh"
        display="flex"
        // flex="0.95"
        width="75vw"
        justifyContent="center"
        sx={{
          "& .MuiDataGrid-root": {
            border: "none",
            display: "flex",
            flex: 1
          },
          "& .MuiDataGrid-cell": {
            borderBottom: "none",
          },
          "& .MuiDataGrid-columnHeaders": {
            backgroundColor: theme.palette.background.alt,
            color: theme.palette.secondary[100],
            borderBottom: "none",
          },
          "& .MuiDataGrid-virtualScroller": {
            backgroundColor: theme.palette.primary.main
          },
          "& .MuiDataGrid-footerContainer": {
            backgroundColor: theme.palette.background.alt,
            color: theme.palette.secondary[100],
            borderTop: "none",
          },
          "& .MuiDataGrid-toolbarContainer .MuiButton-text": {
            color: `${theme.palette.secondary[200]} !important`,
          },
        }}
      >
        <DataGrid
          loading={isLoading || !data}
          getRowId={(row) => row._id}
          rows={data || []}
          columns={columns}
        // autoPageSize
        />
      </Box>
    </Box>
  );
};

export default Customers;