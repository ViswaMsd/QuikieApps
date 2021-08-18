import { TableBody, TablePagination } from "@material-ui/core";
import React, { useState } from "react";
import "./styles.css";
import {
  Button,
  Table,
  TableContainer,
  TableHead,
  TableRow,
  TableCell,
  makeStyles,
} from "@material-ui/core";
import { coinActions } from "../redux-store/store";
import { useDispatch } from "react-redux";
import { useHistory, useLocation } from "react-router-dom";
// import { grey, red } from "jest-matcher-utils/node_modules/chalk";

const useStyles = makeStyles((theme) => ({
  table: {
    // marginTop: theme.spacing(3),

    "& thead th": {
      fontWeight: "600",
      //   width: "40px",
      //   color: theme.palette.primary.main,
      backgroundColor: "grey",
    },

    "& tbody td": {
      padding: "8px",
      fontWeight: "300",
    },
    "& tbody tr:hover": {
      backgroundColor: "#fffbf2",
    },
  },

  market_cap: {
    [theme.breakpoints.down("xs")]: {
      display: "none",
    },
  },
  price: {
    [theme.breakpoints.down("xs")]: {
      display: "none",
    },
  },
}));

function useTable(records, headCells) {
  const classes = useStyles();
  const rowsPerPageOptions = [5, 10];
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(rowsPerPageOptions[0]);
  const dispatch = useDispatch();
  const location = useLocation();
  const history = useHistory();
  console.log(location);

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
        <Table className={classes.table}>{props.children}</Table>
      </TableContainer>
    );
  };

  const TblHead = () => {
    console.log("TblHead");
    return (
      <TableHead>
        <TableRow>
          {headCells.map((headCell) => (
            <TableCell className={`${headCell.id}`} key={headCell.id}>
              {headCell.label}
            </TableCell>
          ))}
        </TableRow>
      </TableHead>
    );
  };

  const TblBody = () => {
    return (
      <TableBody>
        {records.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((record) => (
          <TableRow key={record.symbol}>
            <TableCell>{record.name}</TableCell>
            <TableCell>{record.symbol}</TableCell>
            <TableCell className={classes.market_cap}>{record.market_cap}</TableCell>
            <TableCell className={classes.price}>{record.price}</TableCell>
            <TableCell>
              {location.pathname === "/stock-details" ? (
                <Button
                  variant="contained"
                  color={record.isSaved ? "secondary" : "primary"}
                  onClick={() => {
                    console.log(record.symbol);
                    if (!record.isSaved) {
                      dispatch(
                        coinActions.saveHandler({
                          symbol: record.symbol,
                          range: [page * rowsPerPage, page * rowsPerPage + rowsPerPage],
                        })
                      );
                    } else {
                      history.push("./saved-details");
                    }
                  }}
                >
                  {record.isSaved ? "View Data" : "Save Data"}
                </Button>
              ) : (
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => {
                    dispatch(coinActions.deletHandler(record.symbol));
                  }}
                >
                  Delete
                </Button>
              )}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    );
  };

  const TblPagination = () => {
    return (
      <TablePagination
        rowsPerPageOptions={rowsPerPageOptions}
        count={records.length}
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
