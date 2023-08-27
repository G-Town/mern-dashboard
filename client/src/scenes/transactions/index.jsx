import React, { useState } from "react";
import { Box, useTheme } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { useGetTransactionsQuery } from "state/api";
import Header from "components/Header";
import DataGridCustomToolbar from "components/DataGridCustomToolbar";

const Transactions = () => {
  const theme = useTheme();

  // values to be sent to the backend
  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(20);
  const [sort, setSort] = useState({});
  const [search, setSearch] = useState("");

  const [searchInput, setSearchInput] = useState("");
  const { data, isLoading } = useGetTransactionsQuery({
    page,
    pageSize,
    sort: JSON.stringify(sort),
    search,
  });
  // console.log("🚀 ~ file: index.jsx:24 ~ Transactions ~ data:", data)

  const columns = [{
    field: "_id",
    headerName: "ID",
    flex: 0.25
  }, {
    field: "userId",
    headerName: "User ID",
    flex: 0.25
  }, {
    field: "createdAt",
    headerName: "CreatedAt",
    flex: 0.25,
  }, {
    field: "products",
    headerName: "# of Products",
    flex: 0.2,
    sortable: false,
    renderCell: (params) => params.value.length,
  }, {
    field: "cost",
    headerName: "Cost",
    flex: 0.25,
    renderCell: (params) => `$${Number(params.value).toFixed(2)}`,
  }];



  return (
    <Box m="1.5rem 2.5rem" display="flex" flexWrap="wrap" justifyContent="end">
      <Header title="TRANSACTIONS" subtitle="Entire list of transactions" />
      <Box
        height="80vh"
        display="flex"
        // flex="0.9"
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
            // justifyContent: "center",
          },
          "& .MuiDataGrid-columnHeaders": {
            backgroundColor: theme.palette.background.alt,
            color: theme.palette.secondary[100],
            borderBottom: "none",
          },
          "& .MuiDataGrid-virtualScroller": {
            backgroundColor: theme.palette.primary.main,
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
          rows={(data && data.transactions) || []}
          columns={columns}
          rowCount={(data && data.total) || 0}
          // FIXME: custom pagination from client.js in server side controller
          autoPageSize
          // rowsPerPageOptions={[20, 50, 100]}
          // pagination
          // page={page}
          // pageSize={pageSize}
          // paginationMode="server"
          sortingMode="server"
          onPageChange={(newPage) => setPage(newPage)}
          onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
          onSortModelChange={(newSortModel) => setSort(...newSortModel)}
          components={{ Toolbar: DataGridCustomToolbar }}
          componentsProps={{
            toolbar: { searchInput, setSearchInput, setSearch },
          }}
        />
      </Box>
    </Box>
  );
};

export default Transactions;