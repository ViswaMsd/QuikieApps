import { TablePagination } from "@material-ui/core";
import React, { useState } from "react";
import {
  Button,
  Table,
  TableContainer,
  TableHead,
  TableRow,
  TableCell,
} from "@material-ui/core";
import { coinActions } from "../redux-store/store";
import { useDispatch } from "react-redux";

function useTable(records, headCells) {
  const rowsPerPageOptions = [5, 10];
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(rowsPerPageOptions[0]);
  const dispatch = useDispatch();

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    console.log(typeof event.target.value);
    setRowsPerPage(event.target.value);
    setPage(0);
  };

  const TblContainer = (props) => {
    console.log("TblContainer");
    return (
      <TableContainer>
        <Table>{props.children}</Table>
      </TableContainer>
    );
  };

  const TblHead = () => {
    console.log("TblHead");
    return (
      <TableHead>
        <TableRow>
          {headCells.map((headCell) => (
            <TableCell key={headCell}>{headCell}</TableCell>
          ))}
        </TableRow>
      </TableHead>
    );
  };

  const TblBody = () => {
    return records
      .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
      .map((record) => (
        <TableRow key={record.symbol}>
          <TableCell>{record.name}</TableCell>
          <TableCell>{record.symbol}</TableCell>
          <TableCell>{record.market_cap}</TableCell>
          <TableCell>{record.price}</TableCell>
          <TableCell>
            {
              <Button
                color={record.isSaved ? "secondary" : "primary"}
                onClick={() => {
                  console.log(record.symbol);
                  if (!record.isSaved) {
                    dispatch(
                      coinActions.saveHandler({
                        symbol: record.symbol,
                        range: [
                          page * rowsPerPage,
                          page * rowsPerPage + rowsPerPage,
                        ],
                      })
                    );
                  }
                }}
                // color="primary"
                variant="contained"
              >
                {record.isSaved ? "View Data" : "Save Data"}
              </Button>
            }
          </TableCell>
        </TableRow>
      ));
  };

  const TblPagination = () => {
    return (
      <TablePagination
        rowsPerPageOptions={rowsPerPageOptions}
        count={100}
        page={page}
        onPageChange={handleChangePage}
        rowsPerPage={rowsPerPage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    );
  };

  return {
    TblContainer,
    TblHead,
    TblBody,
    TblPagination,
  };
}

export default useTable;
